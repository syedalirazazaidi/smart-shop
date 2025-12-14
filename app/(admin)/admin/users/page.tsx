import { auth } from "@clerk/nextjs/server";

export default async function AdminUsersPage() {
  const { userId } = await auth();

  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Users Management
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          View and manage all users
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
        <div className="p-6">
          <p className="text-gray-600 dark:text-gray-400">
            User list will appear here. Connect to your database to fetch users.
          </p>
        </div>
      </div>
    </div>
  );
}

