# sellor.ai

sellor.ai is a multi-vendor SaaS e-commerce platform with AI-assisted product creation from a single image.

## Key Features

*   **AI Product Creation (Image-to-Product):** Generate product listings, including titles, descriptions, and categories, from a single image using AI.
*   **Vendor Storefronts:** Each vendor gets a customizable storefront accessible via a subdomain (e.g., `yourstore.sellor.ai`) or a custom domain.
*   **Simple Store Customization:** Easy-to-use tools for vendors to personalize their store's appearance.
*   **Secure Payments via Stripe Connect:** Securely process payments and manage payouts to vendors using Stripe Connect.
*   **Platform Subscription for Vendors:** Vendors subscribe to the platform to access its features and sell their products.

## Technology Stack

*   **Frontend:** Next.js, React, Tailwind CSS
*   **Backend:** Next.js (API Routes)
*   **Database:** PostgreSQL with Prisma ORM
*   **Authentication:** NextAuth.js
*   **AI:** OpenAI API (e.g., GPT-4 Vision)
*   **Payments:** Stripe (Stripe Connect for vendors, Stripe Subscriptions for platform fees)
*   **Deployment:** Compatible with Vercel, Netlify, AWS, GCP, and other platforms supporting Node.js applications.

## Prerequisites

*   Node.js (>=18.x)
*   npm or yarn
*   PostgreSQL server running
*   Access to OpenAI API key
*   Stripe account with API keys (secret and publishable)

## Environment Variables

Create a `.env` file in the root of the project. You can copy the example file if one exists: `cp .env.example .env`.

The following environment variables are required:

*   `DATABASE_URL`: PostgreSQL connection string (e.g., `postgresql://user:password@host:port/database`)
*   `OPENAI_API_KEY`: Your OpenAI API key.
*   `OPENAI_MODEL`: (Optional) The OpenAI model to use (e.g., `gpt-4-vision-preview`).
*   `AI_PRODUCT_CATEGORIES`: (Optional) Comma-separated string of product categories for AI generation.
*   `AI_PRODUCT_PROMPT_JSON_MODE`: (Optional) Custom prompt for AI product generation in JSON mode.
*   `STRIPE_SECRET_KEY`: Your Stripe secret API key.
*   `STRIPE_PUBLISHABLE_KEY`: Your Stripe publishable API key.
*   `STRIPE_WEBHOOK_SECRET`: Your Stripe webhook secret for verifying incoming webhooks.
*   `STRIPE_PLATFORM_PRICE_ID`: (Optional) The Stripe Price ID for your platform's subscription plan (e.g., `price_xxxx`).
*   `NEXTAUTH_URL`: The canonical URL of your application (e.g., `http://localhost:3000` for development).
*   `NEXTAUTH_SECRET`: A secret key used to sign NextAuth.js tokens.
*   `NEXT_PUBLIC_APP_URL`: The publicly accessible URL of your application (e.g., `http://localhost:3000` or `https://yourdomain.com`).

*(Ensure you add any other necessary variables, such as those for email services if integrated.)*

## Getting Started / Installation

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    ```
2.  Navigate to the project directory:
    ```bash
    cd sellor-ai
    ```
3.  Install dependencies:
    ```bash
    npm install
    ```
    or
    ```bash
    yarn install
    ```
4.  Create your environment file:
    ```bash
    cp .env.example .env
    ```
    (If `.env.example` does not exist, create `.env` manually and add the variables listed above.)
5.  Update `.env` with your specific credentials and configurations.
6.  Generate Prisma Client:
    ```bash
    npx prisma generate
    ```
7.  Apply database migrations:
    ```bash
    npx prisma migrate dev --name init
    ```
    *(You can replace `init` with a more descriptive migration name if preferred.)*
8.  Seed the database (if a seed script is configured):
    ```bash
    npx prisma db seed
    ```

## Available Scripts

*   `npm run dev`: Runs the application in development mode (usually on `http://localhost:3000`).
*   `npm run build`: Builds the application for production.
*   `npm run start`: Starts a production server (after building).
*   `npm run lint`: Lints the codebase using Next.js's ESLint configuration.
*   `npm run prisma:generate`: Generates Prisma Client based on your schema.
*   `npm run prisma:seed`: Executes the database seed script (`prisma/seed.ts`).
*   `npm run prisma:migrate`: Applies pending database migrations.

## Project Structure

*   `app/`: Next.js 13+ App Router structure.
    *   `api/`: Backend API routes.
    *   `admin/`: Pages related to the platform admin panel.
    *   `vendor/`: Pages related to the vendor dashboard.
    *   `store/[store]/`: Dynamic routes for vendor storefronts.
    *   `register/`: User registration and onboarding pages.
*   `components/`: Shared React components used across the application.
*   `lib/`: Core application logic, services, and utilities (e.g., AI integration, Stripe payments, Prisma helpers, authentication).
*   `prisma/`: Contains the database schema (`schema.prisma`), migration files, and the seed script (`seed.ts`).
*   `public/`: Static assets like images, fonts, etc.
*   `config/`: (If used) Additional configuration files that are not environment variables.

## Contributing

Contributions are welcome! If you have suggestions for improvements or find any issues, please open an issue or submit a pull request.

1.  Fork the repository.
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request.
