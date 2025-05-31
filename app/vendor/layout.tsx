import Link from 'next/link';
import { ReactNode } from 'react';

interface VendorLayoutProps {
  children: ReactNode;
}

export default function VendorLayout({ children }: VendorLayoutProps) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-6">
        <h1 className="text-2xl font-bold mb-8">sellor.ai</h1>
        
        <nav className="space-y-2">
          <Link href="/vendor" className="block py-2 px-4 rounded hover:bg-gray-800 bg-gray-800">
            Dashboard
          </Link>
          <Link href="/vendor/products" className="block py-2 px-4 rounded hover:bg-gray-800">
            Products
          </Link>
          <Link href="/vendor/orders" className="block py-2 px-4 rounded hover:bg-gray-800">
            Orders
          </Link>
          <Link href="/vendor/settings" className="block py-2 px-4 rounded hover:bg-gray-800">
            Store Settings
          </Link>
        </nav>
      </aside>
      
      {/* Main content */}
      <main className="flex-1 p-6 bg-gray-50">
        {children}
      </main>
    </div>
  );
}