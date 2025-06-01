// app/api/admin/dashboard-stats/route.ts
import { NextResponse } from 'next/server';

// In a real application, you'd also want to protect this API route
// to ensure only authenticated admins can access it.
// This might involve getting the session and checking the user's role.

export async function GET() {
  // Simulate fetching data from a database or other services
  // For now, return mock data similar to what was in the dashboard page
  const mockStats = {
    totalVendors: 130, // Slightly different from original mock to confirm API is hit
    activeVendors: 95,
    newSignupsToday: 7,
    aiProductCreations: 350,
    totalStores: 130,
    successfulOrders: 850,
    recentActivity: [
      { id: '1', message: 'New vendor "Alpha Store" signed up.', timestamp: new Date().toISOString(), type: 'new_vendor' },
      { id: '2', message: 'Vendor "Beta Goods" connected Stripe.', timestamp: new Date(Date.now() - 60000 * 15).toISOString(), type: 'stripe_connected' },
      { id: '3', message: 'Product "Super Gadget" by "Alpha Store" created via AI.', timestamp: new Date(Date.now() - 60000 * 60).toISOString(), type: 'ai_product' },
    ],
    platformOverview: {
      vendorsWithProductsPercentage: 78,
      storesWithCustomDomainsPercentage: 32,
      vendorsUsingAiPercentage: 92,
      activeSubscriptionsPercentage: 73,
      vendorRetentionRatePercentage: 85,
    }
  };

  // Simulate some delay
  await new Promise(resolve => setTimeout(resolve, 500));

  return NextResponse.json(mockStats);
}
