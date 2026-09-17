"use client";

import { useEffect, useRef } from "react";
import { useRoomTheme } from "@/hooks/useRoomTheme";
import { useRoomStore } from "@/store/useRoomStore";
import { RoomSidebar } from "@/components/layout/RoomSidebar";
import { RoomClientView } from "@/components/watch-party/RoomClientView";
import { YoutubeWorkspaceView } from "@/components/watch-party/YoutubeWorkspaceView";
import { MobileBottomSheet } from "@/components/watch-party/MobileBottomSheet";

export function RoomShell({ roomId, isGuest }: { roomId?: string; isGuest?: boolean }) {
  const t = useRoomTheme();
  const activeWorkspace = useRoomStore((state) => state.activeWorkspace);

  // Sync the actual roomId from the URL to the global store after initial hydration
  useEffect(() => {
    if (roomId) {
      useRoomStore.setState({ 
        roomId, 
        roomPasscode: roomId.toUpperCase(),
        userRole: isGuest ? "participant" : "host",
      });
    }
  }, [roomId, isGuest]);

  // Initialize Zustand store with the actual roomId from the URL on first render
  const initialized = useRef(false);
  if (!initialized.current) {
    if (roomId) {
      useRoomStore.setState({ 
        roomId, 
        roomPasscode: roomId.toUpperCase(),
        userRole: isGuest ? "participant" : "host",
      });
    }
    initialized.current = true;
  }

  return (
    <div
      className="w-full flex flex-col justify-center items-center overflow-hidden relative transition-colors duration-300"
      style={{
        backgroundColor: t.bg,
        height: "100dvh",
        maxHeight: "100dvh",
        padding: "clamp(8px, 2vw, 16px)",
      }}
    >
      {/* Unified Rounded Main App Container */}
      <div
        className="w-full h-full max-w-[1780px] flex overflow-hidden relative transition-all duration-300"
        style={{
          borderRadius: "clamp(16px, 3vw, 44px)",
          padding: "clamp(6px, 1.5vw, 16px)",
          gap: "clamp(8px, 1.5vw, 16px)",
          backgroundColor: t.isDark ? "#14110e" : "#ffffff",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: `1px solid ${t.border}`,
          boxShadow: t.isDark
            ? "0 24px 64px -16px rgba(0, 0, 0, 0.7), inset 0 1px 0 rgba(200, 150, 46, 0.08)"
            : "0 20px 60px -15px rgba(0, 0, 0, 0.07)",
        }}
      >
        {/* Column 1: Left Sidebar Rail — hidden on mobile, visible on lg+ */}
        <RoomSidebar />

        {/* Columns 2 & 3: Player Column + Chat Column */}
        <div className="flex-1 min-w-0 h-full relative z-10 overflow-hidden">
          {activeWorkspace === "youtube" ? <YoutubeWorkspaceView /> : <RoomClientView />}
        </div>
      </div>

      {/* Mobile slide-up bottom sheet (lg and below only) */}
      <MobileBottomSheet />
    </div>
  );
}

