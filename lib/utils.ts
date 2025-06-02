// Utility functions for sellor.ai

// Format currency amounts
class CurrencyFormatter {
  static format(amount: number, currency = 'USD', locale = 'en-US') {
    return new Intl.NumberFormat(locale, { 
      style: 'currency', 
      currency 
    }).format(amount);
  }
}

// Rate limiter class
class RateLimiter {
  private counters: { [key: string]: { resetTime: number, count: number } } = {};
  
  constructor(private limit: number, private windowMs: number) {}
  
  check(key: string): boolean {
    const now = Date.now();
    if (this.counters[key] && now < this.counters[key].resetTime) {
      if (this.counters[key].count >= this.limit) {
        return false;
      }
      this.counters[key].count++;
      return true;
    }
    this.counters[key] = { resetTime: now + this.windowMs, count: 1 };
    return true;
  }
}

export { 
  CurrencyFormatter,
  RateLimiter
};
