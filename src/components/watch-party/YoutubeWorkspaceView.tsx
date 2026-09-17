"use client";

import { useEffect } from "react";
import { useRoomStore, parseYoutubeId } from "@/store/useRoomStore";
import { ParticipantSidebar } from "@/components/watch-party/ParticipantSidebar";
import { ScreenShareModal } from "@/components/watch-party/ScreenShareModal";
import { CapturedMomentsModal } from "@/components/watch-party/CapturedMomentsModal";
import { InviteModal } from "@/components/watch-party/InviteModal";
import { SettingsModal } from "@/components/watch-party/SettingsModal";
import { ChevronLeft, MessageSquare, Smile, Users } from "lucide-react";
import { useRoomTheme } from "@/hooks/useRoomTheme";
import { YoutubeSearchHeader } from "@/components/watch-party/youtube/YoutubeSearchHeader";
import { YoutubePlayer } from "@/components/watch-party/youtube/YoutubePlayer";
import { YoutubePlayerPlaceholder } from "@/components/watch-party/youtube/YoutubePlayerPlaceholder";
import { YoutubeDiscoveryGrid } from "@/components/watch-party/youtube/YoutubeDiscoveryGrid";
import { WorkspaceNotch } from "@/components/watch-party/WorkspaceNotch";
import { YoutubeSearchBar } from "@/components/watch-party/youtube/YoutubeSearchBar";
import { YoutubeVideoMetadata } from "@/components/watch-party/youtube/YoutubeVideoMetadata";

import { RoomDetailsPill } from "@/components/watch-party/RoomDetailsPill";

export function YoutubeWorkspaceView() {
  const {
    layoutMode,
    isTheaterMode,
    isShutterFlashing,
    isRightSidebarOpen,
    toggleRightSidebar,
    setActiveSidebarTab,
    participants,
    connectToRoom,
    disconnectFromRoom,
    videoUrl,
    currentPreset,
    fetchVideoMetadata,
    activeVideoMetadata,
  } = useRoomStore();

  const activeVideoId =
    parseYoutubeId(videoUrl) ||
    currentPreset?.youtubeId ||
    parseYoutubeId(currentPreset?.url || "");

  useEffect(() => {
    connectToRoom();
    return () => disconnectFromRoom();
  }, [connectToRoom, disconnectFromRoom]);

  // Fetch real metadata on initial room load if not yet populated
  useEffect(() => {
    if (activeVideoId && (!activeVideoMetadata || activeVideoMetadata.id !== activeVideoId)) {
      fetchVideoMetadata(activeVideoId);
    }
  }, [activeVideoId, activeVideoMetadata, fetchVideoMetadata]);

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
        {/* Left Column: YouTube Workspace Canvas Stage */}
        <div className="flex-1 min-w-0 flex flex-col h-full min-h-0 transition-all duration-300">
          <div
            className="flex-1 min-h-0 relative w-full overflow-hidden flex flex-col items-stretch justify-start rounded-[24px] sm:rounded-[28px] lg:rounded-[36px] transition-all duration-300"
            style={{
              backgroundColor: t.isDark ? "#14110e" : "#f5f5f7",
              border: `1px solid ${t.border}`,
            }}
          >
            {/* Room Details dynamic island notch */}
            <WorkspaceNotch>
              <RoomDetailsPill />
            </WorkspaceNotch>

            <div className="w-full flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-[76px] pb-2 mb-[10px] relative z-10">
               <div className="w-full">
                 <YoutubeSearchBar />
               </div>
            </div>

            {/* Scrollable Stage Area: Player Stage & Concurrent Discovery Grid */}
            <div className="flex-1 w-full min-h-0 overflow-y-auto overflow-x-hidden flex flex-col">
              {activeVideoId ? <YoutubePlayer /> : <YoutubePlayerPlaceholder />}
              <YoutubeVideoMetadata />
              <YoutubeDiscoveryGrid />
            </div>
          </div>
        </div>

        {/* Right Social Column */}
        {!isTheaterMode &&
          (isRightSidebarOpen ? (
            <div className="hidden lg:flex w-full lg:w-[320px] xl:w-[360px] shrink-0 flex-col h-full min-h-0 overflow-hidden transition-all duration-300 ease-in-out animate-in fade-in slide-in-from-right-3">
              <ParticipantSidebar />
            </div>
          ) : (
            <div className="hidden lg:flex shrink-0 flex-col items-center justify-start h-full py-0.5 transition-all duration-300 ease-in-out animate-in fade-in slide-in-from-right-2">
              {/* Sleek Collapsed Right Rail */}
              <div
                className="w-14 sm:w-16 lg:w-18 rounded-[28px] sm:rounded-[32px] p-2 sm:p-2.5 py-4 sm:py-5 flex flex-col items-center gap-3.5 sm:gap-4"
                style={{
                  backgroundColor: t.surface,
                  border: `1px solid ${t.border}`,
                }}
              >
                {/* Expand / Open Button */}
                <button
                  onClick={toggleRightSidebar}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all cursor-pointer outline-none focus:outline-none"
                  style={{
                    backgroundColor: t.surfaceHover,
                    color: t.text,
                    border: `1px solid ${t.border}`,
                  }}
                  title="Expand Sidebar"
                  aria-label="Expand Sidebar"
                >
                  <ChevronLeft className="w-[18px] h-[18px] text-zinc-700 stroke-[2.5]" />
                </button>

                {/* Divider Line */}
                <div
                  className="w-8 sm:w-9 h-[2px] rounded-full my-1 sm:my-1.5"
                  style={{ backgroundColor: t.border }}
                />

                {/* Quick Chat Shortcut */}
                <button
                  onClick={() => {
                    setActiveSidebarTab("chat");
                    toggleRightSidebar();
                  }}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all cursor-pointer outline-none focus:outline-none"
                  style={{
                    backgroundColor: t.surfaceHover,
                    color: t.muted,
                    border: `1px solid ${t.border}`,
                  }}
                  title="Open Chat"
                >
                  <MessageSquare
                    className="w-[18px] h-[18px]"
                    strokeWidth={2.1}
                  />
                </button>

                {/* Quick React Shortcut */}
                <button
                  onClick={() => {
                    setActiveSidebarTab("reactions");
                    toggleRightSidebar();
                  }}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all cursor-pointer outline-none focus:outline-none"
                  style={{
                    backgroundColor: t.surfaceHover,
                    color: t.muted,
                    border: `1px solid ${t.border}`,
                  }}
                  title="Open Reactions"
                >
                  <Smile className="w-[18px] h-[18px]" strokeWidth={2.1} />
                </button>

                {/* Quick Users Shortcut with Friends Count Badge */}
                <button
                  onClick={() => {
                    setActiveSidebarTab("users");
                    toggleRightSidebar();
                  }}
                  className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all cursor-pointer outline-none focus:outline-none"
                  style={{
                    backgroundColor: t.surfaceHover,
                    color: t.muted,
                    border: `1px solid ${t.border}`,
                  }}
                  title={`Open Users (${friendsCount})`}
                >
                  <Users className="w-[18px] h-[18px]" strokeWidth={2.1} />
                  {friendsCount > 0 && (
                    <span
                      className="absolute -top-1 -right-1 px-1.5 py-0.2 text-[9px] font-bold rounded-full border shadow-2xs"
                      style={{
                        backgroundColor: t.accent,
                        color: t.accentFg,
                        borderColor: t.surface,
                      }}
                    >
                      {friendsCount}
                    </span>
                  )}
                </button>
              </div>
            </div>
          ))}
      </main>

      {/* Modals */}
      <ScreenShareModal />
      <CapturedMomentsModal />
      <InviteModal />
      <SettingsModal />
    </>
  );
}
