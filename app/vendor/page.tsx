import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function VendorDashboard() {
  const [storeUrl, setStoreUrl] = useState('');
  const [stats, setStats] = useState({
    totalSales: 0,
    totalOrders: 0
  });

  useEffect(() => {
    // In a real app, this would fetch from an API endpoint
    // For demo purposes, we'll use mock data
    setTimeout(() => {
      setStats({
        totalSales: 2475.50,
        totalOrders: 83
      });
      
      // Get store subdomain from user data (mocked here)
      setStoreUrl('mystore.sellor.ai');
    }, 500);
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Total Sales</h2>
          <p className="text-3xl font-bold">${stats.totalSales.toFixed(2)}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Total Orders</h2>
          <p className="text-3xl font-bold">{stats.totalOrders}</p>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/vendor/products/new" className="bg-black text-white py-3 px-4 rounded-md hover:bg-black/90 transition-colors text-center">
            Add New Product
          </Link>
          <Link href="/vendor/products" className="bg-gray-200 text-gray-800 py-3 px-4 rounded-md hover:bg-gray-300 transition-colors text-center">
            Manage Products
          </Link>
          <Link href={`/store/${storeUrl}`} target="_blank" className="bg-blue-500 text-white py-3 px-4 rounded-md hover:bg-blue-600 transition-colors text-center">
            View Your Store
          </Link>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Getting Started</h2>
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-gray-900">Add your first product</h3>
              <p className="text-sm text-gray-500">Use AI to generate product details from an image.</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-gray-100 flex items-center justify-center mt-0.5">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 8v4l3 3"></path>
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-gray-900">Customize your store</h3>
              <p className="text-sm text-gray-500">Upload your logo and choose your brand colors.</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-gray-100 flex items-center justify-center mt-0.5">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                <rect x="2" y="3" width="20" height="14" rx="2"></rect>
                <path d="M8 21h8M12 17v4"></path>
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-gray-900">Connect payment processing</h3>
              <p className="text-sm text-gray-500">Set up Stripe to start receiving payments.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}