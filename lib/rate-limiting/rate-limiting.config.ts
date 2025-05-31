// Rate limiting system configuration for sellor.ai
import { RateLimiter } from '@/lib/utils';

// Authentication Rate Limiter
class AuthRateLimiter {
  private limiter: RateLimiter;
  
  constructor() {
    this.limiter = new RateLimiter(
      parseInt(process.env.AUTH_RATE_LIMIT_MAX || '100', 10),
      parseInt(process.env.AUTH_RATE_LIMIT_WINDOW_MS || '900000', 10) // 15 minutes
    );
  }
  
  check(ip: string): boolean {
    return this.limiter.check(ip);
  }
}

// AI Generation Rate Limiter
class AIGenerationRateLimiter {
  private limiter: RateLimiter;
  
  constructor() {
    this.limiter = new RateLimiter(
      parseInt(process.env.AI_GENERATION_RATE_LIMIT_MAX || '50', 10),
      parseInt(process.env.AI_GENERATION_RATE_LIMIT_WINDOW_MS || '3600000', 10) // 1 hour
    );
  }
  
  check(vendorId: string): boolean {
    return this.limiter.check(vendorId);
  }
}

export { AuthRateLimiter, AIGenerationRateLimiter };