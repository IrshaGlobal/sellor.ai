// Image optimization system configuration for sellor.ai

// Image Settings
class ImageSettings {
  static get() {
    return {
      enabled: process.env.IMAGE_OPTIMIZATION_ENABLED === 'true',
      maxFileSizeKB: parseInt(process.env.IMAGE_MAX_FILE_SIZE_KB || '500', 10), // 500 KB
      allowedFormats: (process.env.IMAGE_ALLOWED_FORMATS || 'jpg,png,gif,webp').split(','),
      quality: parseInt(process.env.IMAGE_QUALITY || '80', 10) // 80%
    };
  }
}

export { ImageSettings };

// Image Formats
class ImageFormats {
  static WEBP = 'webp';
  static AVIF = 'avif';
  static JPEG = 'jpeg';
  static PNG = 'png';
}

// Image Optimization Settings
class ImageOptimizationSettings {
  static get() {
    return {
      formats: [ImageFormats.WEBP, ImageFormats.AVIF],
      quality: parseInt(process.env.IMAGE_OPTIMIZATION_QUALITY || '80', 10),
      breakpoints: [320, 480, 768, 1024, 1280, 1536], // Responsive breakpoints
      cacheTTL: parseInt(process.env.IMAGE_OPTIMIZATION_CACHE_TTL || '86400', 10) // 1 day
    };
  }
}

export { ImageFormats, ImageOptimizationSettings };