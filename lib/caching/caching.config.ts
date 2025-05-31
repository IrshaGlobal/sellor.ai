// Caching system configuration for sellor.ai

// Cache Keys
class CacheKeys {
  static PRODUCTS = 'products';
  static STORES = 'stores';
  static CATEGORIES = 'categories';
}

// Cache Settings
class CacheSettings {
  static get() {
    return {
      enabled: process.env.CACHE_ENABLED === 'true',
      defaultTTL: parseInt(process.env.CACHE_DEFAULT_TTL || '3600', 10), // 1 hour
      keys: [
        CacheKeys.PRODUCTS,
        CacheKeys.STORES,
        CacheKeys.CATEGORIES
      ]
    };
  }
}

export { CacheKeys, CacheSettings };