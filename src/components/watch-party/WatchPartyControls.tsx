"use client";

import { useRoomStore } from "@/store/useRoomStore";
import { Mic, MicOff, Video, VideoOff, Tv, Smile, MoreHorizontal, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export function WatchPartyControls() {
  const router = useRouter();
  const {
    isMicOn,
    toggleMic,
    isVideoOn,
    toggleVideo,
    setScreenShareModalOpen,
    triggerReaction,
  } = useRoomStore();

  const handleLeave = () => {
    router.push("/");
  };

  return (
    <div className="flex items-center justify-between bg-white/70 backdrop-blur-md border border-white rounded-[20px] sm:rounded-[24px] p-2.5 sm:p-3 px-4 sm:px-6 shadow-xs w-full">
      {/* Control Buttons */}
      <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
        {/* Mic */}
        <button
          onClick={toggleMic}
          className={`flex items-center gap-2 px-3 sm:px-3.5 py-2 rounded-full transition-all shadow-2xs border border-white hover:shadow-xs cursor-pointer ${isMicOn
              ? "bg-white text-zinc-700 hover:text-zinc-900"
              : "bg-pink-50 text-rose-500 shadow-[0_0_12px_rgba(244,63,94,0.15)]"
            }`}
          title={isMicOn ? "Mute Microphone" : "Unmute Microphone"}
        >
          {isMicOn ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
          <span className="text-xs font-semibold hidden sm:inline">{isMicOn ? "Mute" : "Unmute"}</span>
        </button>

        {/* Camera */}
        <button
          onClick={toggleVideo}
          className={`flex items-center gap-2 px-3 sm:px-3.5 py-2 rounded-full transition-all shadow-2xs border border-white hover:shadow-xs cursor-pointer ${isVideoOn
              ? "bg-white text-zinc-700 hover:text-zinc-900"
              : "bg-pink-50 text-rose-500"
            }`}
          title={isVideoOn ? "Turn off Video" : "Start Video"}
        >
          {isVideoOn ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
          <span className="text-xs font-semibold hidden sm:inline">{isVideoOn ? "Stop Video" : "Start Video"}</span>
        </button>

        {/* Share Screen */}
        <button
          onClick={() => setScreenShareModalOpen(true)}
          className="flex items-center gap-2 px-3 sm:px-3.5 py-2 rounded-full bg-white text-zinc-700 hover:text-zinc-900 transition-all shadow-2xs border border-white hover:shadow-xs cursor-pointer"
          title="Share Screen"
        >
          <Tv className="w-4 h-4" />
          <span className="text-xs font-semibold hidden sm:inline">Share</span>
        </button>

        {/* React */}
        <button
          onClick={() => triggerReaction("🔥", "You")}
          className="flex items-center gap-2 px-3 sm:px-3.5 py-2 rounded-full bg-white text-zinc-700 hover:text-zinc-900 transition-all shadow-2xs border border-white hover:shadow-xs cursor-pointer"
          title="Shoot live reaction"
        >
          <Smile className="w-4 h-4" />
          <span className="text-xs font-semibold hidden sm:inline">React</span>
        </button>

        {/* More */}
        <button
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white text-zinc-600 hover:text-zinc-900 flex items-center justify-center transition-all shadow-2xs border border-white hover:shadow-xs cursor-pointer"
          title="More Actions"
        >
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>

      {/* Leave Room Button */}
      <button
        onClick={handleLeave}
        className="px-4 sm:px-5 py-2 sm:py-2.5 bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs sm:text-sm rounded-full flex items-center gap-2 shadow-[0_4px_14px_rgba(244,63,94,0.3)] transition-all hover:scale-[1.01] active:scale-[0.98] cursor-pointer shrink-0"
      >
        <LogOut className="w-4 h-4" />
        <span>Leave Room</span>
      </button>
    </div>
  );
}

