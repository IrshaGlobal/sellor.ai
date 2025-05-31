// SEO system configuration for sellor.ai

// Meta Tags
class MetaTags {
  static generate(storeName: string, description?: string, keywords?: string[]) {
    return {
      title: `${storeName} - Online Store`,
      description: description || `Shop at ${storeName} - Your One-Stop Online Store`,
      keywords: keywords || ['online store', 'ecommerce', 'shop', 'products'],
      openGraph: {
        type: 'website',
        locale: 'en_US',
        url: process.env.NEXT_PUBLIC_APP_URL,
        site_name: storeName,
        images: [
          {
            url: '/images/logo.png',
            width: 1200,
            height: 630,
            alt: `${storeName} Logo`
          }
        ]
      },
      twitter: {
        cardType: 'summary_large_image'
      }
    };
  }
}

export { MetaTags };