import { stripe } from '@/lib/stripe/client';
import type {
  StripeProduct,
  StripePrice,
  StripeCustomer,
  StripeSubscription,
  StripeAccount
} from '@/types/stripe';

// Define types for our specific use cases
interface PlatformProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  features: string[];
}

interface VendorSubscription {
  vendorId: string;
  storeName: string;
  subscriptionId: string;
  status: 'active' | 'inactive' | 'past_due' | 'canceled';
  currentPeriodEnd: number;
  cancelAtPeriodEnd: boolean;
}

/**
 * Creates a customer in Stripe for a vendor or end-customer
 * @param email - Customer's email address
 * @param metadata - Optional metadata to associate with the customer
 * @returns The created Stripe customer
 */
export async function createCustomer(email: string, metadata: Record<string, string> = {}) {
  try {
    const customer = await stripe.customers.create({
      email,
      metadata,
    });
    
    return customer;
  } catch (error) {
    console.error('Error creating Stripe customer:', error);
    throw error;
  }
}

/**
 * Creates a Stripe Connect account for a vendor
 * @param vendorId - Our internal vendor ID
 * @param email - Vendor's email address
 * @param storeName - Name of the vendor's store
 * @returns The created Stripe account
 */
export async function createVendorAccount(vendorId: string, email: string, storeName: string) {
  try {
    const account = await stripe.accounts.create({
      type: 'express',
      country: 'US', // Should be configurable based on vendor location
      email,
      metadata: {
        vendorId,
        storeName,
      },
    });
    
    // Create an account link for onboarding
    const accountLink = await stripe.accountLinks.create({
      account: account.id,
      refresh_url: `${process.env.NEXT_PUBLIC_APP_URL}/vendor/settings?stripe=refresh`,
      return_url: `${process.env.NEXT_PUBLIC_APP_URL}/vendor/settings?stripe=return`,
      type: 'account_onboarding',
    });
    
    return {
      accountId: account.id,
      onboardingUrl: accountLink.url,
    };
  } catch (error) {
    console.error('Error creating Stripe vendor account:', error);
    throw error;
  }
}

/**
 * Gets the onboarding status for a vendor's Stripe account
 * @param accountId - Stripe account ID
 * @returns Onboarding status information
 */
export async function getOnboardingStatus(accountId: string) {
  try {
    const account = await stripe.accounts.retrieve(accountId);
    
    return {
      accountId,
      isCompleted: account.details_submitted && account.charges_enabled,
      detailsSubmitted: account.details_submitted,
      chargesEnabled: account.charges_enabled,
      payoutsEnabled: account.payouts_enabled,
    };
  } catch (error) {
    console.error('Error getting onboarding status:', error);
    throw error;
  }
}

/**
 * Creates the platform's subscription product and pricing in Stripe
 * This is for charging vendors for using the platform
 */
export async function setupPlatformProducts() {
  try {
    // Check if we already have the product
    let product = await stripe.products.list({
      ids: ['prod_platform_launch_plan'],
      limit: 1,
    });
    
    if (!product.data.length) {
      // Create the product if it doesn't exist
      product = {
        data: [
          await stripe.products.create({
            id: 'prod_platform_launch_plan',
            name: 'Launch Plan',
            description: 'AI-powered e-commerce store',
            metadata: {
              tier: 'platform',
              plan_type: 'subscription',
              ai_products: 'true',
              unlimited_products: 'true',
              staff_accounts: '1',
              theme: 'standard',
              custom_domain: 'true',
              secure_checkout: 'true',
              transaction_fee: '2.00'
            }
          })
        ]
      };
    }
    
    // Check if we have the price
    let price = await stripe.prices.list({
      product: product.data[0].id,
      limit: 1,
    });
    
    if (!price.data.length) {
      // Create the price if it doesn't exist
      price = {
        data: [
          await stripe.prices.create({
            product: product.data[0].id,
            unit_amount: 2900, // $29/month
            currency: 'usd',
            recurring: {
              interval: 'month'
            },
            metadata: {
              transaction_fee: '2.00'
            }
          })
        ]
      };
    }
    
    return {
      product: product.data[0],
      price: price.data[0]
    };
  } catch (error) {
    console.error('Error setting up platform products:', error);
    throw error;
  }
}

/**
 * Creates a subscription for a vendor to our platform
 * @param customerId - Stripe customer ID
 * @param priceId - Price ID for the subscription
 * @param vendorId - Our internal vendor ID for metadata
 * @returns The created subscription
 */
export async function createPlatformSubscription(customerId: string, priceId: string, vendorId: string) {
  try {
    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: priceId }],
      metadata: {
        vendor_id: vendorId
      },
      expand: ['latest_invoice.payment_intent']
    });
    
    return subscription;
  } catch (error) {
    console.error('Error creating platform subscription:', error);
    throw error;
  }
}

/**
 * Updates a vendor's subscription
 * @param subscriptionId - Stripe subscription ID
 * @param cancelAtPeriodEnd - Whether to cancel at period end
 * @returns The updated subscription
 */
export async function updatePlatformSubscription(subscriptionId: string, cancelAtPeriodEnd: boolean) {
  try {
    const subscription = await stripe.subscriptions.update(
      subscriptionId,
      { cancel_at_period_end: cancelAtPeriodEnd }
    );
    
    return subscription;
  } catch (error) {
    console.error('Error updating platform subscription:', error);
    throw error;
  }
}

/**
 * Handles a Stripe webhook event
 * @param event - The Stripe webhook event
 * @returns void
 */
export async function handleWebhookEvent(event: any) {
  try {
    switch (event.type) {
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
      case 'customer.subscription.deleted': {
        const subscription = event.data.object as StripeSubscription;
        // Update our database with subscription status
        // This would typically call our own API to update vendor subscription status
        console.log('Subscription event:', {
          type: event.type,
          subscriptionId: subscription.id,
          vendorId: subscription.metadata.vendor_id
        });
        break;
      }
      
      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object;
        // Handle successful payment
        console.log('Payment succeeded:', paymentIntent);
        break;
      }
      
      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object;
        // Handle failed payment
        console.log('Payment failed:', paymentIntent);
        break;
      }
      
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  } catch (error) {
    console.error('Error handling webhook event:', error);
    throw error;
  }
}

/**
 * Gets subscription info for a vendor
 * @param subscriptionId - Stripe subscription ID
 * @returns Vendor subscription info
 */
export async function getVendorSubscriptionInfo(subscriptionId: string) {
  try {
    const subscription = await stripe.subscriptions.retrieve(
      subscriptionId,
      { expand: ['items', 'customer', 'latest_invoice.payment_intent'] }
    );
    
    // Get the product and price info
    const price = await stripe.prices.retrieve(subscription.items.data[0].price.id, {
      expand: ['product']
    });
    
    const vendorSubscription: VendorSubscription = {
      vendorId: subscription.metadata.vendor_id,
      storeName: (subscription.customer as StripeCustomer).email || 'Unknown Store',
      subscriptionId: subscription.id,
      status: subscription.status as 'active' | 'inactive' | 'past_due' | 'canceled',
      currentPeriodEnd: subscription.current_period_end,
      cancelAtPeriodEnd: subscription.cancel_at_period_end
    };
    
    return vendorSubscription;
  } catch (error) {
    console.error('Error getting vendor subscription info:', error);
    throw error;
  }
}

/**
 * Creates a checkout session for a vendor to pay for their subscription
 * @param vendorId - Our internal vendor ID
 * @param subscriptionId - Stripe subscription ID
 * @param returnUrl - Where to redirect after checkout
 * @returns Checkout session URL
 */
export async function createCheckoutSession(vendorId: string, subscriptionId: string, returnUrl: string) {
  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{
        price: process.env.STRIPE_PLATFORM_PRICE_ID,
        quantity: 1,
      }],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/admin/subscriptions?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/admin/subscriptions?cancel=true`,
      metadata: {
        vendor_id: vendorId,
        subscription_id: subscriptionId
      },
      billing_address_collection: 'auto',
    });
    
    return session.url;
  } catch (error) {
    console.error('Error creating checkout session:', error);
    throw error;
  }
}

/**
 * Creates a portal session for managing subscription
 * @param subscriptionId - Stripe subscription ID
 * @param returnUrl - Where to redirect after portal
 * @returns Portal session URL
 */
export async function createPortalSession(subscriptionId: string, returnUrl: string) {
  try {
    const session = await stripe.billingPortal.sessions.create({
      customer: subscriptionId,
      return_url: returnUrl,
    });
    
    return session.url;
  } catch (error) {
    console.error('Error creating portal session:', error);
    throw error;
  }
}