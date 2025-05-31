import { NextRequest, NextResponse } from 'next/server';

// Middleware to handle:
// 1. Authentication (vendor and admin)
// 2. Multi-tenancy based on subdomain or custom domain
// 3. Redirects for unauthenticated users

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const host = request.headers.get('host') || request.headers.get('x-forwarded-host');
  
  // Handle vendor and admin routes
  if (url.pathname.startsWith('/vendor') || url.pathname.startsWith('/admin')) {
    // Check authentication - simplified for example
    const isAuthenticated = checkAuthentication(request);
    
    // If not authenticated, redirect to login
    if (!isAuthenticated && !url.pathname.startsWith('/vendor/login') && !url.pathname.startsWith('/vendor/register')) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    
    // Handle multi-tenancy for vendor storefronts
    if (url.pathname.startsWith('/store')) {
      const subdomain = getSubdomain(host);
      const customDomain = getCustomDomain(host);
      
      // In a real app, we would verify that this store belongs to the current tenant
      // This would involve checking the database for the store with this subdomain or custom domain
      const isValidStore = verifyStoreOwnership(subdomain, customDomain);
      
      // If it's an invalid store, show a 404 or redirect
      if (!isValidStore) {
        return NextResponse.redirect(new URL('/404', request.url));
      }
      
      // For valid stores, continue normally
      return NextResponse.next();
    }
    
    // For authenticated routes, continue normally
    return NextResponse.next();
  }
  
  // For public routes (like the landing page), continue normally
  return NextResponse.next();
}

/**
 * Checks if the user is authenticated
 * @param request - The incoming request
 * @returns boolean indicating authentication status
 */
function checkAuthentication(request: NextRequest): boolean {
  // In a real app, this would check session cookies or tokens
  // For MVP, we'll use a simple cookie-based approach
  const authCookie = request.cookies.get('auth_token');
  return !!authCookie;
}

/**
 * Extracts the subdomain from the host
 * @param host - The host header from the request
 * @returns The subdomain or null if none exists
 */
function getSubdomain(host: string | null): string | null {
  if (!host) return null;
  
  // Remove port number if present
  const hostWithoutPort = host.split(':')[0];
  
  // Split by . to get subdomain parts
  const parts = hostWithoutPort.split('.');
  
  // Check if we're on the main domain (sellor.ai) or a subdomain
  if (parts.length > 2 && parts[parts.length - 2] === 'sellor' && parts[parts.length - 1] === 'ai') {
    // Return the subdomain part (everything except sellor.ai)
    return parts.slice(0, -2).join('.');
  }
  
  // If we're on localhost or development environment
  if (process.env.NODE_ENV !== 'production' && hostWithoutPort.includes('localhost')) {
    const searchParams = new URL(request.url).searchParams;
    return searchParams.get('store') || null;
  }
  
  return null;
}

/**
 * Gets the custom domain from the host
 * @param host - The host header from the request
 * @returns The custom domain or null if none exists
 */
function getCustomDomain(host: string | null): string | null {
  if (!host) return null;
  
  // Remove port number if present
  const hostWithoutPort = host.split(':')[0];
  
  // Check if this is a custom domain by looking up against our database
  // In a real app, we'd query the database for this host
  // Here we're using a mock implementation
  if (hostWithoutPort.endsWith('.sellor.ai') || 
      hostWithoutPort === 'localhost' || 
      hostWithoutPort === 'sellor.ai') {
    return null; // Not a custom domain
  }
  
  // For MVP, assume any host not ending with .sellor.ai is a custom domain
  return hostWithoutPort;
}

/**
 * Verifies ownership of a store by subdomain or custom domain
 * @param subdomain - The subdomain extracted from the request
 * @param customDomain - The custom domain extracted from the request
 * @returns boolean indicating store ownership
 */
function verifyStoreOwnership(subdomain: string | null, customDomain: string | null): boolean {
  // In a real app, this would query the database for a matching store
  // For MVP, we'll use a simple mock implementation
  if (!subdomain && !customDomain) {
    return false;
  }
  
  // In production, this would be a database call
  // For now, we'll just return true for demonstration purposes
  return true;
}

// Apply middleware to all routes except static files and API routes
export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
};