import Link from 'next/link';
import { useState, useEffect, useMemo } from 'react';

interface Vendor {
  id: string;
  storeName: string;
  email: string;
  subscriptionStatus: 'Active' | 'Inactive';
  dateJoined: string;
}

export default function AdminVendors() {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionFeedback, setActionFeedback] = useState({ type: '', message: '' });

  // Sorting and Pagination state
  const [sortConfig, setSortConfig] = useState<{ key: keyof Vendor | null; direction: 'ascending' | 'descending' }>({ key: 'storeName', direction: 'ascending' });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);


  const fetchVendors = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/admin/vendors');
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Failed to fetch vendors' }));
        throw new Error(errorData.message || 'Failed to fetch vendors');
      }
      const data = await response.json();
      setVendors(data);
    } catch (err: any) {
      setError(err.message);
      console.error("Error fetching vendors:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchVendors();
  }, []);

  const clearActionFeedback = () => {
    setTimeout(() => setActionFeedback({ type: '', message: '' }), 3000);
  };

  const handleActivateVendor = async (vendorId: string) => {
    setActionFeedback({ type: '', message: '' }); // Clear previous feedback
    try {
      const response = await fetch(`/api/admin/vendors/${vendorId}/activate`, {
        method: 'PUT',
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to activate vendor');
      }
      setVendors(prevVendors =>
        prevVendors.map(v =>
          v.id === vendorId ? { ...v, subscriptionStatus: 'Active' } : v
        )
      );
      setActionFeedback({ type: 'success', message: data.message || 'Vendor activated successfully!' });
    } catch (err: any) {
      setActionFeedback({ type: 'error', message: err.message || 'Failed to activate vendor.' });
      console.error("Error activating vendor:", err);
    }
    clearActionFeedback();
  };

  const handleDeactivateVendor = async (vendorId: string) => {
    setActionFeedback({ type: '', message: '' }); // Clear previous feedback
    try {
      const response = await fetch(`/api/admin/vendors/${vendorId}/deactivate`, {
        method: 'PUT',
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to deactivate vendor');
      }
      setVendors(prevVendors =>
        prevVendors.map(v =>
          v.id === vendorId ? { ...v, subscriptionStatus: 'Inactive' } : v
        )
      );
      setActionFeedback({ type: 'success', message: data.message || 'Vendor deactivated successfully!' });
    } catch (err: any) {
      setActionFeedback({ type: 'error', message: err.message || 'Failed to deactivate vendor.' });
      console.error("Error deactivating vendor:", err);
    }
    clearActionFeedback();
  };

  const handleViewDetails = (vendorId: string) => {
    console.log("View details for vendor:", vendorId);
    // For future implementation:
    // router.push(`/admin/vendors/${vendorId}`);
    setActionFeedback({ type: 'info', message: `Details for vendor ${vendorId} would be shown here.` });
    clearActionFeedback();
  };

  // Memoized sorted vendors
  const sortedVendors = useMemo(() => {
    if (!vendors) return [];
    let sortableVendors = [...vendors];
    if (sortConfig.key) {
      sortableVendors.sort((a, b) => {
        // Ensure a and b have the key and values are not null/undefined before comparison
        if (a[sortConfig.key!] == null && b[sortConfig.key!] == null) return 0;
        if (a[sortConfig.key!] == null) return sortConfig.direction === 'ascending' ? -1 : 1;
        if (b[sortConfig.key!] == null) return sortConfig.direction === 'ascending' ? 1 : -1;

        if (a[sortConfig.key!] < b[sortConfig.key!]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key!] > b[sortConfig.key!]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableVendors;
  }, [vendors, sortConfig]);

  // Memoized paginated vendors
  const paginatedVendors = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedVendors.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedVendors, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(sortedVendors.length / itemsPerPage);

  const requestSort = (key: keyof Vendor) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
    setCurrentPage(1); // Reset to first page on sort
  };


  if (isLoading && vendors.length === 0) { // Show full page loader only on initial load
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-black mb-2"></div>
          <p>Loading vendors...</p>
        </div>
      </div>
    );
  }

  if (error && vendors.length === 0) { // Show full page error only if no data is available
    return (
      <div className="container px-4 py-8 mx-auto text-center">
        <h1 className="text-3xl font-bold mb-6">Vendor Management</h1>
        <p className="text-red-500 text-xl">Error loading vendors: {error}</p>
        <button
          onClick={fetchVendors}
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
        <h1 className="text-3xl font-bold">Vendor Management ({vendors.length})</h1>
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
      {isLoading && vendors.length > 0 && <p className="text-center my-2">Updating list...</p>}
      {error && vendors.length > 0 && <p className="text-center my-2 text-red-500">Error updating list: {error}. Displaying cached data.</p>}


      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => requestSort('storeName')}>
                Store Name {sortConfig.key === 'storeName' ? (sortConfig.direction === 'ascending' ? '▲' : '▼') : ''}
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => requestSort('email')}>
                Email {sortConfig.key === 'email' ? (sortConfig.direction === 'ascending' ? '▲' : '▼') : ''}
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => requestSort('subscriptionStatus')}>
                Subscription Status {sortConfig.key === 'subscriptionStatus' ? (sortConfig.direction === 'ascending' ? '▲' : '▼') : ''}
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => requestSort('dateJoined')}>
                Date Joined {sortConfig.key === 'dateJoined' ? (sortConfig.direction === 'ascending' ? '▲' : '▼') : ''}
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedVendors.length === 0 && !isLoading ? (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                  No vendors found.
                </td>
              </tr>
            ) : (
              paginatedVendors.map((vendor) => (
                <tr key={vendor.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{vendor.storeName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{vendor.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      vendor.subscriptionStatus === 'Active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {vendor.subscriptionStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{vendor.dateJoined}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleViewDetails(vendor.id)}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
                      View Details
                    </button>
                    {vendor.subscriptionStatus === 'Active' ? (
                      <button
                        onClick={() => handleDeactivateVendor(vendor.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Deactivate Vendor
                      </button>
                    ) : (
                      <button
                        onClick={() => handleActivateVendor(vendor.id)}
                        className="text-green-600 hover:text-green-900"
                      >
                        Activate Vendor
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="py-4 flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
        <div className="flex items-center space-x-2">
          <label htmlFor="itemsPerPage" className="text-sm text-gray-700">Items per page:</label>
          <select
            id="itemsPerPage"
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
  );
}