// Cart system configuration for sellor.ai

// Cart Configuration
class CartConfiguration {
  static get() {
    return {
      maxItemsPerCart: parseInt(process.env.CART_MAX_ITEMS || '10', 10),
      maxQuantityPerItem: parseInt(process.env.CART_MAX_QUANTITY_PER_ITEM || '5', 10),
      sessionTimeoutMinutes: parseInt(process.env.CART_SESSION_TIMEOUT_MINUTES || '30', 10)
    };
  }
}

export { CartConfiguration };