// Vendor system configuration for sellor.ai

// Vendor Settings
class VendorSettings {
  static get() {
    return {
      maxStoresPerVendor: parseInt(process.env.VENDOR_MAX_STORES || '5', 10),
      maxProductsPerStore: parseInt(process.env.VENDOR_MAX_PRODUCTS_PER_STORE || '500', 10),
      subscriptionRequired: process.env.VENDOR_SUBSCRIPTION_REQUIRED === 'true',
      commissionRate: parseFloat(process.env.VENDOR_COMMISSION_RATE || '0.1') // 10%
    };
  }
}

export { VendorSettings };