import Navbar from "@/components/navbar";
import { ClerkProvider } from "@clerk/nextjs";
import { SanityLive } from "@/sanity/lib/live";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-zinc-50 font-sans dark:bg-black">
      <Navbar variant="default" />
      <main>
        <ClerkProvider>
        {children}
        </ClerkProvider>
        </main>
      <SanityLive />
    </div>
  );
}

