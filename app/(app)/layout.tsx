import Navbar from "@/components/navbar";
import ClerkProviderClient from '@/components/ClerkProviderClient';
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
        <ClerkProviderClient>
          {children}
        </ClerkProviderClient>
      </main>
      <SanityLive />
    </div>
  );
}

