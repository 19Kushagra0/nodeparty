"use client";

import { useRoomStore } from "@/store/useRoomStore";
import { Plus, MoreHorizontal } from "lucide-react";

export function MediaInfoCard() {
  const { currentPreset } = useRoomStore();

  return (
    <div className="h-full flex bg-white/70 backdrop-blur-md border border-white rounded-[20px] sm:rounded-[24px] p-3 sm:p-3.5 gap-3 sm:gap-4 items-center shadow-xs">
      {/* Poster Thumbnail */}
      <div className="w-16 h-22 sm:w-20 sm:h-28 rounded-xl overflow-hidden shrink-0 shadow-xs bg-zinc-200 border border-white/60">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={currentPreset.thumbnail}
          alt={currentPreset.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Info Details */}
      <div className="flex flex-col flex-1 min-w-0 gap-1 justify-center">
        <h3 className="text-base sm:text-lg font-bold text-zinc-900 tracking-tight truncate leading-tight">
          {currentPreset.title}
        </h3>
        <div className="flex items-center gap-2 text-[11px] font-semibold text-zinc-500">
          <span>{currentPreset.year || "2022"}</span>
          <span>•</span>
          <span className="truncate">{currentPreset.channel || "Animation, Fantasy, Drama"}</span>
        </div>
        <p className="text-xs text-zinc-600 line-clamp-2 leading-relaxed mt-0.5">
          A teenage girl discovers a mysterious door that connects different worlds, and must close them to prevent disaster.
        </p>

        {/* Actions */}
        <div className="flex items-center gap-2 mt-1.5">
          <button className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white shadow-2xs border border-zinc-200/70 hover:shadow-xs transition-all text-xs font-bold text-zinc-800 cursor-pointer">
            <Plus className="w-3.5 h-3.5 text-zinc-600" />
            <span>Add to Queue</span>
          </button>
          <button className="w-7 h-7 flex items-center justify-center rounded-full bg-white shadow-2xs border border-zinc-200/70 hover:shadow-xs transition-all text-zinc-600 cursor-pointer">
            <MoreHorizontal className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
