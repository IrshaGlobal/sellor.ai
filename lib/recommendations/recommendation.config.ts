// Recommendation system configuration for sellor.ai

// Recommendation Providers
class RecommendationProviders {
  static INTERNAL = 'internal';
}

// Recommendation Configuration
class RecommendationConfiguration {
  static get(provider: string) {
    switch (provider) {
      case RecommendationProviders.INTERNAL:
        return {
          enabled: process.env.RECOMMENDATION_INTERNAL_ENABLED === 'true',
          maxRecommendationsPerUser: parseInt(process.env.RECOMMENDATION_MAX_PER_USER || '10', 10),
          minPurchasesForRecommendation: parseInt(process.env.RECOMMENDATION_MIN_PURCHASES || '3', 10)
        };
      default:
        throw new Error(`Unknown recommendation provider: ${provider}`);
    }
  }
}

export { RecommendationProviders, RecommendationConfiguration };