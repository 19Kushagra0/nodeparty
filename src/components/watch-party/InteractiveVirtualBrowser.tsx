"use client";

import { useState, useRef } from "react";
import {
  ArrowLeft,
  ArrowRight,
  RefreshCw,
  Globe,
  Plus,
  X,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  MousePointer,
} from "@/icons";
import { useRoomStore } from "@/store/useRoomStore";
import { MultiplayerCursors } from "./MultiplayerCursors";
import { curatedVideoPresets } from "@/data/mockPresets";

export function InteractiveVirtualBrowser() {
  const {
    openTabs,
    activeTabId,
    setActiveTabId,
    closeTab,
    updateTabUrl,
    hasSharedControl,
    toggleSharedControl,
    showMultiplayerCursors,
    toggleMultiplayerCursors,
    currentPreset,
    setVideoUrl,
    isPlaying,
    togglePlay,
    currentTime,
    duration,
    seekTo,
    volume,
    setVolume,
    isMuted,
    toggleMute,
    ambientGlow,
    reactions,
    setScreenShareModalOpen,
  } = useRoomStore();

  const [urlInput, setUrlInput] = useState("");
  const [hoverTime, setHoverTime] = useState<number | null>(null);
  const [hoverPosition, setHoverPosition] = useState<number>(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const browserContainerRef = useRef<HTMLDivElement>(null);

  const activeTab = openTabs.find((t) => t.id === activeTabId) || openTabs[0];

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (urlInput.trim()) {
      let finalUrl = urlInput.trim();
      if (!finalUrl.startsWith("http://") && !finalUrl.startsWith("https://")) {
        finalUrl = `https://${finalUrl}`;
      }
      updateTabUrl(activeTab.id, finalUrl, finalUrl.replace("https://", "").split("/")[0]);
      setUrlInput("");
    }
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
    <div className="flex flex-col gap-3 w-full">
      {/* Ambient Lighting Glow */}
      <div className="relative w-full">
        {ambientGlow && (
          <div
            className="cinema-glow"
            style={{
              background: currentPreset.ambientColor || "rgba(244, 63, 94, 0.35)",
            }}
          />
        )}

        {/* Virtual Browser Window Frame */}
        <div
          ref={browserContainerRef}
          className="relative w-full bg-[#0a0c12] border border-white/[0.08] rounded-2xl overflow-hidden shadow-2xl flex flex-col justify-between select-none group"
        >
          {/* Top Browser Chrome: Tabs Bar */}
          <div className="flex items-center justify-between px-3 py-2 bg-[#08090e] border-b border-white/[0.06] text-xs">
            {/* Left: Window Dots & Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-none flex-1">
              <div className="flex items-center gap-1.5 mr-2 shrink-0">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              </div>

              {/* Tabs List */}
              {openTabs.map((tab) => {
                const isActive = tab.id === activeTab.id;
                return (
                  <div
                    key={tab.id}
                    onClick={() => setActiveTabId(tab.id)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono font-medium max-w-[180px] cursor-pointer transition-colors shrink-0 group/tab ${
                      isActive
                        ? "bg-[#141722] text-white border border-white/[0.1]"
                        : "bg-transparent text-zinc-400 hover:bg-white/[0.04] hover:text-zinc-200"
                    }`}
                  >
                    <Globe className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                    <span className="truncate">{tab.title}</span>
                    {openTabs.length > 1 && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          closeTab(tab.id);
                        }}
                        className="opacity-0 group-hover/tab:opacity-100 hover:text-rose-400 transition-opacity ml-1"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                );
              })}

              {/* + New Tab Action Button */}
              <button
                onClick={() => setScreenShareModalOpen(true)}
                className="p-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-zinc-400 hover:text-white transition-colors cursor-pointer ml-1"
                title="Open New Shared Tab"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Right: Remote Control & Cursor Visibility Pills */}
            <div className="flex items-center gap-2 shrink-0 pl-3">
              {/* Button to toggle other users' mouse visibility */}
              <button
                onClick={toggleMultiplayerCursors}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-bold tracking-wide uppercase transition-colors cursor-pointer ${
                  showMultiplayerCursors
                    ? "bg-rose-950/60 border border-rose-500/40 text-rose-300 hover:bg-rose-900/60"
                    : "bg-[#141722] border border-white/[0.1] text-zinc-400 hover:text-white"
                }`}
                title={showMultiplayerCursors ? "Click to hide other users' cursors" : "Click to show other users' cursors"}
              >
                <MousePointer className="w-3 h-3" />
                <span>{showMultiplayerCursors ? "Cursors: ON" : "Cursors: OFF"}</span>
              </button>

              {/* Co-Browsing Permission Pill */}
              <button
                onClick={toggleSharedControl}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-bold tracking-wide uppercase transition-colors cursor-pointer ${
                  hasSharedControl
                    ? "bg-emerald-950/60 border border-emerald-500/40 text-emerald-300"
                    : "bg-amber-950/60 border border-amber-500/40 text-amber-300"
                }`}
                title="Click to toggle interactive mouse control for all participants"
              >
                <MousePointer className="w-3 h-3" />
                <span>{hasSharedControl ? "Co-Browsing: Open" : "Host Only"}</span>
              </button>
            </div>
          </div>

          {/* Browser Navigation & Address Bar */}
          <div className="flex items-center gap-2.5 px-3 py-2 bg-[#0e1117] border-b border-white/[0.06]">
            {/* Back / Forward / Refresh */}
            <div className="flex items-center gap-1 text-zinc-400">
              <button
                className="p-1.5 rounded-lg hover:bg-white/[0.06] hover:text-white transition-colors cursor-pointer"
                title="Back"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
              </button>
              <button
                className="p-1.5 rounded-lg hover:bg-white/[0.06] hover:text-white transition-colors cursor-pointer"
                title="Forward"
              >
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                className="p-1.5 rounded-lg hover:bg-white/[0.06] hover:text-white transition-colors cursor-pointer"
                title="Reload Page"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* URL Input Bar */}
            <form onSubmit={handleUrlSubmit} className="flex-1 relative">
              <input
                type="text"
                placeholder={activeTab.url}
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                className="w-full px-3 py-1.5 pl-8 rounded-lg bg-[#141722] border border-white/[0.08] text-xs font-mono text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-rose-500"
              />
              <Globe className="w-3.5 h-3.5 text-zinc-500 absolute left-2.5 top-2" />
            </form>

            {/* Presets Quick Switch */}
            <div className="hidden sm:flex items-center gap-1.5">
              {curatedVideoPresets.slice(0, 3).map((p) => (
                <button
                  key={p.id}
                  onClick={() => setVideoUrl(p.url, p)}
                  className="px-2 py-1 rounded-lg bg-[#141722] hover:bg-[#1f2436] text-xs font-mono text-zinc-300 hover:text-white border border-white/[0.05] transition-colors"
                >
                  {p.title.split("—")[0].split(":")[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Webpage / Video Viewport Stage */}
          <div className="relative aspect-video w-full bg-black overflow-hidden flex flex-col justify-between">
            {/* Active Content Background Poster */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-all duration-700"
              style={{ backgroundImage: `url('${activeTab.thumbnail || currentPreset.thumbnail}')` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-black/60" />
            </div>

            {/* LIVE MULTIPLAYER CURSORS OVERLAY */}
            <MultiplayerCursors containerRef={browserContainerRef} />

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
                    className={`text-xs font-mono font-bold text-white px-2 py-0.5 rounded-full bg-[#1e2230] border border-white/20`}
                  >
                    {r.senderName}
                  </span>
                </div>
              ))}
            </div>

            {/* Top Video / Tab Meta Bar */}
            <div className="relative z-10 p-4 sm:p-6 flex items-start justify-between bg-gradient-to-b from-black/80 to-transparent">
              <div className="space-y-1 max-w-xl">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded bg-rose-500 text-white text-xs font-mono font-bold tracking-wider uppercase">
                    LIVE TAB
                  </span>
                  <span className="px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-zinc-300 text-xs font-mono border border-white/10">
                    4K HDR • Co-Browsing
                  </span>
                  <span className="text-zinc-400 text-xs font-mono hidden sm:inline">
                    {activeTab.title}
                  </span>
                </div>
                <h2 className="text-sm sm:text-lg font-black text-white drop-shadow-md truncate">
                  {currentPreset.title}
                </h2>
              </div>

              {/* Sound Equalizer Waves */}
              {isPlaying && (
                <div className="flex items-end gap-1 h-6 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-white/10">
                  <span className="w-1 bg-rose-400 rounded-full animate-equalizer-1" />
                  <span className="w-1 bg-rose-500 rounded-full animate-equalizer-2" />
                  <span className="w-1 bg-pink-400 rounded-full animate-equalizer-3" />
                </div>
              )}
            </div>

            {/* Center Playback Trigger Action */}
            <div className="relative z-10 self-center my-auto">
              <button
                onClick={togglePlay}
                className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl bg-rose-500 hover:bg-rose-600 text-white flex items-center justify-center backdrop-blur-md border border-white/20 transform group-hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-2xl"
                title={isPlaying ? "Pause Stream" : "Play Stream"}
              >
                {isPlaying ? (
                  <Pause className="w-8 h-8 sm:w-9 sm:h-9 fill-white" />
                ) : (
                  <Play className="w-8 h-8 sm:w-9 sm:h-9 fill-white ml-1" />
                )}
              </button>
            </div>

            {/* Bottom Scrubber & Quick Controls */}
            <div className="relative z-10 p-4 sm:p-6 space-y-3 bg-gradient-to-t from-black/95 via-black/85 to-transparent">
              {/* Progress Scrubber with Tooltip */}
              <div className="space-y-1 relative">
                <div
                  className="h-2 w-full bg-white/20 hover:h-3 rounded-full cursor-pointer relative transition-all group/scrubber"
                  onClick={handleSeek}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={() => setHoverTime(null)}
                >
                  <div
                    className="h-full bg-white/30 rounded-full absolute left-0 top-0"
                    style={{ width: `${Math.min(100, ((currentTime + 45) / duration) * 100)}%` }}
                  />
                  <div
                    className="h-full bg-rose-500 rounded-full relative transition-all"
                    style={{ width: `${(currentTime / duration) * 100}%` }}
                  >
                    <span className="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-white scale-0 group-hover/scrubber:scale-100 transition-transform" />
                  </div>

                  {hoverTime !== null && (
                    <div
                      style={{ left: `${hoverPosition}%` }}
                      className="absolute -top-8 -translate-x-1/2 px-2 py-0.5 rounded-md bg-zinc-900 border border-white/20 text-xs font-mono text-white shadow-lg pointer-events-none"
                    >
                      {formatTime(hoverTime)}
                    </div>
                  )}
                </div>

                <div className="flex justify-between text-xs font-mono text-zinc-400">
                  <span>{formatTime(currentTime)}</span>
                  <span className="text-zinc-500">{formatTime(duration)}</span>
                </div>
              </div>

              {/* Bottom Row Controls */}
              <div className="flex items-center justify-between gap-4 pt-1">
                <div className="flex items-center gap-3">
                  <button
                    onClick={togglePlay}
                    className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                  </button>

                  <div className="flex items-center gap-2 pl-2 border-l border-white/10">
                    <button
                      onClick={toggleMute}
                      className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
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

                <div className="flex items-center gap-2">
                  <button
                    onClick={toggleFullscreen}
                    className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
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
