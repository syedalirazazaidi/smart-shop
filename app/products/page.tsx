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

function CarouselFallback() {
  return (
    <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-blue-950 dark:to-purple-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative">
          <div className="bg-gradient-to-br from-white via-blue-50/50 to-purple-50/50 dark:from-gray-900 dark:via-blue-950/50 dark:to-purple-950/50 rounded-lg overflow-hidden border border-gray-200/50 dark:border-gray-700/50 animate-pulse">
            <div className="flex flex-col md:flex-row">
              <div className="aspect-[2/1] md:aspect-auto md:h-64 md:w-3/5 lg:w-2/3 bg-gray-200 dark:bg-gray-700" />
              <div className="flex-1 flex flex-col justify-center p-4 md:p-5 space-y-2">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24" />
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full" />
                <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-20" />
                  <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-24" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductsFallback() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-950 dark:via-black dark:to-gray-950">
      <Suspense fallback={<CarouselFallback />}>
        <CarouselFallback />
      </Suspense>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Suspense
          fallback={
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 lg:gap-8">
              {[...Array(5)].map((_, i) => (
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
          }
        >
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
        </Suspense>
      </div>
    </div>
  );
}

export default function ProductsPageRoute() {
  return (
    <Suspense fallback={<ProductsFallback />}>
      <ProductsContent />
    </Suspense>
  );
}

