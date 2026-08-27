import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[#07080b] text-zinc-100">{children}{/* impeccable-live-start */}
<script src="http://localhost:8400/live.js?token=a4ab5a37-33f7-425f-a120-33b08c26ceee"></script>
{/* impeccable-live-end */}
</body>
    </html>
  );
}
