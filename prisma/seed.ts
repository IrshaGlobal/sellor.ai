import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create predefined product categories if they don't exist
  const predefinedCategories = [
    'Apparel',
    'Accessories',
    'Home & Decor',
    'Electronics',
    'Beauty & Health',
    'Toys & Games',
    'Books',
    'Other'
  ];

  for (const categoryName of predefinedCategories) {
    await prisma.productCategory.upsert({
      where: { name: categoryName },
      update: {},
      create: { 
        name: categoryName,
        description: `${categoryName} category`,
        isActive: true
      },
    });
  }

  console.log('Predefined categories have been created or verified.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });