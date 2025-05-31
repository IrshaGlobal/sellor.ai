// Subscription system configuration for sellor.ai

class SubscriptionPlans {
  static BASIC = 'basic';
  static PRO = 'pro';
  static ENTERPRISE = 'enterprise';
}

class PlanFeatures {
  static get(plan: string) {
    switch (plan) {
      case SubscriptionPlans.BASIC:
        return {
          productsLimit: 100,
          storageLimitGB: 5,
          emailSupport: true,
          prioritySupport: false,
          customDomain: false,
          analytics: false
        };
      case SubscriptionPlans.PRO:
        return {
          productsLimit: 1000,
          storageLimitGB: 20,
          emailSupport: true,
          prioritySupport: true,
          customDomain: true,
          analytics: true
        };
      case SubscriptionPlans.ENTERPRISE:
        return {
          productsLimit: null, // Unlimited
          storageLimitGB: null, // Unlimited
          emailSupport: true,
          prioritySupport: true,
          customDomain: true,
          analytics: true
        };
      default:
        throw new Error(`Unknown subscription plan: ${plan}`);
    }
  }
}

export { SubscriptionPlans, PlanFeatures };
