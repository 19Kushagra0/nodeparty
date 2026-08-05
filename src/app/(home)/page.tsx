import JoinRoomCard from "@/components/home/JoinRoomCard";
import { Zap, ShieldCheck, Tv } from "@/icons";

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-6 overflow-hidden">
      {/* Background glow accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-600/15 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[350px] h-[350px] bg-indigo-600/15 blur-[120px] rounded-full pointer-events-none" />

      {/* Main Container */}
      <main className="relative z-10 w-full max-w-4xl flex flex-col items-center text-center gap-10">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-950/60 border border-red-500/30 text-red-400 text-xs font-medium backdrop-blur-md">
          <span className="flex h-2 w-2 rounded-full bg-red-500 animate-pulse" />
          Real-Time Synchronized Watch Parties
        </div>

        {/* Hero Title */}
        <div className="space-y-4 max-w-2xl">
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
            Watch YouTube Together in Perfect Sync
          </h1>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
            Create a room, invite your friends, and enjoy movies, music, or livestreams.
            If someone pauses, seeks, or changes the video, everyone stays synchronized.
          </p>
        </div>

        {/* Isolated Client Component for Room Action Card */}
        <JoinRoomCard />

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full text-left pt-6">
          <div className="bg-slate-900/40 border border-slate-800/50 rounded-xl p-4 backdrop-blur-sm">
            <div className="w-8 h-8 rounded-lg bg-red-950/60 border border-red-500/20 flex items-center justify-center text-red-400 mb-3">
              <Zap className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-semibold text-slate-200">Zero-Lag Sync</h3>
            <p className="text-xs text-slate-400 mt-1">Instant play, pause, and seek commands across all connected participants.</p>
          </div>

          <div className="bg-slate-900/40 border border-slate-800/50 rounded-xl p-4 backdrop-blur-sm">
            <div className="w-8 h-8 rounded-lg bg-indigo-950/60 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-3">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-semibold text-slate-200">Role-Based Control</h3>
            <p className="text-xs text-slate-400 mt-1">Host, Moderator, and Participant permissions to prevent playback spam.</p>
          </div>

          <div className="bg-slate-900/40 border border-slate-800/50 rounded-xl p-4 backdrop-blur-sm">
            <div className="w-8 h-8 rounded-lg bg-emerald-950/60 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-3">
              <Tv className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-semibold text-slate-200">YouTube IFrame</h3>
            <p className="text-xs text-slate-400 mt-1">Seamless integration with official YouTube playback and full video player APIs.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
