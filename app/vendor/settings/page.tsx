import { useState } from 'react';

export default function StoreSettings() {
  const [storeName, setStoreName] = useState('My Awesome Store');
  const [logoUrl, setLogoUrl] = useState('');
  const [accentColor, setAccentColor] = useState('#000000');
  const [description, setDescription] = useState('Welcome to my online store!');
  const [contactEmail, setContactEmail] = useState('');
  const [customDomain, setCustomDomain] = useState('');
  const [isConnectedToStripe, setIsConnectedToStripe] = useState(false);
  const [shippingRate, setShippingRate] = useState('5.00');
  const [freeShippingMin, setFreeShippingMin] = useState('');
  const [refundPolicy, setRefundPolicy] = useState('We offer a 30-day return policy on all items.');
  const [privacyPolicy, setPrivacyPolicy] = useState('We respect your privacy...');
  const [termsOfService, setTermsOfService] = useState('By using our service, you agree to these terms...');

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, you would upload this file to your server or a cloud storage
      const reader = new FileReader();
      reader.onload = (e) => {
        setLogoUrl(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the updated settings to the backend API
    console.log('Saving store settings:', {
      storeName,
      logoUrl,
      accentColor,
      description,
      contactEmail,
      customDomain,
      shippingRate: parseFloat(shippingRate),
      freeShippingMin: freeShippingMin ? parseFloat(freeShippingMin) : null,
      refundPolicy,
      privacyPolicy,
      termsOfService
    });
    
    alert('Store settings saved successfully!');
  };

  const connectToStripe = () => {
    // In a real app, this would redirect to Stripe Connect onboarding
    console.log('Redirecting to Stripe Connect...');
    setIsConnectedToStripe(true);
  };

  return (
    <div className="container px-4 py-8 mx-auto">
      <h1 className="text-3xl font-bold mb-6">Store Settings</h1>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Store Information */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Store Information</h2>
            
            <div className="mb-4">
              <label htmlFor="storeName" className="block text-sm font-medium text-gray-700 mb-1">
                Store Name
              </label>
              <input
                type="text"
                id="storeName"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="logo" className="block text-sm font-medium text-gray-700 mb-1">
                Logo Upload
              </label>
              <div className="flex items-center">
                {logoUrl && (
                  <img
                    src={logoUrl}
                    alt="Store logo"
                    className="h-16 w-16 object-contain mr-4"
                  />
                )}
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex-1 text-center">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="hidden"
                    id="logo-upload"
                  />
                  <label
                    htmlFor="logo-upload"
                    className="cursor-pointer flex flex-col items-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-2">
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                    <span className="text-blue-500 hover:text-blue-600">
                      {logoUrl ? 'Change Logo' : 'Upload Logo'}
                    </span>
                  </label>
                </div>
              </div>
            </div>
            
            <div className="mb-4">
              <label htmlFor="accentColor" className="block text-sm font-medium text-gray-700 mb-1">
                Primary Accent Color
              </label>
              <input
                type="color"
                id="accentColor"
                value={accentColor}
                onChange={(e) => setAccentColor(e.target.value)}
                className="w-12 h-10 cursor-pointer"
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Store Description / About Us
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
              ></textarea>
            </div>
            
            <div className="mb-4">
              <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700 mb-1">
                Contact Email
              </label>
              <input
                type="email"
                id="contactEmail"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                placeholder="you@example.com"
              />
            </div>
          </div>
          
          {/* Advanced Settings */}
          <div className="space-y-6">
            {/* Custom Domain */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Custom Domain</h2>
              
              <p className="text-sm text-gray-500 mb-4">
                To use your custom domain, add a CNAME record pointing your domain to your subdomain.
              </p>
              
              <div className="mb-4">
                <label htmlFor="customDomain" className="block text-sm font-medium text-gray-700 mb-1">
                  Custom Domain
                </label>
                <div className="flex">
                  <input
                    type="text"
                    id="customDomain"
                    value={customDomain}
                    onChange={(e) => setCustomDomain(e.target.value)}
                    placeholder="yourdomain.com"
                    className="w-full px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-black"
                  />
                  <button
                    type="button"
                    className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-r-md"
                  >
                    Verify
                  </button>
                </div>
              </div>
              
              <div className="mt-4">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-yellow-100 rounded-full mr-2"></div>
                  <span className="text-sm">Status: Not connected</span>
                </div>
              </div>
            </div>
            
            {/* Payment Settings */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Payment Settings</h2>
              
              {!isConnectedToStripe ? (
                <div className="space-y-4">
                  <p className="text-sm text-gray-500">
                    Connect your Stripe account to receive payments from customers.
                  </p>
                  <button
                    type="button"
                    onClick={connectToStripe}
                    className="flex items-center justify-center w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                      <path d="M2 12h20M12 2v20"></path>
                    </svg>
                    Connect with Stripe
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-sm text-gray-500">
                    Your Stripe account is connected. Funds will be transferred to your bank account according to your payout schedule.
                  </p>
                  <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4">
                    <p className="text-sm">Stripe Account: Connected (account_id_xxxx)</p>
                  </div>
                </div>
              )}
            </div>
            
            {/* Shipping Settings */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Shipping</h2>
              
              <div className="mb-4">
                <label htmlFor="shippingRate" className="block text-sm font-medium text-gray-700 mb-1">
                  Default Shipping Rate Per Order ($)
                </label>
                <input
                  type="number"
                  id="shippingRate"
                  value={shippingRate}
                  onChange={(e) => setShippingRate(e.target.value)}
                  step="0.01"
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                />
              </div>
              
              <div className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id="enableFreeShipping"
                  checked={!!freeShippingMin}
                  onChange={(e) => setFreeShippingMin(e.target.checked ? '50.00' : '')}
                  className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                />
                <label htmlFor="enableFreeShipping" className="ml-2 block text-sm text-gray-700">
                  Offer Free Shipping over $X
                </label>
              </div>
              
              {freeShippingMin && (
                <div className="ml-6 mb-4">
                  <label htmlFor="freeShippingMin" className="block text-sm font-medium text-gray-700 mb-1">
                    Minimum order amount for free shipping ($)
                  </label>
                  <input
                    type="number"
                    id="freeShippingMin"
                    value={freeShippingMin}
                    onChange={(e) => setFreeShippingMin(e.target.value)}
                    step="0.01"
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                  />
                </div>
              )}
            </div>
            
            {/* Policies */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Policies</h2>
              
              <div className="mb-4">
                <label htmlFor="refundPolicy" className="block text-sm font-medium text-gray-700 mb-1">
                  Refund Policy
                </label>
                <textarea
                  id="refundPolicy"
                  value={refundPolicy}
                  onChange={(e) => setRefundPolicy(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                ></textarea>
              </div>
              
              <div className="mb-4">
                <label htmlFor="privacyPolicy" className="block text-sm font-medium text-gray-700 mb-1">
                  Privacy Policy
                </label>
                <textarea
                  id="privacyPolicy"
                  value={privacyPolicy}
                  onChange={(e) => setPrivacyPolicy(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                ></textarea>
              </div>
              
              <div className="mb-4">
                <label htmlFor="termsOfService" className="block text-sm font-medium text-gray-700 mb-1">
                  Terms of Service
                </label>
                <textarea
                  id="termsOfService"
                  value={termsOfService}
                  onChange={(e) => setTermsOfService(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                ></textarea>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8">
          <button
            type="submit"
            className="bg-black text-white py-2 px-4 rounded-md hover:bg-black/90 transition-colors"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}