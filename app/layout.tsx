import './globals.css';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import { NextAuthProvider } from '@/components/auth/NextAuthProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'sellor.ai | AI-Powered E-commerce Platform for Small Businesses',
  description: 'Create your online store effortlessly with sellor.ai. Upload product images, and our AI generates descriptions, titles, and tags. Start selling online today!',
  keywords: ['AI e-commerce', 'AI product description generator', 'easy online store', 'multi-vendor platform'],
  viewport: 'width=device-width, initial-scale=1',
  icons: {
    icon: '/favicon.ico',
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
          <div className="min-h-screen flex flex-col">
            {/* Main content */}
            <main className="flex-1">
              {children}
            </main>
            
            {/* TODO: The global footer below was commented out because its conditional display logic (using window.location.pathname) is not Next.js SSR/SSG friendly and conflicts with the specific landing page footer. This can be revisited to implement a global footer with Next.js idiomatic conditional rendering (e.g., using usePathname or different layouts) if needed for other general site pages. */}
            {/* {!window.location.pathname.startsWith('/vendor') &&
             !window.location.pathname.startsWith('/admin') && (
              <footer className="bg-gray-900 text-white mt-12">
                <div className="container mx-auto px-4 py-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                      <h3 className="text-lg font-bold mb-4">sellor.ai</h3>
                      <p className="text-gray-400 mb-4">Launch your online store in minutes with AI power.</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-4">Quick Links</h3>
                      <ul className="space-y-2">
                        <li><a href="#" className="text-gray-400 hover:text-white">How It Works</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-white">Features</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-white">Pricing</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-white">FAQ</a></li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-4">Legal</h3>
                      <ul className="space-y-2">
                        <li><a href="#" className="text-gray-400 hover:text-white">Terms of Service</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-white">Cookie Policy</a></li>
                      </ul>
                    </div>
                  </div>
                  <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                    <p>© {new Date().getFullYear()} sellor.ai. All rights reserved.</p>
                  </div>
                </div>
              </footer>
            )} */}
          </div>
        </NextAuthProvider>
      </body>
    </html>
  );
}