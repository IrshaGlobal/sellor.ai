// Analytics system configuration for sellor.ai

// Analytics Settings
class AnalyticsSettings {
  static get() {
    return {
      enabled: process.env.ANALYTICS_ENABLED === 'true',
      trackPageViews: process.env.ANALYTICS_TRACK_PAGE_VIEWS === 'true',
      trackProductViews: process.env.ANALYTICS_TRACK_PRODUCT_VIEWS === 'true',
      trackAddToCart: process.env.ANALYTICS_TRACK_ADD_TO_CART === 'true',
      trackCheckoutInitiated: process.env.ANALYTICS_TRACK_CHECKOUT_INITIATED === 'true',
      trackOrderCompleted: process.env.ANALYTICS_TRACK_ORDER_COMPLETED === 'true'
    };
  }
}

export { AnalyticsSettings };

// Track Events
class AnalyticsTracker {
  static trackEvent(eventName: string, properties?: Record<string, any>) {
    console.log(`[Analytics] Event: ${eventName}`, properties);
    
    // TODO: Implement actual analytics tracking here (e.g., Plausible, Google Analytics, etc.)
  }

  static trackPageView(url: string) {
    this.trackEvent('Page View', { url });
  }

  static trackProductView(productId: string, storeId: string) {
    this.trackEvent('Product View', { productId, storeId });
  }

  static trackAddToCart(productId: string, storeId: string, quantity: number) {
    this.trackEvent('Add to Cart', { productId, storeId, quantity });
  }

  static trackCheckoutInitiated(cartItems: Array<{ productId: string; quantity: number }>, total: number) {
    this.trackEvent('Checkout Initiated', { cartItems, total });
  }

  static trackOrderCompleted(orderId: string, total: number, items: Array<{ productId: string; quantity: number }>) {
    this.trackEvent('Order Completed', { orderId, total, items });
  }
}

export { AnalyticsTracker };