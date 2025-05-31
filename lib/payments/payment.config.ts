// Payment system configuration for sellor.ai

// Payment Providers
class PaymentProviders {
  static STRIPE = 'stripe';
  static PAYPAL = 'paypal';
}

// Payment Configuration
class PaymentConfiguration {
  static get(provider: string) {
    switch (provider) {
      case PaymentProviders.STRIPE:
        return {
          apiKey: process.env.STRIPE_API_KEY,
          webhooksSecret: process.env.STRIPE_WEBHOOKS_SECRET,
          enabled: process.env.PAYMENT_STRIPE_ENABLED === 'true'
        };
      case PaymentProviders.PAYPAL:
        return {
          clientId: process.env.PAYPAL_CLIENT_ID,
          clientSecret: process.env.PAYPAL_CLIENT_SECRET,
          enabled: process.env.PAYMENT_PAYPAL_ENABLED === 'true'
        };
      default:
        throw new Error(`Unknown payment provider: ${provider}`);
    }
  }
}

export { PaymentProviders, PaymentConfiguration };