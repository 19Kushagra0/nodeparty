"use client";

import { useRoomStore } from "@/store/useRoomStore";
import { CinematicVideoPlayer } from "@/components/watch-party/CinematicVideoPlayer";
import { GridStageView } from "@/components/watch-party/GridStageView";
import { ParticipantSidebar } from "@/components/watch-party/ParticipantSidebar";
import { ScreenShareModal } from "@/components/watch-party/ScreenShareModal";
import { CapturedMomentsModal } from "@/components/watch-party/CapturedMomentsModal";
import { InviteModal } from "@/components/watch-party/InviteModal";
import { SettingsModal } from "@/components/watch-party/SettingsModal";
import { ChevronLeft, MessageSquare, Smile, Users } from "lucide-react";
import { useRoomTheme } from "@/hooks/useRoomTheme";

export function RoomClientView() {
  const {
    layoutMode,
    isTheaterMode,
    isShutterFlashing,
    isRightSidebarOpen,
    toggleRightSidebar,
    setActiveSidebarTab,
    participants,
  } = useRoomStore();

  const t = useRoomTheme();

  const friendsCount = participants.filter((p) => !p.isMe).length;

  return (
    <>
      {/* Shutter Camera Flash Animation Overlay */}
      {isShutterFlashing && (
        <div className="fixed inset-0 bg-white z-50 pointer-events-none animate-in fade-out duration-300 opacity-90" />
      )}

      {/* Main Room Layout Grid */}
      {/* pb-[76px] on mobile reserves space for the fixed bottom nav bar */}
      <main className="relative z-10 flex-1 w-full flex flex-col lg:flex-row gap-3 lg:gap-4 h-full min-h-0 overflow-hidden pb-[76px] lg:pb-0">
        {/* Left Column: Player Stage */}
        <div className="flex-1 min-w-0 flex flex-col h-full min-h-0 transition-all duration-300">
          <div className="flex-1 min-h-0 relative w-full overflow-hidden flex flex-col">
            {layoutMode === "cinema" ? (
              <CinematicVideoPlayer />
            ) : (
              <GridStageView />
            )}
          </div>
        </div>

        {/* Right Social Column */}
        {!isTheaterMode && (
          isRightSidebarOpen ? (
            <div className="hidden lg:flex w-full lg:w-[320px] xl:w-[360px] shrink-0 flex-col h-full min-h-0 overflow-hidden transition-all duration-300 ease-in-out animate-in fade-in slide-in-from-right-3">
              <ParticipantSidebar />
            </div>
          ) : (
            <div className="hidden lg:flex shrink-0 flex-col items-center justify-start h-full py-0.5 transition-all duration-300 ease-in-out animate-in fade-in slide-in-from-right-2">
              {/* Sleek Collapsed Right Rail */}
              <div
                className="w-12 sm:w-14 rounded-[28px] sm:rounded-[32px] p-2 py-4 flex flex-col items-center gap-3.5"
                style={{ backgroundColor: t.surface, border: `1px solid ${t.border}` }}
              >
                {/* Expand / Open Button */}
                <button
                  onClick={toggleRightSidebar}
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer outline-none focus:outline-none"
                  style={{ backgroundColor: t.surfaceHover, color: t.text, border: `1px solid ${t.border}` }}
                  title="Expand Sidebar"
                  aria-label="Expand Sidebar"
                >
                  <ChevronLeft className="w-4 h-4 text-zinc-700 stroke-[2.5]" />
                </button>

                {/* Divider Line */}
                <div className="w-6 h-[2px] rounded-full" style={{ backgroundColor: t.border }} />

                {/* Quick Chat Shortcut */}
                <button
                  onClick={() => {
                    setActiveSidebarTab("chat");
                    toggleRightSidebar();
                  }}
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer outline-none focus:outline-none"
                  style={{ backgroundColor: t.surfaceHover, color: t.muted, border: `1px solid ${t.border}` }}
                  title="Open Chat"
                >
                  <MessageSquare className="w-4 h-4" />
                </button>

                {/* Quick React Shortcut */}
                <button
                  onClick={() => {
                    setActiveSidebarTab("reactions");
                    toggleRightSidebar();
                  }}
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer outline-none focus:outline-none"
                  style={{ backgroundColor: t.surfaceHover, color: t.muted, border: `1px solid ${t.border}` }}
                  title="Open Reactions"
                >
                  <Smile className="w-4 h-4" />
                </button>

                {/* Quick Users Shortcut with Friends Count Badge */}
                <button
                  onClick={() => {
                    setActiveSidebarTab("users");
                    toggleRightSidebar();
                  }}
                  className="relative w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer outline-none focus:outline-none"
                  style={{ backgroundColor: t.surfaceHover, color: t.muted, border: `1px solid ${t.border}` }}
                  title={`Open Users (${friendsCount})`}
                >
                  <Users className="w-4 h-4" />
                  {friendsCount > 0 && (
                    <span
                      className="absolute -top-1 -right-1 px-1.5 py-0.2 text-[9px] font-bold rounded-full border shadow-2xs"
                      style={{ backgroundColor: t.accent, color: t.accentFg, borderColor: t.surface }}
                    >
                      {friendsCount}
                    </span>
                  )}
                </button>
              </div>
            </div>
          )
        )}
      </main>

      {/* Modals */}
      <ScreenShareModal />
      <CapturedMomentsModal />
      <InviteModal />
      <SettingsModal />
    </>
  );
}
