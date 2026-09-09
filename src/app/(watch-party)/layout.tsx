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
    <div className="min-h-screen flex flex-col antialiased relative" style={{ backgroundColor: "var(--background)", color: "var(--foreground)" }}>
      {children}
    </div>
  );
}

