// Security system configuration for sellor.ai

// Security Settings
class SecuritySettings {
  static get() {
    return {
      enableRateLimiting: process.env.SECURITY_ENABLE_RATE_LIMITING === 'true',
      enableCORS: process.env.SECURITY_ENABLE_CORS === 'true',
      enableCSRFProtection: process.env.SECURITY_ENABLE_CSRF_PROTECTION === 'true',
      enableXSSProtection: process.env.SECURITY_ENABLE_XSS_PROTECTION === 'true',
      enableContentSecurityPolicy: process.env.SECURITY_ENABLE_CONTENT_SECURITY_POLICY === 'true'
    };
  }
}

export { SecuritySettings };

// Security Headers
class SecurityHeaders {
  static get() {
    return {
      'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'; frame-ancestors 'none';",
      'X-Frame-Options': 'DENY',
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy': "camera=(), microphone=(), geolocation=(), interest-cohort=()",
      'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload'
    };
  }
}

// CSRF Protection
class CSRFProtection {
  static isEnabled(): boolean {
    return process.env.CSRF_PROTECTION === 'true';
  }

  static getToken(): string {
    return process.env.CSRF_TOKEN || '';
  }
}

export { SecurityHeaders, CSRFProtection };