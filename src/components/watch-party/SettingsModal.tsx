"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { X, Check, Volume2, Monitor, Palette } from "lucide-react";
import { useRoomStore } from "@/store/useRoomStore";

// --- Types ---

type Section = "theme" | "audio" | "display";

// --- Theme Data ---

interface ThemeOption {
  id: string;
  name: string;
  color: string;
  current?: boolean;
  mode: "light" | "dark";
}

const themes: ThemeOption[] = [
  { id: "red",    name: "Red",    color: "#F43F5E", current: true,  mode: "light" },
  { id: "yellow", name: "Yellow", color: "#c8962e", current: false, mode: "dark"  },
];

// --- Surface tokens for the modal shell ---

function getSurface(mode: "light" | "dark") {
  return mode === "dark"
    ? { bg: "#161310", border: "#27211a", text: "#f2e9d6", muted: "#907a5a", row: "#1e1a14", divider: "#27211a" }
    : { bg: "#ffffff", border: "#e4e4e7", text: "#18181b", muted: "#71717a", row: "#F9FAFB", divider: "#f4f4f5" };
}

// --- ToggleSwitch sub-component ---

function ToggleSwitch({
  enabled,
  onChange,
  isDark,
}: {
  enabled: boolean;
  onChange: () => void;
  isDark: boolean;
}) {
  return (
    <button
      role="switch"
      aria-checked={enabled}
      onClick={onChange}
      className="relative w-10 h-5.5 rounded-full transition-colors duration-200 cursor-pointer shrink-0"
      style={{ backgroundColor: enabled ? (isDark ? "#c8962e" : "#18181b") : (isDark ? "#3a3022" : "#d4d4d8") }}
    >
      <span
        className="absolute top-[3px] w-4 h-4 rounded-full bg-white shadow-sm transition-all duration-200"
        style={{ left: enabled ? "22px" : "3px" }}
      />
    </button>
  );
}

// --- Main Modal ---

export function SettingsModal() {
  const { isSettingsModalOpen, setSettingsModalOpen, themeMode, setThemeMode, volume: storeVolume, setVolume: setStoreVolume } = useRoomStore();

  const [section, setSection]           = useState<Section>("theme");
  const [draftMode, setDraftMode]       = useState<"light" | "dark">(themeMode);
  const [volume, setVolume]             = useState(storeVolume ?? 80);
  const [spatialAudio, setSpatialAudio] = useState(true);
  const [notifSounds, setNotifSounds]   = useState(true);
  const [micNoise, setMicNoise]         = useState(false);
  const [quality, setQuality]           = useState<"4k" | "1080p" | "720p">("4k");
  const [ambientGlow, setAmbientGlow]   = useState(true);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [compactChat, setCompactChat]   = useState(false);

  const handleSave = () => {
    setThemeMode(draftMode);
    setSettingsModalOpen(false);
  };

  const handleCancel = () => {
    setDraftMode(themeMode);
    setSettingsModalOpen(false);
  };

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isSettingsModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isSettingsModalOpen]);

  // Handle Escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isSettingsModalOpen) handleCancel();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isSettingsModalOpen, themeMode]);

  if (!isSettingsModalOpen || !mounted) return null;

  const s = getSurface(draftMode);
  const isDark = draftMode === "dark";
  const visibleThemes = themes.filter((t) => t.mode === draftMode);
  const activeTheme = visibleThemes[0] ?? themes[0];

  const navItems: { id: Section; label: string; icon: React.ReactNode }[] = [
    { id: "theme",   label: "Theme",   icon: <Palette className="w-4 h-4 sm:w-3.5 sm:h-3.5" /> },
    { id: "audio",   label: "Audio",   icon: <Volume2 className="w-4 h-4 sm:w-3.5 sm:h-3.5" /> },
    { id: "display", label: "Display", icon: <Monitor className="w-4 h-4 sm:w-3.5 sm:h-3.5" /> },
  ];

  return createPortal(
    <div
      className={`fixed inset-0 z-[250] flex items-center justify-center p-0 lg:p-6 backdrop-blur-md animate-in fade-in duration-200 ${
        isDark ? "bg-[#161310] lg:bg-black/70" : "bg-white lg:bg-black/50"
      }`}
      onClick={handleCancel}
    >
      <div
        className="w-full h-full h-[100dvh] max-w-none max-h-none lg:h-auto lg:max-w-xl lg:max-h-[580px] rounded-none lg:rounded-[32px] shadow-none lg:shadow-[0_20px_60px_rgba(0,0,0,0.4)] overflow-hidden flex flex-col border-0 lg:border lg:animate-in lg:zoom-in-95 duration-200"
        style={{
          backgroundColor: s.bg,
          borderColor: s.border,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-5 sm:px-7 pt-4 sm:pt-5 pb-3.5 sm:pb-4 shrink-0 border-b"
          style={{ borderColor: s.divider }}
        >
          <div className="flex items-center gap-2.5">
            <h3 className="text-base sm:text-lg font-bold tracking-tight" style={{ color: s.text }}>
              Settings
            </h3>
            <span
              className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full lg:hidden capitalize"
              style={{
                backgroundColor: isDark ? "#1e1a14" : "#f0f2f6",
                color: activeTheme.color,
              }}
            >
              {section}
            </span>
          </div>
          <button
            onClick={handleCancel}
            className="w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-pointer hover:opacity-80 active:scale-95"
            style={{ backgroundColor: isDark ? "#1e1a14" : "#f4f4f5", color: s.muted }}
            title="Close Settings"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile Segmented Horizontal Tabs (< sm: phones) */}
        <div
          className="flex sm:hidden items-center gap-1.5 px-4 py-2.5 border-b shrink-0"
          style={{
            borderColor: s.divider,
            backgroundColor: isDark ? "#120f0d" : "#fafafa",
          }}
        >
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setSection(item.id)}
              className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap"
              style={{
                backgroundColor: section === item.id ? (isDark ? "#241f18" : "#ffffff") : "transparent",
                color: section === item.id ? (isDark ? activeTheme.color : s.text) : s.muted,
                boxShadow: section === item.id ? "0 1px 3px rgba(0,0,0,0.15)" : "none",
                border: section === item.id ? `1px solid ${s.border}` : "1px solid transparent",
              }}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        {/* Body */}
        <div className="flex flex-1 min-h-0">
          {/* Left nav (Tablet & Desktop: sm and up) */}
          <nav
            className="hidden sm:flex flex-col gap-1 p-3 sm:p-4 shrink-0 w-[160px] md:w-[180px] lg:w-[140px] border-r"
            style={{ borderColor: s.divider }}
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setSection(item.id)}
                className="flex items-center gap-2.5 w-full px-3.5 py-2.5 rounded-xl text-left text-sm transition-all cursor-pointer"
                style={{
                  backgroundColor: section === item.id ? (isDark ? "#1e1a14" : "#f4f4f5") : "transparent",
                  color: section === item.id ? s.text : s.muted,
                  fontWeight: section === item.id ? 600 : 500,
                }}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right content */}
          <div className="flex-1 overflow-y-auto px-5 sm:px-7 md:px-8 py-5 sm:py-6 min-h-0">
            {/* THEME */}
            {section === "theme" && (
              <div className="space-y-6 animate-in fade-in duration-150 max-w-xl">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-widest mb-3" style={{ color: s.muted }}>Interface mode</p>
                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    {/* Light card */}
                    <button
                      onClick={() => setDraftMode("light")}
                      className="relative flex flex-col gap-2 p-3 sm:p-3.5 rounded-2xl border transition-all cursor-pointer text-left hover:scale-[1.01]"
                      style={{
                        borderColor: draftMode === "light" ? "#a1a1aa" : s.border,
                        backgroundColor: draftMode === "light" ? (isDark ? "#1e1a14" : "#f9fafb") : s.bg,
                        boxShadow: draftMode === "light" ? "0 0 0 1px #a1a1aa" : "none",
                      }}
                    >
                      <div className="w-full h-12 sm:h-14 rounded-xl bg-white border border-zinc-200 overflow-hidden flex flex-col gap-1 p-1.5">
                        <div className="flex gap-1"><div className="w-8 h-1.5 rounded-full bg-zinc-200" /><div className="w-5 h-1.5 rounded-full bg-zinc-100" /></div>
                        <div className="flex gap-1"><div className="w-5 h-1.5 rounded-full bg-zinc-100" /><div className="w-8 h-1.5 rounded-full bg-zinc-200" /></div>
                        <div className="w-6 h-1.5 rounded-full mt-auto bg-[#F43F5E]" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs sm:text-sm font-semibold" style={{ color: draftMode === "light" ? s.text : s.muted }}>Light</span>
                        {draftMode === "light" && <Check className="w-3.5 h-3.5 stroke-[3]" style={{ color: s.text }} />}
                      </div>
                    </button>

                    {/* Dark card */}
                    <button
                      onClick={() => setDraftMode("dark")}
                      className="relative flex flex-col gap-2 p-3 sm:p-3.5 rounded-2xl border transition-all cursor-pointer text-left hover:scale-[1.01]"
                      style={{
                        borderColor: draftMode === "dark" ? "#3a3022" : s.border,
                        backgroundColor: draftMode === "dark" ? "#0c0a07" : s.bg,
                        boxShadow: draftMode === "dark" ? "0 0 0 1px #3a3022" : "none",
                      }}
                    >
                      <div className="w-full h-12 sm:h-14 rounded-xl bg-zinc-900 border border-zinc-700 overflow-hidden flex flex-col gap-1 p-1.5">
                        <div className="flex gap-1"><div className="w-8 h-1.5 rounded-full bg-zinc-600" /><div className="w-5 h-1.5 rounded-full bg-zinc-700" /></div>
                        <div className="flex gap-1"><div className="w-5 h-1.5 rounded-full bg-zinc-700" /><div className="w-8 h-1.5 rounded-full bg-zinc-600" /></div>
                        <div className="w-6 h-1.5 rounded-full mt-auto bg-[#c8962e]" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs sm:text-sm font-semibold" style={{ color: draftMode === "dark" ? "#f2e9d6" : s.muted }}>Dark</span>
                        {draftMode === "dark" && <Check className="w-3.5 h-3.5 stroke-[3] text-[#f2e9d6]" />}
                      </div>
                    </button>
                  </div>
                </div>

                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-widest mb-3" style={{ color: s.muted }}>Accent color</p>
                  <div className="space-y-2">
                    {visibleThemes.map((t) => (
                      <div
                        key={t.id}
                        className="w-full flex items-center justify-between px-4 py-3 sm:py-3.5 rounded-2xl border transition-all"
                        style={{ borderColor: s.border, backgroundColor: isDark ? "#1e1a14" : "#f9fafb" }}
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-4 h-4 rounded-full shrink-0 shadow-xs" style={{ backgroundColor: t.color }} />
                          <span className="text-sm font-semibold" style={{ color: s.text }}>{t.name}</span>
                          {t.current && <span className="text-[10px] font-normal" style={{ color: s.muted }}>default</span>}
                        </div>
                        <Check className="w-4 h-4 stroke-[2.5]" style={{ color: activeTheme.color }} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* AUDIO */}
            {section === "audio" && (
              <div className="space-y-6 animate-in fade-in duration-150 max-w-xl">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-widest mb-3" style={{ color: s.muted }}>Volume</p>
                  <div className="flex items-center gap-3.5 py-1.5">
                    <span className="text-xs w-4 text-right shrink-0" style={{ color: s.muted }}>0</span>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={volume}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        setVolume(val);
                        setStoreVolume(val);
                      }}
                      className="flex-1 h-2 rounded-full appearance-none cursor-pointer"
                      style={{
                        background: `linear-gradient(to right, ${activeTheme.color} 0%, ${activeTheme.color} ${volume}%, ${isDark ? "rgba(255,255,255,0.15)" : "#e4e4e7"} ${volume}%, ${isDark ? "rgba(255,255,255,0.15)" : "#e4e4e7"} 100%)`,
                        accentColor: activeTheme.color,
                      }}
                    />
                    <span className="text-xs sm:text-sm font-semibold w-10 shrink-0 text-right" style={{ color: s.text }}>{volume}%</span>
                  </div>
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-widest mb-3" style={{ color: s.muted }}>Options</p>
                  <div className="rounded-2xl border overflow-hidden" style={{ borderColor: s.border, backgroundColor: s.row }}>
                    {[
                      { label: "Spatial Audio", sub: "3D positional sound for participants", val: spatialAudio, set: setSpatialAudio },
                      { label: "Notification sounds", sub: undefined as string | undefined, val: notifSounds, set: setNotifSounds },
                      { label: "Mic noise suppression", sub: "Reduce background noise", val: micNoise, set: setMicNoise },
                    ].map((row, i, arr) => (
                      <div
                        key={row.label}
                        className="flex items-center justify-between px-4 sm:px-5 py-3.5 sm:py-4 gap-3"
                        style={{ borderBottom: i < arr.length - 1 ? `1px solid ${s.divider}` : "none" }}
                      >
                        <div className="flex-1 min-w-0 pr-2">
                          <p className="text-sm sm:text-base font-medium" style={{ color: s.text }}>{row.label}</p>
                          {row.sub && <p className="text-xs sm:text-sm mt-0.5 leading-normal" style={{ color: s.muted }}>{row.sub}</p>}
                        </div>
                        <ToggleSwitch enabled={row.val} onChange={() => row.set((p: boolean) => !p)} isDark={isDark} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* DISPLAY */}
            {section === "display" && (
              <div className="space-y-6 animate-in fade-in duration-150 max-w-xl">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-widest mb-3" style={{ color: s.muted }}>Stream quality</p>
                  <div className="flex gap-2 sm:gap-3">
                    {(["4k", "1080p", "720p"] as const).map((q) => (
                      <button
                        key={q}
                        onClick={() => setQuality(q)}
                        className="flex-1 py-2.5 sm:py-3 rounded-xl border text-xs sm:text-sm font-semibold transition-all cursor-pointer"
                        style={{
                          backgroundColor: quality === q ? activeTheme.color : s.row,
                          color: quality === q ? (isDark ? "#0c0a07" : "#fff") : s.muted,
                          borderColor: quality === q ? activeTheme.color : s.border,
                        }}
                      >
                        {q === "4k" ? "4K" : q}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-widest mb-3" style={{ color: s.muted }}>Visual</p>
                  <div className="rounded-2xl border overflow-hidden" style={{ borderColor: s.border, backgroundColor: s.row }}>
                    {[
                      { label: "Ambient glow", sub: "Backlight behind the player", val: ambientGlow, set: setAmbientGlow },
                      { label: "Compact chat", sub: "Smaller message bubbles", val: compactChat, set: setCompactChat },
                      { label: "Reduce motion", sub: undefined as string | undefined, val: reduceMotion, set: setReduceMotion },
                    ].map((row, i, arr) => (
                      <div
                        key={row.label}
                        className="flex items-center justify-between px-4 sm:px-5 py-3.5 sm:py-4 gap-3"
                        style={{ borderBottom: i < arr.length - 1 ? `1px solid ${s.divider}` : "none" }}
                      >
                        <div className="flex-1 min-w-0 pr-2">
                          <p className="text-sm sm:text-base font-medium" style={{ color: s.text }}>{row.label}</p>
                          {row.sub && <p className="text-xs sm:text-sm mt-0.5 leading-normal" style={{ color: s.muted }}>{row.sub}</p>}
                        </div>
                        <ToggleSwitch enabled={row.val} onChange={() => row.set((p: boolean) => !p)} isDark={isDark} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div
          className="flex items-center justify-between px-5 sm:px-7 py-3.5 sm:py-4 shrink-0 border-t"
          style={{
            borderColor: s.divider,
            paddingBottom: "max(1rem, env(safe-area-inset-bottom, 1rem))",
          }}
        >
          <button
            onClick={handleCancel}
            className="text-sm sm:text-base font-medium px-3 py-1.5 rounded-lg transition-colors cursor-pointer hover:opacity-80"
            style={{ color: s.muted }}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-6 sm:px-7 py-2.5 sm:py-2.5 rounded-full text-sm sm:text-base font-semibold hover:opacity-90 active:scale-[0.98] transition-all cursor-pointer shadow-sm"
            style={{ backgroundColor: activeTheme.color, color: isDark ? "#0c0a07" : "#ffffff" }}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
