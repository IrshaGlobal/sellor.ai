// app/page.tsx
import { Button } from "@/components/ui/button";

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
              <button className="inline-flex h-10 items-center justify-center rounded-md bg-black px-8 text-sm font-medium text-white shadow transition-colors hover:bg-black/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
                Start Your Free Trial
              </button>
              <button className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
                Create Your Store Now
              </button>
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
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">How It Works</h2>
          <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 rounded-full bg-primary p-3 text-white">
                1
              </div>
              <h3 className="mb-2 text-xl font-bold">Sign Up</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Create your account and get ready to start selling.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 rounded-full bg-primary p-3 text-white">
                2
              </div>
              <h3 className="mb-2 text-xl font-bold">Upload Product Image</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Let our AI analyze your product and generate details.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 rounded-full bg-primary p-3 text-white">
                3
              </div>
              <h3 className="mb-2 text-xl font-bold">AI Generates Details</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Get title, description, tags, and category suggestions.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 rounded-full bg-primary p-3 text-white">
                4
              </div>
              <h3 className="mb-2 text-xl font-bold">Customize & Launch</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Make it yours and start selling online immediately.
              </p>
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
              <button className="mt-6 inline-flex h-10 items-center justify-center rounded-md bg-black px-8 text-sm font-medium text-white shadow transition-colors hover:bg-black/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
                Get Started with Launch Plan
              </button>
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
              <a href="#" className="text-sm hover:underline">Terms of Service</a>
              <a href="#" className="text-sm hover:underline">Privacy Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
