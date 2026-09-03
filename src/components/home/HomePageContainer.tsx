"use client";

import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import JoinRoomCard from "@/components/home/JoinRoomCard";
import { InteractiveHeroDemo } from "@/components/home/InteractiveHeroDemo";
import { HowItWorks } from "@/components/home/HowItWorks";
import { CreateRoomModal } from "@/components/home/CreateRoomModal";
import { CinemaProjectorBeam } from "@/components/home/CinemaProjectorBeam";
import { ArrowRight } from "@/icons";

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
  cinema: "https://lh3.googleusercontent.com/aida-public/AB6AXuBpLWNT0knaa7grBpWWh0_PAsBCaPdS3j2LM0JzSFyVADDWE7ZmJXjxF2nTKU36Zm53r6euZ14xPDmfFEaJAbM7DWmDxc7yFAV8jZ4cVxOfVpDY0MIAmtuVa1BOzGa3cnCtNwJUyylQhBd593Nks1w-hfBg0m8_84m1CgVVMUc5erHjy8Pcu6fCPE1KPZudBMiXWKlmBaFDkbKB2AH1bqsMPMS2XMLltdYJPccRHvvCKTmdDJsVwTvPmSaCt9Lg5qOOUkRVlDr-Yy4",
  gaming: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800&auto=format&fit=crop",
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
        <section className="relative w-full h-[85vh] min-h-[620px] overflow-hidden bg-transparent">
          {/* Cinema Projector & Ambient Beam Animation Background */}
          <CinemaProjectorBeam />

          <div className="relative z-10 w-full h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">

            {/* Top Left */}
            <div className="absolute top-8 left-6 sm:left-8 flex flex-col text-[10px] sm:text-xs font-black tracking-[0.2em] text-[#907a5a] uppercase">
              <span>NodeParty's Story</span>
              <span className="text-[#f2e9d6]">Continues</span>
            </div>

            {/* Top Right */}
            <div className="absolute top-8 right-6 sm:right-8 flex flex-col text-[10px] sm:text-xs font-black tracking-[0.2em] text-[#907a5a] uppercase text-right">
              <span>Version 1.0 Premiere</span>
              <span>On <span className="text-[#c8962e] font-bold">August 21st</span></span>
            </div>

            {/* Left Content Area */}
            <div className="mt-16 sm:mt-24 max-w-2xl flex flex-col items-start space-y-12 relative z-20">

              {/* Massive Stacked Title */}
              <h1 className="flex flex-col text-[17vw] sm:text-[14vw] lg:text-[130px] xl:text-[160px] leading-[0.8] font-black uppercase text-white drop-shadow-[0_12px_40px_rgba(0,0,0,0.9)] tracking-[-0.04em] scale-y-[1.15] origin-left">
                <span>NODE</span>
                <span>PARTY</span>
              </h1>

              {/* Thin Line & Lower Text */}
              <div className="flex flex-col w-full max-w-md">
                <div className="h-[1px] w-full bg-gradient-to-r from-[#c8962e]/40 via-white/10 to-transparent mb-6" />
                <div className="flex justify-between items-start">
                  <div className="flex flex-col text-[10px] sm:text-xs font-black tracking-[0.15em] text-[#907a5a] uppercase max-w-[200px]">
                    <span>Perfect Sync</span>
                    <span className="text-[#f2e9d6]">Continues</span>
                  </div>
                  <div className="flex flex-col text-[10px] sm:text-xs font-black tracking-[0.15em] text-[#907a5a] uppercase max-w-[200px]">
                    <span>Synchronized Theater</span>
                    <span className="text-[#c8962e]">Zero Configuration</span>
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-2">
                <a
                  href="#join-hub"
                  className="inline-flex items-center justify-center px-10 py-4 rounded-full text-sm font-black tracking-[0.2em] uppercase bg-[#c8962e] text-[#0c0a07] hover:bg-[#dba940] active:scale-[0.98] transition-all cursor-pointer"
                >
                  Start a Room
                </a>
              </div>

            </div>
          </div>
        </section>

        <div className="relative z-10 bg-[#0c0a07]">
          {/* ── Cinematic Ambient Statement ── */}
          <section className="relative w-full py-12 px-6 sm:px-8 border-y border-[#c8962e]/20 bg-[#0e0b08] overflow-hidden">
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_60%_70%_at_50%_50%,rgba(200,150,46,0.12)_0%,transparent_75%)]" />
            <div className="relative z-10 max-w-5xl mx-auto text-center space-y-2">
              <p className="text-xs font-mono font-semibold uppercase tracking-[0.25em] text-[#c8962e]/90">
                Zero-Latency Cinema Sync
              </p>
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-snug text-[#f2e9d6]">
                Every frame in perfect sync. Every viewer locked together.
                <span className="italic text-[#c8962e]"> That&apos;s NodeParty.</span>
              </h2>
            </div>
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
                <p className="text-xs sm:text-sm text-[#b8a68b]">
                  Instant 6-digit code or shareable invite link with zero configuration.
                </p>
              </div>

              <div className="w-full max-w-lg">
                <JoinRoomCard />
              </div>
            </div>

            {/* 2. LOWER CARD: Live Stage Preview (Full Width) */}
            <div className="pt-8 border-t border-[#27211a] space-y-6 text-left">
              <div className="space-y-1">
                <p className="text-xs font-bold uppercase tracking-widest text-[#c8962e]">
                  LIVE INTERACTIVE DEMO
                </p>
                <h3 className="text-2xl sm:text-3xl font-black text-[#f2e9d6] tracking-tight">
                  Live Stage Preview
                </h3>
                <p className="text-sm text-[#b8a68b]">
                  Test synchronized reactions, real-time live chat, and audio controls live in your browser.
                </p>
              </div>

              {/* Machined Double-Bezel Theater Framing */}
              <div className="p-1 sm:p-1.5 rounded-[2rem] bg-gradient-to-b from-[#c8962e]/25 via-white/5 to-white/0 ring-1 ring-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.7)]">
                <div className="rounded-[calc(2rem-0.375rem)] overflow-hidden bg-[#13100d] border border-white/5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)]">
                  <InteractiveHeroDemo />
                </div>
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

        </div>
      </main>

      <CreateRoomModal />
      <Footer />
    </div>
  );
}
