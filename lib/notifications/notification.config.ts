// Notification system configuration for sellor.ai

// Notification Channels
enum NotificationChannels {
  EMAIL = 'email',
  SMS = 'sms',
  PUSH = 'push'
}

// Notification Types
enum NotificationTypes {
  ORDER_CONFIRMATION = 'order-confirmation',
  SHIPPING_NOTIFICATION = 'shipping-notification',
  NEW_ORDER_VENDOR = 'new-order-vendor',
  WELCOME_EMAIL = 'welcome-email'
}

// Notification Templates
class NotificationTemplates {
  static get(type: string) {
    switch (type) {
      case NotificationTypes.ORDER_CONFIRMATION:
        return {
          subject: 'Your Order is Confirmed',
          body: `
            <h1>Thank You for Your Order!</h1>
            <p>Your order has been confirmed.</p>
            <p>Order Summary:</p>
            <ul>
              {{#each items}}
                <li>{{this.name}} - {{this.quantity}} x ${{this.price}}</li>
              {{/each}}
            </ul>
            <p>Total: ${{total}}</p>
          `,
          channel: NotificationChannels.EMAIL
        };
      case NotificationTypes.SHIPPING_NOTIFICATION:
        return {
          subject: 'Your Order Has Shipped',
          body: `
            <h1>Your Order Has Shipped!</h1>
            <p>Your order has shipped.</p>
            <p>Tracking Number: {{trackingNumber}}</p>
            <p>Track your order here: <a href="{{trackingUrl}}">Track Order</a></p>
          `,
          channel: NotificationChannels.EMAIL
        };
      case NotificationTypes.NEW_ORDER_VENDOR:
        return {
          subject: 'You Have a New Order!',
          body: `
            <h1>You Have a New Order!</h1>
            <p>Order Details:</p>
            <ul>
              {{#each items}}
                <li>{{this.name}} - {{this.quantity}} x ${{this.price}}</li>
              {{/each}}
            </ul>
            <p>Total: ${{total}}</p>
            <p>Customer Information:
            <address>
              {{customer.name}}<br />
              {{customer.email}}<br />
              {{shippingAddress.street}}<br />
              {{shippingAddress.city}}, {{shippingAddress.state}} {{shippingAddress.zipCode}}
            </address>
            <p><a href="{{dashboardUrl}}">View Order in Dashboard</a></p>
          `,
          channel: NotificationChannels.EMAIL
        };
      case NotificationTypes.WELCOME_EMAIL:
        return {
          subject: 'Welcome to sellor.ai!',
          body: `
            <h1>Welcome to sellor.ai!</h1>
            <p>Your store is ready.</p>
            <p>Login to add products and start selling:</p>
            <a href="{{loginUrl}}">Sign In</a>
          `,
          channel: NotificationChannels.EMAIL
        };
      default:
        console.error(`Unknown notification type: ${type}`);
        throw new Error(`Unknown notification type: ${type}`);
    }
  }
}

export { NotificationChannels, NotificationTypes, NotificationTemplates };