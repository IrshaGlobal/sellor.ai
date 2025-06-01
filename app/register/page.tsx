import Link from 'next/link';
import { useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    storeName: ''
  });
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Added for loading state during submit

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true); // Start loading

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Registration failed');
        setIsLoading(false); // Stop loading
        return;
      }

      // Success: store token, set brief success message, then redirect
      setSuccess('Registration successful! Redirecting to your dashboard...');
      Cookies.set('auth_token', data.authToken, {
        expires: 7, // Expires in 7 days
        path: '/',   // Cookie available site-wide
        secure: process.env.NODE_ENV === 'production', // Send only over HTTPS in production
        sameSite: 'lax' // Good default for most cases
      });

      // Redirect after a short delay to allow user to see the success message
      setTimeout(() => {
        router.push('/vendor');
      }, 1500); // 1.5 second delay

      // No need to reset form or stop loading explicitly if redirecting and unmounting
      // setFormData({ email: '', password: '', storeName: '' });
      // setIsLoading(false); // Not strictly needed due to redirect

    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      console.error("Registration submission error:", err);
      setIsLoading(false); // Stop loading on error
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6 sm:p-12 md:p-24 bg-gray-50">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Create Your Store</h1>
        
        <div className="bg-white shadow-xl rounded-lg px-8 pt-6 pb-8 mb-4">
          {success ? (
            <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4 rounded">
              <p className="font-semibold">Success!</p>
              <p>{success}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                  Email Address
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                  Password
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="storeName">
                  Store Name
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="storeName"
                  name="storeName"
                  type="text"
                  value={formData.storeName}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                />
                <p className="text-gray-600 text-xs mt-1">
                  This will be your store's name and part of its unique web address.
                </p>
              </div>
              {error && (
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 rounded">
                  <p className="font-semibold">Error</p>
                  <p>{error}</p>
                </div>
              )}
              <div className="flex items-center justify-between">
                <button
                  className={`w-full bg-black hover:bg-gray-800 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Creating Store...
                    </div>
                  ) : (
                    'Create Store'
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
        
        {!success && ( // Only show if not in success/redirecting state
          <p className="text-center text-gray-600 text-sm">
            Already have an account? <Link href="/login" className="font-semibold text-black hover:text-gray-800">Sign in</Link>
          </p>
        )}
      </div>
    </div>
  );
}