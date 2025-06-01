// app/api/admin/vendors/[vendorId]/deactivate/route.ts
import { NextResponse } from 'next/server';

// TODO: Protect this route for admin access only

export async function PUT(request: Request, { params }: { params: { vendorId: string } }) {
  const { vendorId } = params;
  // In a real app, you'd update the vendor's status in the database.
  console.log(`Attempting to deactivate vendor: ${vendorId}`);

  await new Promise(resolve => setTimeout(resolve, 300)); // Simulate delay

  // Simulate success
  return NextResponse.json({ message: `Vendor ${vendorId} deactivated successfully`, vendorId });
}
