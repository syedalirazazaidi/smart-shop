import { notFound } from "next/navigation";
import { getTenantFromSlug } from "@/lib/tenant";
import Navbar from "@/components/navbar";

export default async function StoreLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ storeSlug: string }>;
}) {
  const { storeSlug } = await params;
  
  const tenant = await getTenantFromSlug(storeSlug);
  
  if (!tenant) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-zinc-50 font-sans dark:bg-black">
      <Navbar variant="store" storeSlug={storeSlug} />
      <main>{children}</main>
    </div>
  );
}

