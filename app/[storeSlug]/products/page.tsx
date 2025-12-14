import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { getTenantFromSlug } from "@/lib/tenant";
import { notFound } from "next/navigation";

export default async function StoreProductsPage({
  params,
}: {
  params: Promise<{ storeSlug: string }>;
}) {
  const { storeSlug } = await params;
  const { userId } = await auth();
  const tenant = await getTenantFromSlug(storeSlug);

  if (!tenant) {
    notFound();
  }

  if (!userId) {
    redirect("/sign-in");
  }

  // TODO: Fetch products for this tenant
  // const products = await getProductsForTenant(tenant.id);

  const exampleProducts = [
    { id: "1", name: "Product 1", tenantId: tenant.id },
    { id: "2", name: "Product 2", tenantId: tenant.id },
    { id: "3", name: "Product 3", tenantId: tenant.id },
  ];

  return (
    <div className="min-h-screen bg-zinc-50 font-sans dark:bg-black p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">
          Products - {tenant.name}
        </h1>
        <div className="grid gap-4">
          {exampleProducts.map((product) => (
            <Link
              key={product.id}
              href={`/${storeSlug}/products/${product.id}`}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold">{product.name}</h2>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Click to view details
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

