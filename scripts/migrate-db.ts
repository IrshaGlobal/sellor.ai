import { db } from '@/lib/db';
import { ProductCategory } from '@prisma/client';

async function main() {
  console.log('Starting database migration...');
  
  // Create predefined product categories if they don't exist
  const predefinedCategories: { name: string; description: string; }[] = [
    { name: 'Apparel', description: 'Clothing and apparel items' },
    { name: 'Accessories', description: 'Accessories and add-on products' },
    { name: 'Home & Decor', description: 'Home goods and decorative items' },
    { name: 'Electronics', description: 'Electronic devices and gadgets' },
    { name: 'Beauty & Health', description: 'Beauty products and health items' },
    { name: 'Toys & Games', description: 'Toys, games, and entertainment' },
    { name: 'Books', description: 'Books and publications' },
    { name: 'Other', description: 'Other product categories' }
  ];
  
  // Check if categories already exist
  const existingCategories = await db.productCategory.findMany();
  const existingCategoryNames = existingCategories.map(cat => cat.name);
  
  // Create any missing categories
  const categoriesToCreate = predefinedCategories.filter(
    category => !existingCategoryNames.includes(category.name)
  );
  
  if (categoriesToCreate.length > 0) {
    console.log(`Creating ${categoriesToCreate.length} new product categories...`);
    
    await db.productCategory.createMany({
      data: categoriesToCreate.map(category => ({
        name: category.name,
        description: category.description,
        isActive: true
      }))
    });
    
    console.log(`${categoriesToCreate.length} product categories created successfully.`);
  } else {
    console.log('All predefined categories already exist.');
  }
  
  // Add any other migration steps here as needed
  // For example, creating platform admin user, setting up default plan, etc.
  
  console.log('Database migration completed successfully.');
}

main()
  .catch((e) => {
    console.error('Database migration failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });