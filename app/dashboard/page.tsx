import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  // Get the current user - this will only work if user is authenticated
  const { userId } = await auth();
  const user = await currentUser();

  // This is a safety check (though middleware already protects this route)
  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 font-sans dark:bg-black p-8">
      <div className="max-w-2xl w-full space-y-6">
        <h1 className="text-4xl font-bold">Protected Dashboard</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          This page is protected - only authenticated users can access it!
        </p>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4">User Information</h2>
          <div className="space-y-2">
            <p><strong>User ID:</strong> {userId}</p>
            <p><strong>Email:</strong> {user?.emailAddresses[0]?.emailAddress}</p>
            <p><strong>Name:</strong> {user?.firstName} {user?.lastName}</p>
          </div>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
          <p className="text-sm">
            <strong>Note:</strong> This route is automatically protected by the middleware. 
            If you try to access <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">/dashboard</code> 
            without being signed in, Clerk will redirect you to the sign-in page.
          </p>
        </div>
      </div>
    </div>
  );
}

