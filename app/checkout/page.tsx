import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function CheckoutPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <div className="min-h-screen bg-zinc-50 font-sans dark:bg-black p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Checkout</h1>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Complete your purchase by filling in the details below.
          </p>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Shipping Address</label>
              <input 
                type="text" 
                className="w-full p-2 border rounded"
                placeholder="Enter your address"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Payment Method</label>
              <input 
                type="text" 
                className="w-full p-2 border rounded"
                placeholder="Card number"
              />
            </div>
            <button className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700">
              Complete Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

