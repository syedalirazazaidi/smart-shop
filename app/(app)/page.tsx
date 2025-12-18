import Link from "next/link";
import { sanityFetch } from "@/sanity/lib/live";
import { groq } from "next-sanity";
import type { Product } from "@/sanity/types";

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

export default async function Home() {
  const { data: products } = await sanityFetch({
    query: productsQuery,
  }) as { data: Product[] };

  // Get unique categories for filtering
  const categories = Array.from(
    new Set(products?.map((p) => p.category).filter(Boolean) || [])
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-950 dark:via-black dark:to-gray-950">
      {/* Hero Section */}
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

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats and Filters Bar */}
        {products && products.length > 0 && (
          <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-6">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Products</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {products.length}
                </p>
              </div>
              {categories.length > 0 && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Categories</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {categories.length}
                  </p>
                </div>
              )}
            </div>
            
            {/* Category Pills */}
            {categories.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <span
                    key={category}
                    className="px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow"
                  >
                    {category}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Products Grid */}
        {products && products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            {products.map((product) => (
              <Link
                key={product._id}
                href={`/products/${product.slug.current}`}
                className="group bg-white dark:bg-gray-900 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-200"
              >
                {/* Image Container */}
                <div className="relative aspect-square w-full overflow-hidden bg-white dark:bg-gray-100">
                  {product.imageUrl ? (
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300 dark:text-gray-400">
                      <svg
                        className="w-16 h-16"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-3">
                  {/* Product Name */}
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-0.5 line-clamp-2 leading-tight">
                    {product.name}
                  </h3>

                  {/* Shop Name (Seller) */}
                  {product.shopName && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                      {product.shopName}
                    </p>
                  )}

                  {/* Price */}
                  <div className="flex items-center justify-between">
                    <span className="text-base font-semibold text-gray-900 dark:text-white">
                      ${product.price.toFixed(2)}
                    </span>
                    {product.inStock !== false && (
                      <span className="text-[10px] text-green-600 dark:text-green-400 font-medium">
                        In Stock
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <div className="max-w-md mx-auto">
              <svg
                className="mx-auto h-24 w-24 text-gray-400 dark:text-gray-600 mb-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                No Products Available
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Import products from Sanity Studio to get started
              </p>
              <Link
                href="/studio"
                className="inline-flex items-center px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-semibold rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
              >
                Go to Sanity Studio
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
