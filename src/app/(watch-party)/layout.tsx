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
    <div className="min-h-screen bg-[#07080b] text-zinc-100 flex flex-col antialiased">
      {children}
    </div>
  );
}
