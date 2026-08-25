"use client";

import { useRoomStore } from "@/store/useRoomStore";
import { InteractiveVirtualBrowser } from "@/components/watch-party/InteractiveVirtualBrowser";
import { GridStageView } from "@/components/watch-party/GridStageView";
import { ParticipantSidebar } from "@/components/watch-party/ParticipantSidebar";
import { BottomControlDock } from "@/components/watch-party/BottomControlDock";
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
      <main className="relative z-10 flex-1 px-4 pt-4 sm:px-6 sm:pt-6 pb-[150px] max-w-[1800px] w-full mx-auto flex flex-col lg:flex-row gap-6 transition-all">
        {/* Left / Hero Column: Interactive Virtual Browser OR Grid Stage */}
        <div className={`flex-1 min-w-0 flex flex-col gap-4 ${isTheaterMode ? "w-full" : ""}`}>
          {layoutMode === "cinema" ? (
            <InteractiveVirtualBrowser />
          ) : (
            <GridStageView />
          )}
        </div>

        {/* Right Social & Control Sidebar Column (collapsible in theater mode) */}
        {!isTheaterMode && (
          <div className="w-full lg:w-[420px] shrink-0">
            <ParticipantSidebar />
          </div>
        )}
      </main>

      {/* Floating Bottom Control Bar Dock */}
      <BottomControlDock />

      {/* Modals */}
      <ScreenShareModal />
      <CapturedMomentsModal />
      <InviteModal />
    </>
  );
}
