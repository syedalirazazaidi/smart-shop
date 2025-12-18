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

export default async function ProductsPageRoute() {
  const { data: products } = await sanityFetch({
    query: productsQuery,
  }) as { data: Product[] };

  // Get unique categories for filtering
  const categories = Array.from(
    new Set(products?.map((p) => p.category).filter((c): c is string => Boolean(c)) || [])
  );

  return <ProductsPage products={products || []} categories={categories} />;
}

