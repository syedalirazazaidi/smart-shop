import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function OrdersPage() {
  const { userId } = await auth();
  const user = await currentUser();

  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <div className="min-h-screen bg-zinc-50 font-sans dark:bg-black p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">My Orders</h1>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            You haven't placed any orders yet. Your order history will appear here.
          </p>
          <div className="mt-4">
            <p className="text-sm text-gray-500 mb-2">Example dynamic routes:</p>
            <div className="space-y-2">
              <a href="/orders/123" className="text-blue-600 hover:underline block">
                View Order #123
              </a>
              <a href="/orders/456" className="text-blue-600 hover:underline block">
                View Order #456
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

