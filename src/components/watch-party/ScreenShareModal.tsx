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
import { useRoomTheme } from "@/hooks/useRoomTheme";
import { curatedVideoPresets } from "@/data/mockPresets";

export function ScreenShareModal() {
  const {
    isScreenShareModalOpen,
    setScreenShareModalOpen,
    openNewTab,
    setVideoUrl,
  } = useRoomStore();

  const t = useRoomTheme();

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
    if (!navigator.mediaDevices?.getDisplayMedia) {
      alert("Screen sharing is not supported on this device/browser.");
      return;
    }
    try {
      setIsStartingScreenShare(true);
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true,
      });
      openNewTab({
        title: "Your Display Screen Live",
        url: "media-stream://local-display",
        type: "screen",
        thumbnail: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=600&auto=format&fit=crop",
      });
      stream.getVideoTracks()[0].addEventListener("ended", () => {
        // Stream stopped
      });
      setScreenShareModalOpen(false);
    } catch {
      // Fallback
      openNewTab({
        title: "Host Display Share",
        url: "media-stream://local-display",
        type: "screen",
        thumbnail: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=600&auto=format&fit=crop",
      });
      setScreenShareModalOpen(false);
    } finally {
      setIsStartingScreenShare(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-md animate-in fade-in duration-200"
      onClick={() => setScreenShareModalOpen(false)}
    >
      <div
        className="relative w-full max-w-2xl border rounded-[28px] sm:rounded-[32px] p-6 sm:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.4)] text-left space-y-5 max-h-[90vh] overflow-y-auto no-scrollbar transition-all"
        style={{
          backgroundColor: t.surface,
          borderColor: t.border,
          color: t.text,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b" style={{ borderColor: t.border }}>
          <div>
            <h3 className="text-lg sm:text-xl font-bold tracking-tight" style={{ color: t.text }}>
              Change Stream or Share Screen
            </h3>
            <p className="text-xs sm:text-sm mt-0.5" style={{ color: t.muted }}>
              Pick a video from tonight&apos;s queue, share your display, or paste any video link.
            </p>
          </div>

          <button
            onClick={() => setScreenShareModalOpen(false)}
            className="w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-pointer shrink-0"
            style={{ backgroundColor: t.surfaceHover, color: t.muted }}
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Segmented Mode Switcher */}
        <div
          className="flex items-center p-1 rounded-2xl border text-xs sm:text-sm font-medium"
          style={{ backgroundColor: t.surfaceHover, borderColor: t.border }}
        >
          <button
            type="button"
            onClick={() => setActiveCategory("presets")}
            className="flex-1 py-2 px-3 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
            style={{
              backgroundColor: activeCategory === "presets" ? t.surface : "transparent",
              color: activeCategory === "presets" ? (t.isDark ? t.accent : t.text) : t.muted,
              boxShadow: activeCategory === "presets" && !t.isDark ? "0 1px 2px rgba(0,0,0,0.05)" : "none",
            }}
          >
            <Film className="w-3.5 h-3.5" style={{ color: activeCategory === "presets" ? t.accent : t.muted }} />
            <span>Featured</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveCategory("screen")}
            className="flex-1 py-2 px-3 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
            style={{
              backgroundColor: activeCategory === "screen" ? t.surface : "transparent",
              color: activeCategory === "screen" ? (t.isDark ? t.accent : t.text) : t.muted,
              boxShadow: activeCategory === "screen" && !t.isDark ? "0 1px 2px rgba(0,0,0,0.05)" : "none",
            }}
          >
            <Cast className="w-3.5 h-3.5" style={{ color: activeCategory === "screen" ? t.accent : t.muted }} />
            <span>Screen Share</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveCategory("url")}
            className="flex-1 py-2 px-3 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
            style={{
              backgroundColor: activeCategory === "url" ? t.surface : "transparent",
              color: activeCategory === "url" ? (t.isDark ? t.accent : t.text) : t.muted,
              boxShadow: activeCategory === "url" && !t.isDark ? "0 1px 2px rgba(0,0,0,0.05)" : "none",
            }}
          >
            <Globe className="w-3.5 h-3.5" style={{ color: activeCategory === "url" ? t.accent : t.muted }} />
            <span>Paste Link</span>
          </button>
        </div>

        {/* 1. Curated Channels / Presets */}
        {activeCategory === "presets" && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-medium" style={{ color: t.muted }}>
              <span>Tonight&apos;s Featured Queue</span>
              <span className="text-[11px] font-mono">Synced 4K</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[300px] overflow-y-auto pr-1">
              {curatedVideoPresets.map((preset) => (
                <div
                  key={preset.id}
                  onClick={() => handleLaunchPreset(preset)}
                  className="group relative flex items-center gap-3 p-2.5 rounded-2xl border cursor-pointer transition-all"
                  style={{
                    backgroundColor: t.surfaceHover,
                    borderColor: t.border,
                  }}
                >
                  <div className="relative w-20 h-14 rounded-xl overflow-hidden shrink-0 bg-black/40 border" style={{ borderColor: t.border }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={preset.thumbnail}
                      alt={preset.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/35 flex items-center justify-center transition-colors">
                      <div
                        className="w-6 h-6 rounded-full flex items-center justify-center shadow-xs transition-transform group-hover:scale-110"
                        style={{ backgroundColor: t.accent, color: t.accentFg }}
                      >
                        <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
                      </div>
                    </div>
                    <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded-md bg-black/75 text-[10px] font-mono text-white backdrop-blur-2xs">
                      {preset.duration}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs sm:text-[13px] font-semibold line-clamp-1 transition-colors" style={{ color: t.text }}>
                      {preset.title}
                    </h4>
                    <div className="flex items-center gap-1.5 text-xs mt-1" style={{ color: t.muted }}>
                      <span className="truncate font-medium">{preset.channel}</span>
                      <span>•</span>
                      <span
                        className="text-[10px] font-medium px-1.5 py-0.5 rounded-md"
                        style={{ backgroundColor: t.surface, color: t.muted, border: `1px solid ${t.border}` }}
                      >
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
          <div
            className="py-6 px-4 rounded-2xl border text-center space-y-4"
            style={{ backgroundColor: t.surfaceHover, borderColor: t.border }}
          >
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto shadow-2xs border"
              style={{
                backgroundColor: t.isDark ? `${t.accent}20` : "#fff1f2",
                color: t.accent,
                borderColor: t.isDark ? `${t.accent}40` : "#fecdd3",
              }}
            >
              <Cast className="w-6 h-6" />
            </div>

            <div className="space-y-1.5 max-w-sm mx-auto">
              <h4 className="text-sm sm:text-base font-bold" style={{ color: t.text }}>
                Share Display or Window
              </h4>
              <p className="text-xs sm:text-sm leading-relaxed" style={{ color: t.muted }}>
                Stream any app window, gameplay, or browser tab with synchronous room audio in 1080p 60FPS.
              </p>
            </div>

            <button
              onClick={handleNativeScreenShare}
              disabled={isStartingScreenShare}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl font-semibold text-xs sm:text-sm shadow-xs hover:shadow-sm active:scale-[0.98] transition-all cursor-pointer"
              style={{ backgroundColor: t.accent, color: t.accentFg }}
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
              <label className="text-xs font-semibold" style={{ color: t.text }}>
                Video or Stream URL
              </label>
              <input
                type="text"
                placeholder="https://youtube.com/watch?v=... or Twitch link"
                value={customUrl}
                onChange={(e) => setCustomUrl(e.target.value)}
                className="w-full px-4 py-2.5 sm:py-3 rounded-2xl border text-xs sm:text-sm focus:outline-none transition-all font-mono"
                style={{
                  backgroundColor: t.surfaceHover,
                  borderColor: t.border,
                  color: t.text,
                }}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold" style={{ color: t.text }}>
                Tab Name (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Cyberpunk Cinema, Tournament Stream"
                value={customTitle}
                onChange={(e) => setCustomTitle(e.target.value)}
                className="w-full px-4 py-2.5 sm:py-3 rounded-2xl border text-xs sm:text-sm focus:outline-none transition-all"
                style={{
                  backgroundColor: t.surfaceHover,
                  borderColor: t.border,
                  color: t.text,
                }}
              />
            </div>

            <button
              type="submit"
              disabled={!customUrl.trim()}
              className="w-full py-3 rounded-2xl disabled:opacity-40 font-semibold text-xs sm:text-sm shadow-xs active:scale-[0.98] transition-all cursor-pointer"
              style={{ backgroundColor: t.accent, color: t.accentFg }}
            >
              Play in Lounge
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
