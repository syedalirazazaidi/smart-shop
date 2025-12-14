import { auth } from "@clerk/nextjs/server";

export default async function AdminProductsPage() {
  const { userId } = await auth();

  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Products Management
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Manage your product catalog
          </p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          + Add Product
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
        <div className="p-6">
          <p className="text-gray-600 dark:text-gray-400">
            No products yet. Click "Add Product" to create your first product.
          </p>
        </div>
      </div>
    </div>
  );
}

