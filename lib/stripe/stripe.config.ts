// Stripe configuration for sellor.ai
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2022-11-15',
  appInfo: { // For metrics.
    name: 'sellor.ai',
    version: '0.1.0'
  }
});

// Connect Account Types
export enum ConnectAccountType {
  Standard = 'standard',
  Express = 'express',
  Custom = 'custom'
}

// Create Connect Account Parameters
class ConnectAccountParams {
  type: ConnectAccountType;
  country: string;
  email: string;
  business_type?: 'individual' | 'company';
  requested_capabilities?: Array<'card_payments' | 'transfers'>;
  
  constructor(data: Partial<ConnectAccountParams>) {
    Object.assign(this, data);
  }
}

// Create Checkout Session Parameters
class CheckoutSessionParams {
  success_url: string;
  cancel_url: string;
  line_items: Array<{ price: string; quantity: number }>; // Price ID and quantity
  mode: 'payment' | 'subscription';
  customer_email?: string;
  metadata?: Record<string, string>;
  
  constructor(data: Partial<CheckoutSessionParams>) {
    Object.assign(this, data);
  }
}

// Create Payment Intent Parameters
class PaymentIntentParams {
  amount: number; // Amount in cents
  currency: string;
  payment_method_types?: Array<'card' | 'ideal' | 'sepa_debit'>;
  customer?: string; // Customer ID
  metadata?: Record<string, string>;
  
  constructor(data: Partial<PaymentIntentParams>) {
    Object.assign(this, data);
  }
}

// Webhook Events
class WebhookEvents {
  static handle(event: Stripe.Event) {
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`);
        break;
      case 'payment_method.attached':
        const paymentMethod = event.data.object as Stripe.PaymentMethod;
        console.log(`PaymentMethod ${paymentMethod.id} was attached to a Customer!`);
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  }
}

export { stripe, ConnectAccountParams, CheckoutSessionParams, PaymentIntentParams, WebhookEvents };