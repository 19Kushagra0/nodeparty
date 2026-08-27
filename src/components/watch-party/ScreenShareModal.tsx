"use client";

import { useState } from "react";
import {
  X,
  Tv,
  Film,
  Globe,
  Cast,
  Play,
} from "@/icons";
import { useRoomStore } from "@/store/useRoomStore";
import { curatedVideoPresets } from "@/data/mockPresets";

export function ScreenShareModal() {
  const {
    isScreenShareModalOpen,
    setScreenShareModalOpen,
    openNewTab,
    setVideoUrl,
  } = useRoomStore();

  const [activeCategory, setActiveCategory] = useState<"presets" | "screen" | "url">("presets");
  const [customUrl, setCustomUrl] = useState("");
  const [customTitle, setCustomTitle] = useState("");
  const [isStartingScreenShare, setIsStartingScreenShare] = useState(false);

  if (!isScreenShareModalOpen) return null;

  const handleLaunchPreset = (preset: typeof curatedVideoPresets[0]) => {
    openNewTab({
      title: preset.title.split("—")[0].trim(),
      url: preset.url,
      type: "video",
      thumbnail: preset.thumbnail,
    });
    setVideoUrl(preset.url, preset);
    setScreenShareModalOpen(false);
  };

  const handleLaunchCustomUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (customUrl.trim()) {
      let finalUrl = customUrl.trim();
      if (!finalUrl.startsWith("http://") && !finalUrl.startsWith("https://")) {
        finalUrl = `https://${finalUrl}`;
      }
      const title = customTitle.trim() || finalUrl.replace("https://", "").split("/")[0];
      openNewTab({
        title,
        url: finalUrl,
        type: "browser",
        thumbnail: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=600&auto=format&fit=crop",
      });
      setScreenShareModalOpen(false);
      setCustomUrl("");
      setCustomTitle("");
    }
  };

  const handleNativeScreenShare = async () => {
    try {
      setIsStartingScreenShare(true);
      if (typeof navigator !== "undefined" && navigator.mediaDevices?.getDisplayMedia) {
        await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true });
      }
      openNewTab({
        title: "Alex's Screen Share (1080p60)",
        url: "webrtc://screen-share-alex",
        type: "screen",
        thumbnail: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200&auto=format&fit=crop",
      });
      setScreenShareModalOpen(false);
    } catch {
      // User cancelled or simulated fallback
      openNewTab({
        title: "Live Screen Broadcast (Active)",
        url: "webrtc://screen-share-alex",
        type: "screen",
        thumbnail: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200&auto=format&fit=crop",
      });
      setScreenShareModalOpen(false);
    } finally {
      setIsStartingScreenShare(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-[#0e1117] border border-white/[0.08] rounded-2xl p-6 sm:p-8 shadow-2xl text-left space-y-6 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-white/[0.08]">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-xl bg-cyan-600 flex items-center justify-center text-white">
                <Tv className="w-4 h-4" />
              </span>
              <h3 className="text-xl font-black text-[#f4f4f5] tracking-tight">
                Stream Video & Share Tab
              </h3>
            </div>
            <p className="text-xs text-zinc-400">
              Open a new interactive co-browsing tab, stream video in 4K, or share your screen.
            </p>
          </div>

          <button
            onClick={() => setScreenShareModalOpen(false)}
            className="p-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Category Mode Switcher */}
        <div className="flex items-center p-1 bg-[#141722] rounded-xl border border-white/[0.08] text-xs">
          <button
            type="button"
            onClick={() => setActiveCategory("presets")}
            className={`flex-1 py-2.5 rounded-lg font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
              activeCategory === "presets"
                ? "bg-rose-500 text-white"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <Film className="w-3.5 h-3.5" />
            <span>Curated Channels</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveCategory("screen")}
            className={`flex-1 py-2.5 rounded-lg font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
              activeCategory === "screen"
                ? "bg-rose-500 text-white"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <Cast className="w-3.5 h-3.5" />
            <span>Screen Share</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveCategory("url")}
            className={`flex-1 py-2.5 rounded-lg font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
              activeCategory === "url"
                ? "bg-rose-500 text-white"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Custom URL</span>
          </button>
        </div>

        {/* 1. Curated Channels / Presets */}
        {activeCategory === "presets" && (
          <div className="space-y-3">
            <label className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-300">
              Select Watch Stream
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[260px] overflow-y-auto pr-1">
              {curatedVideoPresets.map((preset) => (
                <div
                  key={preset.id}
                  onClick={() => handleLaunchPreset(preset)}
                  className="group relative flex items-center gap-3 p-2.5 rounded-xl bg-[#141722] border border-white/[0.08] hover:border-rose-500/60 hover:bg-[#1a1e2c] cursor-pointer transition-colors shadow-sm"
                >
                  <div className="relative w-16 h-12 rounded-lg overflow-hidden shrink-0 bg-zinc-900">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={preset.thumbnail}
                      alt={preset.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <Play className="w-3.5 h-3.5 text-white fill-white" />
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-white truncate group-hover:text-rose-300 transition-colors">
                      {preset.title}
                    </h4>
                    <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-400 mt-0.5">
                      <span>{preset.channel}</span>
                      <span>•</span>
                      <span>{preset.duration}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 2. Native Screen Share */}
        {activeCategory === "screen" && (
          <div className="space-y-4 text-center py-4">
            <div className="w-16 h-16 rounded-2xl bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mx-auto shadow-xl">
              <Cast className="w-8 h-8" />
            </div>

            <div className="space-y-1.5 max-w-md mx-auto">
              <h4 className="text-base font-bold text-white">Share Your Screen with Crew</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Stream any application window, game, or browser tab with full audio synchronization in high-definition 60 FPS.
              </p>
            </div>

            <button
              onClick={handleNativeScreenShare}
              disabled={isStartingScreenShare}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs sm:text-sm border border-cyan-400/30 transition-colors cursor-pointer"
            >
              <Cast className="w-4 h-4" />
              <span>{isStartingScreenShare ? "Requesting Screen..." : "Select Screen to Share"}</span>
            </button>
          </div>
        )}

        {/* 3. Custom URL */}
        {activeCategory === "url" && (
          <form onSubmit={handleLaunchCustomUrl} className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-300">
                Webpage or Stream URL
              </label>
              <input
                type="text"
                placeholder="https://twitch.tv/... or https://youtube.com/..."
                value={customUrl}
                onChange={(e) => setCustomUrl(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[#141722] border border-white/[0.08] text-white text-xs placeholder-zinc-500 focus:outline-none focus:border-rose-500 font-mono"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-300">
                Tab Name (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g., Anime Stream Night"
                value={customTitle}
                onChange={(e) => setCustomTitle(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[#141722] border border-white/[0.08] text-white text-xs placeholder-zinc-500 focus:outline-none focus:border-rose-500"
              />
            </div>

            <button
              type="submit"
              disabled={!customUrl.trim()}
              className="w-full py-3 rounded-xl bg-rose-500 hover:bg-rose-600 disabled:opacity-40 text-white font-bold text-xs sm:text-sm transition-colors cursor-pointer"
            >
              Open Interactive Shared Tab
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
