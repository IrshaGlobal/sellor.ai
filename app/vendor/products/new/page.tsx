// No longer need useState here as ProductForm handles its own state
// import { useState } from 'react';
import { ProductForm } from '@/components/products/ProductForm';

const productCategories = [
  { id: 'APPAREL', name: 'Apparel' },
  { id: 'ACCESSORIES', name: 'Accessories' },
  { id: 'HOME_AND_DECOR', name: 'Home & Decor' },
  { id: 'ELECTRONICS', name: 'Electronics' },
  { id: 'BEAUTY_AND_HEALTH', name: 'Beauty & Health' },
  { id: 'TOYS_AND_GAMES', name: 'Toys & Games' },
  { id: 'BOOKS', name: 'Books' },
  { id: 'OTHER', name: 'Other' },
];

export default function NewProductPage() { // Renamed component for clarity
  return (
    <div className="container px-4 py-8 mx-auto">
      <h1 className="text-3xl font-bold mb-6">Add New Product</h1>
      <ProductForm
        categories={productCategories}
        isEditing={false}
        // initialData can be omitted for new products or explicitly set to null/undefined
        // initialData={null}
      />
    </div>
  );
}