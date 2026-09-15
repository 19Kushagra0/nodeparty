"use client";

import { Play } from "lucide-react";
import { useRoomTheme } from "@/hooks/useRoomTheme";

export function YoutubePlayerPlaceholder() {
  const t = useRoomTheme();

  return (
    <div className="w-full px-4 sm:px-6 pt-4 sm:pt-5 pb-2 shrink-0">
      <div
        className="relative w-full aspect-video max-h-[360px] sm:max-h-[420px] mx-auto rounded-2xl sm:rounded-3xl overflow-hidden border shadow-sm flex flex-col items-center justify-center group transition-all duration-300"
        style={{
          backgroundColor: t.isDark ? "#110e0b" : "#ebebef",
          borderColor: t.border,
        }}
      >
        {/* Center Visual Content */}
        <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-md">
          {/* Play Icon Circle */}
          <div
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mb-3.5 shadow-md transition-transform duration-200 group-hover:scale-105"
            style={{
              backgroundColor: t.isDark ? "#1a1612" : "#ffffff",
              border: `1px solid ${t.border}`,
              color: t.accent,
            }}
          >
            <Play className="w-6 h-6 sm:w-7 sm:h-7 ml-1 fill-current stroke-none" />
          </div>

          <h3
            className="text-sm sm:text-base font-semibold tracking-tight mb-1"
            style={{ color: t.text }}
          >
            Cinema Stage Idle
          </h3>

          <p
            className="text-xs sm:text-xs leading-relaxed max-w-xs font-normal"
            style={{ color: t.muted }}
          >
            Click <strong className="font-semibold" style={{ color: t.text }}>Watch Now</strong> on any video below or paste a YouTube link in the top bar to stream together.
          </p>
        </div>
      </div>
    </div>
  );
}
