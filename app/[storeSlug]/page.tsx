import { getTenantFromSlug } from "@/lib/tenant";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function StorePage({
  params,
}: {
  params: Promise<{ storeSlug: string }>;
}) {
  const { storeSlug } = await params;
  const tenant = await getTenantFromSlug(storeSlug);
  
  if (!tenant) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Welcome to {tenant.name}
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
          Discover amazing products with AI-powered recommendations
        </p>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">Featured Products</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Browse our curated selection of featured products
            </p>
            <Link
              href={`/${storeSlug}/products`}
              className="text-blue-600 hover:underline"
            >
              View Products →
            </Link>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">New Arrivals</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Check out the latest additions to our catalog
            </p>
            <Link
              href={`/${storeSlug}/products?filter=new`}
              className="text-blue-600 hover:underline"
            >
              View New Arrivals →
            </Link>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">Best Sellers</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              See what's popular with our customers
            </p>
            <Link
              href={`/${storeSlug}/products?filter=bestsellers`}
              className="text-blue-600 hover:underline"
            >
              View Best Sellers →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

