import { useState, useEffect } from 'react';
import Link from 'next/link'; // Added Link import

// Helper to format date/time for recent activity
const formatTimestamp = (isoString: string) => {
  const date = new Date(isoString);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ', ' + date.toLocaleDateString();
};


export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalVendors: 0,
    activeVendors: 0,
    newSignupsToday: 0,
    aiProductCreations: 0,
    totalStores: 0,
    successfulOrders: 0,
    recentActivity: [] as Array<{id: string, message: string, timestamp: string, type: string}>, // Ensure recentActivity is typed
    platformOverview: {
      vendorsWithProductsPercentage: 0,
      storesWithCustomDomainsPercentage: 0,
      vendorsUsingAiPercentage: 0,
      activeSubscriptionsPercentage: 0,
      vendorRetentionRatePercentage: 0,
    }
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // Typed error state

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    fetch('/api/admin/dashboard-stats')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch dashboard stats. Status: ' + response.status);
        }
        return response.json();
      })
      .then(data => {
        setStats(data);
      })
      .catch(err => {
        console.error("Error fetching dashboard stats:", err);
        setError(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen"><p className="text-xl">Loading dashboard...</p></div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen"><p className="text-xl text-red-500">Error loading dashboard: {error}</p></div>;
  }

  // Fallback if stats are not loaded for some reason, though covered by isLoading/error
  if (!stats) {
    return <div className="flex justify-center items-center h-screen"><p className="text-xl">No dashboard data available.</p></div>;
  }

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
        
        {/* Conversion Rate Card - Assuming this is for vendor activation */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-semibold mb-2">Vendor Activation</h2>
              <p className="text-3xl font-bold">{(stats.activeVendors / stats.totalVendors * 100).toFixed(1)}%</p>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
               <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
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
          {stats.recentActivity && stats.recentActivity.length > 0 ? (
            <div className="space-y-4">
              {stats.recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${
                    activity.type === 'new_vendor' ? 'bg-green-100 text-green-600' :
                    activity.type === 'stripe_connected' ? 'bg-blue-100 text-blue-600' :
                    activity.type === 'ai_product' ? 'bg-purple-100 text-purple-600' :
                    'bg-gray-100 text-gray-600' // Default
                  }`}>
                    {/* Simple icon based on type */}
                    {activity.type === 'new_vendor' && <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle></svg>}
                    {activity.type === 'stripe_connected' && <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"></rect><path d="M2 10h20"></path></svg>}
                    {activity.type === 'ai_product' && <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg>}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{activity.message}</p>
                    <p className="text-xs text-gray-500">{formatTimestamp(activity.timestamp)}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">No recent activity to display.</p>
          )}
        </div>
        
        {/* Platform Overview */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Platform Overview</h2>
          
          {stats.platformOverview && Object.keys(stats.platformOverview).length > 0 ? (
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Vendors with products</span>
                  <span className="text-sm font-medium">{stats.platformOverview.vendorsWithProductsPercentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: `${stats.platformOverview.vendorsWithProductsPercentage}%` }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Stores with custom domains</span>
                  <span className="text-sm font-medium">{stats.platformOverview.storesWithCustomDomainsPercentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${stats.platformOverview.storesWithCustomDomainsPercentage}%` }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Vendors using AI features</span>
                  <span className="text-sm font-medium">{stats.platformOverview.vendorsUsingAiPercentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-purple-500 h-2.5 rounded-full" style={{ width: `${stats.platformOverview.vendorsUsingAiPercentage}%` }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Active subscriptions</span>
                  <span className="text-sm font-medium">{stats.platformOverview.activeSubscriptionsPercentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-red-500 h-2.5 rounded-full" style={{ width: `${stats.platformOverview.activeSubscriptionsPercentage}%` }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Vendor retention rate</span>
                  <span className="text-sm font-medium">{stats.platformOverview.vendorRetentionRatePercentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-indigo-500 h-2.5 rounded-full" style={{ width: `${stats.platformOverview.vendorRetentionRatePercentage}%` }}></div>
                </div>
              </div>
            </div>
          ) : (
             <p className="text-sm text-gray-500">No platform overview data available.</p>
          )}
          
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Quick Actions</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link href="/admin/vendors" legacyBehavior>
                <a className="block w-full bg-black text-white text-center py-2 px-4 rounded-md hover:bg-black/90 transition-colors">
                  View Vendors
                </a>
              </Link>
              <Link href="/admin/analytics" legacyBehavior>
                <a className="block w-full bg-gray-200 text-gray-800 text-center py-2 px-4 rounded-md hover:bg-gray-300 transition-colors">
                  View Analytics
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}