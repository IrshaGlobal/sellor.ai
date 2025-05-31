import { useState } from 'react';
import Link from 'next/link';

export default function ProductDetail({ params }: { params: { store: string, id: string } }) {
  const [quantity, setQuantity] = useState(1);
  
  // In a real app, this would fetch from an API based on params.id
  const product = {
    id: params.id,
    title: 'Wireless Headphones',
    description: 'High-quality wireless headphones with noise cancellation and 20-hour battery life.',
    price: 79.99,
    imageUrl: '/product1.jpg'
  };

  const handleAddToCart = () => {
    // In a real app, this would add the product to the cart via API
    console.log(`Added ${quantity} of ${product.id} to cart`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <nav className="text-sm mb-4" aria-label="Breadcrumb">
        <ol className="list-none p-0 inline-flex space-x-2">
          <li className="flex items-center">
            <Link href={`/store/${params.store}`} className="text-gray-500 hover:text-black">
              Home
            </Link>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-2 text-gray-400">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </li>
          <li className="flex items-center">
            <Link href={`/store/${params.store}/products`} className="text-gray-500 hover:text-black">
              Products
            </Link>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-2 text-gray-400">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </li>
          <li className="text-gray-500">{product.title}</li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="bg-gray-100 rounded-lg overflow-hidden">
          <img src={product.imageUrl} alt={product.title} className="w-full h-auto object-cover" />
        </div>
        
        {/* Product Details */}
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
          <p className="text-gray-600 mb-6">SKU: {params.id}</p>
          
          <div className="text-2xl font-bold mb-6">${product.price.toFixed(2)}</div>
          
          <div className="mb-6">
            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
              Quantity
            </label>
            <div className="flex items-center border border-gray-300 rounded-md w-32">
              <button 
                onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                className="px-3 py-1 text-xl font-bold"
              >
                -
              </button>
              <span className="px-3 py-1 text-center w-12">{quantity}</span>
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-1 text-xl font-bold"
              >
                +
              </button>
            </div>
          </div>
          
          <button
            onClick={handleAddToCart}
            className="w-full bg-black text-white py-3 px-4 rounded-md hover:bg-black/90 transition-colors mb-6"
          >
            Add to Cart
          </button>
          
          <div className="border-t pt-6">
            <h2 className="text-xl font-semibold mb-4">Product Description</h2>
            <p className="text-gray-700 mb-4">{product.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}