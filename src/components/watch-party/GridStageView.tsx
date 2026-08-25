"use client";

import { Mic, MicOff, Crown, ShieldCheck, Play } from "@/icons";
import { useRoomStore } from "@/store/useRoomStore";

export function GridStageView() {
  const { participants, currentPreset, togglePlay } = useRoomStore();

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-20">
      {/* Tile 1: Mini Shared Cinema / Tab Screen */}
      <div className="relative aspect-video rounded-3xl overflow-hidden bg-black border border-white/[0.15] shadow-2xl flex flex-col justify-between p-4 group">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
          style={{ backgroundImage: `url('${currentPreset.thumbnail}')` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/60" />
        </div>

        {/* Header */}
        <div className="relative z-10 flex items-center justify-between">
          <span className="px-2.5 py-1 rounded-full bg-rose-600/90 text-white text-[10px] font-black uppercase tracking-wider shadow-md">
            SHARED SCREEN
          </span>
          <span className="px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-[10px] font-mono text-zinc-300">
            4K HDR
          </span>
        </div>

        {/* Play / Pause button overlay */}
        <div className="relative z-10 self-center my-auto">
          <button
            onClick={togglePlay}
            className="w-12 h-12 rounded-2xl bg-rose-600/90 hover:bg-rose-500 text-white flex items-center justify-center shadow-xl transition-transform active:scale-95 cursor-pointer"
          >
            <Play className="w-5 h-5 fill-white ml-0.5" />
          </button>
        </div>

        {/* Bottom Title */}
        <div className="relative z-10 truncate text-xs font-bold text-white">
          {currentPreset.title}
        </div>
      </div>

      {/* Participant Video / Avatar Tiles */}
      {participants.map((p) => (
        <div
          key={p.id}
          className={`relative aspect-video rounded-3xl overflow-hidden bg-[#0a0c12] border p-4 flex flex-col justify-between shadow-xl transition-all ${
            p.isSpeaking
              ? "border-emerald-500/60 ring-2 ring-emerald-500/30"
              : "border-white/[0.08]"
          }`}
        >
          {/* Top Status */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              {p.role === "host" ? (
                <span className="px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[10px] font-black flex items-center gap-1">
                  <Crown className="w-3 h-3 text-rose-400" />
                  <span>HOST</span>
                </span>
              ) : p.role === "moderator" ? (
                <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-amber-400" />
                  <span>MOD</span>
                </span>
              ) : null}
            </div>

            <div className="p-1.5 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 text-zinc-300">
              {p.isMuted ? (
                <MicOff className="w-3.5 h-3.5 text-rose-400" />
              ) : (
                <Mic className="w-3.5 h-3.5 text-emerald-400" />
              )}
            </div>
          </div>

          {/* Center Avatar / Video Box */}
          <div className="self-center my-auto flex flex-col items-center gap-2">
            <div className="relative">
              <div
                className={`w-16 h-16 sm:w-18 sm:h-18 rounded-3xl bg-gradient-to-br ${p.avatarBg} flex items-center justify-center text-xl font-black text-white shadow-2xl border-2 border-white/20`}
              >
                {p.name[0]}
              </div>
              {p.isSpeaking && (
                <span className="absolute -inset-2 rounded-3xl border-2 border-emerald-400 animate-ping opacity-75 pointer-events-none" />
              )}
            </div>
          </div>

          {/* Bottom Participant Info */}
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5 truncate">
              <span className="font-bold text-white truncate">{p.name}</span>
              {p.isMe && <span className="text-[10px] text-zinc-500">(You)</span>}
            </div>

            <span className="text-[10px] font-mono text-zinc-500 shrink-0">
              {p.statusText || "Connected"}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
