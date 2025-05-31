import { NextRequest, NextResponse } from 'next/server';
import { newOrderVendorEmail, orderConfirmationCustomerEmail, shippingConfirmationCustomerEmail, welcomeVendorEmail } from '@/app/api/emails/templates';

// This would be replaced with actual email sending service in production
const mockSendEmail = (to: string, subject: string, html: string) => {
  console.log(`
Sending email to: ${to}
Subject: ${subject}
---
${html}
---
`);
  return Promise.resolve();
};

export async function POST(request: NextRequest) {
  try {
    const { type, data } = await request.json();
    
    let subject = '';
    let htmlContent = '';
    let toEmail = '';
    
    // Determine which email template to use based on type
    switch (type) {
      case 'new_order_vendor':
        subject = `You have a new order! (#${data.order.id}) - ${data.store.storeName}`;
        htmlContent = newOrderVendorEmail(data.order, data.store);
        toEmail = data.vendor.email;
        break;
      
      case 'order_confirmation_customer':
        subject = `Your Order #${data.order.id} from ${data.store.storeName} is Confirmed!`;
        htmlContent = orderConfirmationCustomerEmail(data.order, data.store);
        toEmail = data.customer.email;
        break;
      
      case 'shipping_confirmation_customer':
        subject = `Your Order #${data.order.id} from ${data.store.storeName} has Shipped!`;
        htmlContent = shippingConfirmationCustomerEmail(data.order, data.store, data.trackingNumber);
        toEmail = data.customer.email;
        break;
      
      case 'welcome_vendor':
        subject = `Welcome to sellor.ai! Your store ${data.vendor.storeName} is ready`;
        htmlContent = welcomeVendorEmail(data.vendor, data.storeUrl);
        toEmail = data.vendor.email;
        break;
      
      default:
        return NextResponse.json(
          { error: 'Invalid email type' },
          { status: 400 }
        );
    }
    
    // Send the email using our mock function (replace with actual email service)
    await mockSendEmail(toEmail, subject, htmlContent);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}