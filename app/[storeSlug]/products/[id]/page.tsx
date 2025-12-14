import { auth } from "@clerk/nextjs/server";
import { redirect, notFound } from "next/navigation";
import { getTenantFromSlug } from "@/lib/tenant";

interface ProductPageProps {
  params: Promise<{
    storeSlug: string;
    id: string;
  }>;
}

export default async function StoreProductPage({ params }: ProductPageProps) {
  const { storeSlug, id } = await params;
  const { userId } = await auth();
  const tenant = await getTenantFromSlug(storeSlug);

  if (!tenant) {
    notFound();
  }

  if (!userId) {
    redirect("/sign-in");
  }

  // TODO: Fetch product for this tenant
  // const product = await getProductForTenant(tenant.id, id);
  // if (!product) {
  //   notFound();
  // }

  return (
    <div className="min-h-screen bg-zinc-50 font-sans dark:bg-black p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Product Details</h1>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <p className="text-lg mb-4">
            <strong>Store:</strong> {tenant.name} ({storeSlug})
          </p>
          <p className="text-lg mb-4">
            <strong>Product ID:</strong> {id}
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            This is a tenant-specific product page. Product data is isolated per tenant.
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

