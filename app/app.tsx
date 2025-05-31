'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { NextAuthProvider } from '@/components/auth/NextAuthProvider';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { Toaster } from '@/components/ui/toaster';

interface AppProps {
  children: React.ReactNode;
}

export default function App({ children }: AppProps) {
  const pathname = usePathname();
  
  // Handle any global initialization needed for the app
  useEffect(() => {
    // Initialize analytics, logging, etc.
    console.log('sellor.ai app initialized');
    
    // In a real app, you would track page views here
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
      // Add analytics tracking code here
    }
  }, []);
  
  return (
    <NextAuthProvider>
      <ThemeProvider attribute="class" defaultTheme="light">
        <div className="min-h-screen bg-white text-black">
          {children}
          <Toaster />
        </div>
      </ThemeProvider>
    </NextAuthProvider>
  );
}