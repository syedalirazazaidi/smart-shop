import { auth } from "@clerk/nextjs/server";
import { redirect, notFound } from "next/navigation";

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { userId } = await auth();

  // This route is protected - middleware handles it, but adding safety check
  if (!userId) {
    redirect("/sign-in");
  }

  const { id } = await params;

  // Example: Fetch product data based on id
  // In a real app, you'd fetch from your database/API
  // const product = await fetchProduct(id);

  // If product not found, show 404
  // if (!product) {
  //   notFound();
  // }

  return (
    <div className="min-h-screen bg-zinc-50 font-sans dark:bg-black p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Product Details</h1>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <p className="text-lg mb-4">
            <strong>Product ID:</strong> {id}
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            This is a dynamic route. The product ID from the URL is: <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">{id}</code>
          </p>
          <div className="mt-6">
            <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Optional: Generate static params for static generation
// export async function generateStaticParams() {
//   // Fetch all product IDs
//   const products = await fetchProducts();
//   return products.map((product) => ({
//     id: product.id.toString(),
//   }));
// }

