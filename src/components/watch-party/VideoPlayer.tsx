"use client";

import { useState, useEffect, useRef } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  FastForward,
  Rewind,
  Lock,
  Film,
  Search,
} from "@/icons";
import { useRoomStore } from "@/store/useRoomStore";
import { curatedVideoPresets } from "@/data/mockPresets";

export function VideoPlayer() {
  const {
    userRole,
    currentPreset,
    setVideoUrl,
    isPlaying,
    togglePlay,
    currentTime,
    duration,
    seekTo,
    setCurrentTime,
    volume,
    setVolume,
    isMuted,
    toggleMute,
    playbackRate,
    setPlaybackRate,
    ambientGlow,
    reactions,
    triggerReaction,
  } = useRoomStore();

  const [inputUrl, setInputUrl] = useState("");
  const [hoverTime, setHoverTime] = useState<number | null>(null);
  const [hoverPosition, setHoverPosition] = useState<number>(0);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const playerContainerRef = useRef<HTMLDivElement>(null);

  // Playback timer simulation
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentTime(currentTime >= duration ? 0 : currentTime + 1);
    }, 1000 / playbackRate);
    return () => clearInterval(interval);
  }, [isPlaying, currentTime, duration, playbackRate, setCurrentTime]);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = Math.floor(secs % 60);
    return `${mins.toString().padStart(2, "0")}:${remainder.toString().padStart(2, "0")}`;
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

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputUrl.trim()) {
      setVideoUrl(inputUrl.trim());
      setInputUrl("");
    }
  };

  const toggleFullscreen = () => {
    if (!playerContainerRef.current) return;
    if (!document.fullscreenElement) {
      playerContainerRef.current.requestFullscreen?.().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const quickReactions = ["🔥", "🍿", "😂", "❤️", "👏", "🎉", "🚀", "💀"];

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Top Video Presets & URL Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-[#0e111a] border border-white/[0.08] p-3 rounded-2xl shadow-lg">
        {/* Curated Sample Video Switcher Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 px-2 shrink-0">
            Presets:
          </span>
          {curatedVideoPresets.map((preset) => {
            const isActive = currentPreset.id === preset.id;
            return (
              <button
                key={preset.id}
                onClick={() => setVideoUrl(preset.url, preset)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                  isActive
                    ? "bg-rose-600 text-white shadow-md shadow-rose-950/40 border border-rose-400/30"
                    : "bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 border border-white/[0.05]"
                }`}
              >
                <Film className="w-3 h-3 text-rose-300" />
                <span>{preset.title.split("—")[0].trim()}</span>
              </button>
            );
          })}
        </div>

        {/* Change URL Input (Host / Mod controls) */}
        {userRole !== "participant" ? (
          <form onSubmit={handleUrlSubmit} className="flex items-center gap-2 shrink-0">
            <div className="relative">
              <input
                type="text"
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
                placeholder="Paste YouTube URL..."
                className="w-48 sm:w-56 px-3 py-1.5 pl-8 rounded-xl bg-zinc-950 border border-white/[0.1] text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-rose-500"
              />
              <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-2.5 top-2" />
            </div>
            <button
              type="submit"
              disabled={!inputUrl.trim()}
              className="px-3 py-1.5 rounded-xl bg-zinc-800 hover:bg-rose-600 disabled:opacity-40 text-white text-xs font-semibold border border-white/[0.08] transition-all cursor-pointer"
            >
              Load
            </button>
          </form>
        ) : (
          <div className="flex items-center gap-2 text-xs text-zinc-400 font-medium px-2">
            <Lock className="w-3.5 h-3.5 text-amber-400" />
            <span>Viewer Mode (Sync Locked)</span>
          </div>
        )}
      </div>

      {/* Main Cinema Viewport with Dynamic Ambient Lighting */}
      <div className="relative w-full">
        {/* Dynamic Ambient Glow Canvas */}
        {ambientGlow && (
          <div
            className="cinema-glow"
            style={{
              background: currentPreset.ambientColor || "rgba(244, 63, 94, 0.35)",
            }}
          />
        )}

        <div
          ref={playerContainerRef}
          className="relative aspect-video w-full bg-black border border-white/[0.1] rounded-3xl overflow-hidden shadow-2xl group flex flex-col justify-between select-none"
        >
          {/* Active Cinema Video Poster / Feed */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-all duration-700"
            style={{ backgroundImage: `url('${currentPreset.thumbnail}')` }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-black/60" />
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
                  className={`text-[10px] font-bold text-white px-2 py-0.5 rounded-full bg-gradient-to-r ${r.senderAvatar} shadow-lg border border-white/20`}
                >
                  {r.senderName}
                </span>
              </div>
            ))}
          </div>

          {/* Top Video Information Bar */}
          <div className="relative z-10 p-4 sm:p-6 flex items-start justify-between bg-gradient-to-b from-black/80 to-transparent">
            <div className="space-y-1 max-w-xl">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-md bg-rose-600 text-white text-[10px] font-black tracking-wider uppercase shadow-md">
                  NOW STREAMING
                </span>
                <span className="px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-md text-zinc-300 text-[10px] font-mono border border-white/10">
                  4K HDR • 60 FPS
                </span>
                <span className="text-zinc-400 text-xs font-mono hidden sm:inline">
                  {currentPreset.channel}
                </span>
              </div>
              <h2 className="text-sm sm:text-lg font-black text-white drop-shadow-md truncate">
                {currentPreset.title}
              </h2>
            </div>

            {/* Sound Wave Bars */}
            {isPlaying && (
              <div className="flex items-end gap-1 h-6 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-white/10">
                <span className="w-1 bg-rose-400 rounded-full animate-equalizer-1" />
                <span className="w-1 bg-rose-500 rounded-full animate-equalizer-2" />
                <span className="w-1 bg-pink-400 rounded-full animate-equalizer-3" />
              </div>
            )}
          </div>

          {/* Center Play / Pause Splash Action */}
          <div className="relative z-10 self-center my-auto">
            <button
              onClick={togglePlay}
              className="w-18 h-18 sm:w-20 sm:h-20 rounded-3xl bg-rose-600/90 hover:bg-rose-500 text-white flex items-center justify-center shadow-2xl shadow-rose-950/80 backdrop-blur-md border border-white/20 transform group-hover:scale-105 active:scale-95 transition-all cursor-pointer"
              title={isPlaying ? "Pause Stream" : "Play Stream"}
            >
              {isPlaying ? (
                <Pause className="w-8 h-8 sm:w-9 sm:h-9 fill-white" />
              ) : (
                <Play className="w-8 h-8 sm:w-9 sm:h-9 fill-white ml-1" />
              )}
            </button>
          </div>

          {/* Bottom Cinema Controls Bar & Scrubber */}
          <div className="relative z-10 p-4 sm:p-6 space-y-3 bg-gradient-to-t from-black/95 via-black/85 to-transparent">
            {/* Scrubber Progress Bar with Time Hover Tooltip */}
            <div className="space-y-1 relative">
              <div
                className="h-2 w-full bg-white/20 hover:h-3 rounded-full cursor-pointer relative transition-all group/scrubber"
                onClick={handleSeek}
                onMouseMove={handleMouseMove}
                onMouseLeave={() => setHoverTime(null)}
              >
                {/* Buffered Track */}
                <div
                  className="h-full bg-white/30 rounded-full absolute left-0 top-0"
                  style={{ width: `${Math.min(100, ((currentTime + 45) / duration) * 100)}%` }}
                />
                {/* Progress Track */}
                <div
                  className="h-full bg-gradient-to-r from-rose-500 via-rose-600 to-pink-500 rounded-full relative transition-all"
                  style={{ width: `${(currentTime / duration) * 100}%` }}
                >
                  <span className="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-white shadow-md shadow-rose-950/80 scale-0 group-hover/scrubber:scale-100 transition-transform" />
                </div>

                {/* Scrubber Hover Timestamp Tooltip */}
                {hoverTime !== null && (
                  <div
                    style={{ left: `${hoverPosition}%` }}
                    className="absolute -top-8 -translate-x-1/2 px-2 py-0.5 rounded-md bg-zinc-900 border border-white/20 text-[10px] font-mono text-white shadow-lg pointer-events-none"
                  >
                    {formatTime(hoverTime)}
                  </div>
                )}
              </div>

              {/* Time Indicators */}
              <div className="flex justify-between text-[11px] font-mono text-zinc-400">
                <span>{formatTime(currentTime)}</span>
                <span className="text-zinc-500">{formatTime(duration)}</span>
              </div>
            </div>

            {/* Bottom Controls Row */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
              {/* Left Controls: Play, Skip 10s, Volume */}
              <div className="flex items-center gap-3">
                <button
                  onClick={togglePlay}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                  title={isPlaying ? "Pause (Space)" : "Play (Space)"}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                </button>

                <button
                  onClick={() => seekTo(Math.max(0, currentTime - 10))}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-zinc-300 hover:text-white transition-colors cursor-pointer"
                  title="Rewind 10 seconds"
                >
                  <Rewind className="w-4 h-4" />
                </button>

                <button
                  onClick={() => seekTo(Math.min(duration, currentTime + 10))}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-zinc-300 hover:text-white transition-colors cursor-pointer"
                  title="Fast Forward 10 seconds"
                >
                  <FastForward className="w-4 h-4" />
                </button>

                {/* Volume Slider & Mute Toggle */}
                <div className="flex items-center gap-2 pl-2 border-l border-white/10">
                  <button
                    onClick={toggleMute}
                    className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                    title={isMuted ? "Unmute" : "Mute"}
                  >
                    {isMuted || volume === 0 ? (
                      <VolumeX className="w-4 h-4 text-rose-400" />
                    ) : (
                      <Volume2 className="w-4 h-4 text-white" />
                    )}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={isMuted ? 0 : volume}
                    onChange={(e) => setVolume(Number(e.target.value))}
                    className="w-16 sm:w-20 accent-rose-500 h-1.5 bg-white/20 rounded-lg cursor-pointer"
                  />
                </div>
              </div>

              {/* Right Controls: Playback Speed, Fullscreen */}
              <div className="flex items-center gap-2.5">
                {/* Playback Rate Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setShowSpeedMenu(!showSpeedMenu)}
                    className="px-2.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-mono font-bold text-zinc-200 transition-colors cursor-pointer"
                  >
                    {playbackRate}x
                  </button>

                  {showSpeedMenu && (
                    <div className="absolute bottom-full mb-2 right-0 bg-[#0e111a] border border-white/10 rounded-xl p-1 shadow-2xl flex flex-col gap-1 z-30 min-w-[70px]">
                      {[0.75, 1, 1.25, 1.5, 2].map((rate) => (
                        <button
                          key={rate}
                          onClick={() => {
                            setPlaybackRate(rate);
                            setShowSpeedMenu(false);
                          }}
                          className={`px-2.5 py-1 rounded-lg text-xs font-mono text-left transition-colors cursor-pointer ${
                            playbackRate === rate
                              ? "bg-rose-600 text-white font-bold"
                              : "text-zinc-300 hover:bg-white/10"
                          }`}
                        >
                          {rate}x
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Fullscreen Button */}
                <button
                  onClick={toggleFullscreen}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                  title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
                >
                  {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Instant Floating Reaction Bar Dock */}
      <div className="flex items-center justify-between gap-3 p-3 rounded-2xl bg-[#0e111a] border border-white/[0.08] shadow-lg">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
            Quick Reactions:
          </span>
          <div className="flex items-center gap-1.5">
            {quickReactions.map((emoji) => (
              <button
                key={emoji}
                onClick={() => triggerReaction(emoji)}
                className="text-lg hover:scale-135 active:scale-90 transition-transform p-1.5 rounded-xl hover:bg-white/[0.08] cursor-pointer"
                title={`Send ${emoji}`}
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-zinc-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Real-time Stream Engine</span>
        </div>
      </div>
    </div>
  );
}
