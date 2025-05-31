// Feature flags system configuration for sellor.ai

class FeatureFlags {
  static isAIProductGenerationEnabled(): boolean {
    return process.env.FEATURE_FLAG_AI_PRODUCT_GENERATION === 'true';
  }

  static isCustomDomainsEnabled(): boolean {
    return process.env.FEATURE_FLAG_CUSTOM_DOMAINS === 'true';
  }

  static isStripeConnectEnabled(): boolean {
    return process.env.FEATURE_FLAG_STRIPE_CONNECT === 'true';
  }

  static isEmailNotificationsEnabled(): boolean {
    return process.env.FEATURE_FLAG_EMAIL_NOTIFICATIONS === 'true';
  }

  static isMultiVendorEnabled(): boolean {
    return process.env.FEATURE_FLAG_MULTI_VENDOR === 'true';
  }

  static isAdminPanelEnabled(): boolean {
    return process.env.FEATURE_FLAG_ADMIN_PANEL === 'true';
  }
}

export { FeatureFlags };