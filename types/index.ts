// User Types
export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  role: 'vendor' | 'admin' | 'platform_owner' | 'customer';
  createdAt: Date;
  updatedAt: Date;
}

export interface Vendor {
  id: string;
  storeName: string;
  urlSlug: string;
  contactEmail: string | null;
  logoUrl: string | null;
  accentColor: string | null;
  description: string | null;
  stripeAccountId: string | null;
  subscriptionStatus: 'active' | 'inactive' | 'past_due' | 'canceled';
  customDomain: string | null;
  isCustomDomainVerified: boolean;
  userId: string;
  user: User;
  products: Product[];
  orders: Order[];
  settings: StoreSettings;
}

export interface Admin {
  id: string;
  userId: string;
  user: User;
  role: 'platform_owner' | 'admin';
  permissions: string[];
}

// Product Types
export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  sku: string | null;
  inventoryQuantity: number | null;
  tags: string;
  categoryId: string;
  category: ProductCategory;
  vendorId: string;
  vendor: Vendor;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductCategory {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  products: Product[];
}

// Order Types
export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  shippingAddress: string;
  shippingCity: string;
  shippingState: string;
  shippingZip: string;
  subtotal: number;
  shipping: number;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentStatus: 'paid' | 'unpaid' | 'failed';
  trackingNumber: string | null;
  vendorId: string;
  vendor: Vendor;
  items: OrderItem[];
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  id: string;
  productId: string;
  product: Product;
  orderId: string;
  order: Order;
  quantity: number;
  price: number;
  createdAt: Date;
  updatedAt: Date;
}

// Store Settings Types
export interface StoreSettings {
  id: string;
  vendorId: string;
  vendor: Vendor;
  defaultShippingRate: number;
  freeShippingThreshold: number | null;
  refundPolicy: string;
  privacyPolicy: string;
  termsOfService: string;
  createdAt: Date;
  updatedAt: Date;
}

// AI Product Generation Types
export interface AIProductGeneration {
  id: string;
  imageUrl: string;
  rawResponse: string;
  generatedTitle: string;
  generatedDescription: string;
  generatedTags: string;
  generatedCategory: string;
  vendorId: string;
  vendor: Vendor;
  createdAt: Date;
}

// Subscription Types
export interface PlatformSubscription {
  id: string;
  vendorId: string;
  vendor: Vendor;
  stripeCustomerId: string;
  stripeSubscriptionId: string;
  planName: string;
  price: number;
  status: 'active' | 'inactive' | 'past_due' | 'canceled';
  currentPeriodEnd: Date;
  cancelAtPeriodEnd: boolean;
  transactionFeePercentage: number;
  createdAt: Date;
  updatedAt: Date;
}

// Email Types
export interface EmailTemplateData {
  order: Order;
  store: {
    storeName: string;
    contactEmail?: string;
  };
  vendor: {
    name: string;
    storeName: string;
    email: string;
  };
  customer: {
    email: string;
  };
  trackingNumber?: string;
  storeUrl?: string;
}

// File Upload Types
export interface ImageUploadResult {
  success: boolean;
  url?: string;
  error?: string;
  filename?: string;
  size?: number;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Stripe Webhook Event Type
export type StripeWebhookEvent = {
  id: string;
  object: 'event';
  api_version: string;
  created: number;
  data: {
    object: any;
    previous_attributes?: any;
  };
  livemode: boolean;
  pending_webhooks: number;
  request: {
    id: string;
    idempotency_key: string;
  };
  type: string;
};