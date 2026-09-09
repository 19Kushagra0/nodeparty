"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  ChevronLeft,
  ChevronUp,
  ChevronDown,
  MessageSquare,
  Users,
  Copy,
  Check,
  Crown,
} from "lucide-react";
import { useRoomStore } from "@/store/useRoomStore";
import { MultiplayerCursors } from "./MultiplayerCursors";

export function CinematicVideoPlayer() {
  const router = useRouter();
  const {
    roomId,
    roomPasscode,
    currentPreset,
    isPlaying,
    togglePlay,
    currentTime,
    duration,
    seekTo,
    volume,
    setVolume,
    isMuted,
    toggleMute,
    reactions,
    participants,
    messages,
    queue,
    playQueueItem,
  } = useRoomStore();

  const host = participants.find((p) => p.role === "host");
  const hostName = host ? host.name.replace(" (You)", "") : "Alex";

  const [hoverTime, setHoverTime] = useState<number | null>(null);
  const [hoverPosition, setHoverPosition] = useState<number>(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isNotchOpen, setIsNotchOpen] = useState(true);
  const [copiedCode, setCopiedCode] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const browserContainerRef = useRef<HTMLDivElement>(null);

  const handlePlayerMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      setShowControls(false);
    }, 3000);
  };

  const handlePlayerMouseLeave = () => {
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      setShowControls(false);
    }, 3000);
  };

  useEffect(() => {
    controlsTimeoutRef.current = setTimeout(() => {
      setShowControls(false);
    }, 3000);

    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, []);

  const handleCopyCode = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(roomPasscode || roomId);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const nextItem = queue.find((item) => !item.isPlaying) || queue[0];

  const handlePlayNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (nextItem) {
      playQueueItem(nextItem.id);
    }
  };

  const handleBackToHome = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push("/");
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, clickX / rect.width));
    seekTo(percentage * duration);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, mouseX / rect.width));
    setHoverPosition(percentage * 100);
    setHoverTime(percentage * duration);
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = Math.floor(secs % 60);
    return `${mins.toString().padStart(2, "0")}:${remainder.toString().padStart(2, "0")}`;
  };

  const toggleFullscreen = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!browserContainerRef.current) return;
    if (!document.fullscreenElement) {
      browserContainerRef.current.requestFullscreen?.().catch(() => { });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.().catch(() => { });
      setIsFullscreen(false);
    }
  };

  return (
    <div className="w-full h-full min-h-0 relative flex flex-col">
      {/* Machined Double-Bezel Container with pronounced organic rounded corners */}
      <div
        ref={browserContainerRef}
        onMouseMove={handlePlayerMouseMove}
        onMouseEnter={handlePlayerMouseMove}
        onMouseLeave={handlePlayerMouseLeave}
        className={`relative w-full h-full min-h-0 bg-black rounded-[32px] sm:rounded-[42px] lg:rounded-[48px] overflow-hidden select-none shadow-[0_12px_40px_rgba(0,0,0,0.22)] ${!showControls ? "cursor-none" : ""
          }`}
      >
        {/* Active Content Background Poster */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-700"
          style={{ backgroundImage: `url('${currentPreset.thumbnail}')` }}
        >
          {/* subtle dimming to make UI pop */}
          <div
            className={`absolute inset-0 transition-colors duration-500 ${showControls ? "bg-black/35" : "bg-black/15"
              }`}
          />
        </div>

        {/* Floating Emoji Reactions Stream */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
          {reactions.map((r) => (
            <div
              key={r.id}
              style={{ left: `${r.xOffset}%`, bottom: "25%" }}
              className="absolute animate-float-reaction flex flex-col items-center gap-1.5 z-30"
            >
              <span className="text-4xl sm:text-5xl drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)] filter">
                {r.emoji}
              </span>
              <span
                className={`text-[10px] font-semibold text-white px-2 py-0.5 rounded-full bg-black/40 backdrop-blur border border-white/10`}
              >
                {r.senderName}
              </span>
            </div>
          ))}
        </div>

        {/* Interactive Screen Share Overlay */}
        <MultiplayerCursors containerRef={browserContainerRef} />

        {/* Center Dipped Notch & Modal Capsule - Always visible at top-0 regardless of hover or inactivity */}
        {isNotchOpen && (
          <div className="pointer-events-auto absolute top-0 left-1/2 -translate-x-1/2 z-[100] flex items-center justify-center animate-in fade-in slide-in-from-top-2 duration-300 cursor-default">
            {/* White Curved Notch Background attached seamlessly to top-0 */}
            <svg
              className="w-[380px] sm:w-[430px] lg:w-[470px] h-[58px] sm:h-[64px] drop-shadow-[0_2px_8px_rgba(0,0,0,0.06)] block"
              viewBox="0 0 480 66"
              fill="none"
              preserveAspectRatio="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M 0 -2 L 0 0 C 25 0, 45 64, 70 64 L 410 64 C 435 64, 455 0, 480 0 L 480 -2 Z"
                fill="#ffffff"
              />
            </svg>

            {/* Inner Soft-Tinted Modal Capsule */}
            <div className="absolute inset-0 pt-1 sm:pt-1.5 pb-[12px] sm:pb-[14px] flex items-center justify-center">
              <div className="bg-[#f0f2f6] rounded-full pl-6 pr-5 sm:pl-7 sm:pr-6 py-2 sm:py-2.5 flex items-center gap-3 sm:gap-3.5 text-zinc-600 text-[11px] sm:text-xs font-semibold shadow-2xs">
                {/* Code Name & Copy Button */}
                <button
                  onClick={handleCopyCode}
                  className="flex items-center gap-1.5 cursor-pointer hover:opacity-85 transition-opacity select-none group/code"
                  title="Click to copy Room Code"
                >
                  <span className="font-semibold text-zinc-500 text-[10px] sm:text-[11px] tracking-wider uppercase">
                    CODE:
                  </span>
                  <span className="font-mono font-bold text-rose-500 tracking-wider text-xs sm:text-[13px]">
                    {roomPasscode || roomId}
                  </span>
                  <span className="text-zinc-400 group-hover/code:text-zinc-700 transition-colors ml-0.5">
                    {copiedCode ? (
                      <Check className="w-3.5 h-3.5 text-emerald-500 stroke-[2.5]" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </span>
                </button>

                {/* Dot Separator */}
                <span className="text-zinc-300 font-bold text-xs select-none">•</span>

                {/* Host Info */}
                <div className="flex items-center gap-1.5 select-none">
                  <Crown className="w-3.5 h-3.5 text-rose-500 stroke-[2.2]" />
                  <span className="font-medium text-zinc-500 text-[10px] sm:text-[11px]">
                    Host:
                  </span>
                  <span className="font-bold text-zinc-800 text-xs sm:text-[13px]">
                    {hostName}
                  </span>
                </div>

                {/* Toggle Button inside to Disappear/Collapse */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsNotchOpen(false);
                  }}
                  className="p-1 -mr-1 rounded-full hover:bg-zinc-200/80 text-zinc-400 hover:text-zinc-700 transition-all cursor-pointer"
                  title="Hide modal"
                >
                  <ChevronUp className="w-3.5 h-3.5 stroke-[2.5]" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Top Floating Controls Header (Back to Home & Show details) - Hides/shows with mouse hover */}
        <div
          className={`absolute top-0 left-0 right-0 z-[90] flex items-start justify-between pointer-events-none px-5 sm:px-7 lg:px-8 transition-all duration-300 ease-out ${showControls
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-2 pointer-events-none"
            }`}
        >
          {/* Left Pill: Back to Home */}
          <div className="pt-3.5 sm:pt-4 transition-all duration-300 ease-out">
            <button
              onClick={handleBackToHome}
              className="pointer-events-auto flex items-center gap-1.5 px-5 py-2 rounded-full bg-white hover:bg-zinc-50 text-zinc-900 shadow-2xs border border-white transition-all text-xs sm:text-sm font-bold hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4 text-zinc-700 stroke-[2.5]" />
              <span>Back to Home</span>
            </button>
          </div>

          {/* Right Header Area (Show Info button when modal is closed) */}
          <div className="pt-3.5 sm:pt-4 flex items-center gap-2 pointer-events-auto transition-all duration-300 ease-out">
            {!isNotchOpen && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsNotchOpen(true);
                }}
                className="flex items-center gap-1.5 px-5 py-2 rounded-full bg-white hover:bg-zinc-50 text-zinc-800 shadow-2xs border border-white transition-all text-xs sm:text-sm font-bold hover:scale-[1.02] active:scale-[0.98] cursor-pointer animate-in fade-in duration-200"
                title="Show Room Code"
              >
                <span>Show details</span>
              </button>
            )}
          </div>
        </div>

        {/* Center Giant Play/Pause (Only visible when paused) */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
            <div className="w-14 h-14 sm:w-18 sm:h-18 rounded-full bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center shadow-2xl">
              <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-white ml-1 opacity-95 text-white" />
            </div>
          </div>
        )}

        {/* Clickable Area for Play/Pause */}
        <div
          className="absolute inset-0 z-0 cursor-pointer"
          onClick={togglePlay}
        />

        {/* Bottom Progress Bar & Controls */}
        <div
          className={`absolute bottom-0 left-0 right-0 p-4 sm:p-5 z-50 transition-all duration-300 bg-gradient-to-t from-black/85 via-black/40 to-transparent flex flex-col gap-3 ${showControls
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-2 pointer-events-none"
            }`}
        >

          {/* Progress Line */}
          <div
            className="h-1.5 sm:h-2 w-full bg-white/20 rounded-full cursor-pointer relative group/scrubber overflow-hidden"
            onClick={handleSeek}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setHoverTime(null)}
          >
            {/* Buffer / Loaded */}
            <div
              className="h-full bg-white/30 rounded-full absolute left-0 top-0 pointer-events-none"
              style={{ width: `${Math.min(100, ((currentTime + 45) / duration) * 100)}%` }}
            />
            {/* Play Line */}
            <div
              className="h-full bg-rose-500 rounded-full relative pointer-events-none shadow-[0_0_10px_rgba(244,63,94,0.5)]"
              style={{ width: `${(currentTime / duration) * 100}%` }}
            />

            {/* Hover Time Tooltip */}
            {hoverTime !== null && (
              <div
                style={{ left: `${hoverPosition}%` }}
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 px-2 py-1 rounded bg-black/80 backdrop-blur text-white text-[10px] font-bold shadow-lg pointer-events-none opacity-0 group-hover/scrubber:opacity-100 transition-opacity z-10"
              >
                {formatTime(hoverTime)}
              </div>
            )}
          </div>

          {/* Bottom Actions Row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={togglePlay}
                className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer backdrop-blur-md"
              >
                {isPlaying ? <Pause className="w-5 h-5 fill-white" /> : <Play className="w-5 h-5 fill-white ml-0.5" />}
              </button>

              <div className="flex items-center gap-2 group/vol bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-xl p-2 px-3 transition-colors">
                <button
                  onClick={toggleMute}
                  className="text-white cursor-pointer"
                >
                  {isMuted || volume === 0 ? (
                    <VolumeX className="w-5 h-5 text-rose-400" />
                  ) : (
                    <Volume2 className="w-5 h-5" />
                  )}
                </button>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={isMuted ? 0 : volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                  className="w-0 sm:w-20 opacity-0 group-hover/vol:w-20 group-hover/vol:opacity-100 sm:opacity-100 accent-rose-500 h-1 bg-white/20 rounded-full cursor-pointer transition-all duration-300"
                />
              </div>

              <span className="text-sm font-medium text-white/90 select-none hidden sm:inline ml-2">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>

            <div className="flex items-center gap-2 sm:gap-2.5">
              {/* HD Badge */}
              <div className="px-2.5 py-1 rounded-xl bg-white/10 backdrop-blur-md text-white text-[11px] font-bold select-none hidden sm:block">
                HD
              </div>

              {/* Fake Subtitles */}
              <button className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer backdrop-blur-md" title="Subtitles">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="14" x="3" y="5" rx="2" ry="2" /><path d="M7 15h4M15 15h2M7 11h2M13 11h4" /></svg>
              </button>

              {/* Settings */}
              <button className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer backdrop-blur-md" title="Settings">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" /><circle cx="12" cy="12" r="3" /></svg>
              </button>

              {/* Fullscreen Toggle */}
              <button
                onClick={toggleFullscreen}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer backdrop-blur-md"
                title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
              >
                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
