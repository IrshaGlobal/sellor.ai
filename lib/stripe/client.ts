import Stripe from 'stripe';

// Initialize Stripe with API key from environment variables
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16',
  maxNetworkRetries: 2,
});

export default stripe;