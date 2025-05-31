import { Configuration, OpenAIApi } from 'openai';

// Initialize OpenAI configuration
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

/**
 * Generates product details using OpenAI Vision API based on an image
 * @param imageUrl - URL of the image to analyze
 * @returns Promise with generated product details or error message
 */
export async function generateProductFromImage(imageUrl: string) {
  try {
    // Get predefined categories from environment variable or use default
    const predefinedCategories = process.env.AI_PRODUCT_CATEGORIES?.split(',') || [
      'Apparel',
      'Accessories',
      'Home & Decor',
      'Electronics',
      'Beauty & Health',
      'Toys & Games',
      'Books',
      'Other'
    ];

    // Construct the prompt for OpenAI
    const prompt = `${process.env.AI_PRODUCT_PROMPT || "You are an e-commerce product specialist. Based on this image, generate a compelling product title (max 60 chars), a descriptive product description (approx 50 words), 3-5 relevant SEO keywords/tags, and suggest the most appropriate category from this list"} [${predefinedCategories.join(', ')}].`;

    // Call OpenAI Vision API
    const response = await openai.createChatCompletion({
      model: process.env.OPENAI_MODEL || 'gpt-4-vision-preview',
      messages: [
        {
          role: 'user',
          content: [
            { type: 'text', text: prompt },
            { type: 'image_url', image_url: { url: imageUrl } },
          ],
        },
      ],
      max_tokens: 300,
    });

    // Extract the generated content from the response
    const content = response.data.choices[0]?.message?.content;

    if (!content) {
      throw new Error('No response from AI');
    }

    // Parse the AI response into structured product data
    // This is a simplified example - in production, you'd want more robust parsing
    const lines = content.split('\n').map((line: string) => line.trim());
    
    const productData = {
      title: '',
      description: '',
      tags: [] as string[],
      category: '',
      rawResponse: content
    };

    // Simple parsing logic - would need refinement for production
    for (const line of lines) {
      if (line.startsWith('**Product Title:**')) {
        productData.title = line.replace('**Product Title:**', '').trim();
      } else if (line.startsWith('**Product Description:**')) {
        productData.description = line.replace('**Product Description:**', '').trim();
      } else if (line.startsWith('**Tags:**')) {
        productData.tags = line
          .replace('**Tags:**', '')
          .trim()
          .split(',')
          .map((tag: string) => tag.trim())
          .filter((tag: string) => tag);
      } else if (line.startsWith('**Category:**')) {
        const category = line.replace('**Category:**', '').trim();
        if (predefinedCategories.includes(category)) {
          productData.category = category;
        } else {
          // If AI suggests a category not in our list, default to 'Other'
          productData.category = 'Other';
        }
      }
    }

    // Basic validation
    if (!productData.title || !productData.description) {
      throw new Error('AI did not return required product title and description');
    }

    return productData;
  } catch (error) {
    console.error('Error generating product from image:', error);
    
    // Return a standard error response
    return {
      title: 'Manual Entry Required',
      description: 'The AI couldn\'t process the image, please fill details manually.',
      tags: [],
      category: 'Other',
      rawResponse: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`
    };
  }
}