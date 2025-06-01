import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { stripe } from '@/lib/stripe/client';
import Stripe from 'stripe';

// Define a type for the expected request body
interface CartItem {
  id: string;
  name: string;
  price: number; // Price in a major currency unit (e.g., dollars)
  quantity: number;
}

interface CustomerDetails {
  email: string;
  name?: string;
  // Add shipping address fields if needed by your application
}

interface CreatePaymentIntentRequestBody {
  cartDetails: CartItem[];
  customerDetails: CustomerDetails;
  // orderId: string; // Consider passing an order ID generated client-side or generate one server-side
}

// Platform transaction fee percentage (e.g., 2%)
const PLATFORM_TRANSACTION_FEE_PERCENT = parseFloat(process.env.PLATFORM_TRANSACTION_FEE_PERCENT || "2.0");

export async function POST(
  request: NextRequest,
  { params }: { params: { storeId: string } }
) {
  const { storeId } = params;

  if (!storeId) {
    return NextResponse.json({ error: 'Store ID is required.' }, { status: 400 });
  }

  let requestBody: CreatePaymentIntentRequestBody;
  try {
    requestBody = await request.json();
  } catch (error) {
    console.error('Error parsing request body:', error);
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const { cartDetails, customerDetails } = requestBody;

  if (!cartDetails || !Array.isArray(cartDetails) || cartDetails.length === 0) {
    return NextResponse.json({ error: 'Cart details are missing or empty.' }, { status: 400 });
  }
  if (!customerDetails || !customerDetails.email) {
    return NextResponse.json({ error: 'Customer details (especially email) are required.' }, { status: 400 });
  }

  try {
    // 1. Retrieve StoreSettings to get the vendor's Stripe Account ID
    const storeSettings = await prisma.storeSettings.findUnique({
      where: { storeId: storeId },
    });

    if (!storeSettings || !storeSettings.stripeAccountId) {
      console.error(`Stripe account ID not found for store: ${storeId}`);
      return NextResponse.json({ error: 'Vendor Stripe account not configured.' }, { status: 404 });
    }
    const vendorStripeAccountId = storeSettings.stripeAccountId;

    // 2. Calculate Order Total (in cents)
    // For MVP, we trust client-sent prices. For production, fetch prices from DB.
    let orderTotalInCents = 0;
    for (const item of cartDetails) {
      if (typeof item.price !== 'number' || typeof item.quantity !== 'number' || item.price < 0 || item.quantity <= 0) {
        return NextResponse.json({ error: `Invalid price or quantity for item: ${item.name}` }, { status: 400 });
      }
      // Convert price to cents (e.g., $10.50 -> 1050 cents)
      orderTotalInCents += Math.round(item.price * 100) * item.quantity;
    }

    if (orderTotalInCents <= 0) {
        return NextResponse.json({ error: 'Order total must be greater than zero.' }, { status: 400 });
    }

    // Minimum amount for Stripe transactions (e.g., $0.50 USD)
    const minAmount = 50; // 50 cents
    if (orderTotalInCents < minAmount) {
        return NextResponse.json({ error: `Order total must be at least ${minAmount/100} USD.` }, { status: 400 });
    }


    // 3. Define Application Fee (in cents)
    const applicationFeeAmount = Math.round(orderTotalInCents * (PLATFORM_TRANSACTION_FEE_PERCENT / 100));

    // Ensure application fee is not more than the total, and not less than Stripe's minimum (if applicable, though usually for the main charge)
    if (applicationFeeAmount >= orderTotalInCents) {
        // This scenario means the platform fee consumes the entire transaction or more.
        // This might be an edge case for very low value transactions or high platform fees.
        // Decide how to handle: either error out or cap the fee.
        // For now, let's log and potentially error if it's problematic.
        console.warn(`Application fee (${applicationFeeAmount}) is high relative to order total (${orderTotalInCents}) for store ${storeId}.`);
        // If the fee is the entire amount, Stripe might not allow it with transfer_data.destination.
        // A common practice is to ensure there's some amount left for the destination.
        if (applicationFeeAmount >= orderTotalInCents) {
             return NextResponse.json({ error: 'Application fee cannot be equal to or exceed order total.' }, { status: 400 });
        }
    }


    // 4. Create Stripe PaymentIntent
    const paymentIntentParams: Stripe.PaymentIntentCreateParams = {
      amount: orderTotalInCents,
      currency: 'usd', // Or make this configurable
      automatic_payment_methods: { enabled: true },
      application_fee_amount: applicationFeeAmount,
      transfer_data: {
        destination: vendorStripeAccountId,
      },
      metadata: {
        // order_id: orderId, // If you have an order ID
        store_id: storeId,
        customer_email: customerDetails.email,
        // Add other useful metadata like stringified cartDetails if small, or customer name
        customer_name: customerDetails.name || '',
      },
    };

    // Add customer to Payment Intent if you want to save card for future use or track customer in Stripe
    // This usually involves creating a Stripe Customer object first if one doesn't exist.
    // For simplicity, we're not creating a Stripe Customer object here for guest checkouts.
    // If you have registered users and want to link payments:
    // paymentIntentParams.customer = stripeCustomerId; // (if you have one)


    const paymentIntent = await stripe.paymentIntents.create(paymentIntentParams);

    // 5. Return Response
    return NextResponse.json({ clientSecret: paymentIntent.client_secret });

  } catch (error: any) {
    console.error(`Error creating payment intent for store ${storeId}:`, error);
    // Check for specific Stripe errors
    if (error.type && error.type.startsWith('Stripe')) {
      return NextResponse.json({ error: error.message, type: error.type }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to create payment intent.' }, { status: 500 });
  }
}
