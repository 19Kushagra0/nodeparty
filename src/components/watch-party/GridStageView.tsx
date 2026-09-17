"use client";

import { Mic, MicOff, Crown, ShieldCheck, Play } from "@/icons";
import { useRoomStore } from "@/store/useRoomStore";
import { useRoomTheme } from "@/hooks/useRoomTheme";

export function GridStageView() {
  const { participants, currentPreset, togglePlay } = useRoomStore();
  const t = useRoomTheme();

  return (
    <div className="w-full h-full flex">
      {/* Tile 1: Fullscreen Shared Screen */}
      <div className="relative w-full h-full overflow-hidden bg-black flex flex-col justify-between p-6 sm:p-8 pt-[80px] sm:pt-[90px] group">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
          style={{ backgroundImage: `url('${currentPreset.thumbnail}')` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/60" />
        </div>

        {/* Header */}
        <div className="relative z-10 flex items-center justify-between">
          <span
            className="px-2.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider"
            style={{ backgroundColor: t.accent, color: t.accentFg }}
          >
            SHARED SCREEN
          </span>
          <span className="px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-xs font-mono text-zinc-300">
            4K HDR
          </span>
        </div>

        {/* Play / Pause button overlay */}
        <div className="relative z-10 self-center my-auto">
          <button
            onClick={togglePlay}
            className="w-12 h-12 rounded-xl flex items-center justify-center shadow-xl transition-transform active:scale-95 cursor-pointer"
            style={{ backgroundColor: t.accent, color: t.accentFg }}
          >
            <Play className="w-5 h-5 fill-current ml-0.5" />
          </button>
        </div>

        {/* Bottom Title */}
        <div className="relative z-10 truncate text-xs font-bold text-white">
          {currentPreset.title}
        </div>
      </div>

    </div>
  );
}
