"use client";

import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import JoinRoomCard from "@/components/home/JoinRoomCard";
import { InteractiveHeroDemo } from "@/components/home/InteractiveHeroDemo";
import { HowItWorks } from "@/components/home/HowItWorks";
import { CreateRoomModal } from "@/components/home/CreateRoomModal";
import { ArrowRight, Film, Radio, Sparkles, Zap, Shield, Check } from "@/icons";

/* Palette: Tap House Gold */
const c = {
  pageBg: "#0c0a07",
  cardBg: "#161310",
  text: "#f2e9d6",
  muted: "#907a5a",
  gold: "#c8962e",
  goldHover: "#dba940",
  bannerBg: "#c8962e",
  bannerText: "#0c0a07",
  border: "#27211a",
};

const photos = {
  cinema:      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1400&auto=format&fit=crop",
  gaming:      "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800&auto=format&fit=crop",
  homeTheater: "https://images.unsplash.com/photo-1593784991095-a205069470b6?q=80&w=1400&auto=format&fit=crop",
};

export function HomePageContainer() {
  return (
    <div className="relative min-h-screen flex flex-col antialiased" style={{ backgroundColor: c.pageBg, color: c.text }}>
      <div className="fixed inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 70% 30% at 50% -5%, rgba(200,150,46,0.07) 0%, transparent 70%)" }} />

      <Navbar />

      <main className="relative z-10 flex-1 flex flex-col">

        {/* ═══════════════════════════════════════════════════════════════════
            HERO: FULL-BLEED CINEMA ATMOSPHERE & HEADLINE
        ═══════════════════════════════════════════════════════════════════ */}
        <section className="relative w-full overflow-hidden" style={{ minHeight: 520 }}>
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${photos.cinema})` }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(12,10,7,0.95) 40%, rgba(12,10,7,0.7) 70%, rgba(12,10,7,0.9) 100%)" }} />
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 flex flex-col justify-end h-full text-left" style={{ minHeight: 520 }}>
            <div className="space-y-6 max-w-2xl">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-[-0.04em] leading-[0.92]">
                Watch movies and games together, in perfect sync.
              </h1>

              <p className="text-sm sm:text-base leading-relaxed max-w-xl" style={{ color: c.muted }}>
                Private screening rooms for you and your friends. Paste any link, share the code, and stream in lockstep 4K sync. No accounts, no downloads.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="#join-hub"
                  className="px-7 py-3.5 rounded-xl text-sm font-bold transition-colors shadow-xl"
                  style={{ backgroundColor: c.gold, color: c.bannerText }}
                >
                  Start a Room
                </a>
                <a
                  href="#join-hub"
                  className="text-sm underline underline-offset-4 transition-colors font-semibold"
                  style={{ color: c.text }}
                >
                  Join with a code
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── Gold Statement Banner ── */}
        <section className="w-full py-8 px-6 sm:px-8" style={{ backgroundColor: c.bannerBg }}>
          <p className="max-w-5xl mx-auto text-xl sm:text-3xl font-black tracking-tight leading-snug text-center" style={{ color: c.bannerText }}>
            Every frame in perfect sync. Every viewer locked together.
            <span className="italic"> That&apos;s NodeParty.</span>
          </p>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            DIRECTLY BELOW BANNER: STACKED COLUMN (JOIN CARD TOP + STAGE BELOW)
        ═══════════════════════════════════════════════════════════════════ */}
        <section id="join-hub" className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-16 space-y-16">
          
          {/* 1. UPPER CARD: Launch Your Room (Centered) */}
          <div className="flex flex-col items-center text-center space-y-6">
            <div className="space-y-1 max-w-md">
              <p className="text-xs font-bold uppercase tracking-widest text-[#c8962e]">
                START A PRIVATE SCREENING
              </p>
              <h2 className="text-2xl sm:text-4xl font-black text-[#f2e9d6] tracking-tight">
                Launch Your Room
              </h2>
              <p className="text-xs sm:text-sm text-[#907a5a]">
                Instant 6-digit code or shareable invite link with zero configuration.
              </p>
            </div>

            <div className="w-full max-w-lg">
              <JoinRoomCard />
            </div>
          </div>

          {/* 2. LOWER CARD: Live Stage Preview (Full Width) */}
          <div className="pt-8 border-t border-[#27211a] space-y-4 text-left">
            <div className="space-y-1">
              <p className="text-xs font-bold uppercase tracking-widest text-[#c8962e]">
                LIVE INTERACTIVE DEMO
              </p>
              <h3 className="text-2xl sm:text-3xl font-black text-[#f2e9d6] tracking-tight">
                Live Stage Preview
              </h3>
              <p className="text-sm text-[#907a5a]">
                Test synchronized reactions, real-time live chat, and audio controls live in your browser.
              </p>
            </div>

            <div className="rounded-2xl overflow-hidden shadow-2xl" style={{ border: `1px solid ${c.border}` }}>
              <InteractiveHeroDemo />
            </div>
          </div>

        </section>

        {/* ── Watch Parties — Photo Right ── */}
        <section className="max-w-7xl mx-auto w-full px-6 sm:px-8 py-16" style={{ borderTop: `1px solid ${c.border}` }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-4 text-left">
              <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
                Movie nights. Game streams. Watch parties.
              </h2>
              <p className="text-sm leading-relaxed max-w-md" style={{ color: c.muted }}>
                Paste any YouTube, Twitch, or direct video link. Your room syncs playback across every viewer — play, pause, seek, all locked together in real time.
              </p>
              <Link href="/room/lounge-demo" className="inline-flex items-center gap-2 text-sm font-bold transition-colors" style={{ color: c.gold }}>
                Start watching <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="rounded-2xl overflow-hidden aspect-video shadow-2xl" style={{ border: `1px solid ${c.border}` }}>
              <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${photos.gaming})` }} />
            </div>
          </div>
        </section>

        {/* ── Private Screenings — Photo Left ── */}
        <section className="max-w-7xl mx-auto w-full px-6 sm:px-8 py-16" style={{ borderTop: `1px solid ${c.border}` }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="rounded-2xl overflow-hidden aspect-video order-2 lg:order-1 shadow-2xl" style={{ border: `1px solid ${c.border}` }}>
              <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${photos.homeTheater})` }} />
            </div>
            <div className="space-y-4 order-1 lg:order-2 text-left">
              <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
                Private screening rooms. No account needed.
              </h2>
              <p className="text-sm leading-relaxed max-w-md" style={{ color: c.muted }}>
                Create a room, share the link, everyone joins instantly. WebRTC peer-to-peer — your video never touches our servers.
              </p>
              <Link href="/room/lounge-demo" className="inline-flex items-center gap-2 text-sm font-bold transition-colors" style={{ color: c.gold }}>
                Create a room <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* ── How It Works (With Top Statement Banner & Photo Gallery) ── */}
        <div className="max-w-7xl mx-auto w-full px-6 sm:px-8 pb-16">
          <HowItWorks />
        </div>
      </main>

      <CreateRoomModal />
      <Footer />
    </div>
  );
}
