import { NextRequest, NextResponse } from 'next/server';
import { buffer } from 'node:stream/consumers';
import Stripe from 'stripe';
import prisma from '@/lib/db'; // Import Prisma client
import { stripe } from '@/lib/stripe/client'; // Import configured Stripe instance

export async function POST(request: NextRequest) {
  const reqBuffer = await buffer(request.body);
  const signature = request.headers.get('stripe-signature');
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !webhookSecret) {
    console.error('Stripe webhook signature or secret missing.');
    return new Response('Webhook Error: Missing signature or secret.', { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      reqBuffer.toString(),
      signature,
      webhookSecret
    );
  } catch (err: any) {
    console.error(`Error verifying webhook signature: ${err.message}`);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  // Handle the event
  try {
    const session = event.data.object as any; // Type assertion for convenience, refine as needed
    const storeId = session.metadata?.store_id || session.subscription?.metadata?.store_id;

    switch (event.type) {
      case 'customer.subscription.created':
        if (!storeId) {
          console.error('customer.subscription.created: store_id missing in metadata');
          return new Response('Webhook Error: Missing store_id in metadata.', { status: 400 });
        }
        await prisma.store.update({
          where: { id: storeId },
          data: {
            platformSubscriptionId: session.id,
            platformSubscriptionStatus: session.status,
            platformSubscriptionCurrentPeriodEnd: new Date(session.current_period_end * 1000),
          },
        });
        console.log(`Subscription created for store ${storeId}: ${session.id}`);
        break;

      case 'customer.subscription.updated':
        if (!storeId) {
          console.error('customer.subscription.updated: store_id missing in metadata');
          return new Response('Webhook Error: Missing store_id in metadata.', { status: 400 });
        }
        await prisma.store.update({
          where: { id: storeId },
          data: {
            platformSubscriptionStatus: session.status,
            platformSubscriptionCurrentPeriodEnd: new Date(session.current_period_end * 1000),
            // Consider session.cancel_at_period_end if you want to track that
          },
        });
        console.log(`Subscription updated for store ${storeId}: ${session.id}`);
        break;

      case 'customer.subscription.deleted': // Handles cancellations
        if (!storeId) {
          console.error('customer.subscription.deleted: store_id missing in metadata');
          return new Response('Webhook Error: Missing store_id in metadata.', { status: 400 });
        }
        await prisma.store.update({
          where: { id: storeId },
          data: {
            platformSubscriptionStatus: session.status, // Should be 'canceled'
            // Optionally nullify other fields:
            // platformSubscriptionId: null,
            // platformSubscriptionCurrentPeriodEnd: null,
          },
        });
        console.log(`Subscription deleted/canceled for store ${storeId}: ${session.id}`);
        break;

      case 'invoice.payment_succeeded':
        // This event often occurs for recurring subscription payments
        if (session.subscription) { // Check if it's related to a subscription
          const subscriptionId = session.subscription as string;
          // Attempt to retrieve store_id from invoice's subscription metadata
          // Stripe might not always populate subscription metadata directly on the invoice object's subscription field.
          // A more robust way is to fetch the subscription object itself if metadata is missing here.
          let subStoreId = session.subscription_details?.metadata?.store_id || session.metadata?.store_id;

          if (!subStoreId) {
            // Fetch the subscription to get metadata if not directly available
            const subscription = await stripe.subscriptions.retrieve(subscriptionId);
            subStoreId = subscription.metadata.store_id;
          }

          if (!subStoreId) {
            console.error('invoice.payment_succeeded: store_id missing in subscription metadata for invoice', session.id);
            return new Response('Webhook Error: Missing store_id for invoice.', { status: 400 });
          }

          // Retrieve the subscription to get the most up-to-date status and current_period_end
          const fullSubscription = await stripe.subscriptions.retrieve(subscriptionId);

          await prisma.store.update({
            where: { id: subStoreId },
            data: {
              platformSubscriptionStatus: fullSubscription.status, // Use status from the subscription
              platformSubscriptionCurrentPeriodEnd: new Date(fullSubscription.current_period_end * 1000),
            },
          });
          console.log(`Invoice payment succeeded for store ${subStoreId}, subscription ${subscriptionId}`);
        }
        break;

      case 'invoice.payment_failed':
        if (session.subscription) { // Check if it's related to a subscription
          const subscriptionId = session.subscription as string;
          let subStoreId = session.subscription_details?.metadata?.store_id || session.metadata?.store_id;

          if (!subStoreId) {
            const subscription = await stripe.subscriptions.retrieve(subscriptionId);
            subStoreId = subscription.metadata.store_id;
          }

          if (!subStoreId) {
            console.error('invoice.payment_failed: store_id missing in subscription metadata for invoice', session.id);
            return new Response('Webhook Error: Missing store_id for invoice.', { status: 400 });
          }

          // Retrieve the subscription to get the most up-to-date status
          const fullSubscription = await stripe.subscriptions.retrieve(subscriptionId);

          await prisma.store.update({
            where: { id: subStoreId },
            data: {
              platformSubscriptionStatus: fullSubscription.status, // Reflects status like 'past_due' or 'unpaid'
            },
          });
          console.log(`Invoice payment failed for store ${subStoreId}, subscription ${subscriptionId}. Status: ${fullSubscription.status}`);
        }
        break;

      default:
        console.warn(`Unhandled Stripe webhook event type: ${event.type}`);
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error: any) {
    console.error(`Error handling webhook event ${event.type}: ${error.message}`, error);
    return new Response(`Webhook handler failed: ${error.message}`, { status: 500 });
  }
}