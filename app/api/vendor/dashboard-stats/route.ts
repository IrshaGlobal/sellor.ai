// app/api/vendor/dashboard-stats/route.ts
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken'; // Assuming jsonwebtoken is available for token decoding

// Placeholder for your actual JWT secret - should be in environment variables
const JWT_SECRET = process.env.JWT_SECRET || 'YOUR_JWT_SECRET_SHOULD_BE_IN_ENV_VARS';

interface DecodedToken {
  subdomain?: string;
  storeId?: string;
  userId?: string;
  // Add other fields you expect in your JWT payload
}

export async function GET(request: NextRequest) {
  const tokenCookie = request.cookies.get('auth_token');

  if (!tokenCookie) {
    return NextResponse.json({ error: 'Authentication required. No auth_token cookie found.' }, { status: 401 });
  }

  try {
    // In a real app, you'd verify the token and extract vendor/store ID
    // For this placeholder, we'll decode it to simulate getting some vendor-specific context
    // This assumes the auth_token stored is a JWT signed with JWT_SECRET
    const decodedToken = jwt.verify(tokenCookie.value, JWT_SECRET) as DecodedToken;

    // Use decoded subdomain or a default mock if not present in token for this placeholder
    // In a real app, storeId or userId from decodedToken would be used to fetch actual data.
    const storeSubdomain = decodedToken.subdomain || 'your-store'; // Default if not in token

    const mockData = {
      totalSales: Math.floor(Math.random() * 10000) + 1000, // Random sales for mock
      totalOrders: Math.floor(Math.random() * 200) + 50,    // Random orders
      storeUrl: `${storeSubdomain}.sellor.ai`,
      storeId: decodedToken.storeId || 'N/A', // Include storeId if available
      userId: decodedToken.userId || 'N/A',   // Include userId if available
    };

    await new Promise(resolve => setTimeout(resolve, 450)); // Simulate delay
    return NextResponse.json(mockData);

  } catch (error: any) {
    // If token verification fails (e.g., invalid token, expired)
    console.error("Auth token verification failed:", error.name, error.message);
    let errorMessage = 'Invalid or expired token.';
    if (error.name === 'TokenExpiredError') {
      errorMessage = 'Token expired. Please log in again.';
    } else if (error.name === 'JsonWebTokenError') {
      errorMessage = 'Invalid token.';
    }
    return NextResponse.json({ error: errorMessage }, { status: 401 });
  }
}
