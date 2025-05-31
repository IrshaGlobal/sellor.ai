'use client';

import { useState } from 'react';
import { ImageUpload } from './ImageUpload';
import { AIProductGenerator, type AIProductResult } from './AIProductGenerator';
import Link from 'next/link';

interface ProductFormProps {
  initialData?: {
    title: string;
    description: string;
    price: number;
    imageUrl: string;
    sku: string;
    inventoryQuantity: number;
    tags: string;
    categoryId: string;
  };
  categories: Array<{
    id: string;
    name: string;
  }>;
  isEditing?: boolean;
}

export const ProductForm = ({ initialData, categories, isEditing = false }: ProductFormProps) => {
  const [imageUrl, setImageUrl] = useState(initialData?.imageUrl || '');
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [price, setPrice] = useState(initialData?.price?.toString() || '');
  const [sku, setSku] = useState(initialData?.sku || '');
  const [inventoryQuantity, setInventoryQuantity] = useState(
    initialData?.inventoryQuantity?.toString() || ''
  );
  const [tags, setTags] = useState(initialData?.tags || '');
  const [categoryId, setCategoryId] = useState(initialData?.categoryId || '');
  const [aiResult, setAiResult] = useState<AIProductResult | null>(null);
  
  const {
    isLoading: isAIGenerating,
    error: aiError,
    generateProductDetails
  } = AIProductGenerator({
    onGenerate: (result) => {
      setAiResult(result);
      // Only update fields if they're empty or we're creating a new product
      if (!isEditing) {
        setTitle(result.title);
        setDescription(result.description);
        
        // Parse tags from string to array and back to string for consistency
        try {
          const parsedTags = result.tags.split(',').map(tag => tag.trim());
          setTags(parsedTags.join(', '));
        } catch (e) {
          setTags(result.tags);
        }
        
        // Find matching category or default to Electronics
        const matchingCategory = categories.find(
          cat => cat.name.toLowerCase() === result.category.toLowerCase()
        );
        
        if (matchingCategory) {
          setCategoryId(matchingCategory.id);
        } else if (categories.find(cat => cat.name === 'Other')) {
          // If no match, use 'Other' category if available
          const otherCategory = categories.find(cat => cat.name === 'Other');
          if (otherCategory) {
            setCategoryId(otherCategory.id);
          }
        }
      }
    },
    onError: (error) => {
      console.error('AI generation error:', error);
    }
  });
  
  const handleImageUpload = (file: File) => {
    // In a real app, this would upload to storage and return a URL
    // For demo purposes, we'll just show a preview
    const reader = new FileReader();
    
    reader.onload = (e) => {
      if (e.target?.result) {
        setImageUrl(e.target.result.toString());
        // Generate AI details when image is uploaded
        generateProductDetails(e.target!.result.toString());
      }
    };
    
    reader.readAsDataURL(file);
  };
  
  const handleRemoveImage = () => {
    setImageUrl('');
    setAiResult(null);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would call an API endpoint to save the product
    console.log('Saving product:', {
      title,
      description,
      price: parseFloat(price),
      imageUrl,
      sku,
      inventoryQuantity: parseInt(inventoryQuantity),
      tags,
      categoryId
    });
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column - Image & AI Generation */}
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">Product Image</h2>
              <ImageUpload 
                onUpload={handleImageUpload} 
                currentImage={imageUrl} 
                onRemove={handleRemoveImage} 
              />
              
              {isAIGenerating && imageUrl && (
                <div className="mt-4 flex items-center justify-center p-4 bg-gray-50 rounded-lg">
                  <Loader2 className="animate-spin h-6 w-6 text-gray-500 mr-2" />
                  <span className="text-gray-600">AI is analyzing your product...</span>
                </div>
              )}
              
              {aiError && !isAIGenerating && (
                <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-lg flex items-start">
                  <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                  <p className="text-sm">
                    {aiError}. Please fill out the details manually.
                  </p>
                </div>
              )}
              
              {aiResult && !isAIGenerating && (
                <div className="mt-4 space-y-4">
                  <div>
                    <h3 className="font-medium text-gray-900">AI Suggested Tags:</h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {aiResult.tags.split(',').map((tag, index) => (
                        <span key={index} className="inline-block bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                          {tag.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-gray-900">AI Suggested Category:</h3>
                    <p className="mt-1 text-gray-700">{aiResult.category}</p>
                  </div>
                </div>
              )}
            </div>
            
            {imageUrl && (
              <div className="mt-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Image Preview</h2>
                <div className="relative aspect-square overflow-hidden rounded-lg border border-gray-200">
                  <img 
                    src={imageUrl} 
                    alt="Product preview"
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            )}
          </div>
          
          {/* Right Column - Product Details */}
          <div className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Product Title
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                placeholder="Enter product title"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
              />
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Product Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                rows={5}
                placeholder="Enter product description"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                  Price ($)
                </label>
                <input
                  id="price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                  placeholder="0.00"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                />
              </div>
              
              <div>
                <label htmlFor="inventory" className="block text-sm font-medium text-gray-700 mb-1">
                  Inventory Quantity
                </label>
                <input
                  id="inventory"
                  type="number"
                  min="0"
                  value={inventoryQuantity}
                  onChange={(e) => setInventoryQuantity(e.target.value)}
                  required
                  placeholder="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="sku" className="block text-sm font-medium text-gray-700 mb-1">
                  SKU (Stock Keeping Unit)
                </label>
                <input
                  id="sku"
                  type="text"
                  value={sku}
                  onChange={(e) => setSku(e.target.value)}
                  placeholder="Leave blank to auto-generate"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                />
              </div>
              
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  id="category"
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                >
                  <option value="">Select a category</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div>
              <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
                Tags/Keywords (comma-separated)
              </label>
              <input
                id="tags"
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                required
                placeholder="e.g., wireless, headphones, noise-canceling"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
              />
            </div>
            
            <div className="pt-4">
              <div className="flex space-x-4">
                <button
                  type="submit"
                  disabled={!imageUrl || !title || !description || !price}
                  className={`flex-1 bg-black text-white py-2 px-4 rounded-md hover:bg-black/90 transition-colors
                    ${(!imageUrl || !title || !description || !price) ? 'opacity-50 cursor-not-allowed' : ''}
                  `}
                >
                  {isEditing ? 'Update Product' : 'Publish Product'}
                </button>
                <button
                  type="button"
                  className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors"
                >
                  Save as Draft
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
      
      {/* Help Text - shown only when not editing */}
      {!isEditing && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Our AI automatically generates product details based on the image you upload. You can edit any of the generated information before publishing your product.
          </p>
        </div>
      )}
    </div>
  );
};