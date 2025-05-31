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

// Generate random strings
class RandomStringGenerator {
  static generate(length = 8) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }
}

// Slugify text
class TextSlugifier {
  static slugify(text: string) {
    return text
      .toString()
      .toLowerCase()
      .replace(/\s+/g, '-')           // Replace spaces with -
      .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
      .replace(/[^\w\-]+/g, '')       // Remove non-word chars
      .replace(/\-\-+/g, '-')         // Replace multiple - with single -
      .replace(/^-+/, '')             // Trim - from start of text
      .replace(/-+$/, '');            // Trim - from end of text
  }
}

// Debounce function
class Debouncer {
  static debounce(func: Function, wait = 200) {
    let timeout: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
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
  RandomStringGenerator,
  TextSlugifier,
  Debouncer,
  RateLimiter
};
