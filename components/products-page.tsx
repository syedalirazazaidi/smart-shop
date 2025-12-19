"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Product } from "@/sanity/types";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Autoplay from "embla-carousel-autoplay";

interface ProductsPageProps {
  products: Product[];
  categories: string[];
}

export default function ProductsPage({ products, categories }: ProductsPageProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const autoplayPlugin = useMemo(
    () =>
      Autoplay({
        delay: 4000,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    []
  );

  const featuredProducts = products?.slice(1, 5) || [];

  const totalPages = Math.ceil((products?.length || 0) / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProducts = products?.slice(startIndex, endIndex) || [];

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("ellipsis");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("ellipsis");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("ellipsis");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("ellipsis");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-950 dark:via-black dark:to-gray-950">
      <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-blue-950 dark:to-purple-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Featured Products Carousel */}
          {featuredProducts.length > 0 && (
            <div className="relative">
              <Carousel
                plugins={[autoplayPlugin]}
                opts={{
                  align: "start",
                  loop: true,
                }}
                className="w-full"
              >
                <CarouselContent className="-ml-2 md:-ml-4">
                  {featuredProducts.map((product) => (
                    <CarouselItem key={product._id} className="pl-2 md:pl-4 basis-full">
                      <Link
                        href={`/products/${product.slug.current}`}
                        className="group block bg-gradient-to-br from-white via-blue-50/50 to-purple-50/50 dark:from-gray-900 dark:via-blue-950/50 dark:to-purple-950/50 rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm"
                      >
                        <div className="flex flex-col md:flex-row">
                          {/* Image Container */}
                          <div 
                            className="relative aspect-[2/1] md:aspect-auto md:h-64 md:w-3/5 lg:w-2/3 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
                            style={product.imageUrl ? {
                              backgroundImage: `url(${product.imageUrl})`,
                              backgroundSize: 'cover',
                              backgroundPosition: 'center',
                              backgroundRepeat: 'no-repeat'
                            } : {}}
                          >
                            {/* Overlay gradient for better text readability */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            
                            {/* Fallback icon when no image */}
                            {!product.imageUrl && (
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
                            
                            {product.inStock !== false && (
                              <div className="absolute top-2 right-2 z-10">
                                <span className="px-2 py-1 bg-green-500 text-white text-xs font-semibold rounded-full shadow-lg backdrop-blur-sm">
                                  ✓ In Stock
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Product Info */}
                          <div className="flex-1 flex flex-col justify-center p-4 md:p-5 space-y-2 bg-gradient-to-r from-transparent to-white/30 dark:to-gray-900/30">
                            {/* Shop Name */}
                            {product.shopName && (
                              <div>
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 text-blue-700 dark:text-blue-300 text-xs font-semibold rounded border border-blue-200/50 dark:border-blue-700/50 shadow-sm">
                                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                                  </svg>
                                  {product.shopName}
                                </span>
                              </div>
                            )}

                            {/* Product Name */}
                            <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                              {product.name}
                            </h3>

                            {/* Category */}
                            {product.category && (
                              <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider font-medium">
                                {product.category}
                              </p>
                            )}

                            {/* Description */}
                            {product.description && (
                              <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2">
                                {product.description}
                              </p>
                            )}

                            {/* Price and CTA */}
                            <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-800">
                              <span className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                                ${product.price.toFixed(2)}
                              </span>
                              <button className="px-4 py-2 bg-gradient-to-r from-gray-900 to-gray-800 dark:from-white dark:to-gray-100 text-white dark:text-gray-900 text-xs font-semibold rounded-lg hover:from-gray-800 hover:to-gray-700 dark:hover:from-gray-100 dark:hover:to-gray-200 transition-all shadow-md hover:shadow-lg">
                                View →
                              </button>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border hover:bg-white dark:hover:bg-gray-800 shadow-md" />
                <CarouselNext className="right-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border hover:bg-white dark:hover:bg-gray-800 shadow-md" />
              </Carousel>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className=" flex max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            All Products
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Explore our wide range of products across various categories
          </p>  
        </div>
        {/* Stats and Filters Bar */}
        <div>
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
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6 lg:gap-8">
              {paginatedProducts.map((product) => (
              <Link
                key={product._id}
                href={`/products/${product.slug.current}`}
                className="group bg-white dark:bg-gray-900 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-200"
              >
                {/* Image Container */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-white dark:bg-gray-100">
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

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-12 flex justify-center">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          if (currentPage > 1) {
                            setCurrentPage(currentPage - 1);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }
                        }}
                        className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                      />
                    </PaginationItem>

                    {getPageNumbers().map((page, index) => (
                      <PaginationItem key={index}>
                        {page === "ellipsis" ? (
                          <PaginationEllipsis />
                        ) : (
                          <PaginationLink
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              setCurrentPage(page as number);
                              window.scrollTo({ top: 0, behavior: "smooth" });
                            }}
                            isActive={currentPage === page}
                          >
                            {page}
                          </PaginationLink>
                        )}
                      </PaginationItem>
                    ))}

                    <PaginationItem>
                      <PaginationNext
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          if (currentPage < totalPages) {
                            setCurrentPage(currentPage + 1);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }
                        }}
                        className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </>
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
    </div>
  );
}

