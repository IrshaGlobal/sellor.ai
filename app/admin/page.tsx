import { useState, useEffect } from 'react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalVendors: 0,
    activeVendors: 0,
    newSignupsToday: 0,
    aiProductCreations: 0,
    totalStores: 0,
    successfulOrders: 0
  });

  useEffect(() => {
    // In a real app, this would fetch from an admin API endpoint
    // For demo purposes, we'll use mock data
    setTimeout(() => {
      setStats({
        totalVendors: 127,
        activeVendors: 93,
        newSignupsToday: 5,
        aiProductCreations: 342,
        totalStores: 127,
        successfulOrders: 843
      });
    }, 500);
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Total Vendors Card */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-semibold mb-2">Total Vendors</h2>
              <p className="text-3xl font-bold">{stats.totalVendors}</p>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
          </div>
          <div className="mt-4">
            <p className="text-sm text-gray-500">New today: {stats.newSignupsToday}</p>
          </div>
        </div>
        
        {/* Active Vendors Card */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-semibold mb-2">Active Vendors</h2>
              <p className="text-3xl font-bold">{stats.activeVendors}</p>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
              <path d="M12 12h.01"></path>
              <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 1-2 2v14a2 2 0 0 1-2 2z"></path>
              <path d="M9 3v4h6V3"></path>
              <path d="M9 17h6"></path>
              <path d="M12 17v4"></path>
            </svg>
          </div>
          <div className="mt-4">
            <p className="text-sm text-gray-500">Conversion rate: {(stats.activeVendors / stats.totalVendors * 100).toFixed(1)}%</p>
          </div>
        </div>
        
        {/* AI Product Creations Card */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-semibold mb-2">AI Product Creations</h2>
              <p className="text-3xl font-bold">{stats.aiProductCreations}</p>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
              <line x1="8" y1="21" x2="16" y2="21"></line>
              <line x1="12" y1="17" x2="12" y2="21"></line>
              <path d="M2 7h20"></path>
            </svg>
          </div>
          <div className="mt-4">
            <p className="text-sm text-gray-500">Products created using AI</p>
          </div>
        </div>
        
        {/* Total Stores Card */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-semibold mb-2">Total Stores</h2>
              <p className="text-3xl font-bold">{stats.totalStores}</p>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
          </div>
          <div className="mt-4">
            <p className="text-sm text-gray-500">Active storefronts</p>
          </div>
        </div>
        
        {/* Successful Orders Card */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-semibold mb-2">Successful Orders</h2>
              <p className="text-3xl font-bold">{stats.successfulOrders}</p>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.74a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
          </div>
          <div className="mt-4">
            <p className="text-sm text-gray-500">All-time total</p>
          </div>
        </div>
        
        {/* Conversion Rate Card */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-semibold mb-2">Conversion Rate</h2>
              <p className="text-3xl font-bold">{(stats.activeVendors / stats.totalVendors * 100).toFixed(1)}%</p>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
              <path d="M2 12h20M2 7h20M2 17h20"></path>
            </svg>
          </div>
          <div className="mt-4">
            <p className="text-sm text-gray-500">Active vendors vs total vendors</p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <div>
                <p className="font-medium">My Awesome Store has published their first product</p>
                <p className="text-sm text-gray-500">2 minutes ago</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                  <path d="M2 10h20"></path>
                </svg>
              </div>
              <div>
                <p className="font-medium">Fashion Outlet connected their Stripe account</p>
                <p className="text-sm text-gray-500">15 minutes ago</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 14.66V17a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-5.34"></path>
                  <polygon points="16 3 21 8 16 13 16 3"></polygon>
                  <polygon points="8 3 3 8 8 13 8 3"></polygon>
                  <circle cx="12" cy="12" r="10"></circle>
                </svg>
              </div>
              <div>
                <p className="font-medium">Cool Products Co updated their store design</p>
                <p className="text-sm text-gray-500">1 hour ago</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                  <path d="M12 16v-4M12 8h.01"></path>
                </svg>
              </div>
              <div>
                <p className="font-medium">Vendor subscription payment failed: My Awesome Store</p>
                <p className="text-sm text-gray-500">3 hours ago</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Platform Overview */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Platform Overview</h2>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Vendors with products</span>
                <span className="text-sm font-medium">78%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: '78%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Stores with custom domains</span>
                <span className="text-sm font-medium">32%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '32%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Vendors using AI features</span>
                <span className="text-sm font-medium">92%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-purple-500 h-2.5 rounded-full" style={{ width: '92%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Active subscriptions</span>
                <span className="text-sm font-medium">73%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-red-500 h-2.5 rounded-full" style={{ width: '73%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Vendor retention rate</span>
                <span className="text-sm font-medium">85%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-indigo-500 h-2.5 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-4">
              <button className="bg-black text-white py-2 px-4 rounded-md hover:bg-black/90 transition-colors">
                View Vendors
              </button>
              <button className="bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors">
                View Analytics
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}