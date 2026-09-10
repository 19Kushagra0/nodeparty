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
        <section className="relative w-full h-[70svh] sm:h-[85vh] min-h-[460px] sm:min-h-[620px] overflow-hidden bg-transparent">
          {/* Cinema Projector & Ambient Beam Animation Background */}
          <CinemaProjectorBeam />

          <div className="relative z-10 w-full h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">

            {/* Top Left */}
            <div className="absolute top-4 left-4 sm:top-8 sm:left-8 flex flex-col text-[9px] sm:text-xs font-black tracking-[0.2em] text-white sm:text-[#907a5a] uppercase drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)] sm:drop-shadow-none">
              <span>NodeParty's Story</span>
              <span className="text-white sm:text-[#f2e9d6]">Continues</span>
            </div>

            {/* Top Right */}
            <div className="absolute top-4 right-4 sm:top-8 sm:right-8 flex flex-col text-[9px] sm:text-xs font-black tracking-[0.2em] text-white sm:text-[#907a5a] uppercase text-right drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)] sm:drop-shadow-none">
              <span>Version 1.0 Premiere</span>
              <span>On <span className="text-white sm:text-[#c8962e] font-bold">August 21st</span></span>
            </div>

            {/* Main Content Area */}
            <div className="mt-4 sm:mt-24 w-full flex flex-col sm:items-start relative z-20">

              {/* Massive Stacked Title */}
              <h1 className="flex flex-col text-[18vw] sm:text-[14vw] lg:text-[130px] xl:text-[160px] leading-[0.8] font-black uppercase text-white drop-shadow-[0_12px_40px_rgba(0,0,0,0.9)] tracking-[-0.04em] scale-y-[1.15] sm:origin-left origin-center text-center sm:text-left w-full">
                <span>NODE</span>
                <span>PARTY</span>
              </h1>

              {/* Thin Line & Lower Text */}
              <div className="flex flex-col w-full sm:max-w-md mt-4 sm:mt-12 relative px-2 sm:px-0 mx-auto sm:mx-0">
                <div className="h-[1px] w-full bg-gradient-to-r from-transparent sm:from-[#c8962e]/40 via-white/20 sm:via-white/10 to-transparent mb-3.5 sm:mb-6" />

                <div className="relative flex flex-col sm:flex-row sm:justify-between items-start w-full min-h-[45px] sm:min-h-0">
                  {/* Left Text */}
                  <div className="flex flex-col text-[9px] sm:text-xs font-black tracking-[0.15em] text-white sm:text-[#907a5a] uppercase max-w-[200px] text-left drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)] sm:drop-shadow-none">
                    <span>Perfect Sync</span>
                    <span className="text-white sm:text-[#f2e9d6]">Continues</span>
                  </div>
                  {/* Right Text */}
                  <div className="flex flex-col text-[9px] sm:text-xs font-black tracking-[0.15em] text-white sm:text-[#907a5a] uppercase max-w-[200px] text-right sm:text-left mt-1.5 sm:mt-0 drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)] sm:drop-shadow-none">
                    <span>Synchronized Theater</span>
                    <span className="text-white sm:text-[#c8962e]">Zero Configuration</span>
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="relative mt-6 sm:mt-0 sm:relative sm:-bottom-auto left-0 right-0 sm:pt-10 flex justify-center sm:justify-start w-full z-20">
                <a
                  href="#join-hub"
                  className="inline-flex items-center justify-center px-8 sm:px-10 py-3 sm:py-4 rounded-full text-xs sm:text-sm font-black tracking-[0.2em] uppercase bg-[#c8962e] text-[#0c0a07] hover:bg-[#dba940] active:scale-[0.98] transition-all cursor-pointer shadow-2xl"
                >
                  Start a Room
                </a>
              </div>

            </div>
          </div>
        </section>

        <div className="relative z-10 bg-[#0c0a07]">
          {/* ── Cinematic Statement Banner ── */}
          <section className="w-full py-14 px-6 sm:px-8 border-y border-[#27211a] bg-[#161310] font-[family-name:var(--font-inter),Inter,sans-serif]">
            <div className="max-w-4xl mx-auto text-center space-y-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#c8962e]">
                Zero-Latency Playback
              </p>
              <h2 className="text-xl sm:text-3xl lg:text-[32px] font-medium tracking-tight text-[#f2e9d6] leading-snug">
                Every frame in perfect sync. Every viewer locked together.
              </h2>
              <p className="text-xs sm:text-sm text-[#907a5a] font-normal leading-relaxed max-w-xl mx-auto">
                Sub-millisecond room synchronization built for movies, livestreams, and watch parties.
              </p>
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

              {/* Theater Preview Showcase */}
              <InteractiveHeroDemo />
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
