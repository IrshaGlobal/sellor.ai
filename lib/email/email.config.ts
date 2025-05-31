// Email service configuration for sellor.ai
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// Email Templates
class EmailTemplates {
  static async sendWelcomeEmail(to: string, storeName: string) {
    return resend.emails.send({
      from: process.env.EMAIL_FROM || 'notifications@sellor.ai',
      to,
      subject: `Welcome to sellor.ai - Your Store ${storeName} is Ready`,
      html: `
        <h1>Welcome to sellor.ai!</h1>
        <p>Your store <strong>${storeName}</strong> is ready.</p>
        <p>Login to add products and start selling:</p>
        <a href="${process.env.NEXT_PUBLIC_APP_URL}/auth/signin">Sign In</a>
      `
    });
  }

  static async sendOrderConfirmation(to: string, order: any) {
    return resend.emails.send({
      from: process.env.EMAIL_FROM || 'notifications@sellor.ai',
      to,
      subject: `Your Order #${order.id} from ${order.storeName} is Confirmed`,
      html: `
        <h1>Thank You for Your Order!</h1>
        <p>Your order #${order.id} has been confirmed.</p>
        <p>Order Summary:</p>
        <ul>
          ${order.items.map((item: any) => `
            <li>${item.name} - ${item.quantity} x $${item.price.toFixed(2)}</li>
          `).join('')}
        </ul>
        <p>Total: $${order.total.toFixed(2)}</p>
        <p>Shipping Address:
        <address>
          ${order.shippingAddress.name}<br />
          ${order.shippingAddress.street}<br />
          ${order.shippingAddress.city}, ${order.shippingAddress.state} ${order.shippingAddress.zipCode}
        </address>
      `
    });
  }

  static async sendShippingNotification(to: string, order: any) {
    return resend.emails.send({
      from: process.env.EMAIL_FROM || 'notifications@sellor.ai',
      to,
      subject: `Your Order #${order.id} from ${order.storeName} has Shipped`,
      html: `
        <h1>Your Order Has Shipped!</h1>
        <p>Your order #${order.id} has shipped.</p>
        <p>Tracking Number: ${order.trackingNumber}</p>
        <p>Track your order here: <a href="${order.trackingUrl}">Track Order</a></p>
      `
    });
  }

  static async sendVendorNewOrderNotification(to: string, order: any) {
    return resend.emails.send({
      from: process.env.EMAIL_FROM || 'notifications@sellor.ai',
      to,
      subject: `You Have a New Order! (#${order.id}) - ${order.storeName}`,
      html: `
        <h1>You Have a New Order!</h1>
        <p>Order Details:</p>
        <ul>
          ${order.items.map((item: any) => `
            <li>${item.name} - ${item.quantity} x $${item.price.toFixed(2)}</li>
          `).join('')}
        </ul>
        <p>Total: $${order.total.toFixed(2)}</p>
        <p>Customer Information:
        <address>
          ${order.customer.name}<br />
          ${order.customer.email}<br />
          ${order.shippingAddress.street}<br />
          ${order.shippingAddress.city}, ${order.shippingAddress.state} ${order.shippingAddress.zipCode}
        </address>
        <p><a href="${process.env.NEXT_PUBLIC_APP_URL}/vendor/orders/${order.id}">View Order in Dashboard</a></p>
      `
    });
  }
}

export { EmailTemplates };