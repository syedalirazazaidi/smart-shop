import { auth } from "@clerk/nextjs/server";
import { redirect, notFound } from "next/navigation";

interface OrderPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function OrderDetailsPage({ params }: OrderPageProps) {
  const { userId } = await auth();

  // This route is protected - middleware handles it, but adding safety check
  if (!userId) {
    redirect("/sign-in");
  }

  const { id } = await params;

  // Example: Fetch order data based on id and userId
  // In a real app, you'd fetch from your database/API
  // const order = await fetchOrder(id, userId);
  // if (!order) {
  //   notFound();
  // }

  return (
    <div className="min-h-screen bg-zinc-50 font-sans dark:bg-black p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Order Details</h1>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <p className="text-lg mb-4">
            <strong>Order ID:</strong> {id}
          </p>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            This is a protected dynamic route. The order ID from the URL is: <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">{id}</code>
          </p>
          <div className="space-y-2">
            <p><strong>Status:</strong> Processing</p>
            <p><strong>Date:</strong> {new Date().toLocaleDateString()}</p>
            <p><strong>Total:</strong> $0.00</p>
          </div>
        </div>
      </div>
    </div>
  );
}

