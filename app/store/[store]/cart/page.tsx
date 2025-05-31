import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Cart({ params }: { params: { store: string } }) {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would fetch cart items from an API
    // For demo purposes, we'll use mock data
    setTimeout(() => {
      setCartItems([
        {
          id: '1',
          title: 'Wireless Headphones',
          price: 79.99,
          quantity: 1,
          imageUrl: '/product1.jpg'
        },
        {
          id: '2',
          title: 'Smartphone Case',
          price: 19.99,
          quantity: 2,
          imageUrl: '/product2.jpg'
        }
      ]);
      setIsLoading(false);
    }, 500);
  }, []);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-black mb-2"></div>
          <p>Loading cart...</p>
        </div>
      </div>
    );
  }

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 0 ? 5.0 : 0;
  const total = subtotal + shipping;

  const updateQuantity = (id, newQuantity) => {
    setCartItems(cartItems.map(item => 
      item.id === id ? {...item, quantity: Math.max(1, newQuantity)} : item
    ));
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      
      {cartItems.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mx-auto text-gray-400 mb-4">
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.74a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Add some products to your cart to continue.</p>
          <Link href={`/store/${params.store}`} className="text-blue-500 hover:text-blue-600">
            ← Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="py-3 px-4 text-left text-sm font-semibold text-gray-900">Product</th>
                    <th scope="col" className="py-3 px-4 text-left text-sm font-semibold text-gray-900">Price</th>
                    <th scope="col" className="py-3 px-4 text-left text-sm font-semibold text-gray-900">Quantity</th>
                    <th scope="col" className="py-3 px-4 text-right text-sm font-semibold text-gray-900">Total</th>
                    <th scope="col" className="py-3 px-4"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {cartItems.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <div className="flex items-center">
                          <div className="h-16 w-16 bg-gray-100 rounded-md overflow-hidden mr-4">
                            <img src={item.imageUrl} alt={item.title} className="h-full w-full object-cover" />
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900">{item.title}</h3>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-gray-900">${item.price.toFixed(2)}</div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center">
                          <div className="flex items-center border border-gray-300 rounded-md w-32">
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="px-3 py-1 text-xl font-bold"
                            >
                              -
                            </button>
                            <span className="px-3 py-1 text-center w-12">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="px-3 py-1 text-xl font-bold"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <div className="text-gray-900 font-medium">
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <button 
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="mt-6 flex space-x-4">
              <Link href={`/store/${params.store}`} className="bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors">
                ← Continue Shopping
              </Link>
              <button 
                onClick={() => {}}
                className="bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors"
              >
                Update Cart
              </button>
            </div>
          </div>
          
          {/* Order Summary */}
          <div>
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping:</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
              </div>
              
              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between font-bold text-lg mb-6">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                
                <Link 
                  href={`/store/${params.store}/checkout`} 
                  className="w-full bg-black text-white py-3 px-4 rounded-md hover:bg-black/90 transition-colors block text-center"
                >
                  Proceed to Checkout
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}