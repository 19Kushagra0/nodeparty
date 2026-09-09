"use client";

import { useState } from "react";
import {
  X,
  Film,
  Globe,
  Cast,
  Play,
} from "lucide-react";
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

  const handleLaunchPreset = (preset: (typeof curatedVideoPresets)[0]) => {
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
      // Fallback
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
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-zinc-950/40 backdrop-blur-md animate-in fade-in duration-200"
      onClick={() => setScreenShareModalOpen(false)}
    >
      <div
        className="relative w-full max-w-2xl bg-white border border-zinc-200/80 rounded-[28px] sm:rounded-[32px] p-6 sm:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.12)] text-left space-y-5 max-h-[90vh] overflow-y-auto no-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header without icon */}
        <div className="flex items-start justify-between pb-4 border-b border-zinc-100">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-zinc-900 tracking-tight">
              Change Stream or Share Screen
            </h3>
            <p className="text-xs sm:text-sm text-zinc-500 mt-0.5">
              Pick a video from tonight&apos;s queue, share your display, or paste any video link.
            </p>
          </div>

          <button
            onClick={() => setScreenShareModalOpen(false)}
            className="w-8 h-8 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-400 hover:text-zinc-700 flex items-center justify-center transition-colors cursor-pointer shrink-0"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Segmented Mode Switcher */}
        <div className="flex items-center p-1 bg-[#F0F2F6] rounded-2xl border border-zinc-200/60 text-xs sm:text-sm font-medium">
          <button
            type="button"
            onClick={() => setActiveCategory("presets")}
            className={`flex-1 py-2 px-3 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeCategory === "presets"
                ? "bg-white text-zinc-900 font-semibold shadow-xs"
                : "text-zinc-500 hover:text-zinc-900 hover:bg-white/50"
            }`}
          >
            <Film className="w-3.5 h-3.5 text-rose-500" />
            <span>Featured</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveCategory("screen")}
            className={`flex-1 py-2 px-3 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeCategory === "screen"
                ? "bg-white text-zinc-900 font-semibold shadow-xs"
                : "text-zinc-500 hover:text-zinc-900 hover:bg-white/50"
            }`}
          >
            <Cast className="w-3.5 h-3.5 text-rose-500" />
            <span>Screen Share</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveCategory("url")}
            className={`flex-1 py-2 px-3 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeCategory === "url"
                ? "bg-white text-zinc-900 font-semibold shadow-xs"
                : "text-zinc-500 hover:text-zinc-900 hover:bg-white/50"
            }`}
          >
            <Globe className="w-3.5 h-3.5 text-rose-500" />
            <span>Paste Link</span>
          </button>
        </div>

        {/* 1. Curated Channels / Presets */}
        {activeCategory === "presets" && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-zinc-500 font-medium">
              <span>Tonight&apos;s Featured Queue</span>
              <span className="text-[11px] text-zinc-400 font-mono">Synced 4K</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[300px] overflow-y-auto pr-1">
              {curatedVideoPresets.map((preset) => (
                <div
                  key={preset.id}
                  onClick={() => handleLaunchPreset(preset)}
                  className="group relative flex items-center gap-3 p-2.5 rounded-2xl bg-[#F8FAFC] border border-zinc-200/70 hover:border-rose-300 hover:bg-white hover:shadow-xs cursor-pointer transition-all"
                >
                  <div className="relative w-20 h-14 rounded-xl overflow-hidden shrink-0 bg-zinc-100 border border-zinc-200/40">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={preset.thumbnail}
                      alt={preset.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/35 flex items-center justify-center transition-colors">
                      <div className="w-6 h-6 rounded-full bg-white/90 group-hover:bg-white text-rose-500 flex items-center justify-center shadow-xs transition-transform group-hover:scale-110">
                        <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
                      </div>
                    </div>
                    <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded-md bg-black/75 text-[10px] font-mono text-white backdrop-blur-2xs">
                      {preset.duration}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs sm:text-[13px] font-semibold text-zinc-800 line-clamp-1 group-hover:text-rose-600 transition-colors">
                      {preset.title}
                    </h4>
                    <div className="flex items-center gap-1.5 text-xs text-zinc-400 mt-1">
                      <span className="truncate text-zinc-600 font-medium">{preset.channel}</span>
                      <span>•</span>
                      <span className="text-[10px] font-medium text-zinc-600 bg-zinc-200/60 px-1.5 py-0.5 rounded-md">
                        {preset.category}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 2. Native Screen Share */}
        {activeCategory === "screen" && (
          <div className="py-6 px-4 rounded-2xl bg-[#F8FAFC] border border-zinc-200/70 text-center space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-rose-50 border border-rose-100 text-rose-500 flex items-center justify-center mx-auto shadow-2xs">
              <Cast className="w-6 h-6" />
            </div>

            <div className="space-y-1.5 max-w-sm mx-auto">
              <h4 className="text-sm sm:text-base font-bold text-zinc-900">
                Share Display or Window
              </h4>
              <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed">
                Stream any app window, gameplay, or browser tab with synchronous room audio in 1080p 60FPS.
              </p>
            </div>

            <button
              onClick={handleNativeScreenShare}
              disabled={isStartingScreenShare}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-rose-500 hover:bg-rose-600 text-white font-semibold text-xs sm:text-sm shadow-xs hover:shadow-sm active:scale-[0.98] transition-all cursor-pointer"
            >
              <Cast className="w-4 h-4" />
              <span>{isStartingScreenShare ? "Starting Stream..." : "Select Screen to Share"}</span>
            </button>
          </div>
        )}

        {/* 3. Custom URL */}
        {activeCategory === "url" && (
          <form onSubmit={handleLaunchCustomUrl} className="space-y-4 pt-1">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-700">
                Video or Stream URL
              </label>
              <input
                type="text"
                placeholder="https://youtube.com/watch?v=... or Twitch link"
                value={customUrl}
                onChange={(e) => setCustomUrl(e.target.value)}
                className="w-full px-4 py-2.5 sm:py-3 rounded-2xl bg-[#F0F2F6] border border-zinc-200/80 text-zinc-900 text-xs sm:text-sm placeholder:text-zinc-400 focus:outline-none focus:bg-white focus:border-rose-400 focus:ring-2 focus:ring-rose-500/10 transition-all font-mono"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-700">
                Tab Name (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Cyberpunk Cinema, Tournament Stream"
                value={customTitle}
                onChange={(e) => setCustomTitle(e.target.value)}
                className="w-full px-4 py-2.5 sm:py-3 rounded-2xl bg-[#F0F2F6] border border-zinc-200/80 text-zinc-900 text-xs sm:text-sm placeholder:text-zinc-400 focus:outline-none focus:bg-white focus:border-rose-400 focus:ring-2 focus:ring-rose-500/10 transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={!customUrl.trim()}
              className="w-full py-3 rounded-2xl bg-rose-500 hover:bg-rose-600 disabled:opacity-40 text-white font-semibold text-xs sm:text-sm shadow-xs active:scale-[0.98] transition-all cursor-pointer"
            >
              Play in Lounge
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

