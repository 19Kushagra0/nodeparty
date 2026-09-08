"use client";

import { useRoomStore } from "@/store/useRoomStore";
import { MoreHorizontal, CheckCircle2, Circle } from "lucide-react";

export function UpNextQueue() {
  const { queue } = useRoomStore();

  return (
    <div className="bg-white/70 backdrop-blur-md border border-white rounded-[20px] sm:rounded-[24px] p-3 sm:p-3.5 shadow-xs h-full flex flex-col min-h-0 overflow-hidden">
      <div className="flex items-center justify-between mb-2 px-1 shrink-0">
        <h3 className="text-xs sm:text-sm font-bold text-zinc-900">Up Next</h3>
        <button className="w-6 h-6 rounded-full hover:bg-zinc-100 flex items-center justify-center text-zinc-400 hover:text-zinc-600 transition-colors cursor-pointer">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto space-y-2 pr-1">
        {queue.slice(0, 4).map((item) => (
          <div key={item.id} className="flex items-center gap-2.5 group cursor-pointer p-1 rounded-xl hover:bg-white/50 transition-colors">
            {/* Thumbnail */}
            <div className="w-14 h-9 sm:w-16 sm:h-10 rounded-lg overflow-hidden shrink-0 relative bg-zinc-200 shadow-2xs border border-white/60">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover" />
              {item.isPlaying && (
                <div className="absolute inset-0 bg-rose-500/20 mix-blend-overlay" />
              )}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0 flex flex-col justify-center">
              <h4 className="text-xs font-bold text-zinc-800 truncate leading-tight group-hover:text-rose-600 transition-colors">
                {item.title}
              </h4>
              <div className="flex items-center gap-1.5 text-[10px] text-zinc-400 font-medium mt-0.5">
                <span className="truncate">{item.channel}</span>
                <span>•</span>
                <span className="shrink-0">{item.duration}</span>
              </div>
            </div>

            {/* Status / Check */}
            <div className="shrink-0 text-zinc-300 group-hover:text-zinc-400 transition-colors pr-1">
               {item.isPlaying ? (
                  <CheckCircle2 className="w-4 h-4 text-indigo-500 fill-indigo-50" />
               ) : (
                  <Circle className="w-4 h-4" />
               )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
