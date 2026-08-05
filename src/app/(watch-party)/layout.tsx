import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Watch Party | NodeParty",
  description: "Watch YouTube videos in real-time synchronized rooms",
};

export default function WatchPartyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col antialiased">
      {children}
    </div>
  );
}
