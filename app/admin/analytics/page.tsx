// app/admin/analytics/page.tsx
import Link from 'next/link';

export default function AdminAnalyticsPage() {
  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Platform Analytics</h1>
        <Link
          href="/admin"
          className="text-blue-500 hover:text-blue-600"
        >
          ← Back to Admin Dashboard
        </Link>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <h2 className="text-xl font-semibold mb-4">Analytics Dashboard</h2>
        <p className="text-gray-600 mb-2">
          This section will provide insights and analytics for the platform.
        </p>
        <p className="text-gray-500">
          (Under Development)
        </p>
        {/* You could add some placeholder charts or stat boxes here later */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Key Metric 1 (Placeholder)</h3>
            <p className="text-2xl font-bold">N/A</p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Key Metric 2 (Placeholder)</h3>
            <p className="text-2xl font-bold">N/A</p>
          </div>
        </div>
      </div>
    </div>
  );
}
