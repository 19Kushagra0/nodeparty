"use client";

import { Lock, Play } from "@/icons";
import { useRoom } from "@/contexts/RoomProvider";

export function VideoPlayer() {
  const { userRole, videoUrl, setVideoUrl } = useRoom();

  return (
    <div className="lg:col-span-3 flex flex-col gap-4">
      {/* Video URL Bar (Host / Mod controls) */}
      {userRole !== "participant" ? (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-3 flex gap-3 shadow-sm">
          <input
            type="text"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            placeholder="Paste YouTube Video URL..."
            className="flex-1 px-3.5 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100 placeholder-zinc-500 text-xs focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500/20 transition-colors"
          />
          <button className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 active:bg-rose-700 text-white text-xs font-medium shadow-sm transition-colors cursor-pointer">
            Change Video
          </button>
        </div>
      ) : (
        <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-xl px-4 py-2.5 flex items-center justify-between text-xs text-zinc-400">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-amber-400" />
            <span>
              Participant Mode: Playback controls are restricted to Host and Moderators.
            </span>
          </div>
          <span className="px-2 py-0.5 rounded bg-zinc-800 text-[10px] uppercase font-bold text-zinc-400 tracking-wider">
            Watch-Only
          </span>
        </div>
      )}

      {/* Main Video Player Canvas */}
      <div className="relative aspect-video w-full bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-xl flex flex-col items-center justify-center group">
        {/* Cinema Viewport Placeholder */}
        <div className="relative z-10 flex flex-col items-center gap-4 text-center p-6">
          <div className="w-14 h-14 rounded-2xl bg-zinc-800 border border-zinc-700/70 flex items-center justify-center text-rose-500 shadow-md group-hover:scale-105 transition-transform">
            <Play className="w-7 h-7 fill-current ml-0.5" />
          </div>
          <div className="space-y-1.5">
            <h2 className="text-base font-semibold text-zinc-100">
              YouTube Sync Player Viewport
            </h2>
            <p className="text-xs text-zinc-400 max-w-md leading-relaxed">
              Real-time Socket.IO synchronization engine and YouTube IFrame SDK mount target.
            </p>
          </div>
        </div>

        {/* Sync Status Badge */}
        <div className="absolute bottom-4 left-4 bg-zinc-950/90 border border-zinc-800 px-3 py-1.5 rounded-lg text-xs flex items-center gap-2 shadow-sm">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          <span className="text-zinc-300 font-mono text-[11px]">
            Sync Status: Connected
          </span>
        </div>
      </div>
    </div>
  );
}
