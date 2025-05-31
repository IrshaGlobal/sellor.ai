// Unit Tests for lib/utils.ts
import { CurrencyFormatter } from '../utils';

describe('CurrencyFormatter', () => {
  describe('format', () => {
    it('formats USD correctly', () => {
      const formatted = CurrencyFormatter.format(1000, 'USD');
      expect(formatted).toBe('$1,000.00');
    });

    it('formats EUR correctly', () => {
      const formatted = CurrencyFormatter.format(1000, 'EUR', 'de-DE');
      expect(formatted).toBe('1.000,00 €');
    });

    it('handles zero amount', () => {
      const formatted = CurrencyFormatter.format(0, 'USD');
      expect(formatted).toBe('$0.00');
    });

    it('handles negative amounts', () => {
      const formatted = CurrencyFormatter.format(-500, 'USD');
      expect(formatted).toBe('-$500.00');
    });
  });
});