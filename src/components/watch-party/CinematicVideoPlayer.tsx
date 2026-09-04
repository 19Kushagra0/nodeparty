"use client";

import { useState, useRef } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  MousePointer,
} from "@/icons";
import { useRoomStore } from "@/store/useRoomStore";

export function CinematicVideoPlayer() {
  const {
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
  } = useRoomStore();

  const [hoverTime, setHoverTime] = useState<number | null>(null);
  const [hoverPosition, setHoverPosition] = useState<number>(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const browserContainerRef = useRef<HTMLDivElement>(null);

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

  const toggleFullscreen = () => {
    if (!browserContainerRef.current) return;
    if (!document.fullscreenElement) {
      browserContainerRef.current.requestFullscreen?.().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.().catch(() => {});
      setIsFullscreen(false);
    }
  };

  return (
    <div className="flex flex-col gap-3 w-full h-full lg:h-auto">
      {/* Machined Double-Bezel Container */}
      <div
        ref={browserContainerRef}
        className="relative w-full aspect-video bg-[#07080b] lg:rounded-[20px] ring-1 ring-white/[0.08] lg:p-1.5 shadow-[0_24px_80px_-12px_rgba(0,0,0,0.8)] overflow-hidden group select-none"
      >
        {/* Inner Screen Area */}
        <div className="relative w-full h-full bg-black lg:rounded-2xl overflow-hidden border-t border-white/[0.04]">
          {/* Active Content Background Poster */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-opacity duration-700"
            style={{ backgroundImage: `url('${currentPreset.thumbnail}')` }}
          >
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />
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
                  className={`text-xs font-mono font-bold text-white px-2 py-0.5 rounded-full bg-black/60 backdrop-blur border border-white/10`}
                >
                  {r.senderName}
                </span>
              </div>
            ))}
          </div>

          {/* Top Edge Screen Meta (Optional, fades on hover/idle) */}
          <div className="absolute top-0 left-0 right-0 p-4 sm:p-6 z-10 flex justify-between items-start opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-b from-black/80 to-transparent pointer-events-none">
            <div className="flex flex-col gap-1">
              <span className="px-2 py-0.5 w-fit rounded bg-rose-500 text-white text-[10px] font-mono font-bold tracking-wider uppercase">
                LIVE BROADCAST
              </span>
              <h2 className="text-sm sm:text-lg font-bold text-white drop-shadow-md truncate">
                {currentPreset.title}
              </h2>
            </div>
          </div>

          {/* Center Giant Play/Pause (Only visible when paused) */}
          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center shadow-2xl">
                <Play className="w-10 h-10 sm:w-12 sm:h-12 fill-white ml-2 opacity-90" />
              </div>
            </div>
          )}

          {/* Clickable Area for Play/Pause */}
          <div 
            className="absolute inset-0 z-0 cursor-pointer" 
            onClick={togglePlay} 
          />

          {/* Sleek Floating Bottom HUD Controls */}
          <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="bg-[#0e1117]/80 backdrop-blur-xl border border-white/[0.08] rounded-2xl p-3 sm:p-4 shadow-2xl flex flex-col gap-3">
              
              {/* Scrubber Area */}
              <div className="flex items-center gap-3 sm:gap-4 w-full">
                <span className="text-[10px] sm:text-xs font-mono text-zinc-400 w-10 text-right shrink-0">
                  {formatTime(currentTime)}
                </span>
                
                <div
                  className="h-2 flex-1 bg-black/50 hover:bg-black/70 rounded-full cursor-pointer relative transition-all group/scrubber overflow-hidden ring-1 ring-white/[0.05]"
                  onClick={handleSeek}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={() => setHoverTime(null)}
                >
                  {/* Buffer / Loaded */}
                  <div
                    className="h-full bg-white/10 rounded-full absolute left-0 top-0"
                    style={{ width: `${Math.min(100, ((currentTime + 45) / duration) * 100)}%` }}
                  />
                  {/* Progress Line */}
                  <div
                    className="h-full bg-rose-500 rounded-full relative transition-all shadow-[0_0_10px_rgba(244,63,94,0.5)]"
                    style={{ width: `${(currentTime / duration) * 100}%` }}
                  />

                  {/* Hover Time Tooltip */}
                  {hoverTime !== null && (
                    <div
                      style={{ left: `${hoverPosition}%` }}
                      className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 px-1.5 py-0.5 rounded bg-white text-black text-[10px] font-mono font-bold shadow-lg pointer-events-none opacity-0 group-hover/scrubber:opacity-100 transition-opacity z-10"
                    >
                      {formatTime(hoverTime)}
                    </div>
                  )}
                </div>

                <span className="text-[10px] sm:text-xs font-mono text-zinc-500 w-10 shrink-0">
                  {formatTime(duration)}
                </span>
              </div>

              {/* Action Buttons Row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 sm:gap-4">
                  <button
                    onClick={togglePlay}
                    className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                  >
                    {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white ml-0.5" />}
                  </button>

                  <div className="flex items-center gap-2 group/vol">
                    <button
                      onClick={toggleMute}
                      className="text-zinc-400 hover:text-white transition-colors cursor-pointer"
                    >
                      {isMuted || volume === 0 ? (
                        <VolumeX className="w-4 h-4 text-rose-500" />
                      ) : (
                        <Volume2 className="w-4 h-4" />
                      )}
                    </button>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={isMuted ? 0 : volume}
                      onChange={(e) => setVolume(Number(e.target.value))}
                      className="w-0 sm:w-16 opacity-0 group-hover/vol:w-16 group-hover/vol:opacity-100 sm:opacity-100 accent-white h-1 bg-white/20 rounded-full cursor-pointer transition-all duration-300"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={toggleFullscreen}
                    className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                    title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
                  >
                    {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
