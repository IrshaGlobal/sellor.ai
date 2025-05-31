import { useState } from 'react';

export default function NewProduct() {
  const [imageUrl, setImageUrl] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [sku, setSku] = useState('');
  const [inventory, setInventory] = useState('1');
  const [tags, setTags] = useState('');
  const [category, setCategory] = useState('APPAREL');
  const [status, setStatus] = useState('DRAFT');
  const [isLoading, setIsLoading] = useState(false);
  const [aiGenerated, setAiGenerated] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, you would upload this file to your server or a cloud storage
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageUrl(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const generateProductDetails = async () => {
    if (!imageUrl) {
      alert('Please upload an image first');
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ imageUrl })
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || 'Failed to generate product details');
        return;
      }

      // Update form fields with AI-generated content
      setTitle(data.title);
      setDescription(data.description);
      setTags(data.tags.join(', '));
      setCategory(data.category);
      setAiGenerated(true);
    } catch (error) {
      console.error('Error generating product details:', error);
      alert('An error occurred while generating product details');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would send the product data to the backend API
    console.log('Saving product:', {
      imageUrl,
      title,
      description,
      price: parseFloat(price),
      sku,
      inventory: parseInt(inventory),
      tags: tags.split(',').map(tag => tag.trim()),
      category,
      status
    });
    
    alert('Product saved successfully!');
  };

  return (
    <div className="container px-4 py-8 mx-auto">
      <h1 className="text-3xl font-bold mb-6">Add New Product</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image Upload Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Step 1: Upload Product Image</h2>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <input
              type="file"
              accept="image/jpeg,image/png"
              onChange={handleImageUpload}
              className="hidden"
              id="image-upload"
            />
            <label
              htmlFor="image-upload"
              className="cursor-pointer flex flex-col items-center"
            >
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt="Product preview"
                  className="max-h-64 mb-4"
                />
              ) : (
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                </div>
              )}
              <span className="text-blue-500 hover:text-blue-600">
                {imageUrl ? 'Change Image' : 'Upload Product Image'}
              </span>
              <p className="text-sm text-gray-500 mt-2">JPEG, PNG up to 5MB</p>
            </label>
          </div>
          
          {imageUrl && !aiGenerated && (
            <button
              onClick={generateProductDetails}
              disabled={isLoading}
              className="mt-4 w-full bg-black text-white py-2 px-4 rounded-md hover:bg-black/90 transition-colors"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  AI is analyzing your product...
                </span>
              ) : (
                "Generate Product Details with AI"
              )}
            </button>
          )}
        </div>
        
        {/* Product Details Form */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Step 2: AI Generated Product Details</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Product Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                placeholder="AI will generate a title"
                readOnly={!aiGenerated}
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Product Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                placeholder="AI will generate a description"
                readOnly={!aiGenerated}
              ></textarea>
            </div>
            
            <div className="mb-4">
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                Price ($)
              </label>
              <input
                type="number"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                step="0.01"
                min="0"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                placeholder="0.00"
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="sku" className="block text-sm font-medium text-gray-700 mb-1">
                SKU (Optional)
              </label>
              <input
                type="text"
                id="sku"
                value={sku}
                onChange={(e) => setSku(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                placeholder="Auto-generated if left blank"
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="inventory" className="block text-sm font-medium text-gray-700 mb-1">
                Inventory Quantity
              </label>
              <input
                type="number"
                id="inventory"
                value={inventory}
                onChange={(e) => setInventory(e.target.value)}
                min="0"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                placeholder="1"
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
                Tags / Keywords
              </label>
              <input
                type="text"
                id="tags"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                placeholder="Comma-separated tags"
                readOnly={!aiGenerated}
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                readOnly={!aiGenerated}
              >
                <option value="APPAREL">Apparel</option>
                <option value="ACCESSORIES">Accessories</option>
                <option value="HOME_AND_DECOR">Home & Decor</option>
                <option value="ELECTRONICS">Electronics</option>
                <option value="BEAUTY_AND_HEALTH">Beauty & Health</option>
                <option value="TOYS_AND_GAMES">Toys & Games</option>
                <option value="BOOKS">Books</option>
                <option value="OTHER">Other</option>
              </select>
            </div>
            
            <div className="flex space-x-4">
              <button
                type="submit"
                name="status"
                value="PUBLISHED"
                onClick={() => setStatus('PUBLISHED')}
                className="flex-1 bg-black text-white py-2 px-4 rounded-md hover:bg-black/90 transition-colors"
              >
                Publish
              </button>
              <button
                type="submit"
                name="status"
                value="DRAFT"
                onClick={() => setStatus('DRAFT')}
                className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors"
              >
                Save as Draft
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}