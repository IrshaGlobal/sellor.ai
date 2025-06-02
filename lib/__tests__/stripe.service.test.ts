// Tests for lib/stripe/service.ts
import { stripe } from '@/lib/stripe/client';
import * as stripeService from '@/lib/stripe/service';
import { mockDeep } from 'jest-mock-extended';

// Mock the Stripe client
jest.mock('@/lib/stripe/client', () => ({
  stripe: mockDeep<typeof stripe>(),
}));

describe('Stripe Service', () => {
  const mockedStripe = jest.mocked(stripe);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createCustomer', () => {
    it('should create a customer with provided email and metadata', async () => {
      const testEmail = 'test@example.com';
      const testMetadata = { userId: '123' };

      // Mock Stripe response
      mockedStripe.customers.create.mockResolvedValueOnce({
        id: 'cus_test123',
        email: testEmail,
        metadata: testMetadata,
      } as any);

      const result = await stripeService.createCustomer(testEmail, testMetadata);

      expect(mockedStripe.customers.create).toHaveBeenCalledWith({
        email: testEmail,
        metadata: testMetadata,
      });
      expect(result.id).toBe('cus_test123');
      expect(result.email).toBe(testEmail);
    });

    it('should throw error when customer creation fails', async () => {
      const testError = new Error('Stripe API error');
      mockedStripe.customers.create.mockRejectedValueOnce(testError);

      await expect(stripeService.createCustomer('test@example.com'))
        .rejects.toThrow(testError);
    });
  });

  describe('createVendorAccount', () => {
    it('should create a vendor account and onboarding link', async () => {
      const testVendorId = 'vendor_123';
      const testEmail = 'vendor@example.com';
      const testStoreName = 'Test Store';

      // Mock Stripe responses
      mockedStripe.accounts.create.mockResolvedValueOnce({
        id: 'acct_test123',
        type: 'express',
        country: 'US',
        email: testEmail,
      } as any);

      mockedStripe.accountLinks.create.mockResolvedValueOnce({
        url: 'https://stripe.com/onboard/test123',
      } as any);

      const result = await stripeService.createVendorAccount(testVendorId, testEmail, testStoreName);

      expect(mockedStripe.accounts.create).toHaveBeenCalledWith({
        type: 'express',
        country: 'US',
        email: testEmail,
        metadata: {
          vendorId: testVendorId,
          storeName: testStoreName,
        },
      });

      expect(mockedStripe.accountLinks.create).toHaveBeenCalledWith({
        account: 'acct_test123',
        refresh_url: expect.stringContaining('/vendor/settings?stripe=refresh'),
        return_url: expect.stringContaining('/vendor/settings?stripe=return'),
        type: 'account_onboarding',
      });

      expect(result.accountId).toBe('acct_test123');
      expect(result.onboardingUrl).toBe('https://stripe.com/onboard/test123');
    });

    it('should throw error when account creation fails', async () => {
      const testError = new Error('Stripe API error');
      mockedStripe.accounts.create.mockRejectedValueOnce(testError);

      await expect(stripeService.createVendorAccount('vendor_123', 'test@example.com', 'Test Store'))
        .rejects.toThrow(testError);
    });
  });

  describe('createPlatformSubscription', () => {
    it('should create a subscription with provided customer and price', async () => {
      const testCustomerId = 'cus_test123';
      const testPriceId = 'price_test123';
      const testStoreId = 'store_123';

      // Mock Stripe response
      mockedStripe.subscriptions.create.mockResolvedValueOnce({
        id: 'sub_test123',
        customer: testCustomerId,
        items: {
          data: [{
            price: { id: testPriceId }
          }]
        },
        metadata: {
          storeId: testStoreId
        },
        status: 'active'
      } as any);

      const result = await stripeService.createPlatformSubscription(
        testCustomerId, 
        testPriceId,
        testStoreId
      );

      expect(mockedStripe.subscriptions.create).toHaveBeenCalledWith({
        customer: testCustomerId,
        items: [{ price: testPriceId }],
        metadata: {
          storeId: testStoreId
        },
        expand: ['latest_invoice.payment_intent']
      });
      expect(result.id).toBe('sub_test123');
      expect(result.customer).toBe(testCustomerId);
      expect(result.items.data[0].price.id).toBe(testPriceId);
    });

    it('should throw error when subscription creation fails', async () => {
      const testError = new Error('Stripe API error');
      mockedStripe.subscriptions.create.mockRejectedValueOnce(testError);

      await expect(stripeService.createPlatformSubscription(
        'cus_test123', 
        'price_test123',
        'store_123'
      )).rejects.toThrow(testError);
    });
  });

  describe('handleWebhookEvent', () => {
    it('should handle subscription.created event', async () => {
      const testEvent = {
        type: 'customer.subscription.created',
        data: {
          object: {
            id: 'sub_test123',
            customer: 'cus_test123',
            status: 'active'
          }
        }
      };

      await stripeService.handleWebhookEvent(testEvent as any);

      // Verify any expected side effects or database updates
      // This would depend on the actual implementation in handleWebhookEvent
    });

    it('should handle subscription.updated event', async () => {
      const testEvent = {
        type: 'customer.subscription.updated',
        data: {
          object: {
            id: 'sub_test123',
            customer: 'cus_test123',
            status: 'canceled',
            cancel_at_period_end: true
          }
        }
      };

      await stripeService.handleWebhookEvent(testEvent as any);

      // Verify any expected side effects or database updates
    });

    it('should throw error for unknown event type', async () => {
      const testEvent = {
        type: 'unknown.event.type',
        data: { object: {} }
      };

      await expect(stripeService.handleWebhookEvent(testEvent as any))
        .rejects.toThrow('Unhandled webhook event type: unknown.event.type');
    });
  });

  describe('getOnboardingStatus', () => {
    it('should return onboarding status for completed account', async () => {
      const testAccountId = 'acct_test123';

      // Mock Stripe response
      mockedStripe.accounts.retrieve.mockResolvedValueOnce({
        id: testAccountId,
        details_submitted: true,
        charges_enabled: true,
        payouts_enabled: true
      } as any);

      const result = await stripeService.getOnboardingStatus(testAccountId);

      expect(mockedStripe.accounts.retrieve).toHaveBeenCalledWith(testAccountId);
      expect(result.accountId).toBe(testAccountId);
      expect(result.isCompleted).toBe(true);
      expect(result.detailsSubmitted).toBe(true);
      expect(result.chargesEnabled).toBe(true);
      expect(result.payoutsEnabled).toBe(true);
    });

    it('should return onboarding status for incomplete account', async () => {
      const testAccountId = 'acct_test123';

      // Mock Stripe response
      mockedStripe.accounts.retrieve.mockResolvedValueOnce({
        id: testAccountId,
        details_submitted: false,
        charges_enabled: false,
        payouts_enabled: false
      } as any);

      const result = await stripeService.getOnboardingStatus(testAccountId);

      expect(result.isCompleted).toBe(false);
      expect(result.detailsSubmitted).toBe(false);
      expect(result.chargesEnabled).toBe(false);
      expect(result.payoutsEnabled).toBe(false);
    });

    it('should throw error when account retrieval fails', async () => {
      const testError = new Error('Stripe API error');
      mockedStripe.accounts.retrieve.mockRejectedValueOnce(testError);

      await expect(stripeService.getOnboardingStatus('acct_test123'))
        .rejects.toThrow(testError);
    });
  });

  describe('setupPlatformProducts', () => {
    it('should return existing products if they exist', async () => {
      const testProduct = {
        id: 'prod_test123',
        name: 'Test Product',
        active: true
      };

      const testPrice = {
        id: 'price_test123',
        product: testProduct.id,
        active: true
      };

      // Mock Stripe responses
      mockedStripe.products.list.mockResolvedValueOnce({
        data: [testProduct]
      } as any);

      mockedStripe.prices.list.mockResolvedValueOnce({
        data: [testPrice]
      } as any);

      const result = await stripeService.setupPlatformProducts();

      expect(mockedStripe.products.list).toHaveBeenCalledWith({
        ids: ['prod_platform_launch_plan'],
        limit: 1
      });
      expect(mockedStripe.prices.list).toHaveBeenCalledWith({
        product: testProduct.id,
        limit: 1
      });
      expect(result.product).toEqual(testProduct);
      expect(result.price).toEqual(testPrice);
    });

    it('should create products and prices if they dont exist', async () => {
      const testProduct = {
        id: 'prod_test123',
        name: 'Test Product',
        active: true
      };

      const testPrice = {
        id: 'price_test123',
        product: testProduct.id,
        active: true
      };

      // Mock Stripe responses
      mockedStripe.products.list.mockResolvedValueOnce({
        data: []
      } as any);

      mockedStripe.products.create.mockResolvedValueOnce(testProduct as any);

      mockedStripe.prices.list.mockResolvedValueOnce({
        data: []
      } as any);

      mockedStripe.prices.create.mockResolvedValueOnce(testPrice as any);

      const result = await stripeService.setupPlatformProducts();

      expect(mockedStripe.products.create).toHaveBeenCalled();
      expect(mockedStripe.prices.create).toHaveBeenCalled();
      expect(result.product).toEqual(testProduct);
      expect(result.price).toEqual(testPrice);
    });

    it('should throw error when product setup fails', async () => {
      const testError = new Error('Stripe API error');
      mockedStripe.products.list.mockRejectedValueOnce(testError);

      await expect(stripeService.setupPlatformProducts())
        .rejects.toThrow(testError);
    });
  });
});