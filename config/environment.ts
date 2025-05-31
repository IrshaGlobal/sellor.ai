// Environment configuration for sellor.ai
export const PORT = parseInt(process.env.PORT || '3000');
export const NODE_ENV = process.env.NODE_ENV || 'development';
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || `http://localhost:${PORT}`;

// Database configuration
export const DATABASE_URL = process.env.DATABASE_URL || 
  'postgresql://postgres:password@localhost:5432/sellor_ai?schema=public';

// OpenAI configuration
export const OPENAI_API_KEY = process.env.OPENAI_API_KEY || '';
export const OPENAI_MODEL = process.env.OPENAI_MODEL || 'gpt-4-vision-preview';

// Stripe configuration
export const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY || '';
export const STRIPE_PUBLISHABLE_KEY = process.env.STRIPE_PUBLISHABLE_KEY || '';
export const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET || '';
export const STRIPE_PLATFORM_PRICE_ID = process.env.STRIPE_PLATFORM_PRICE_ID || 'price_1NwXQJGz8eRvdWuKZ6Y7DvL9';

// Email configuration
export const RESEND_API_KEY = process.env.RESEND_API_KEY || '';
export const EMAIL_FROM = process.env.EMAIL_FROM || 'notifications@sellor.ai';

// Authentication configuration
export const SESSION_SECRET = process.env.SESSION_SECRET || 'your-session-secret-key';
export const AUTH_ORIGIN = process.env.AUTH_ORIGIN || `http://localhost:${PORT}`;

// AI Product Generation Prompt
export const AI_PRODUCT_PROMPT = process.env.AI_PRODUCT_PROMPT || 
  "You are an e-commerce product specialist. Based on this image, generate a compelling product title (max 60 chars), a descriptive product description (approx 50 words), 3-5 relevant SEO keywords/tags, and suggest the most appropriate category from this list: Apparel, Accessories, Home & Decor, Electronics, Beauty & Health, Toys & Games, Books, Other.";

// AI Product Categories
export const AI_PRODUCT_CATEGORIES = process.env.AI_PRODUCT_CATEGORIES?.split(',') || [
  'Apparel',
  'Accessories',
  'Home & Decor',
  'Electronics',
  'Beauty & Health',
  'Toys & Games',
  'Books',
  'Other'
];

// Feature flags for MVP
export const FEATURE_FLAGS = {
  aiProductGeneration: true,
  customDomains: true,
  stripeConnect: true,
  emailNotifications: true,
  multiVendor: true,
  adminPanel: true
};

// Logging configuration
export const LOG_LEVEL = process.env.LOG_LEVEL || 'info';
export const LOG_FORMAT = process.env.LOG_FORMAT || 'pretty'; // 'pretty' or 'json'

// Rate limiting configuration
export const RATE_LIMITS = {
  auth: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again after 15 minutes'
  },
  aiGeneration: {
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 50, // limit each vendor to 50 AI generations per hour
    message: 'AI generation limit reached. Please try again later.'
  }
};

// Validation rules
export const VALIDATION_RULES = {
  product: {
    maxTitleLength: 60,
    maxDescriptionLength: 500,
    minPrice: 0.01,
    maxPrice: 1000000,
    maxTags: 5,
    maxTagLength: 30,
    maxImages: 5
  },
  store: {
    maxStoreNameLength: 50,
    maxDescriptionLength: 1000
  }
};

// Export all configuration
export default {
  PORT,
  NODE_ENV,
  APP_URL,
  DATABASE_URL,
  OPENAI_API_KEY,
  OPENAI_MODEL,
  STRIPE_SECRET_KEY,
  STRIPE_PUBLISHABLE_KEY,
  STRIPE_WEBHOOK_SECRET,
  STRIPE_PLATFORM_PRICE_ID,
  RESEND_API_KEY,
  EMAIL_FROM,
  SESSION_SECRET,
  AUTH_ORIGIN,
  AI_PRODUCT_PROMPT,
  AI_PRODUCT_CATEGORIES,
  FEATURE_FLAGS,
  LOG_LEVEL,
  LOG_FORMAT,
  RATE_LIMITS,
  VALIDATION_RULES
};