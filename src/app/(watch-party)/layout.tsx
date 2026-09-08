import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Watch Party Lounge | NodeParty Cinema",
  description: "Watch videos in real-time synchronized cinema rooms with friends",
};

export default function WatchPartyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-blue-50 to-purple-100 text-zinc-900 flex flex-col antialiased relative">
      <div className="absolute inset-0 bg-white/40 pointer-events-none" />
      {children}
    </div>
  );
}
