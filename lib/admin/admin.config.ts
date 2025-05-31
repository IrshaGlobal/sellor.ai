// Admin system configuration for sellor.ai

// Admin Settings
class AdminSettings {
  static get() {
    return {
      dashboardAccess: process.env.ADMIN_DASHBOARD_ACCESS === 'true',
      analyticsAccess: process.env.ADMIN_ANALYTICS_ACCESS === 'true',
      vendorManagementAccess: process.env.ADMIN_VENDOR_MANAGEMENT_ACCESS === 'true',
      orderManagementAccess: process.env.ADMIN_ORDER_MANAGEMENT_ACCESS === 'true',
      subscriptionManagementAccess: process.env.ADMIN_SUBSCRIPTION_MANAGEMENT_ACCESS === 'true'
    };
  }
}

export { AdminSettings };