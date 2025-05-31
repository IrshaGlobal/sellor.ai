// Search system configuration for sellor.ai

// Search Providers
class SearchProviders {
  static ALGOLIA = 'algolia';
}

// Search Configuration
class SearchConfiguration {
  static get(provider: string) {
    switch (provider) {
      case SearchProviders.ALGOLIA:
        return {
          appId: process.env.ALGOLIA_APP_ID,
          apiKey: process.env.ALGOLIA_API_KEY,
          indexName: process.env.ALGOLIA_INDEX_NAME || 'products',
          enabled: process.env.SEARCH_ALGOLIA_ENABLED === 'true'
        };
      default:
        throw new Error(`Unknown search provider: ${provider}`);
    }
  }
}

export { SearchProviders, SearchConfiguration };