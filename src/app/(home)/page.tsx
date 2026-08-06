import JoinRoomCard from "@/components/home/JoinRoomCard";
import { Zap, ShieldCheck, Tv } from "@/icons";

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-zinc-950 text-zinc-100 flex flex-col items-center justify-center p-6 overflow-hidden">
      {/* Structural Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
      <div className="absolute inset-0 bg-radial from-transparent via-zinc-950/80 to-zinc-950 pointer-events-none" />

      {/* Main Container */}
      <main className="relative z-10 w-full max-w-4xl flex flex-col items-center text-center gap-10 py-12">

        {/* Hero Section */}
        <div className="space-y-5 max-w-2xl">
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-zinc-50 leading-[1.15]">
            Watch YouTube Together <br className="hidden sm:inline" />
            <span className="text-rose-500 font-black">in Perfect Sync.</span>
          </h1>
          <p className="text-zinc-400 text-base sm:text-lg leading-relaxed max-w-xl mx-auto">
            Create a watch room, invite your friends, and stream in real time.
            Play, pause, and seek commands trigger instantly for every connected viewer.
          </p>
        </div>

        {/* Isolated Client Component for Room Actions */}
        <JoinRoomCard />

        {/* Feature Showcase Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 w-full text-left pt-8">
          <div className="bg-zinc-900/90 border border-zinc-800/80 rounded-xl p-5 hover:border-zinc-700 transition-colors">
            <div className="w-9 h-9 rounded-lg bg-zinc-800 border border-zinc-700/60 flex items-center justify-center text-rose-400 mb-4">
              <Zap className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-semibold text-zinc-100">Zero-Lag Sync</h3>
            <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed">
              Instant play, pause, and seek commands broadcast seamlessly across all participants.
            </p>
          </div>

          <div className="bg-zinc-900/90 border border-zinc-800/80 rounded-xl p-5 hover:border-zinc-700 transition-colors">
            <div className="w-9 h-9 rounded-lg bg-zinc-800 border border-zinc-700/60 flex items-center justify-center text-rose-400 mb-4">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-semibold text-zinc-100">Role Controls</h3>
            <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed">
              Host and Moderator permissions ensure structured playback without unwanted interruptions.
            </p>
          </div>

          <div className="bg-zinc-900/90 border border-zinc-800/80 rounded-xl p-5 hover:border-zinc-700 transition-colors">
            <div className="w-9 h-9 rounded-lg bg-zinc-800 border border-zinc-700/60 flex items-center justify-center text-rose-400 mb-4">
              <Tv className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-semibold text-zinc-100">Native Player</h3>
            <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed">
              Full YouTube IFrame Player integration with high-definition audio and video support.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
