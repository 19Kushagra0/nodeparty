"use client";

import { useRoomStore } from "@/store/useRoomStore";
import { CinematicVideoPlayer } from "@/components/watch-party/CinematicVideoPlayer";
import { GridStageView } from "@/components/watch-party/GridStageView";
import { ParticipantSidebar } from "@/components/watch-party/ParticipantSidebar";
import { ScreenShareModal } from "@/components/watch-party/ScreenShareModal";
import { CapturedMomentsModal } from "@/components/watch-party/CapturedMomentsModal";
import { InviteModal } from "@/components/watch-party/InviteModal";
export function RoomClientView() {
  const { layoutMode, isTheaterMode, isShutterFlashing } = useRoomStore();

  return (
    <>
      {/* Shutter Camera Flash Animation Overlay */}
      {isShutterFlashing && (
        <div className="fixed inset-0 bg-white z-50 pointer-events-none animate-in fade-out duration-300 opacity-90" />
      )}

      {/* Main Room Layout Grid */}
      <main className="relative z-10 flex-1 w-full flex flex-col lg:flex-row gap-3 lg:gap-4 h-full min-h-0 overflow-hidden">
        {/* Left Column: Player Stage */}
        <div className={`flex-1 min-w-0 flex flex-col h-full min-h-0 ${isTheaterMode ? "w-full" : ""}`}>
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
          <div className="w-full lg:w-[320px] xl:w-[360px] shrink-0 flex flex-col h-full min-h-0 overflow-hidden">
            <ParticipantSidebar />
          </div>
        )}
      </main>

      {/* Modals */}
      <ScreenShareModal />
      <CapturedMomentsModal />
      <InviteModal />
    </>
  );
}
