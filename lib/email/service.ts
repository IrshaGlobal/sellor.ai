import { Resend } from 'resend';
import {
  newOrderVendorEmail,
  orderConfirmationCustomerEmail,
  shippingConfirmationCustomerEmail,
  welcomeVendorEmail
} from '@/app/api/emails/templates';

// Initialize Resend with API key from environment variables
const resend = new Resend(process.env.RESEND_API_KEY);

// Type definitions for email data
interface OrderData {
  id: string;
  subtotal: number;
  shipping: number;
  total: number;
  customerName: string;
  items: Array<{
    id: string;
    title: string;
    price: number;
    quantity: number;
  }>;
}

interface StoreData {
  storeName: string;
  contactEmail?: string;
}

interface VendorData {
  name: string;
  storeName: string;
  email: string;
}

/**
 * Sends an email using Resend
 * @param to - Recipient email address
 * @param subject - Email subject
 * @param html - HTML content of the email
 * @returns Promise with send result
 */
async function sendEmail(to: string, subject: string, html: string) {
  try {
    // In production, use a proper from address from your domain
    const from = process.env.EMAIL_FROM || 'notifications@sellor.ai';
    
    const data = await resend.emails.send({
      from,
      to,
      subject,
      html,
    });
    
    return data;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}

/**
 * Sends a new order notification to a vendor
 * @param order - Order data
 * @param store - Store data
 * @param vendorEmail - Vendor's email address
 * @returns Promise with send result
 */
export async function sendNewOrderVendorEmail(order: OrderData, store: StoreData, vendorEmail: string) {
  const html = newOrderVendorEmail(order, store);
  const subject = `You have a new order! (#${order.id}) - ${store.storeName}`;
  
  return sendEmail(vendorEmail, subject, html);
}

/**
 * Sends an order confirmation to a customer
 * @param order - Order data
 * @param store - Store data
 * @param customerEmail - Customer's email address
 * @returns Promise with send result
 */
export async function sendOrderConfirmationCustomerEmail(order: OrderData, store: StoreData, customerEmail: string) {
  const html = orderConfirmationCustomerEmail(order, store);
  const subject = `Your Order #${order.id} from ${store.storeName} is Confirmed!`;
  
  return sendEmail(customerEmail, subject, html);
}

/**
 * Sends a shipping confirmation to a customer
 * @param order - Order data
 * @param store - Store data
 * @param customerEmail - Customer's email address
 * @param trackingNumber - Tracking number for the shipment
 * @returns Promise with send result
 */
export async function sendShippingConfirmationCustomerEmail(
  order: OrderData, 
  store: StoreData, 
  customerEmail: string, 
  trackingNumber: string
) {
  const html = shippingConfirmationCustomerEmail(order, store, trackingNumber);
  const subject = `Your Order #${order.id} from ${store.storeName} has Shipped!`;
  
  return sendEmail(customerEmail, subject, html);
}

/**
 * Sends a welcome email to a new vendor
 * @param vendor - Vendor data
 * @param storeUrl - Store URL slug
 * @returns Promise with send result
 */
export async function sendWelcomeVendorEmail(vendor: VendorData, storeUrl: string) {
  const html = welcomeVendorEmail(vendor, storeUrl);
  const subject = `Welcome to sellor.ai! Your store ${vendor.storeName} is ready`;
  
  return sendEmail(vendor.email, subject, html);
}