// app/api/admin/subscriptions/route.ts
import { NextResponse } from 'next/server';

// TODO: Protect this route for admin access only

const mockSubscriptions = [
  { id: 'sub_1', vendorId: '1', storeName: 'API Alpha Store', email: 'vendor1.api@example.com', plan: 'Launch Plan', price: 29.00, status: 'Active', paymentStatus: 'Paid', nextPaymentDate: '2023-11-15' },
  { id: 'sub_2', vendorId: '3', storeName: 'API Gamma Outlet', email: 'vendor3.api@example.com', plan: 'Launch Plan', price: 29.00, status: 'Active', paymentStatus: 'Unpaid', nextPaymentDate: '2023-11-13' },
  { id: 'sub_4', vendorId: 'inactive_vendor', storeName: 'API Inactive Test', email: 'inactive.api@example.com', plan: 'Launch Plan', price: 29.00, status: 'Inactive', paymentStatus: 'N/A', nextPaymentDate: 'N/A' },
];

const mockTotalTransactionFeesCollected = 2575.50;

export async function GET() {
  await new Promise(resolve => setTimeout(resolve, 600)); // Simulate delay
  return NextResponse.json({
    subscriptions: mockSubscriptions,
    totalTransactionFeesCollected: mockTotalTransactionFeesCollected,
  });
}
