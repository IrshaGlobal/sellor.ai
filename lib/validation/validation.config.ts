// Validation system configuration for sellor.ai

// Product Validation Rules
class ProductValidationRules {
  static validateTitle(title: string) {
    if (title.length > 60) {
      throw new Error('Title must be 60 characters or less');
    }
  }

  static validateDescription(description: string) {
    if (description.length > 500) {
      throw new Error('Description must be 500 characters or less');
    }
  }

  static validatePrice(price: number) {
    if (price < 0.01 || price > 1000000) {
      throw new Error('Price must be between $0.01 and $1,000,000');
    }
  }

  static validateTags(tags: string[]) {
    if (tags.length > 5) {
      throw new Error('Maximum of 5 tags allowed');
    }
    
    tags.forEach(tag => {
      if (tag.length > 30) {
        throw new Error('Each tag must be 30 characters or less');
      }
    });
  }

  static validateImages(images: string[]) {
    if (images.length > 5) {
      throw new Error('Maximum of 5 images allowed');
    }
  }
}

// Store Validation Rules
class StoreValidationRules {
  static validateStoreName(name: string) {
    if (name.length > 50) {
      throw new Error('Store name must be 50 characters or less');
    }
  }

  static validateDescription(description: string) {
    if (description.length > 1000) {
      throw new Error('Description must be 1000 characters or less');
    }
  }
}

export { ProductValidationRules, StoreValidationRules };