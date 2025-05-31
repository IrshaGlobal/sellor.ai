import { NextRequest } from 'next/server';
import { buffer } from 'node:stream/consumers';
import { handleWebhookEvent } from '@/lib/stripe/service';

export async function POST(request: NextRequest) {
  // Get the raw body to verify the webhook signature
  const reqBuffer = await buffer(request.body);
  
  // Get the Stripe webhook secret from environment variables
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  
  let event;

  if (webhookSecret) {
    // In production, you would verify the webhook signature
    // This is a simplified version for development
    try {
      // Normally you'd use the stripe SDK to construct the event
      // Here we're just parsing the JSON for demonstration purposes
      event = JSON.parse(reqBuffer.toString());
      
      // In production, you'd verify the signature like this:
      /*
      const signature = request.headers.get('stripe-signature');
      
      event = stripe.webhooks.constructEvent(
        reqBuffer.toString(),
        signature!,
        webhookSecret
      );
      */
    } catch (err) {
      console.error(`Error parsing webhook: ${err.message}`);
      return new Response(`Webhook Error: ${err.message}`, { status: 400 });
    }
  } else {
    // For development without signature verification
    try {
      event = JSON.parse(reqBuffer.toString());
    } catch (err) {
      console.error(`Error parsing webhook: ${err.message}`);
      return new Response(`Webhook Error: ${err.message}`, { status: 400 });
    }
  }

  // Handle the event
  try {
    await handleWebhookEvent(event);
    return new Response(JSON.stringify({ received: true }), { status: 200 });
  } catch (error) {
    console.error(`Error handling webhook: ${error}`);
    return new Response(`Webhook handler failed: ${error}`, { status: 500 });
  }
}