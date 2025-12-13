import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { UserButton } from "@clerk/nextjs";

export default async function ProfilePage() {
  const { userId } = await auth();
  const user = await currentUser();

  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <div className="min-h-screen bg-zinc-50 font-sans dark:bg-black p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-4xl font-bold">My Profile</h1>
          <UserButton afterSignOutUrl="/" />
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow space-y-4">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Account Information</h2>
            <div className="space-y-2">
              <p><strong>Name:</strong> {user?.firstName} {user?.lastName}</p>
              <p><strong>Email:</strong> {user?.emailAddresses[0]?.emailAddress}</p>
              <p><strong>User ID:</strong> {userId}</p>
            </div>
          </div>
          
          <div className="border-t pt-4">
            <h3 className="text-xl font-semibold mb-2">Account Settings</h3>
            <div className="space-y-2">
              <button className="text-blue-600 hover:underline">Edit Profile</button>
              <br />
              <button className="text-blue-600 hover:underline">Change Password</button>
              <br />
              <button className="text-blue-600 hover:underline">Manage Addresses</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

