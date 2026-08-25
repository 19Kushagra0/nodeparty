import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import JoinRoomCard from "@/components/home/JoinRoomCard";
import { InteractiveHeroDemo } from "@/components/home/InteractiveHeroDemo";
import { FeaturedLounges } from "@/components/home/FeaturedLounges";
import { HowItWorks } from "@/components/home/HowItWorks";
import { LiveActivityTicker } from "@/components/home/LiveActivityTicker";
import { CreateRoomModal } from "@/components/home/CreateRoomModal";
import { Zap, Sparkles } from "@/icons";

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-[#07080b] text-zinc-100 flex flex-col antialiased selection:bg-rose-500 selection:text-white">
      {/* Background Structural Lighting & Grid */}
      <div className="fixed inset-0 bg-grid-pattern opacity-35 pointer-events-none" />
      <div className="fixed inset-0 bg-mesh-pattern pointer-events-none" />

      {/* Global Navbar */}
      <Navbar />

      {/* Hero Section Container */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 pt-12 pb-20 gap-14 max-w-7xl mx-auto w-full">
        {/* Top Hero Pill & Headline */}
        <div className="space-y-6 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.1] backdrop-blur-md shadow-lg shadow-black/40 text-xs font-semibold text-zinc-300">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
            </span>
            <span>Ultra-Low Latency Watch Party Lounge</span>
            <span className="text-zinc-500">•</span>
            <span className="text-rose-400 font-mono">14ms Drift Sync</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.08]">
            Watch Videos Together <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-rose-500 via-pink-500 to-amber-400 bg-clip-text text-transparent">
              in Perfect Sync.
            </span>
          </h1>

          <p className="text-zinc-400 text-sm sm:text-lg leading-relaxed max-w-2xl mx-auto font-normal">
            Create a private cinema lounge in 5 seconds. Stream YouTube videos, trailers, and live broadcasts with friends in real time with synchronized playback, live chat, and floating emoji bursts.
          </p>
        </div>

        {/* Quick Launch / Code Join Card */}
        <JoinRoomCard />

        {/* Real-time Activity Ticker */}
        <LiveActivityTicker />

        {/* Interactive Playable Hero Watch Room Teaser */}
        <div className="w-full pt-4 space-y-4">
          <div className="flex items-center justify-center gap-2 text-xs font-mono text-zinc-400 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-rose-400" />
            <span>Interactive Live Lounge Preview • Try Reacting Below</span>
          </div>
          <InteractiveHeroDemo />
        </div>

        {/* Featured Public Lounges Grid */}
        <FeaturedLounges />

        {/* 3-Step "How It Works" Section */}
        <HowItWorks />

        {/* Architecture Highlights Banner */}
        <section id="features" className="w-full rounded-3xl bg-gradient-to-r from-rose-950/30 via-zinc-900/60 to-purple-950/30 border border-white/[0.08] p-8 sm:p-12 text-left flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="space-y-3 max-w-xl">
            <div className="flex items-center gap-2 text-xs font-mono text-rose-400 uppercase font-bold tracking-wider">
              <Zap className="w-4 h-4" />
              <span>Next-Gen Sync Architecture</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              Ready for Your Next Movie Night?
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              No accounts, no extensions to install, no sign-ups required. Open a room, drop in a YouTube URL, and invite your crew with a single tap.
            </p>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <JoinRoomCard />
          </div>
        </section>
      </main>

      {/* Global Create Room Modal */}
      <CreateRoomModal />

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
