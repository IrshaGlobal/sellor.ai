import { Configuration, OpenAIApi, ChatCompletionRequestMessage } from 'openai';

// Initialize OpenAI configuration
// It's better to initialize this once and reuse, or inside the function if API key can change/be absent
let openai: OpenAIApi | null = null;
if (process.env.OPENAI_API_KEY) {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  openai = new OpenAIApi(configuration);
} else {
  console.warn("OpenAI API key is missing. AI features will be disabled.");
}

const defaultCategories = [
  'Apparel', 'Accessories', 'Home & Decor', 'Electronics',
  'Beauty & Health', 'Toys & Games', 'Books', 'Other'
];

/**
 * Generates product details using OpenAI Vision API based on an image, expecting JSON output.
 * @param imageUrl - URL of the image to analyze
 * @returns Promise with structured product data or an error object
 */
export async function generateProductFromImage(imageUrl: string) {
  if (!openai) {
    console.error("OpenAI client is not initialized due to missing API key.");
    return {
      error: true,
      message: "AI service is not configured. API key is missing.",
      title: "Manual Entry Required",
      description: "AI service unavailable. Please fill details manually.",
      tags: [],
      category: "Other"
    };
  }

  const categoriesString = process.env.AI_PRODUCT_CATEGORIES || defaultCategories.join(',');
  const categories = categoriesString.split(',').map(c => c.trim());

  const promptInstruction = process.env.AI_PRODUCT_PROMPT_JSON_MODE ||
    `You are an e-commerce product specialist. Based on the provided image, analyze it and return a single, valid JSON object. This JSON object must strictly contain the following keys: "title" (string, concise and descriptive, max 60 characters), "description" (string, engaging and informative, ideally around 50 words), "tags" (array of 3-5 relevant string SEO keywords/tags, e.g., ["tag1", "tag2"]), and "category" (string, must be one of the following values: ${categories.join(', ')}). Do not include any text or explanation outside of this JSON object.`;

  const messages: Array<ChatCompletionRequestMessage> = [
    {
      role: 'user',
      content: [
        { type: 'text', text: promptInstruction },
        { type: 'image_url', image_url: { url: imageUrl } },
      ],
    },
  ];

  try {
    const response = await openai.createChatCompletion({
      model: process.env.OPENAI_MODEL || "gpt-4-vision-preview",
      messages: messages,
      max_tokens: 350, // Increased slightly for potentially longer JSON structure
      // temperature: 0.3, // Optional: Adjust for more deterministic output if needed
    });

    const aiResponseContent = response.data.choices[0]?.message?.content;
    if (!aiResponseContent) {
      throw new Error("No content in AI response");
    }

    // Attempt to extract JSON even if there's other text (though prompt asks not to)
    let jsonString = aiResponseContent;
    const jsonMatch = aiResponseContent.match(/```json\n([\s\S]*?)\n```/);
    if (jsonMatch && jsonMatch[1]) {
      jsonString = jsonMatch[1];
    } else {
       // Fallback: try to find first '{' and last '}'
       const firstBrace = jsonString.indexOf('{');
       const lastBrace = jsonString.lastIndexOf('}');
       if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
         jsonString = jsonString.substring(firstBrace, lastBrace + 1);
       }
    }
    
    let parsedData;
    try {
      parsedData = JSON.parse(jsonString);
    } catch (parseError) {
      console.error("Failed to parse AI JSON response:", parseError, "Original content:", aiResponseContent);
      throw new Error("AI returned invalid JSON format.");
    }

    // Validate and normalize parsedData
    const { title, description } = parsedData;
    let { tags, category } = parsedData;

    if (!title || typeof title !== 'string' ||
        !description || typeof description !== 'string') {
      throw new Error("AI response missing required fields: title or description.");
    }

    // Validate and normalize tags
    if (typeof tags === 'string') {
      tags = tags.split(',').map((t: string) => t.trim()).filter(Boolean);
    } else if (!Array.isArray(tags) || !tags.every((t: any) => typeof t === 'string')) {
      console.warn("AI returned tags in an unexpected format. Defaulting to empty array. Tags:", tags);
      tags = [];
    }
    tags = tags.slice(0, 5); // Ensure max 5 tags

    // Validate category
    if (!category || typeof category !== 'string' || !categories.includes(category)) {
      console.warn(`AI returned category "${category}" not in predefined list. Defaulting to "Other".`);
      category = "Other";
    }

    return {
      success: true,
      title: title.substring(0, 100), // Ensure title doesn't exceed a reasonable length
      description,
      tags,
      category
    };

  } catch (error: any) {
    console.error("Error in generateProductFromImage:", error.response ? error.response.data : error.message);
    return {
      error: true,
      message: error.message || "Unknown error occurred during AI generation.",
      title: "Manual Entry Required",
      description: "The AI couldn't process the image or returned an unexpected format. Please fill details manually.",
      tags: [],
      category: "Other"
    };
  }
}