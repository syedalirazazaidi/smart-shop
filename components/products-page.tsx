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
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [sortBy, setSortBy] = useState<"newest" | "price-low" | "price-high" | "name">("newest");
  const itemsPerPage = 9;

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

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = [...(products || [])];

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    // Filter by price range
    filtered = filtered.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "name":
          return a.name.localeCompare(b.name);
        case "newest":
        default:
          return new Date(b._createdAt).getTime() - new Date(a._createdAt).getTime();
      }
    });

    return filtered;
  }, [products, selectedCategory, priceRange, sortBy]);

  // Reset to page 1 when filters change
  useMemo(() => {
    setCurrentPage(1);
  }, [selectedCategory, priceRange, sortBy]);

  const totalPages = Math.ceil((filteredProducts?.length || 0) / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProducts = filteredProducts?.slice(startIndex, endIndex) || [];

  // Get min and max prices for range slider
  const minPrice = useMemo(() => {
    return products?.length > 0 ? Math.min(...products.map((p) => p.price)) : 0;
  }, [products]);
  const maxPrice = useMemo(() => {
    return products?.length > 0 ? Math.max(...products.map((p) => p.price)) : 10000;
  }, [products]);

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
        <div className="max-w-7xl mx-auto my-4 px-4 sm:px-6 lg:px-8">
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Side - Filters */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-950 dark:to-indigo-950 rounded-lg border border-blue-200/50 dark:border-blue-800/50 p-4 sticky top-4 shadow-md">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-1.5 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-md">
                  <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                  </svg>
                </div>
                <h3 className="text-base font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
                  Filters
                </h3>
              </div>

              {/* Sort By */}
              <div className="mb-4">
                <label className="block text-xs font-semibold text-blue-700 dark:text-blue-300 mb-2">
                  Sort By
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                  className="w-full px-3 py-1.5 text-sm bg-white dark:bg-gray-800 border border-blue-200 dark:border-blue-700 rounded-md text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all"
                >
                  <option value="newest">Newest First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name">Name: A to Z</option>
                </select>
              </div>

              {/* Category Filter */}
              {categories.length > 0 && (
                <div className="mb-4">
                  <label className="block text-xs font-semibold text-blue-700 dark:text-blue-300 mb-2">
                    Category
                  </label>
                  <div className="space-y-1.5">
                    <button
                      onClick={() => setSelectedCategory(null)}
                      className={`w-full text-left px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200 ${
                        selectedCategory === null
                          ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-sm"
                          : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-blue-100 dark:border-blue-900 hover:border-blue-300 dark:hover:border-blue-700 hover:bg-blue-50 dark:hover:bg-blue-950/30"
                      }`}
                    >
                      All Categories
                    </button>
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`w-full text-left px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200 ${
                          selectedCategory === category
                            ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-sm"
                            : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-blue-100 dark:border-blue-900 hover:border-blue-300 dark:hover:border-blue-700 hover:bg-blue-50 dark:hover:bg-blue-950/30"
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Price Range */}
              <div className="mb-4">
                <label className="block text-xs font-semibold text-blue-700 dark:text-blue-300 mb-2">
                  Price Range
                </label>
                <div className="space-y-2">
                  <div className="flex gap-1.5">
                    <input
                      type="number"
                      min={0}
                      max={maxPrice}
                      value={priceRange[0]}
                      onChange={(e) =>
                        setPriceRange([Number(e.target.value), priceRange[1]])
                      }
                      className="flex-1 px-2 py-1.5 text-xs bg-white dark:bg-gray-800 border border-blue-200 dark:border-blue-700 rounded-md text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      placeholder="Min"
                    />
                    <input
                      type="number"
                      min={0}
                      max={maxPrice}
                      value={priceRange[1]}
                      onChange={(e) =>
                        setPriceRange([priceRange[0], Number(e.target.value)])
                      }
                      className="flex-1 px-2 py-1.5 text-xs bg-white dark:bg-gray-800 border border-blue-200 dark:border-blue-700 rounded-md text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      placeholder="Max"
                    />
                  </div>
                  <div className="px-2 py-1.5 bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-md border border-blue-200 dark:border-blue-800">
                    <div className="text-xs font-medium text-blue-700 dark:text-blue-300">
                      ${priceRange[0].toFixed(2)} - ${priceRange[1].toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Clear Filters */}
              {(selectedCategory || priceRange[0] > 0 || priceRange[1] < maxPrice) && (
                <button
                  onClick={() => {
                    setSelectedCategory(null);
                    setPriceRange([0, maxPrice]);
                  }}
                  className="w-full px-3 py-1.5 text-xs bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-md font-semibold hover:from-red-600 hover:to-pink-600 transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  Clear All Filters
                </button>
              )}
            </div>
          </div>

          {/* Right Side - Products */}
          <div className="flex-1">
            <div className="mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                All Products
              </h2>
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
                Explore our wide range of products across various categories
              </p>
              {products && products.length > 0 && (
                <div className="flex items-center gap-4">
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Showing</p>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">
                      {filteredProducts.length} of {products.length}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Products Grid */}
            {filteredProducts && filteredProducts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4">
              {paginatedProducts.map((product) => (
              <Link
                key={product._id}
                href={`/products/${product.slug.current}`}
                className="group bg-gradient-to-br from-white to-blue-50/50 dark:from-gray-900 dark:to-blue-950/30 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 border border-transparent hover:border-blue-200 dark:hover:border-blue-800 transform hover:-translate-y-0.5"
              >
                {/* Image Container */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 dark:from-blue-900 dark:via-indigo-900 dark:to-purple-900">
                  {product.imageUrl ? (
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
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
                <div className="p-2.5">
                  {/* Product Name */}
                  <h3 className="text-xs font-bold text-gray-900 dark:text-white mb-0.5 line-clamp-2 leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {product.name}
                  </h3>

                  {/* Shop Name (Seller) */}
                  {product.shopName && (
                    <div className="mb-1.5">
                      <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/50 dark:to-purple-900/50 text-indigo-700 dark:text-indigo-300 text-[10px] font-semibold rounded border border-indigo-200 dark:border-indigo-800">
                        <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                        </svg>
                        {product.shopName}
                      </span>
                    </div>
                  )}

                  {/* Price */}
                  <div className="flex items-center justify-between pt-1.5 border-t border-blue-100 dark:border-blue-900">
                    <span className="text-sm font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
                      ${product.price.toFixed(2)}
                    </span>
                    {product.inStock !== false && (
                      <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-[9px] font-semibold rounded-full">
                        <svg className="w-2 h-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
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
              <div className="mt-6 flex justify-center">
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
                {selectedCategory || priceRange[0] > 0 || priceRange[1] < maxPrice
                  ? "No products match your filters. Try adjusting your filters."
                  : "Import products from Sanity Studio to get started"}
              </p>
              {(selectedCategory || priceRange[0] > 0 || priceRange[1] < maxPrice) && (
                <button
                  onClick={() => {
                    setSelectedCategory(null);
                    setPriceRange([0, maxPrice]);
                  }}
                  className="inline-flex items-center px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-semibold rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>
        )}
          </div>
        </div>
      </div>
    </div>
  );
}

