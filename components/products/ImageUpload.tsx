'use client';

import { useState } from 'react';
import { Upload, X } from 'lucide-react';

interface ImageUploadProps {
  onUpload: (file: File) => void;
  currentImage?: string | null;
  onRemove?: () => void;
}

export const ImageUpload = ({ onUpload, currentImage, onRemove }: ImageUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      onUpload(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onUpload(e.target.files[0]);
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Product Image
      </label>
      <div 
        className={`relative border-2 border-dashed rounded-lg p-6 text-center cursor-pointer
          ${isDragging ? 'border-black bg-gray-50' : 'border-gray-300 hover:border-gray-400'}
        `}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          aria-label="Upload product image"
        />
        
        <div className="space-y-2">
          <div className="mx-auto flex items-center justify-center h-12 w-12 text-gray-400">
            <Upload size={24} />
          </div>
          
          <div className="text-sm text-gray-600">
            <span className="font-medium text-black">Click to upload</span> or drag and drop
          </div>
          
          <p className="text-xs text-gray-500">
            PNG, JPG up to 5MB
          </p>
        </div>
      </div>
      
      {/* Preview area */}
      {currentImage && (
        <div className="relative mt-4">
          <img
            src={currentImage}
            alt="Product preview"
            className="w-full h-64 object-cover rounded-lg"
          />
          {onRemove && (
            <button
              type="button"
              onClick={onRemove}
              className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md text-gray-500 hover:text-gray-700"
              aria-label="Remove image"
            >
              <X size={16} />
            </button>
          )}
        </div>
      )}
    </div>
  );
};