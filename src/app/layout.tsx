import type { Metadata } from "next";
import { Outfit, Space_Mono } from "next/font/google";
import "./globals.css";

const outfitSans = Outfit({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "NodeParty — Synchronized Watch Party & Cinema Lounge",
  description: "Watch YouTube, trailers, and live broadcasts together with friends in ultra-low latency sub-millisecond sync.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfitSans.variable} ${spaceMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[#0c0a07] text-[#f2e9d6]" suppressHydrationWarning>
        {children}
        {/* impeccable-live-start */}
        <script src="http://localhost:8400/live.js?token=a4ab5a37-33f7-425f-a120-33b08c26ceee" async></script>
        {/* impeccable-live-end */}
      </body>
    </html>
  );
}
