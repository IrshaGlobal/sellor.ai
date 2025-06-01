// app/page.tsx
import { Button } from "@/components/ui/button";
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Launch Your Online Store in Minutes with AI Power
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Upload an image, our AI does the rest. Start selling today!
              </p>
            </div>
            <div className="space-x-4">
              <Link href="/register">
                <button className="inline-flex h-10 items-center justify-center rounded-md bg-black px-8 text-sm font-medium text-white shadow transition-colors hover:bg-black/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
                  Start Your Free Trial
                </button>
              </Link>
              <Link href="/register">
                <button className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
                  Create Your Store Now
                </button>
              </Link>
            </div>
            <div className="mt-8">
              <img
                src="/storefront-mockup.png"
                alt="Storefront mockup"
                width={800}
                height={400}
                className="mx-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-16">How It Works</h2>
          <div className="relative">
            {/* Connecting Line - adjust gradient and position as needed */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent transform -translate-y-1/2" style={{zIndex: 0}}></div>

            <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center space-y-10 md:space-y-0 md:space-x-8" style={{zIndex: 1}}>

              {/* Step 1: Sign Up */}
              <div className="flex flex-col items-center text-center p-4 flex-1">
                <div className="mb-4 w-16 h-16 border-2 border-blue-500 rounded-full flex items-center justify-center bg-white">
                  <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                </div>
                <h3 className="mb-2 text-xl font-bold">Sign Up</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  Create your account and get ready to start selling.
                </p>
              </div>

              {/* Step 2: Upload Product Image (with AI) */}
              <div className="flex flex-col items-center text-center p-4 flex-1">
                <div className="mb-4 w-16 h-16 border-2 border-blue-500 rounded-full flex items-center justify-center bg-white">
                  <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M18.5 14.5L18.5 14.5M16 20L16 20M8 20L8 20M5.5 14.5L5.5 14.5M12 17.5L12 17.5"></path></svg>
                  {/* AI chip icon or similar */}
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">AI</div>
                </div>
                <h3 className="mb-2 text-xl font-bold">Upload Product Image</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  Let our AI analyze your product and generate details.
                </p>
              </div>

              {/* Step 3: AI Generates Details */}
              <div className="flex flex-col items-center text-center p-4 flex-1">
                <div className="mb-4 w-16 h-16 border-2 border-blue-500 rounded-full flex items-center justify-center bg-white">
                  <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                </div>
                <h3 className="mb-2 text-xl font-bold">AI Generates Details</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  Get title, description, tags, and category suggestions.
                </p>
              </div>

              {/* Step 4: Customize & Launch */}
              <div className="flex flex-col items-center text-center p-4 flex-1">
                <div className="mb-4 w-16 h-16 border-2 border-blue-500 rounded-full flex items-center justify-center bg-white">
                  <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 16H4a1 1 0 00-1 1v3a1 1 0 001 1h1M19 16h1a1 1 0 011 1v3a1 1 0 01-1 1h-1"></path></svg>
                </div>
                <h3 className="mb-2 text-xl font-bold">Customize & Launch</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  Make it yours and start selling online immediately.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">Key Features</h2>
          <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4">
            <div className="flex flex-col items-start">
              <h3 className="mb-2 text-xl font-bold">AI Product Creation</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Transform product images into complete listings with AI-generated descriptions, titles, and tags.
              </p>
            </div>
            <div className="flex flex-col items-start">
              <h3 className="mb-2 text-xl font-bold">Simple Store Customization</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Customize your store with a clean theme, logo upload, and accent color selection.
              </p>
            </div>
            <div className="flex flex-col items-start">
              <h3 className="mb-2 text-xl font-bold">Secure Payments</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Integrated payment processing with Stripe Connect for seamless transactions.
              </p>
            </div>
            <div className="flex flex-col items-start">
              <h3 className="mb-2 text-xl font-bold">Custom Domain</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Use your own domain name with automatic SSL encryption for secure connections.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">Pricing Plans</h2>
          <div className="max-w-md mx-auto">
            <div className="relative flex flex-col rounded-lg border bg-card p-6 shadow-sm">
              <div className="space-y-2">
                <h3 className="font-bold tracking-tight text-xl">Launch Plan</h3>
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold">$29/month</span>
                  <span className="ml-1 text-sm text-muted-foreground">+ 2% transaction fee</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Perfect for getting started and growing your online business
                </p>
              </div>
              <ul className="my-6 space-y-2">
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4 text-primary">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  AI Product Creation
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4 text-primary">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  Unlimited Products
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4 text-primary">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  1 Staff Account
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4 text-primary">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  Standard Theme
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4 text-primary">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  Subdomain + Custom Domain Support
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4 text-primary">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  Secure Checkout
                </li>
              </ul>
              <Link href="/register">
                <button className="mt-6 inline-flex h-10 items-center justify-center rounded-md bg-black px-8 text-sm font-medium text-white shadow transition-colors hover:bg-black/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
                  Get Started with Launch Plan
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-2">How does AI product creation work?</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Simply upload a product image and our AI will analyze it to generate a title, description, tags, and category suggestions. You can edit these details before publishing your product.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Can I use my own domain?</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Yes! You can connect your custom domain by adding a CNAME record pointing to your subdomain. We'll automatically provision an SSL certificate for secure connections.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">What are the fees?</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  The Launch Plan is $29/month plus a 2% transaction fee on sales. There are no additional fees for using your own domain or connecting your Stripe account.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">How do I get paid?</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Customers pay directly to your connected Stripe account. After deducting our platform fee, funds are transferred to your bank account according to your Stripe payout schedule.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-6 bg-gray-900 text-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm">© {new Date().getFullYear()} sellor.ai. All rights reserved.</p>
            </div>
            <div className="flex space-x-4">
              <a href="/terms-of-service" className="text-sm hover:underline">Terms of Service</a>
              <a href="/privacy-policy" className="text-sm hover:underline">Privacy Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
