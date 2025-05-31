// New Order Notification to Vendor
export const newOrderVendorEmail = (order: any, store: any) => `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
    <div style="text-align: center; padding: 20px 0;">
      <h1 style="color: #000; font-size: 24px; margin-bottom: 10px;">New Order Received</h1>
      <p style="color: #666; font-size: 14px;">You have a new order! (#${order.id}) - ${store.storeName}</p>
    </div>
    
    <div style="background-color: #f8f9fa; border-radius: 8px; padding: 20px; margin: 20px 0;">
      <p style="margin-bottom: 20px;">You have received a new order from ${order.customerName}.</p>
      
      <div style="margin: 20px 0;">
        <h2 style="color: #000; font-size: 18px; margin-bottom: 10px;">Order Details:</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <th style="text-align: left; padding: 8px; border-bottom: 1px solid #ddd;">Product</th>
            <th style="text-align: right; padding: 8px; border-bottom: 1px solid #ddd;">Quantity</th>
            <th style="text-align: right; padding: 8px; border-bottom: 1px solid #ddd;">Price</th>
          </tr>
          ${order.items.map(item => `
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #ddd;">${item.title}</td>
            <td style="text-align: right; padding: 8px; border-bottom: 1px solid #ddd;">${item.quantity}</td>
            <td style="text-align: right; padding: 8px; border-bottom: 1px solid #ddd;">$${(item.price * item.quantity).toFixed(2)}</td>
          </tr>
          `).join('')}
          <tr>
            <td colSpan={2} style="text-align: right; padding: 8px; font-weight: bold;">Subtotal:</td>
            <td style="text-align: right; padding: 8px; font-weight: bold;">$${order.subtotal.toFixed(2)}</td>
          </tr>
          <tr>
            <td colSpan={2} style="text-align: right; padding: 8px; font-weight: bold;">Shipping:</td>
            <td style="text-align: right; padding: 8px; font-weight: bold;">$${order.shipping.toFixed(2)}</td>
          </tr>
          <tr>
            <td colSpan={2} style="text-align: right; padding: 8px; font-weight: bold; font-size: 16px;">Total:</td>
            <td style="text-align: right; padding: 8px; font-weight: bold; font-size: 16px;">$${order.total.toFixed(2)}</td>
          </tr>
        </table>
      </div>
      
      <p style="margin-top: 20px;">
        You can view this order in your dashboard:
        <a href="https://sellor.ai/vendor/orders/${order.id}" style="color: #000; text-decoration: underline;">
          https://sellor.ai/vendor/orders/${order.id}
        </a>
      </p>
      
      <p style="margin-top: 30px; color: #666; font-size: 12px; text-align: center;">
        This is an automated message from sellor.ai. If you did not expect this order, please contact support.
      </p>
    </div>
  </div>
`;

// Order Confirmation to Customer
export const orderConfirmationCustomerEmail = (order: any, store: any) => `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
    <div style="text-align: center; padding: 20px 0;">
      <h1 style="color: #000; font-size: 24px; margin-bottom: 10px;">Your Order is Confirmed</h1>
      <p style="color: #666; font-size: 14px;">Order #${order.id} from ${store.storeName}</p>
    </div>
    
    <div style="background-color: #f8f9fa; border-radius: 8px; padding: 20px; margin: 20px 0;">
      <p style="margin-bottom: 20px;">Thank you for your order at ${store.storeName}! Your order has been confirmed and will be processed soon.</p>
      
      <div style="margin: 20px 0;">
        <h2 style="color: #000; font-size: 18px; margin-bottom: 10px;">Order Details:</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <th style="text-align: left; padding: 8px; border-bottom: 1px solid #ddd;">Product</th>
            <th style="text-align: right; padding: 8px; border-bottom: 1px solid #ddd;">Quantity</th>
            <th style="text-align: right; padding: 8px; border-bottom: 1px solid #ddd;">Price</th>
          </tr>
          ${order.items.map(item => `
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #ddd;">${item.title}</td>
            <td style="text-align: right; padding: 8px; border-bottom: 1px solid #ddd;">${item.quantity}</td>
            <td style="text-align: right; padding: 8px; border-bottom: 1px solid #ddd;">$${(item.price * item.quantity).toFixed(2)}</td>
          </tr>
          `).join('')}
          <tr>
            <td colSpan={2} style="text-align: right; padding: 8px; font-weight: bold;">Subtotal:</td>
            <td style="text-align: right; padding: 8px; font-weight: bold;">$${order.subtotal.toFixed(2)}</td>
          </tr>
          <tr>
            <td colSpan={2} style="text-align: right; padding: 8px; font-weight: bold;">Shipping:</td>
            <td style="text-align: right; padding: 8px; font-weight: bold;">$${order.shipping.toFixed(2)}</td>
          </tr>
          <tr>
            <td colSpan={2} style="text-align: right; padding: 8px; font-weight: bold; font-size: 16px;">Total:</td>
            <td style="text-align: right; padding: 8px; font-weight: bold; font-size: 16px;">$${order.total.toFixed(2)}</td>
          </tr>
        </table>
      </div>
      
      <p style="margin-top: 20px;">
        For order updates and tracking information, visit our website or contact the store directly at ${store.contactEmail || 'the store owner'}.
      </p>
      
      <p style="margin-top: 30px; color: #666; font-size: 12px; text-align: center;">
        This is an automated confirmation from sellor.ai. For questions about your order, please contact the store directly.
      </p>
    </div>
  </div>
`;

// Shipping Confirmation to Customer
export const shippingConfirmationCustomerEmail = (order: any, store: any, trackingNumber: string) => `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
    <div style="text-align: center; padding: 20px 0;">
      <h1 style="color: #000; font-size: 24px; margin-bottom: 10px;">Your Order has Shipped</h1>
      <p style="color: #666; font-size: 14px;">Order #${order.id} from ${store.storeName}</p>
    </div>
    
    <div style="background-color: #f8f9fa; border-radius: 8px; padding: 20px; margin: 20px 0;">
      <p style="margin-bottom: 20px;">Great news! Your order from ${store.storeName} has shipped!</p>
      
      <div style="margin: 20px 0;">
        <h2 style="color: #000; font-size: 18px; margin-bottom: 10px;">Order Details:</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <th style="text-align: left; padding: 8px; border-bottom: 1px solid #ddd;">Product</th>
            <th style="text-align: right; padding: 8px; border-bottom: 1px solid #ddd;">Quantity</th>
            <th style="text-align: right; padding: 8px; border-bottom: 1px solid #ddd;">Price</th>
          </tr>
          ${order.items.map(item => `
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #ddd;">${item.title}</td>
            <td style="text-align: right; padding: 8px; border-bottom: 1px solid #ddd;">${item.quantity}</td>
            <td style="text-align: right; padding: 8px; border-bottom: 1px solid #ddd;">$${(item.price * item.quantity).toFixed(2)}</td>
          </tr>
          `).join('')}
          <tr>
            <td colSpan={2} style="text-align: right; padding: 8px; font-weight: bold;">Subtotal:</td>
            <td style="text-align: right; padding: 8px; font-weight: bold;">$${order.subtotal.toFixed(2)}</td>
          </tr>
          <tr>
            <td colSpan={2} style="text-align: right; padding: 8px; font-weight: bold;">Shipping:</td>
            <td style="text-align: right; padding: 8px; font-weight: bold;">$${order.shipping.toFixed(2)}</td>
          </tr>
          <tr>
            <td colSpan={2} style="text-align: right; padding: 8px; font-weight: bold; font-size: 16px;">Total:</td>
            <td style="text-align: right; padding: 8px; font-weight: bold; font-size: 16px;">$${order.total.toFixed(2)}</td>
          </tr>
        </table>
      </div>
      
      <p style="margin-top: 20px;">
        Tracking Number: ${trackingNumber}
        <br />
        Expected Delivery: 5-7 business days
        <br /><br />
        For order updates and tracking information, visit our website or contact the store directly.
      </p>
      
      <p style="margin-top: 30px; color: #666; font-size: 12px; text-align: center;">
        This is an automated message from sellor.ai. For questions about your order, please contact the store directly.
      </p>
    </div>
  </div>
`;

// Welcome Email to Vendor after registration
export const welcomeVendorEmail = (vendor: any, storeUrl: string) => `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
    <div style="text-align: center; padding: 20px 0;">
      <h1 style="color: #000; font-size: 24px; margin-bottom: 10px;">Welcome to sellor.ai</h1>
      <p style="color: #666; font-size: 14px;">Your store ${vendor.storeName} is ready</p>
    </div>
    
    <div style="background-color: #f8f9fa; border-radius: 8px; padding: 20px; margin: 20px 0;">
      <p style="margin-bottom: 20px;">Hello ${vendor.name},</p>
      
      <p style="margin-bottom: 20px;">Welcome to sellor.ai! Your online store <strong>${vendor.storeName}</strong> is now ready to start selling. Your store URL is: <a href="https://${storeUrl}.sellor.ai" style="color: #000; text-decoration: underline;">${storeUrl}.sellor.ai</a></p>
      
      <p style="margin-bottom: 20px;">
        Here are some next steps to get started:
        <ul style="margin: 10px 0; padding-left: 20px;">
          <li style="margin: 5px 0;">• Add products using AI-assisted creation</li>
          <li style="margin: 5px 0;">• Customize your store design</li>
          <li style="margin: 5px 0;">• Connect your Stripe account for payments</li>
          <li style="margin: 5px 0;">• Configure shipping and tax settings</li>
        </ul>
      </p>
      
      <p style="margin-bottom: 20px;">
        Log in to your vendor dashboard to manage your store:
        <br />
        <a href="https://sellor.ai/vendor/login" style="color: #000; text-decoration: underline;">
          https://sellor.ai/vendor/login
        </a>
      </p>
      
      <p style="margin-top: 30px; color: #666; font-size: 12px; text-align: center;">
        This is an automated message from sellor.ai. Please do not reply to this email.
      </p>
    </div>
  </div>
`;