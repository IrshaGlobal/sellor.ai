import Link from 'next/link'; // Added import
import { useState, useEffect, FormEvent, useMemo } from 'react';

interface Subscription {
  id: string;
  vendorId: string;
  storeName: string;
  email: string;
  plan: string;
  price: number;
  status: string;
  paymentStatus: string;
  nextPaymentDate: string;
}

interface SubscriptionData {
  subscriptions: Subscription[];
  totalTransactionFeesCollected: number;
}

export default function AdminSubscriptions() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [totalTransactionFeesCollected, setTotalTransactionFeesCollected] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Form states
  const [vendorIdentifier, setVendorIdentifier] = useState('');
  const [selectedPlan, setSelectedPlan] = useState('Launch Plan - $29/month + 2% transaction fee'); // Default to first option
  const [actionFeedback, setActionFeedback] = useState({ type: '', message: '' });

  // Sorting and Pagination state
  const [sortConfig, setSortConfig] = useState<{ key: keyof Subscription | null; direction: 'ascending' | 'descending' }>({ key: 'storeName', direction: 'ascending' });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const fetchSubscriptionData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/admin/subscriptions');
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Failed to fetch subscription data' }));
        throw new Error(errorData.message || 'Failed to fetch subscription data');
      }
      const data: SubscriptionData = await response.json();
      setSubscriptions(data.subscriptions);
      setTotalTransactionFeesCollected(data.totalTransactionFeesCollected);
    } catch (err: any) {
      setError(err.message);
      console.error("Error fetching subscription data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscriptionData();
  }, []);

  const clearActionFeedback = () => {
    setTimeout(() => setActionFeedback({ type: '', message: '' }), 4000);
  };

  const handleUpdateSubscription = async (event: FormEvent) => {
    event.preventDefault();
    setActionFeedback({ type: '', message: '' });

    if (!vendorIdentifier.trim()) {
      setActionFeedback({ type: 'error', message: 'Vendor ID or Store Name is required.' });
      clearActionFeedback();
      return;
    }

    // For this placeholder, we directly use vendorIdentifier as vendorId.
    // In a real app, you might need to search for vendorId based on store name/email.
    const vendorIdToUpdate = vendorIdentifier.trim();
    const planDetails = selectedPlan.split(' - '); // e.g., "Launch Plan", "$29/month + 2% transaction fee"
    const planName = planDetails[0];


    try {
      const response = await fetch(`/api/admin/vendors/${vendorIdToUpdate}/subscription`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newPlanId: planName, newPlanName: planName }), // API expects newPlanId or newPlanName
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to update subscription');
      }
      setActionFeedback({ type: 'success', message: data.message || 'Subscription updated successfully!' });
      setVendorIdentifier(''); // Clear input
      fetchSubscriptionData(); // Re-fetch to see changes
    } catch (err: any) {
      setActionFeedback({ type: 'error', message: err.message || 'Failed to update subscription.' });
      console.error("Error updating subscription:", err);
    }
    clearActionFeedback();
  };

  const handleViewDetails = (vendorId: string) => {
    console.log("View details for vendor subscription (Vendor ID):", vendorId);
    setActionFeedback({ type: 'info', message: `Details for vendor ${vendorId}'s subscription would be shown here.` });
    clearActionFeedback();
  };

  const handleManagePayment = (vendorId: string) => {
    console.log("Manage payment for vendor subscription (Vendor ID):", vendorId);
    setActionFeedback({ type: 'info', message: `Payment management for vendor ${vendorId} would be handled here.` });
    clearActionFeedback();
  };

  // Memoized sorted subscriptions
  const sortedSubscriptions = useMemo(() => {
    if (!subscriptions) return [];
    let sortableItems = [...subscriptions];
    if (sortConfig.key) {
      sortableItems.sort((a, b) => {
        const aValue = a[sortConfig.key!];
        const bValue = b[sortConfig.key!];

        if (aValue == null && bValue == null) return 0;
        if (aValue == null) return sortConfig.direction === 'ascending' ? -1 : 1;
        if (bValue == null) return sortConfig.direction === 'ascending' ? 1 : -1;

        // Specific handling for date strings like 'YYYY-MM-DD' or 'N/A'
        if (sortConfig.key === 'nextPaymentDate') {
          if (aValue === 'N/A' && bValue === 'N/A') return 0;
          if (aValue === 'N/A') return sortConfig.direction === 'ascending' ? 1 : -1; // 'N/A' could be considered "later"
          if (bValue === 'N/A') return sortConfig.direction === 'ascending' ? -1 : 1;
        }

        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return sortConfig.direction === 'ascending'
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }

        if (aValue < bValue) return sortConfig.direction === 'ascending' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'ascending' ? 1 : -1;
        return 0;
      });
    }
    return sortableItems;
  }, [subscriptions, sortConfig]);

  // Memoized paginated subscriptions
  const paginatedSubscriptions = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedSubscriptions.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedSubscriptions, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(sortedSubscriptions.length / itemsPerPage);

  const requestSort = (key: keyof Subscription) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
    setCurrentPage(1); // Reset to first page on sort
  };


  if (isLoading && subscriptions.length === 0) { // Show full page loader only on initial load
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-black mb-2"></div>
          <p>Loading subscriptions...</p>
        </div>
      </div>
    );
  }

  if (error && subscriptions.length === 0) { // Show full page error only if no data available
    return (
      <div className="container px-4 py-8 mx-auto text-center">
        <h1 className="text-3xl font-bold mb-6">Subscription Management</h1>
        <p className="text-red-500 text-xl">Error loading subscription data: {error}</p>
        <button
          onClick={fetchSubscriptionData}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Subscription Management ({subscriptions.length})</h1>
        <Link
          href="/admin"
          className="text-blue-500 hover:text-blue-600"
        >
          ← Back to Admin Dashboard
        </Link>
      </div>

      {actionFeedback.message && (
        <div className={`p-4 mb-4 rounded-md text-sm ${
          actionFeedback.type === 'success' ? 'bg-green-100 text-green-700' :
          actionFeedback.type === 'error' ? 'bg-red-100 text-red-700' :
          'bg-blue-100 text-blue-700' // For info or other types
        }`}>
          {actionFeedback.message}
        </div>
      )}
      {isLoading && subscriptions.length > 0 && <p className="text-center my-2">Updating list...</p>}
      {error && subscriptions.length > 0 && <p className="text-center my-2 text-red-500">Error updating list: {error}. Displaying cached data.</p>}

      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold">Vendor Subscriptions ({sortedSubscriptions.length})</h2>
          <p className="text-gray-600 mt-1">Manage vendor subscriptions and billing</p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => requestSort('storeName')}>
                  Store Name {sortConfig.key === 'storeName' ? (sortConfig.direction === 'ascending' ? '▲' : '▼') : ''}
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => requestSort('email')}>
                  Email {sortConfig.key === 'email' ? (sortConfig.direction === 'ascending' ? '▲' : '▼') : ''}
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => requestSort('plan')}>
                  Plan {sortConfig.key === 'plan' ? (sortConfig.direction === 'ascending' ? '▲' : '▼') : ''}
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => requestSort('price')}>
                  Price {sortConfig.key === 'price' ? (sortConfig.direction === 'ascending' ? '▲' : '▼') : ''}
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => requestSort('status')}>
                  Status {sortConfig.key === 'status' ? (sortConfig.direction === 'ascending' ? '▲' : '▼') : ''}
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => requestSort('paymentStatus')}>
                  Payment Status {sortConfig.key === 'paymentStatus' ? (sortConfig.direction === 'ascending' ? '▲' : '▼') : ''}
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => requestSort('nextPaymentDate')}>
                  Next Payment {sortConfig.key === 'nextPaymentDate' ? (sortConfig.direction === 'ascending' ? '▲' : '▼') : ''}
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedSubscriptions.length === 0 && !isLoading ? (
                <tr><td colSpan={8} className="text-center py-4">No subscriptions found.</td></tr>
              ) : (
                paginatedSubscriptions.map((sub) => (
                  <tr key={sub.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{sub.storeName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{sub.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{sub.plan}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">${sub.price.toFixed(2)}/month</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        sub.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {sub.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        sub.paymentStatus === 'Paid' ? 'bg-green-100 text-green-800' :
                        sub.paymentStatus === 'Unpaid' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {sub.paymentStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {sub.nextPaymentDate}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button onClick={() => handleViewDetails(sub.vendorId)} className="text-blue-600 hover:text-blue-900 mr-4">
                        View Details
                      </button>
                      <button onClick={() => handleManagePayment(sub.vendorId)} className="text-green-600 hover:text-green-900">
                        Manage Payment
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {/* Pagination Controls */}
        <div className="py-4 flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0 px-6">
          <div className="flex items-center space-x-2">
            <label htmlFor="itemsPerPageSub" className="text-sm text-gray-700">Items per page:</label>
            <select
              id="itemsPerPageSub"
              value={itemsPerPage}
              onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }}
              className="p-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-black"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1 || totalPages === 0}
              className="px-3 py-1 sm:px-4 sm:py-2 border rounded-md text-sm bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <span className="text-sm text-gray-700">
              Page {totalPages === 0 ? 0 : currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages || totalPages === 0}
              className="px-3 py-1 sm:px-4 sm:py-2 border rounded-md text-sm bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Platform & Plan Configuration</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-gray-900 mb-4">Transaction Fee Reporting</h3>
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <p className="text-sm text-gray-600 mb-1">Total Transaction Fees Collected</p>
              <p className="text-2xl font-bold">${totalTransactionFeesCollected.toFixed(2)}</p>
              {/* <p className="text-xs text-gray-500">Last updated: {new Date().toLocaleDateString()}</p> */}
            </div>

            <h3 className="font-medium text-gray-900 mb-2">Current Live Plan (Example)</h3>
            <p className="text-gray-600 mb-4">Launch Plan - $29/month + 2% transaction fee</p>
            
            <h3 className="font-medium text-gray-900 mb-2">Features Included</h3>
            <ul className="space-y-2 mb-4 text-sm text-gray-600">
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-green-500">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                AI Product Creation
              </li>
              {/* ... other features remain the same as original JSX ... */}
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-green-500">
                  <polyline points="20 6 9 17 12 20 20 12 13 9 20"></polyline>
                </svg>
                Unlimited Products
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-green-500">
                  <path d="M12 2v3m0 16v3m9-9h-3m-6 0H9m6 0v3m-3-3v-3m-6-4H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-10a2 2 0 0 0-2-2z"></path>
                </svg>
                1 Staff Account
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-green-500">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                  <line x1="9" y1="9" x2="9.01" y2="9"></line>
                  <line x1="15" y1="9" x2="15.01" y2="9"></line>
                </svg>
                Standard Theme
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-green-500">
                  <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z"></path>
                  <path d="M12 16c2.2 0 4-1.8 4-4s-1.8-4-4-4-4 1.8-4 4 1.8 4 4 4z"></path>
                  <path d="M12 10v4M14 12h-4"></path>
                </svg>
                Subdomain + Custom Domain Support
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-green-500">
                  <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                  <path d="M2 10h20"></path>
                </svg>
                Secure Checkout
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-900 mb-4">Manual Subscription Management</h3>
            <form onSubmit={handleUpdateSubscription} className="space-y-4">
              <div>
                <label htmlFor="vendorIdentifier" className="block text-sm font-medium text-gray-700 mb-1">
                  Vendor ID or Store Name/Email (Use Vendor ID for now)
                </label>
                <input
                  type="text"
                  id="vendorIdentifier"
                  value={vendorIdentifier}
                  onChange={(e) => setVendorIdentifier(e.target.value)}
                  placeholder="Enter Vendor ID..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                  required
                />
              </div>
              <div>
                <label htmlFor="subscriptionPlan" className="block text-sm font-medium text-gray-700 mb-1">
                  Select New Plan
                </label>
                <select
                  id="subscriptionPlan"
                  value={selectedPlan}
                  onChange={(e) => setSelectedPlan(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                >
                  <option value="Launch Plan - $29/month + 2% transaction fee">Launch Plan - $29/month + 2% transaction fee</option>
                  <option value="Pro Plan - $99/month + 1% transaction fee">Pro Plan - $99/month + 1% transaction fee</option>
                  <option value="Free Tier - $0/month + 3% transaction fee">Free Tier - $0/month + 3% transaction fee</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-black/90 transition-colors disabled:opacity-50"
                disabled={isLoading} // Disable button while any loading (e.g. list refresh) might be happening
              >
                Update Subscription
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}