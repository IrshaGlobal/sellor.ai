// Order system configuration for sellor.ai

// Order Statuses
class OrderStatuses {
  static PENDING = 'pending';
  static PROCESSING = 'processing';
  static SHIPPED = 'shipped';
  static DELIVERED = 'delivered';
  static CANCELLED = 'cancelled';
}

// Order Settings
class OrderSettings {
  static get() {
    return {
      statuses: [
        OrderStatuses.PENDING,
        OrderStatuses.PROCESSING,
        OrderStatuses.SHIPPED,
        OrderStatuses.DELIVERED,
        OrderStatuses.CANCELLED
      ],
      defaultStatus: OrderStatuses.PENDING,
      maxItemsPerOrder: parseInt(process.env.ORDER_MAX_ITEMS || '50', 10),
      expirationMinutes: parseInt(process.env.ORDER_EXPIRATION_MINUTES || '1440', 10) // 24 hours
    };
  }
}

export { OrderStatuses, OrderSettings };