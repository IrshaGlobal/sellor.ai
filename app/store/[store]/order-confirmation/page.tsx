import Link from 'next/link';
import { useRouter } from 'next/router';

export default function OrderConfirmation({ params }: { params: { store: string } }) {
  const router = useRouter();
  const orderId = router.query.orderId || 'ORD123';
  
  // Mock order data - in a real app this would come from an API
  const order = {
    id: orderId,
    date: new Date().toLocaleDateString(),
    customerName: 'John Doe',
    items: [
      {
        id: '1',
        title: 'Wireless Headphones',
        price: 79.99,
        quantity: 1
      },
      {
        id: '2',
        title: 'Smartphone Case',
        price: 19.99,
        quantity: 2
      }
    ],
    subtotal: 119.97,
    shipping: 5.00,
    total: 124.97
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mx-auto text-green-500 mb-4">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          
          <h1 className="text-3xl font-bold mb-2">Thank you for your order!</h1>
          <p className="text-gray-600 mb-6">Your order has been confirmed and will be processed soon.</p>
          
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
            <p className="text-sm text-gray-500 uppercase tracking-wide mb-2">Order Number</p>
            <p className="text-xl font-medium mb-4">#{order.id}</p>
            
            <p className="text-sm text-gray-500 uppercase tracking-wide mb-2">Order Date</p>
            <p className="text-gray-600 mb-6">{order.date}</p>
            
            <div className="border-t pt-6">
              <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
              
              <div className="space-y-2 mb-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <span>{item.quantity} x {item.title}</span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              
              <div className="space-y-2 pt-4 border-t">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>${order.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span>${order.shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-2 border-t">
                  <span>Total:</span>
                  <span>${order.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
          
          <p className="text-gray-600 mb-6">
            You will receive an email confirmation shortly with details about your order.
          </p>
          
          <Link 
            href={`/store/${params.store}`} 
            className="inline-block bg-black text-white py-2 px-6 rounded-md hover:bg-black/90 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}