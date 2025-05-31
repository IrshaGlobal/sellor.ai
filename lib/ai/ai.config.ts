// AI product generation service configuration for sellor.ai
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
  organization: process.env.OPENAI_ORGANIZATION_ID,
  project: process.env.OPENAI_PROJECT_ID
});

// Product Generation Parameters
class ProductGenerationParams {
  image: string; // Base64 encoded image or URL
  prompt: string;
  max_tokens?: number;
  temperature?: number;
  model?: string;
  
  constructor(data: Partial<ProductGenerationParams>) {
    Object.assign(this, data);
  }
}

// Generate Product Details
class ProductGenerator {
  static async generateProductDetails(params: ProductGenerationParams) {
    const response = await openai.createChatCompletion({
      model: params.model || 'gpt-4-vision-preview',
      messages: [
        { role: 'system', content: 'You are an e-commerce product specialist.' },
        { role: 'user', content: `
          Based on this image: ${params.image}, generate:
          - A compelling product title (max 60 chars)
          - A descriptive product description (approx 50 words)
          - 3-5 relevant SEO keywords/tags
          - The most appropriate category from this list: Apparel, Accessories, Home & Decor, Electronics, Beauty & Health, Toys & Games, Books, Other
          
          Use this format:
          Title: [title]
          Description: [description]
          Tags: [tag1], [tag2], [tag3]
          Category: [category]
        `}
      ],
      max_tokens: params.max_tokens || 200,
      temperature: params.temperature || 0.7
    });
    
    if (!response.data.choices[0].message?.content) {
      throw new Error('AI product generation failed');
    }
    
    const output = response.data.choices[0].message.content;
    const [titleLine, descriptionLine, tagsLine, categoryLine] = output.split('\n');
    
    return {
      title: titleLine.replace('Title:', '').trim(),
      description: descriptionLine.replace('Description:', '').trim(),
      tags: tagsLine.replace('Tags:', '').split(',').map((tag: string) => tag.trim()),
      category: categoryLine.replace('Category:', '').trim()
    };
  }
}

export { ProductGenerationParams, ProductGenerator };