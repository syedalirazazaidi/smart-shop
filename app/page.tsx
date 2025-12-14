import { UserButton, SignInButton, SignUpButton, SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-4xl font-bold">Welcome to Ecommerce AI</h1>
        
        <SignedOut>
          <div className="flex gap-4">
            <SignInButton routing="path" path="/sign-in">
              <button className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
                Sign In
              </button>
            </SignInButton>
            <SignUpButton routing="path" path="/sign-up">
              <button className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700">
                Sign Up
              </button>
            </SignUpButton>
          </div>
        </SignedOut>

        <SignedIn>
          <div className="flex flex-col items-center gap-6">
            <div className="flex items-center gap-4">
              <p className="text-lg">You are signed in!</p>
              <UserButton afterSignOutUrl="/" />
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-4">
              <Link 
                href="/products"
                className="rounded bg-orange-600 px-4 py-2 text-white hover:bg-orange-700 text-center"
              >
                🛍️ Products
              </Link>
              <Link 
                href="/cart"
                className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 text-center"
              >
                🛒 Cart
              </Link>
              <Link 
                href="/checkout"
                className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700 text-center"
              >
                💳 Checkout
              </Link>
              <Link 
                href="/orders"
                className="rounded bg-purple-600 px-4 py-2 text-white hover:bg-purple-700 text-center"
              >
                📦 Orders
              </Link>
              <Link 
                href="/wishlist"
                className="rounded bg-pink-600 px-4 py-2 text-white hover:bg-pink-700 text-center"
              >
                ❤️ Wishlist
              </Link>
              <Link 
                href="/profile"
                className="rounded bg-gray-600 px-4 py-2 text-white hover:bg-gray-700 text-center"
              >
                👤 Profile
              </Link>
              <Link 
                href="/dashboard"
                className="rounded bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 text-center"
              >
                📊 Dashboard
              </Link>
              <Link 
                href="/admin/dashboard"
                className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700 text-center"
              >
                🔐 Admin Panel
              </Link>
            </div>
          </div>
        </SignedIn>
      </div>
    </div>
  );
}
