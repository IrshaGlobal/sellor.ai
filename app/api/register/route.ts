import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const { email, password, storeName } = await request.json();
    
    // Generate subdomain from store name
    const subdomain = storeName
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .substring(0, 63);

    // Check if subdomain is available
    const existingStore = await prisma.store.findUnique({
      where: { subdomain }
    });

    if (existingStore) {
      return NextResponse.json(
        { error: 'Subdomain already exists' },
        { status: 400 }
      );
    }

    // Create vendor user and store
    const [user, store] = await prisma.$transaction([
      prisma.user.create({
        data: {
          email,
          password, // In production, this should be hashed
          name: storeName,
          storeName,
          subdomain,
          role: 'VENDOR'
        }
      }),
      prisma.store.create({
        data: {
          name: storeName,
          subdomain,
          settings: {
            create: {}
          }
        }
      })
    ]);

    // Update user with store ID
    await prisma.user.update({
      where: { id: user.id },
      data: { storeId: store.id }
    });

    return NextResponse.json({ 
      message: 'Store created successfully',
      subdomain,
      email
    });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}