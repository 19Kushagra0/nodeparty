"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
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

  const [mounted, setMounted] = useState(false);
  const [activeCategory, setActiveCategory] = useState<"presets" | "screen" | "url">("presets");
  const [customUrl, setCustomUrl] = useState("");
  const [customTitle, setCustomTitle] = useState("");
  const [isStartingScreenShare, setIsStartingScreenShare] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isScreenShareModalOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setScreenShareModalOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isScreenShareModalOpen, setScreenShareModalOpen]);

  if (!isScreenShareModalOpen || !mounted) return null;

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

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex flex-col animate-in fade-in duration-200 overflow-hidden w-screen h-screen"
      style={{
        backgroundColor: t.surface,
        color: t.text,
      }}
    >
      {/* Top Bar */}
      <header
        className="shrink-0 px-6 sm:px-10 lg:px-14 py-4 sm:py-5 border-b flex items-center justify-between"
        style={{
          borderColor: t.border,
          backgroundColor: t.surface,
        }}
      >
        <div>
          <h2 className="text-lg sm:text-xl font-bold tracking-tight" style={{ color: t.text }}>
            Change Stream or Share Screen
          </h2>
          <p className="text-xs sm:text-sm mt-0.5" style={{ color: t.muted }}>
            Pick a video from tonight&apos;s queue, share your display, or paste any video link.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Segmented Mode Switcher */}
          <div
            className="hidden sm:flex items-center p-1 rounded-2xl border text-xs sm:text-sm font-medium"
            style={{ backgroundColor: t.surfaceHover, borderColor: t.border }}
          >
            <button
              type="button"
              onClick={() => setActiveCategory("presets")}
              className="py-1.5 px-3.5 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
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
              className="py-1.5 px-3.5 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
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
              className="py-1.5 px-3.5 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
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
        </div>

        <div className="flex items-center gap-3">
          {/* Segmented Mode Switcher */}
          <div
            className="hidden sm:flex items-center p-1 rounded-2xl border text-xs sm:text-sm font-medium"
            style={{ backgroundColor: t.surfaceHover, borderColor: t.border }}
          >
            <button
              type="button"
              onClick={() => setActiveCategory("presets")}
              className="py-1.5 px-3.5 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
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
              className="py-1.5 px-3.5 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
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
              className="py-1.5 px-3.5 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
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

          <button
            onClick={() => setScreenShareModalOpen(false)}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer shrink-0 border"
            style={{ backgroundColor: t.surfaceHover, borderColor: t.border, color: t.muted }}
            title="Close (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Mobile Mode Switcher Bar */}
      <div
        className="sm:hidden shrink-0 px-4 py-2 border-b flex items-center"
        style={{ backgroundColor: t.surfaceHover, borderColor: t.border }}
      >
        <div className="flex items-center w-full gap-1">
          <button
            type="button"
            onClick={() => setActiveCategory("presets")}
            className="flex-1 py-2 rounded-xl text-xs font-medium transition-all text-center"
            style={{
              backgroundColor: activeCategory === "presets" ? t.surface : "transparent",
              color: activeCategory === "presets" ? (t.isDark ? t.accent : t.text) : t.muted,
            }}
          >
            Featured
          </button>
          <button
            type="button"
            onClick={() => setActiveCategory("screen")}
            className="flex-1 py-2 rounded-xl text-xs font-medium transition-all text-center"
            style={{
              backgroundColor: activeCategory === "screen" ? t.surface : "transparent",
              color: activeCategory === "screen" ? (t.isDark ? t.accent : t.text) : t.muted,
            }}
          >
            Screen Share
          </button>
          <button
            type="button"
            onClick={() => setActiveCategory("url")}
            className="flex-1 py-2 rounded-xl text-xs font-medium transition-all text-center"
            style={{
              backgroundColor: activeCategory === "url" ? t.surface : "transparent",
              color: activeCategory === "url" ? (t.isDark ? t.accent : t.text) : t.muted,
            }}
          >
            Paste Link
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-6 sm:p-10 lg:p-14 max-w-7xl w-full mx-auto no-scrollbar">
        {/* 1. Curated Channels / Presets */}
        {activeCategory === "presets" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-2 border-b" style={{ borderColor: t.border }}>
              <div className="flex items-center gap-2">
                <span className="text-sm sm:text-base font-bold tracking-tight" style={{ color: t.text }}>
                  Tonight&apos;s Featured Queue
                </span>
                <span
                  className="text-[10px] font-semibold px-2 py-0.5 rounded-full border"
                  style={{
                    backgroundColor: t.isDark ? `${t.accent}20` : "#fff1f2",
                    borderColor: t.isDark ? `${t.accent}40` : "#fecdd3",
                    color: t.accent,
                  }}
                >
                  6 Channels
                </span>
              </div>
              <span className="text-xs font-mono" style={{ color: t.muted }}>Synced 4K 60FPS</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {curatedVideoPresets.map((preset) => (
                <div
                  key={preset.id}
                  onClick={() => handleLaunchPreset(preset)}
                  className="group relative flex flex-col rounded-2xl border cursor-pointer transition-all hover:scale-[1.01] hover:shadow-lg overflow-hidden"
                  style={{
                    backgroundColor: t.surface,
                    borderColor: t.border,
                  }}
                >
                  {/* 16:9 Thumbnail */}
                  <div className="relative aspect-video w-full bg-black/40 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={preset.thumbnail}
                      alt={preset.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/25 group-hover:bg-black/40 flex items-center justify-center transition-colors">
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-transform group-hover:scale-110"
                        style={{ backgroundColor: t.accent, color: t.accentFg }}
                      >
                        <Play className="w-5 h-5 fill-current ml-0.5" />
                      </div>
                    </div>
                    <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-black/80 text-[11px] font-mono text-white backdrop-blur-xs">
                      {preset.duration}
                    </span>
                    <span
                      className="absolute top-2 left-2 px-2 py-0.5 rounded-md text-[10px] font-semibold backdrop-blur-xs"
                      style={{
                        backgroundColor: t.surface,
                        color: t.accent,
                        border: `1px solid ${t.border}`,
                      }}
                    >
                      {preset.category}
                    </span>
                  </div>

                  {/* Metadata */}
                  <div className="p-4 flex flex-col flex-1 justify-between gap-2">
                    <div>
                      <h4 className="text-sm sm:text-base font-bold line-clamp-1 group-hover:text-primary transition-colors" style={{ color: t.text }}>
                        {preset.title}
                      </h4>
                      <p className="text-xs mt-1 line-clamp-2" style={{ color: t.muted }}>
                        {preset.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t text-xs" style={{ borderColor: t.border, color: t.muted }}>
                      <span className="font-semibold truncate">{preset.channel}</span>
                      <span className="text-[11px] font-mono font-medium hover:underline flex items-center gap-1" style={{ color: t.accent }}>
                        Play Stream &rarr;
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
            className="max-w-xl mx-auto my-auto py-12 px-6 sm:px-10 rounded-3xl border text-center space-y-6 shadow-sm mt-8"
            style={{ backgroundColor: t.surfaceHover, borderColor: t.border }}
          >
            <div
              className="w-16 h-16 rounded-3xl flex items-center justify-center mx-auto shadow-sm border"
              style={{
                backgroundColor: t.isDark ? `${t.accent}20` : "#fff1f2",
                color: t.accent,
                borderColor: t.isDark ? `${t.accent}40` : "#fecdd3",
              }}
            >
              <Cast className="w-8 h-8" />
            </div>

            <div className="space-y-2 max-w-md mx-auto">
              <h3 className="text-lg sm:text-xl font-bold" style={{ color: t.text }}>
                Share Display or Window
              </h3>
              <p className="text-xs sm:text-sm leading-relaxed" style={{ color: t.muted }}>
                Stream any app window, gameplay, or browser tab with synchronous room audio in 1080p 60FPS to everyone in the party lounge.
              </p>
            </div>

            <button
              onClick={handleNativeScreenShare}
              disabled={isStartingScreenShare}
              className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-2xl font-semibold text-sm shadow-md hover:shadow-lg active:scale-[0.98] transition-all cursor-pointer"
              style={{ backgroundColor: t.accent, color: t.accentFg }}
            >
              <Cast className="w-4 h-4" />
              <span>{isStartingScreenShare ? "Starting Stream..." : "Select Screen to Share"}</span>
            </button>
          </div>
        )}

        {/* 3. Custom URL */}
        {activeCategory === "url" && (
          <div
            className="max-w-xl mx-auto my-auto py-10 px-6 sm:px-10 rounded-3xl border text-left shadow-sm mt-8"
            style={{ backgroundColor: t.surfaceHover, borderColor: t.border }}
          >
            <form onSubmit={handleLaunchCustomUrl} className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-bold" style={{ color: t.text }}>
                  Video or Stream URL
                </label>
                <input
                  type="text"
                  placeholder="https://youtube.com/watch?v=... or any web link"
                  value={customUrl}
                  onChange={(e) => setCustomUrl(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border text-sm focus:outline-none transition-all font-mono"
                  style={{
                    backgroundColor: t.surface,
                    borderColor: t.border,
                    color: t.text,
                  }}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold" style={{ color: t.text }}>
                  Tab Name (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Cyberpunk Cinema, Tournament Stream"
                  value={customTitle}
                  onChange={(e) => setCustomTitle(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border text-sm focus:outline-none transition-all"
                  style={{
                    backgroundColor: t.surface,
                    borderColor: t.border,
                    color: t.text,
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={!customUrl.trim()}
                className="w-full py-3.5 rounded-2xl disabled:opacity-40 font-semibold text-sm shadow-sm active:scale-[0.98] transition-all cursor-pointer"
                style={{ backgroundColor: t.accent, color: t.accentFg }}
              >
                Play in Lounge
              </button>
            </form>
          </div>
        )}
      </main>
    </div>,
    document.body
  );
}
