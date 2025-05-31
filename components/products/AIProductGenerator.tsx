'use client';

import { useState } from 'react';
import { Loader2, AlertCircle } from 'lucide-react';

interface AIProductGeneratorProps {
  onGenerate: (result: any) => void;
  onError: (error: string) => void;
}

export const AIProductGenerator = ({ onGenerate, onError }: AIProductGeneratorProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateProductDetails = async (imageUrl: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real app, this would call our AI service
      // For demo, we'll simulate an API call with a timeout
      console.log('Calling AI to analyze image:', imageUrl);
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulated successful response
      const result = {
        title: 'Wireless Noise-Canceling Headphones',
        description: 'High-quality wireless headphones with advanced noise cancellation technology. Offers crystal clear audio quality and 20-hour battery life.',
        tags: ['headphones', 'wireless', 'noise-canceling', 'audio'],
        category: 'Electronics'
      };
      
      setIsLoading(false);
      onGenerate(result);
    } catch (err) {
      setIsLoading(false);
      const errorMessage = err instanceof Error ? err.message : 'AI couldn\'t process the image';
      setError(errorMessage);
      onError(errorMessage);
    }
  };

  return {
    isLoading,
    error,
    generateProductDetails
  };
};