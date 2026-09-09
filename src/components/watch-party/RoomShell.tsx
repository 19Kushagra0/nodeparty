"use client";

import { useRoomTheme } from "@/hooks/useRoomTheme";
import { RoomSidebar } from "@/components/layout/RoomSidebar";
import { RoomClientView } from "@/components/watch-party/RoomClientView";

export function RoomShell() {
  const t = useRoomTheme();

  return (
    <div
      className="w-full h-screen max-h-screen p-2 sm:p-3.5 lg:p-4 flex flex-col justify-center items-center overflow-hidden relative transition-colors duration-300"
      style={{ backgroundColor: t.bg }}
    >
      {/* Unified Rounded Main App Container */}
      <div
        className="w-full h-full max-w-[1780px] rounded-[28px] sm:rounded-[36px] lg:rounded-[44px] flex overflow-hidden p-2 sm:p-3.5 lg:p-4 gap-3 lg:gap-4 relative transition-all duration-300"
        style={{
          backgroundColor: t.isDark ? "#14110e" : "rgba(255, 255, 255, 0.75)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: `1px solid ${t.border}`,
          boxShadow: t.isDark
            ? "0 24px 64px -16px rgba(0, 0, 0, 0.7), inset 0 1px 0 rgba(200, 150, 46, 0.08)"
            : "0 20px 60px -15px rgba(0, 0, 0, 0.07)",
        }}
      >
        {/* Column 1: Left Sidebar Rail */}
        <RoomSidebar />

        {/* Columns 2 & 3: Player Column + Chat Column */}
        <div className="flex-1 min-w-0 h-full relative z-10 overflow-hidden">
          <RoomClientView />
        </div>
      </div>
    </div>
  );
}
