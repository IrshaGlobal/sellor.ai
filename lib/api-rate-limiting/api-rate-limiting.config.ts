// API rate limiting system configuration for sellor.ai
import { RateLimiter } from '@/lib/utils';

// Rate Limit Settings
class RateLimitSettings {
  static get() {
    return {
      enabled: process.env.API_RATE_LIMITING_ENABLED === 'true',
      defaultMaxRequestsPerMinute: parseInt(process.env.API_RATE_LIMITING_DEFAULT_MAX_REQUESTS_PER_MINUTE || '60', 10),
      loginMaxAttempts: parseInt(process.env.API_RATE_LIMITING_LOGIN_MAX_ATTEMPTS || '5', 10),
      loginWindowMinutes: parseInt(process.env.API_RATE_LIMITING_LOGIN_WINDOW_MINUTES || '15', 10)
    };
  }
}

export { RateLimitSettings };

// API Rate Limiter
class ApiRateLimiter {
  private limiter: RateLimiter;
  
  constructor() {
    this.limiter = new RateLimiter(
      parseInt(process.env.API_RATE_LIMIT_MAX || '1000', 10),
      parseInt(process.env.API_RATE_LIMIT_WINDOW_MS || '60000', 10) // 1 minute
    );
  }
  
  check(ip: string): boolean {
    return this.limiter.check(ip);
  }
}

export { ApiRateLimiter };