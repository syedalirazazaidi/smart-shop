import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Navbar from "@/components/navbar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  // TODO: Add admin role check here
  // const user = await currentUser();
  // if (user?.publicMetadata?.role !== 'admin') {
  //   redirect("/");
  // }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar variant="admin" />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}

