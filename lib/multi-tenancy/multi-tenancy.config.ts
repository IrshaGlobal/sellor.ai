// Multi-tenancy system configuration for sellor.ai

// Tenant Resolver
class TenantResolver {
  static getTenantFromSubdomain(host: string) {
    const subdomain = host.split('.')[0];
    if (!subdomain || subdomain === 'www') {
      return null; // Default tenant or public store
    }
    return subdomain;
  }
}

// Tenant Configuration
class TenantConfiguration {
  static get(subdomain: string) {
    return {
      name: subdomain,
      database: `tenant_${subdomain}`,
      storageBucket: `tenant-${subdomain}`,
      features: [
        'products',
        'orders',
        'settings'
      ]
    };
  }
}

export { TenantResolver, TenantConfiguration };