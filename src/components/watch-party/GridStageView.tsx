"use client";

import { Mic, MicOff, Crown, ShieldCheck } from "@/icons";
import { useRoomStore } from "@/store/useRoomStore";
import { useRoomTheme } from "@/hooks/useRoomTheme";

export function GridStageView() {
  const { participants } = useRoomStore();
  const t = useRoomTheme();

  return (
    <div className="w-full h-full flex">
      {/* Tile 1: Fullscreen Shared Screen */}
      <div className="relative w-full h-full overflow-hidden flex flex-col">
        {/* Placeholder for Shared Screen */}
        <div className="absolute inset-0 bg-black transition-transform duration-500" />
      </div>

    </div>
  );
}
