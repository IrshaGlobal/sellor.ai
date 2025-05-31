import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function OrderDetail({ params }: { params: { id: string } }) {
  const [order, setOrder] = useState(null);
  const [trackingNumber, setTrackingNumber] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would fetch from an API endpoint
    // For demo purposes, we'll use mock data
    setTimeout(() => {
      setOrder({
        id: params.id,
        date: '2023-09-15',
        customerName: 'John Doe',
        customerEmail: 'john@example.com',
        shippingAddress: {
          name: 'John Doe',
          address: '123 Main St',
          city: 'Anytown',
          state: 'CA',
          zip: '12345',
          country: 'USA'
        },
        items: [
          {
            id: '1',
            title: 'Wireless Headphones',
            price: 79.99,
            quantity: 1
          }
        ],
        subtotal: 79.99,
        shipping: 5.00,
        total: 84.99,
        paymentStatus: 'SUCCEEDED',
        orderStatus: 'PROCESSING'
      });
      setIsLoading(false);
    }, 800);
  }, [params.id]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-black mb-2"></div>
          <p>Loading order details...</p>
        </div>
      </div>
    );
  }

  const handleUpdateStatus = (newStatus) => {
    // In a real app, this would send the updated status to the backend API
    setOrder({ ...order, orderStatus: newStatus });
    console.log(`Updating order ${order.id} to status: ${newStatus}`);
  };

  const handleAddTrackingNumber = () => {
    if (!trackingNumber.trim()) return;
    
    // In a real app, this would send the tracking number to the backend API
    console.log(`Added tracking number ${trackingNumber} to order ${order.id}`);
    setTrackingNumber('');
  };

  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Order #{order.id}</h1>
        <Link href="/vendor/orders" className="text-blue-500 hover:text-blue-600">
          ← Back to Orders
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Order Details */}
        <div className="md:col-span-2 space-y-6">
          {/* Customer Information */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Customer Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="font-medium">{order.customerName}</p>
                <p className="text-gray-500">{order.customerEmail}</p>
              </div>
              <div>
                <p className="font-medium">Shipping Address</p>
                <p>{order.shippingAddress.name}</p>
                <p>{order.shippingAddress.address}</p>
                <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}</p>
                <p>{order.shippingAddress.country}</p>
              </div>
            </div>
          </div>
          
          {/* Items Ordered */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Items Ordered</h2>
            <div className="border rounded-md overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Quantity
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Line Total
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {order.items.map((item) => (
                    <tr key={item.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{item.title}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">${item.price.toFixed(2)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{item.quantity}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Order Status Update */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Update Order Status</h2>
            <div className="flex flex-col sm:flex-row gap-4">
              <select
                value={order.orderStatus}
                onChange={(e) => handleUpdateStatus(e.target.value)}
                className="w-full sm:w-auto px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
              >
                <option value="PENDING">Pending</option>
                <option value="PROCESSING">Processing</option>
                <option value="SHIPPED">Shipped</option>
                <option value="DELIVERED">Delivered</option>
                <option value="CANCELLED">Cancelled</option>
              </select>
              
              <div className="flex gap-2">
                <input
                  type="text"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  placeholder="Tracking number"
                  className="w-full sm:w-64 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                />
                <button
                  onClick={handleAddTrackingNumber}
                  disabled={!trackingNumber.trim()}
                  className={`px-4 py-2 rounded-md transition-colors ${
                    trackingNumber.trim()
                      ? 'bg-black text-white hover:bg-black/90'
                      : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Add Tracking
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Order Summary */}
        <div>
          <div className="bg-white p-6 rounded-lg shadow-md sticky top-6">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Date:</span>
                <span className="font-medium">{order.date}</span>
              </div>
              
              <div className="border-t pt-4">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Subtotal:</span>
                  <span>${order.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Shipping:</span>
                  <span>${order.shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg">
                  <span>Total:</span>
                  <span>${order.total.toFixed(2)}</span>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Payment Status:</span>
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${
                    order.paymentStatus === 'SUCCEEDED' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {order.paymentStatus}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Order Status:</span>
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${
                    order.orderStatus === 'PENDING' && 'bg-yellow-100 text-yellow-800'
                  } ${
                    order.orderStatus === 'PROCESSING' && 'bg-blue-100 text-blue-800'
                  } ${
                    order.orderStatus === 'SHIPPED' && 'bg-purple-100 text-purple-800'
                  } ${
                    order.orderStatus === 'DELIVERED' && 'bg-green-100 text-green-800'
                  } ${
                    order.orderStatus === 'CANCELLED' && 'bg-red-100 text-red-800'
                  }`}>
                    {order.orderStatus}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}