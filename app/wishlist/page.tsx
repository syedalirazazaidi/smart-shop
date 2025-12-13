import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function WishlistPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <div className="min-h-screen bg-zinc-50 font-sans dark:bg-black p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">My Wishlist</h1>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <p className="text-gray-600 dark:text-gray-400">
            Your wishlist is empty. Add products to your wishlist to see them here!
          </p>
        </div>
      </div>
    </div>
  );
}

