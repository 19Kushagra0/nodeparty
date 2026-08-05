"use client";

import { Lock, Play } from "@/icons";
import { useRoom } from "@/contexts/RoomProvider";

export function VideoPlayer() {
  const { userRole, videoUrl, setVideoUrl } = useRoom();

  return (
    <div className="lg:col-span-3 flex flex-col gap-4">
      {/* Video Change Bar (Host / Mod only) */}
      {userRole !== "participant" ? (
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 flex gap-3 backdrop-blur-md">
          <input
            type="text"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            placeholder="Paste YouTube Video URL..."
            className="flex-1 px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-500 text-xs focus:outline-none focus:border-red-500/50"
          />
          <button className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-semibold shadow-sm transition-all active:scale-[0.98]">
            Change Video
          </button>
        </div>
      ) : (
        <div className="bg-slate-900/40 border border-slate-800/60 rounded-xl px-4 py-2.5 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-amber-400" />
            <span>
              Participant Mode: Video playback is controlled by Host and
              Moderators.
            </span>
          </div>
          <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] uppercase font-bold text-slate-400">
            Watch-Only
          </span>
        </div>
      )}

      {/* Player Container */}
      <div className="relative aspect-video w-full bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col items-center justify-center group">
        {/* Background Glow */}
        <div className="absolute inset-0 bg-gradient-to-tr from-red-950/20 via-transparent to-indigo-950/20 pointer-events-none" />

        {/* Placeholder Player View */}
        <div className="relative z-10 flex flex-col items-center gap-4 text-center p-6">
          <div className="w-16 h-16 rounded-2xl bg-red-600/20 border border-red-500/40 flex items-center justify-center text-red-500 shadow-lg animate-pulse">
            <Play className="w-8 h-8 fill-current ml-0.5" />
          </div>
          <div className="space-y-1">
            <h2 className="text-lg font-semibold text-slate-200">
              YouTube IFrame Player Container
            </h2>
            <p className="text-xs text-slate-400 max-w-md">
              Socket.IO playback sync logic and official YouTube IFrame SDK will
              attach here in Phase 3.
            </p>
          </div>
        </div>

        {/* Sync Overlay Indicator */}
        <div className="absolute bottom-4 left-4 bg-slate-950/80 border border-slate-800 px-3 py-1.5 rounded-lg text-xs flex items-center gap-2 backdrop-blur-md">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
          <span className="text-slate-300 font-mono">
            Status: Ready for Socket Sync
          </span>
        </div>
      </div>
    </div>
  );
}
