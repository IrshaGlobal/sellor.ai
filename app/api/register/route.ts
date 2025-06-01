import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
// Attempt to import an email sending function (placeholder if not available)
// import { sendEmail } from '@/lib/email/service';

// It's crucial that this JWT_SECRET is stored in environment variables and not hardcoded.
// For this exercise, using a placeholder.
const JWT_SECRET = process.env.JWT_SECRET || 'YOUR_JWT_SECRET_SHOULD_BE_IN_ENV_VARS';

export async function POST(request: NextRequest) {
  try {
    const { email, password, storeName } = await request.json();

    if (!email || !password || !storeName) {
      return NextResponse.json({ error: 'Missing required fields: email, password, storeName' }, { status: 400 });
    }
    
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
    const hashedPassword = await bcrypt.hash(password, 10); // Salt rounds = 10

    // Using a transaction to ensure both user and store are created, or neither.
    const result = await prisma.$transaction(async (tx) => {
      const newUser = await tx.user.create({
        data: {
          email,
          password: hashedPassword,
          name: storeName, // Assuming user's name is the store name initially
          storeName,
          subdomain,
          role: 'VENDOR',
        },
      });

      const newStore = await tx.store.create({
        data: {
          name: storeName,
          subdomain,
          userId: newUser.id, // Link store to the user
          settings: {
            create: {},
          },
        },
      });

      // Update user with storeId (though userId is on store, this maintains original logic if needed elsewhere)
      // This step might be redundant if the primary link is store.userId
      await tx.user.update({
        where: { id: newUser.id },
        data: { storeId: newStore.id }
      });

      return { user: newUser, store: newStore };
    });

    const { user, store } = result;

    // Auth Token Generation (JWT)
    const payload = {
      userId: user.id,
      email: user.email,
      role: user.role,
      storeId: store.id,
      subdomain: store.subdomain,
    };
    const authToken = jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });

    // Welcome Email Sending
    try {
      // Assuming sendEmail function exists in '@/lib/email/service'
      // await sendEmail({
      //   to: user.email,
      //   subject: "Welcome to sellor.ai!",
      //   htmlBody: `<p>Welcome to sellor.ai! Your store <strong>${store.name}</strong> (at ${store.subdomain}.sellor.ai) is ready.</p><p>Login to add products and start selling!</p>`,
      //   // textBody: `Welcome to sellor.ai! Your store ${store.name} (${store.subdomain}.sellor.ai) is ready. Login to add products.`
      // });
      console.log(`TODO: Send welcome email to ${user.email} - Subject: Welcome to sellor.ai! - Body: Your store ${store.name} (${store.subdomain}.sellor.ai) is ready. Login to add products.`);
    } catch (emailError) {
      console.error("Failed to send welcome email:", emailError);
      // Do not fail the registration if email fails, but log it.
    }

    return NextResponse.json({ 
      message: 'Store created successfully',
      subdomain: store.subdomain,
      email: user.email,
      authToken: authToken // Added authToken to the response
    });

  } catch (error: any) {
    console.error('Registration error:', error);
    if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
      return NextResponse.json({ error: 'Email already exists' }, { status: 400 });
    }
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}