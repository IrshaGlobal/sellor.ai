import Link from 'next/link';

export default function Storefront({ params }: { params: { store: string } }) {
  // In a real app, this would fetch store data based on the subdomain
  const storeName = params.store.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
  
  // Mock products data - in a real app, this would come from an API
  const products = [
    {
      id: '1',
      title: 'Wireless Headphones',
      price: 79.99,
      imageUrl: '/product1.jpg'
    },
    {
      id: '2',
      title: 'Smartphone Case',
      price: 19.99,
      imageUrl: '/product2.jpg'
    },
    {
      id: '3',
      title: 'Coffee Mug',
      price: 14.99,
      imageUrl: '/product3.jpg'
    },
    {
      id: '4',
      title: 'Bluetooth Speaker',
      price: 29.99,
      imageUrl: '/product4.jpg'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Store Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            {/* Logo placeholder - would come from store settings */}
            <div className="h-8 w-8 bg-black rounded-full"></div>
            <h1 className="text-xl font-bold">{storeName}</h1>
          </div>
          <nav className="space-x-6">
            <Link href={`/store/${params.store}`} className="text-gray-700 hover:text-black">
              Home
            </Link>
            <Link href={`/store/${params.store}/products`} className="text-gray-700 hover:text-black">
              Products
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <button className="text-gray-700 hover:text-black">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
            <button className="text-gray-700 hover:text-black relative">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.74a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Hero Banner - would come from store settings */}
        <div className="relative h-64 bg-gray-100 rounded-lg mb-8 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <h2 className="text-3xl font-bold text-gray-800">Welcome to {storeName}</h2>
          </div>
        </div>
        
        {/* Featured Products */}
        <h2 className="text-2xl font-bold mb-6">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 overflow-hidden">
                <img src={product.imageUrl} alt={product.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-4">
                <h3 className="font-medium text-gray-900 mb-2">{product.title}</h3>
                <p className="text-lg font-semibold text-gray-900">${product.price.toFixed(2)}</p>
                <button className="mt-4 w-full bg-black text-white py-2 px-4 rounded-md hover:bg-black/90 transition-colors">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">{storeName}</h3>
              <p className="text-gray-400 mb-4">Powered by sellor.ai</p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Home</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Products</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">About Us</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Policies</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Refund Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© {new Date().getFullYear()} {storeName}. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}