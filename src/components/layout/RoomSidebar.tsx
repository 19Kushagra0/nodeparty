"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Video as NavVideo,
  Settings,
  Mic,
  MicOff,
  Video,
  VideoOff,
  Tv,
  LayoutGrid,
  Camera,
  LogOut,
} from "lucide-react";
import { useRoomStore } from "@/store/useRoomStore";

export function RoomSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const {
    roomId,
    isMicOn,
    toggleMic,
    isVideoOn,
    toggleVideo,
    setScreenShareModalOpen,
    layoutMode,
    setLayoutMode,
    captureMoment,
  } = useRoomStore();

  const isRoomPage = pathname.startsWith("/room");
  const targetRoomHref = `/room/${roomId || "123"}`;

  const toggleLayout = () => {
    setLayoutMode(layoutMode === "cinema" ? "grid" : "cinema");
  };

  const handleLeave = () => {
    router.push("/");
  };

  return (
    <aside className="w-14 sm:w-16 lg:w-18 h-full flex flex-col items-center justify-between py-1 sm:py-2 shrink-0 z-20 overflow-y-auto no-scrollbar">
      {/* Top Rounded Gray Unified Container */}
      <div className="w-full flex flex-col items-center bg-[#F0F2F6] rounded-[28px] sm:rounded-[32px] p-2 sm:p-2.5 py-4 sm:py-5 gap-3.5 sm:gap-4 shadow-2xs">
        {/* Navigation & Stage Controls */}
        <nav className="flex flex-col gap-3 sm:gap-3.5 items-center w-full justify-start">
          <Link
            href={targetRoomHref}
            onClick={() => setLayoutMode("cinema")}
            className={`relative p-2 sm:p-2.5 rounded-2xl transition-all cursor-pointer ${
              isRoomPage
                ? "bg-white text-rose-500 shadow-xs"
                : "text-zinc-400 hover:text-zinc-600 hover:bg-white/70"
            }`}
            title="Open Player Screen"
          >
            <NavVideo className="w-5 h-5" />
            {isRoomPage && (
              <div className="absolute -right-2 sm:-right-2.5 top-1/2 -translate-y-1/2 w-1 h-5 bg-rose-500 rounded-full shadow-2xs" />
            )}
          </Link>

          {/* Share Screen */}
          <button
            onClick={() => setScreenShareModalOpen(true)}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white text-zinc-700 hover:text-zinc-900 flex items-center justify-center transition-all shadow-2xs border border-white hover:shadow-xs cursor-pointer"
            title="Share Screen"
          >
            <Tv className="w-4 h-4" />
          </button>

          {/* Layout Mode Toggle */}
          <button
            onClick={toggleLayout}
            className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all shadow-2xs border border-white hover:shadow-xs cursor-pointer ${
              layoutMode === "grid"
                ? "bg-pink-50 text-rose-500 shadow-[0_0_12px_rgba(244,63,94,0.15)]"
                : "bg-white text-zinc-700 hover:text-zinc-900"
            }`}
            title={`Switch to ${layoutMode === "cinema" ? "Grid" : "Cinema"} Layout`}
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
        </nav>

        {/* Subtle separator */}
        <div className="w-6 h-[1px] bg-zinc-200/80 my-1 sm:my-1.5" />

        {/* Room Action Buttons inside Top Container */}
        <div className="flex flex-col gap-3 sm:gap-3.5 items-center w-full">
          {/* Mic Toggle */}
          <button
            onClick={toggleMic}
            className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all shadow-2xs border border-white hover:shadow-xs cursor-pointer ${
              isMicOn
                ? "bg-white text-zinc-700 hover:text-zinc-900"
                : "bg-pink-50 text-rose-500 shadow-[0_0_12px_rgba(244,63,94,0.15)]"
            }`}
            title={isMicOn ? "Mute Microphone" : "Unmute Microphone"}
          >
            {isMicOn ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
          </button>

          {/* Video / Camera Toggle */}
          <button
            onClick={toggleVideo}
            className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all shadow-2xs border border-white hover:shadow-xs cursor-pointer ${
              isVideoOn
                ? "bg-white text-zinc-700 hover:text-zinc-900"
                : "bg-pink-50 text-rose-500"
            }`}
            title={isVideoOn ? "Turn off Video" : "Start Video"}
          >
            {isVideoOn ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
          </button>

          {/* Capture Moment / Screenshot */}
          <button
            onClick={() => captureMoment()}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white text-zinc-700 hover:text-zinc-900 flex items-center justify-center transition-all shadow-2xs border border-white hover:shadow-xs active:scale-95 cursor-pointer"
            title="Capture Screenshot Moment"
          >
            <Camera className="w-4 h-4" />
          </button>

          {/* Leave Room Button */}
          <button
            onClick={handleLeave}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-rose-500 hover:bg-rose-600 text-white flex items-center justify-center transition-all shadow-[0_4px_12px_rgba(244,63,94,0.3)] hover:scale-105 active:scale-95 cursor-pointer"
            title="Leave Room"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Bottom Settings Button */}
      <div className="flex flex-col items-center pb-1">
        <button
          className="p-2 rounded-2xl text-zinc-400 hover:text-zinc-600 hover:bg-white/80 transition-all cursor-pointer"
          title="Settings"
        >
          <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>
    </aside>
  );
}
