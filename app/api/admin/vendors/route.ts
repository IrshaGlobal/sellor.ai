// app/api/admin/vendors/route.ts
import { NextResponse } from 'next/server';

// TODO: Protect this route for admin access only

const mockVendors = [
  { id: '1', storeName: 'API Alpha Store', email: 'vendor1.api@example.com', subscriptionStatus: 'Active', dateJoined: '2023-10-01' },
  { id: '2', storeName: 'API Beta Goods', email: 'vendor2.api@example.com', subscriptionStatus: 'Inactive', dateJoined: '2023-10-05' },
  { id: '3', storeName: 'API Gamma Outlet', email: 'vendor3.api@example.com', subscriptionStatus: 'Active', dateJoined: '2023-10-10' },
];

export async function GET() {
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate delay
  return NextResponse.json(mockVendors);
}
