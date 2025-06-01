import { NextRequest, NextResponse } from 'next/server';
import { generateProductFromImage } from '@/lib/ai/generateProduct'; // Ensure correct path

export async function POST(request: NextRequest) {
  try {
    const { imageUrl } = await request.json();

    if (!imageUrl) {
      return NextResponse.json({ error: 'Image URL is required' }, { status: 400 });
    }

    // The generateProductFromImage function now handles OpenAI interaction,
    // JSON parsing, and validation.
    const result = await generateProductFromImage(imageUrl);

    if (result.error) {
      // The lib function returns a message and an error flag.
      // We can decide the status code based on the type of error if more detail is needed in future.
      // For now, if the lib flags an error, treat it as a server-side issue or bad input from AI.
      // If the message indicates a configuration issue (like missing API key from the lib),
      // that's a 500. If it's "AI returned invalid JSON" or "No content", that's also 500.
      console.error('AI Generation Error from lib:', result.message);
      return NextResponse.json({ error: result.message || 'AI generation failed' }, { status: 500 });
    }

    // If success is true, result contains title, description, tags, category
    if (result.success) {
      return NextResponse.json({
        title: result.title,
        description: result.description,
        tags: result.tags, // This should be an array of strings from the lib
        category: result.category,
      });
    }

    // Fallback for unexpected structure from lib, though it should always have error or success
    console.error('Unexpected result structure from generateProductFromImage:', result);
    return NextResponse.json({ error: 'AI generation returned an unexpected result structure' }, { status: 500 });

  } catch (error: any) { // Catch any unexpected errors during request processing in this route
    console.error('Error in /api/ai/generate route:', error.message, error.stack);
    return NextResponse.json({ error: 'Internal server error in AI generation route' }, { status: 500 });
  }
}