import Link from 'next/link';
import { ReactNode } from 'react';

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-6">
        <h1 className="text-2xl font-bold mb-8">sellor.ai Admin</h1>
        
        <nav className="space-y-2">
          <Link href="/admin" className="block py-2 px-4 rounded hover:bg-gray-800 bg-gray-800">
            Dashboard
          </Link>
          <Link href="/admin/vendors" className="block py-2 px-4 rounded hover:bg-gray-800">
            Vendor Management
          </Link>
          <Link href="/admin/subscriptions" className="block py-2 px-4 rounded hover:bg-gray-800">
            Subscription Management
          </Link>
          <Link href="/admin/analytics" className="block py-2 px-4 rounded hover:bg-gray-800">
            Analytics
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