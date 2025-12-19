import { Suspense } from "react";
import { sanityFetch } from "@/sanity/lib/live";
import { groq } from "next-sanity";
import type { Product } from "@/sanity/types";
import ProductsPage from "@/components/products-page";

const productsQuery = groq`*[_type == "product"] | order(_createdAt desc) {
  _id,
  name,
  slug,
  price,
  category,
  shopName,
  imageUrl,
  description,
  inStock
}`;

async function ProductsContent() {
  const { data: products } = await sanityFetch({
    query: productsQuery,
  }) as { data: Product[] };

  // Get unique categories for filtering
  const categories = Array.from(
    new Set(products?.map((p) => p.category).filter((c): c is string => Boolean(c)) || [])
  );

  return <ProductsPage products={products || []} categories={categories} />;
}

function ProductsFallback() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-950 dark:via-black dark:to-gray-950">
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">
              Discover Amazing Products
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Shop from our curated collection of premium products across multiple stores
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 lg:gap-8">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden animate-pulse"
            >
              <div className="aspect-[4/3] w-full bg-gray-200 dark:bg-gray-700" />
              <div className="p-3 space-y-2">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<ProductsFallback />}>
      <ProductsContent />
    </Suspense>
  );
}
