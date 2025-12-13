import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function ProductsPage() {
  const { userId } = await auth();

  // This route is protected - middleware handles it, but adding safety check
  if (!userId) {
    redirect("/sign-in");
  }
  // Example product IDs - in a real app, fetch from database
  const exampleProducts = [
    { id: "1", name: "Product 1" },
    { id: "2", name: "Product 2" },
    { id: "3", name: "Product 3" },
  ];

  return (
    <div className="min-h-screen bg-zinc-50 font-sans dark:bg-black p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Products</h1>
        <div className="grid gap-4">
          {exampleProducts.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold">{product.name}</h2>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Click to view details (Dynamic route: /products/{product.id})
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

