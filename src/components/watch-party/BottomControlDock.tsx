"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  Tv,
  Camera,
  LayoutGrid,
  PhoneOff,
  Image as ImageIcon,
  Smile,
  ChevronLeft,
} from "@/icons";
import { useRoomStore } from "@/store/useRoomStore";

export function BottomControlDock() {
  const router = useRouter();
  const {
    isMicOn,
    toggleMic,
    isVideoOn,
    toggleVideo,
    layoutMode,
    setLayoutMode,
    setScreenShareModalOpen,
    captureMoment,
    setMomentsGalleryOpen,
    capturedMoments,
    triggerReaction,
  } = useRoomStore();

  const [isCapturing, setIsCapturing] = useState(false);
  const [showLeaveConfirm, setShowLeaveConfirm] = useState(false);
  const [isReactionsExpanded, setIsReactionsExpanded] = useState(false);

  const quickReactions = ["🔥", "🍿", "😂", "❤️", "👏", "🎉"];

  const handleCapture = () => {
    setIsCapturing(true);
    captureMoment();
    setTimeout(() => {
      setIsCapturing(false);
    }, 600);
  };

  const handleSendReaction = (emoji: string) => {
    triggerReaction(emoji);
  };

  const handleLeave = () => {
    router.push("/");
  };

  return (
    <>
      {/* Floating Bottom Control Bar Dock */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 max-w-full px-4">
        <div className="relative flex items-center gap-2 sm:gap-2.5 p-2 sm:p-2.5 bg-[#0f1118]/95 backdrop-blur-2xl border border-white/[0.12] rounded-3xl sm:rounded-full shadow-2xl shadow-black/80 ring-1 ring-white/[0.05]">
          {/* Quick Reactions: Minimizable / Expandable */}
          {isReactionsExpanded ? (
            <div className="flex items-center gap-1 pl-2 pr-1.5 py-1 bg-zinc-900/90 border border-white/[0.1] rounded-2xl sm:rounded-full animate-in fade-in zoom-in-95 duration-200">
              <button
                onClick={() => setIsReactionsExpanded(false)}
                className="p-1.5 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                title="Minimize Reactions"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 mr-0.5 hidden sm:inline">
                React:
              </span>
              {quickReactions.map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => handleSendReaction(emoji)}
                  className="text-base hover:scale-135 active:scale-90 transition-transform p-1 rounded-xl hover:bg-white/[0.08] cursor-pointer"
                  title={`Send ${emoji}`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          ) : (
            <button
              onClick={() => setIsReactionsExpanded(true)}
              className="p-3 sm:p-3.5 rounded-2xl sm:rounded-full bg-zinc-800 hover:bg-zinc-700 text-amber-300 hover:text-amber-200 border border-white/[0.08] transition-all cursor-pointer flex items-center justify-center group"
              title="Open Emoji Reactions"
            >
              <Smile className="w-5 h-5 group-hover:scale-115 transition-transform" />
            </button>
          )}

          <div className="h-6 w-[1px] bg-white/[0.1]" />

          {/* 1. Microphone Toggle */}
          <button
            onClick={toggleMic}
            className={`p-3 sm:p-3.5 rounded-2xl sm:rounded-full transition-all cursor-pointer flex items-center justify-center ${
              isMicOn
                ? "bg-zinc-800 hover:bg-zinc-700 text-white shadow-md"
                : "bg-rose-950/80 hover:bg-rose-900 border border-rose-500/40 text-rose-300"
            }`}
            title={isMicOn ? "Mute Microphone" : "Unmute Microphone"}
          >
            {isMicOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
          </button>

          {/* 2. Video Camera Toggle */}
          <button
            onClick={toggleVideo}
            className={`p-3 sm:p-3.5 rounded-2xl sm:rounded-full transition-all cursor-pointer flex items-center justify-center ${
              isVideoOn
                ? "bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500/40 text-emerald-300 shadow-md"
                : "bg-zinc-800 hover:bg-zinc-700 text-white"
            }`}
            title={isVideoOn ? "Turn Camera Off" : "Turn Camera On"}
          >
            {isVideoOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5 text-zinc-400" />}
          </button>

          {/* 3. Primary Center Button: [ 📺 Start Watching / Share Tab ] */}
          <button
            onClick={() => setScreenShareModalOpen(true)}
            className="group relative inline-flex items-center gap-2 px-4 sm:px-5 py-3 sm:py-3.5 rounded-2xl sm:rounded-full bg-[#181628] hover:bg-[#231f3a] border border-[#6351d4]/60 text-[#a594fd] hover:text-white font-bold text-xs sm:text-sm shadow-xl shadow-indigo-950/50 transition-all cursor-pointer active:scale-95"
            title="Open Co-Browsing Tab or Share Screen"
          >
            <Tv className="w-4 sm:w-5 h-4 sm:h-5 text-[#8b77f9] group-hover:scale-110 transition-transform" />
            <span className="whitespace-nowrap font-extrabold tracking-tight">Start Watching</span>
          </button>

          <div className="h-6 w-[1px] bg-white/[0.1] hidden sm:block" />

          {/* 4. Pink/Magenta Button: [ 📷 Capture Moment ] */}
          <button
            onClick={handleCapture}
            disabled={isCapturing}
            className="group relative inline-flex items-center gap-2 px-4 sm:px-5 py-3 sm:py-3.5 rounded-2xl sm:rounded-full bg-[#24121d] hover:bg-[#321727] border border-[#f43f5e]/50 text-[#fb7185] hover:text-white font-bold text-xs sm:text-sm shadow-xl shadow-rose-950/50 transition-all cursor-pointer active:scale-95 disabled:opacity-50"
            title="Snap a live memory photo of this watch party moment"
          >
            <Camera
              className={`w-4 sm:w-5 h-4 sm:h-5 text-rose-400 group-hover:scale-110 transition-transform ${
                isCapturing ? "animate-spin" : ""
              }`}
            />
            <span className="whitespace-nowrap font-extrabold tracking-tight">Capture Moment</span>
          </button>

          {/* 5. View Album Memories Button (shows when moments exist) */}
          {capturedMoments.length > 0 && (
            <button
              onClick={() => setMomentsGalleryOpen(true)}
              className="p-3 sm:p-3.5 rounded-2xl sm:rounded-full bg-zinc-850 hover:bg-zinc-750 text-zinc-300 hover:text-white border border-white/[0.08] transition-all cursor-pointer relative hidden md:flex items-center justify-center"
              title="View Room Album Moments"
            >
              <ImageIcon className="w-5 h-5 text-amber-400" />
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-600 text-white text-[9px] font-mono font-bold flex items-center justify-center">
                {capturedMoments.length}
              </span>
            </button>
          )}

          {/* 6. Layout Grid Switcher Button [ ⊞ ] */}
          <button
            onClick={() => setLayoutMode(layoutMode === "cinema" ? "grid" : "cinema")}
            className={`p-3 sm:p-3.5 rounded-2xl sm:rounded-full transition-all cursor-pointer flex items-center justify-center ${
              layoutMode === "grid"
                ? "bg-purple-950/80 border border-purple-500/40 text-purple-300 shadow-md"
                : "bg-zinc-800 hover:bg-zinc-700 text-white"
            }`}
            title={layoutMode === "cinema" ? "Switch to Gallery Grid View" : "Switch to Cinema Focus"}
          >
            <LayoutGrid className="w-5 h-5" />
          </button>

          <div className="h-6 w-[1px] bg-white/[0.1]" />

          {/* 7. Red Leave Call Button [ 📵 ] */}
          <button
            onClick={() => setShowLeaveConfirm(true)}
            className="p-3 sm:p-3.5 rounded-2xl sm:rounded-full bg-[#f43f5e] hover:bg-[#e11d48] text-white shadow-xl shadow-rose-950/60 transition-transform active:scale-90 cursor-pointer flex items-center justify-center"
            title="Leave Watch Party"
          >
            <PhoneOff className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>
      </div>

      {/* Leave Room Confirmation Modal */}
      {showLeaveConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-sm bg-[#0e111a] border border-white/[0.12] rounded-3xl p-6 shadow-2xl text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-600/20 border border-rose-500/30 flex items-center justify-center text-rose-400 mx-auto">
              <PhoneOff className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-white">Leave Watch Party?</h3>
              <p className="text-xs text-zinc-400">
                You will exit the synchronized lounge. You can rejoin anytime using the room code.
              </p>
            </div>
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setShowLeaveConfirm(false)}
                className="flex-1 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold cursor-pointer"
              >
                Stay
              </button>
              <button
                onClick={handleLeave}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-md cursor-pointer"
              >
                Leave Lounge
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
