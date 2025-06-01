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
      console.log('Calling /api/ai/generate for image URL:', imageUrl);
      const response = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imageUrl }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        // Use error message from API response if available, otherwise a default
        throw new Error(responseData.error || `AI generation failed with status: ${response.status}`);
      }
      
      // The API is expected to return { title, description, tags, category }
      // The 'tags' from the API should now be an array of strings.
      onGenerate(responseData);

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'AI couldn\'t process the image or an unknown error occurred.';
      console.error('Error in AIProductGenerator:', errorMessage, err);
      setError(errorMessage);
      onError(errorMessage); // Propagate error to the component using this hook
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    generateProductDetails
  };
};