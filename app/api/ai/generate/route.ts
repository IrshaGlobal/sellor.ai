import { NextRequest, NextResponse } from 'next/server';
import { Configuration, OpenAIApi } from 'openai';

// Initialize OpenAI API
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function POST(request: NextRequest) {
  try {
    const { imageUrl } = await request.json();
    
    if (!imageUrl) {
      return NextResponse.json(
        { error: 'Image URL is required' },
        { status: 400 }
      );
    }

    // Define categories for AI to choose from
    const categories = [
      'APPAREL',
      'ACCESSORIES',
      'HOME_AND_DECOR',
      'ELECTRONICS',
      'BEAUTY_AND_HEALTH',
      'TOYS_AND_GAMES',
      'BOOKS',
      'OTHER'
    ];

    // Call OpenAI Vision API
    const response = await openai.createChatCompletion({
      model: "gpt-4-vision-preview",
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: `You are an e-commerce product specialist. Based on this image, generate:
1. A compelling product title (max 60 characters)
2. A descriptive product description (approx 50 words)
3. 3-5 relevant SEO keywords/tags
4. Suggest the most appropriate category from this list: ${categories.join(', ')}

Format your response as JSON with exactly these keys: title, description, tags, category` },
            { type: "image_url", image_url: { url: imageUrl } }
          ]
        }
      ],
      max_tokens: 300,
    });

    // Extract AI response
    const aiResponse = response.data.choices[0].message.content;
    
    if (!aiResponse) {
      return NextResponse.json(
        { error: 'AI could not process the image' },
        { status: 500 }
      );
    }

    // Parse the JSON response from AI
    let parsedResponse;
    try {
      parsedResponse = JSON.parse(aiResponse);
    } catch (parseError) {
      console.error('Failed to parse AI response:', aiResponse);
      return NextResponse.json(
        { error: 'Failed to parse AI response' },
        { status: 500 }
      );
    }

    // Validate category
    if (!categories.includes(parsedResponse.category)) {
      parsedResponse.category = 'OTHER';
    }

    return NextResponse.json(parsedResponse);
  } catch (error) {
    console.error('AI generation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}