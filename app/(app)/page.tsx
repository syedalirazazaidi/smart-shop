import { Button } from "@/components/ui/button";
import { UserButton, SignInButton, SignUpButton, SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <div className="flex flex-col items-center gap-6 max-w-2xl w-full px-4">
        <h1 className="text-4xl font-bold text-center">Welcome to Ecommerce AI</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 text-center">
          Multi-tenant ecommerce platform
        </p>
        
      </div>
    </div>
  );
}
