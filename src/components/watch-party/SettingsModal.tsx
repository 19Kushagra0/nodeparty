"use client";

import { useState } from "react";
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
  const { isSettingsModalOpen, setSettingsModalOpen, themeMode, setThemeMode } = useRoomStore();

  const [section, setSection]           = useState<Section>("theme");
  const [draftMode, setDraftMode]       = useState<"light" | "dark">(themeMode);
  const [volume, setVolume]             = useState(80);
  const [spatialAudio, setSpatialAudio] = useState(true);
  const [notifSounds, setNotifSounds]   = useState(true);
  const [micNoise, setMicNoise]         = useState(false);
  const [quality, setQuality]           = useState<"4k" | "1080p" | "720p">("4k");
  const [ambientGlow, setAmbientGlow]   = useState(true);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [compactChat, setCompactChat]   = useState(false);

  if (!isSettingsModalOpen) return null;

  const s = getSurface(draftMode);
  const isDark = draftMode === "dark";
  const visibleThemes = themes.filter((t) => t.mode === draftMode);
  const activeTheme = visibleThemes[0] ?? themes[0];

  const handleSave = () => {
    setThemeMode(draftMode);
    setSettingsModalOpen(false);
  };

  const handleCancel = () => {
    setDraftMode(themeMode);
    setSettingsModalOpen(false);
  };

  const navItems: { id: Section; label: string; icon: React.ReactNode }[] = [
    { id: "theme",   label: "Theme",   icon: <Palette className="w-3.5 h-3.5" /> },
    { id: "audio",   label: "Audio",   icon: <Volume2 className="w-3.5 h-3.5" /> },
    { id: "display", label: "Display", icon: <Monitor className="w-3.5 h-3.5" /> },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 backdrop-blur-md animate-in fade-in duration-200"
      style={{ backgroundColor: "rgba(0,0,0,0.55)" }}
      onClick={handleCancel}
    >
      <div
        className="w-full max-w-xl rounded-[28px] sm:rounded-[32px] shadow-[0_20px_60px_rgba(0,0,0,0.4)] overflow-hidden flex flex-col animate-in zoom-in-95 duration-200 border"
        style={{ maxHeight: "min(90vh, 560px)", backgroundColor: s.bg, borderColor: s.border }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-4 shrink-0 border-b" style={{ borderColor: s.divider }}>
          <h3 className="text-base font-bold tracking-tight" style={{ color: s.text }}>Settings</h3>
          <button
            onClick={handleCancel}
            className="w-7 h-7 rounded-full flex items-center justify-center transition-colors cursor-pointer"
            style={{ backgroundColor: isDark ? "#1e1a14" : "#f4f4f5", color: s.muted }}
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex flex-1 min-h-0">
          {/* Left nav */}
          <nav className="flex flex-col gap-0.5 p-3 shrink-0 w-[130px] border-r" style={{ borderColor: s.divider }}>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setSection(item.id)}
                className="flex items-center gap-2.5 w-full px-3 py-2.5 rounded-xl text-left text-sm transition-all cursor-pointer"
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
          <div className="flex-1 overflow-y-auto px-6 py-5 min-h-0">

            {/* THEME */}
            {section === "theme" && (
              <div className="space-y-6 animate-in fade-in duration-150">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-widest mb-3" style={{ color: s.muted }}>Interface mode</p>
                  <div className="grid grid-cols-2 gap-2.5">
                    {/* Light card */}
                    <button
                      onClick={() => setDraftMode("light")}
                      className="relative flex flex-col gap-2 p-3 rounded-2xl border transition-all cursor-pointer text-left"
                      style={{
                        borderColor: draftMode === "light" ? "#a1a1aa" : s.border,
                        backgroundColor: draftMode === "light" ? (isDark ? "#1e1a14" : "#f9fafb") : s.bg,
                        boxShadow: draftMode === "light" ? "0 0 0 1px #a1a1aa" : "none",
                      }}
                    >
                      <div className="w-full h-12 rounded-xl bg-white border border-zinc-200 overflow-hidden flex flex-col gap-1 p-1.5">
                        <div className="flex gap-1"><div className="w-8 h-1.5 rounded-full bg-zinc-200" /><div className="w-5 h-1.5 rounded-full bg-zinc-100" /></div>
                        <div className="flex gap-1"><div className="w-5 h-1.5 rounded-full bg-zinc-100" /><div className="w-8 h-1.5 rounded-full bg-zinc-200" /></div>
                        <div className="w-6 h-1.5 rounded-full mt-auto bg-[#F43F5E]" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold" style={{ color: draftMode === "light" ? s.text : s.muted }}>Light</span>
                        {draftMode === "light" && <Check className="w-3 h-3 stroke-[3]" style={{ color: s.text }} />}
                      </div>
                    </button>

                    {/* Dark card */}
                    <button
                      onClick={() => setDraftMode("dark")}
                      className="relative flex flex-col gap-2 p-3 rounded-2xl border transition-all cursor-pointer text-left"
                      style={{
                        borderColor: draftMode === "dark" ? "#3a3022" : s.border,
                        backgroundColor: draftMode === "dark" ? "#0c0a07" : s.bg,
                        boxShadow: draftMode === "dark" ? "0 0 0 1px #3a3022" : "none",
                      }}
                    >
                      <div className="w-full h-12 rounded-xl bg-zinc-900 border border-zinc-700 overflow-hidden flex flex-col gap-1 p-1.5">
                        <div className="flex gap-1"><div className="w-8 h-1.5 rounded-full bg-zinc-600" /><div className="w-5 h-1.5 rounded-full bg-zinc-700" /></div>
                        <div className="flex gap-1"><div className="w-5 h-1.5 rounded-full bg-zinc-700" /><div className="w-8 h-1.5 rounded-full bg-zinc-600" /></div>
                        <div className="w-6 h-1.5 rounded-full mt-auto bg-[#c8962e]" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold" style={{ color: draftMode === "dark" ? "#f2e9d6" : s.muted }}>Dark</span>
                        {draftMode === "dark" && <Check className="w-3 h-3 stroke-[3] text-[#f2e9d6]" />}
                      </div>
                    </button>
                  </div>
                </div>

                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-widest mb-3" style={{ color: s.muted }}>Accent color</p>
                  <div className="space-y-1">
                    {visibleThemes.map((t) => (
                      <div
                        key={t.id}
                        className="w-full flex items-center justify-between px-3.5 py-3 rounded-2xl border"
                        style={{ borderColor: s.border, backgroundColor: isDark ? "#1e1a14" : "#f9fafb" }}
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-4 h-4 rounded-full shrink-0" style={{ backgroundColor: t.color }} />
                          <span className="text-sm font-semibold" style={{ color: s.text }}>{t.name}</span>
                          {t.current && <span className="text-[10px] font-normal" style={{ color: s.muted }}>default</span>}
                        </div>
                        <Check className="w-3.5 h-3.5 stroke-[2.5]" style={{ color: activeTheme.color }} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* AUDIO */}
            {section === "audio" && (
              <div className="space-y-5 animate-in fade-in duration-150">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-widest mb-3" style={{ color: s.muted }}>Volume</p>
                  <div className="flex items-center gap-3 py-1">
                    <span className="text-xs w-4 text-right shrink-0" style={{ color: s.muted }}>0</span>
                    <input type="range" min={0} max={100} value={volume} onChange={(e) => setVolume(Number(e.target.value))}
                      className="flex-1 h-1.5 rounded-full appearance-none cursor-pointer" style={{ accentColor: activeTheme.color }} />
                    <span className="text-xs font-semibold w-8 shrink-0" style={{ color: s.text }}>{volume}%</span>
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
                      <div key={row.label} className="flex items-center justify-between px-4 py-3"
                        style={{ borderBottom: i < arr.length - 1 ? `1px solid ${s.divider}` : "none" }}>
                        <div>
                          <p className="text-sm font-medium" style={{ color: s.text }}>{row.label}</p>
                          {row.sub && <p className="text-xs mt-0.5" style={{ color: s.muted }}>{row.sub}</p>}
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
              <div className="space-y-5 animate-in fade-in duration-150">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-widest mb-3" style={{ color: s.muted }}>Stream quality</p>
                  <div className="flex gap-2">
                    {(["4k", "1080p", "720p"] as const).map((q) => (
                      <button key={q} onClick={() => setQuality(q)}
                        className="flex-1 py-2 rounded-xl border text-xs font-semibold transition-all cursor-pointer"
                        style={{
                          backgroundColor: quality === q ? activeTheme.color : s.row,
                          color: quality === q ? (isDark ? "#0c0a07" : "#fff") : s.muted,
                          borderColor: quality === q ? activeTheme.color : s.border,
                        }}>
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
                      <div key={row.label} className="flex items-center justify-between px-4 py-3"
                        style={{ borderBottom: i < arr.length - 1 ? `1px solid ${s.divider}` : "none" }}>
                        <div>
                          <p className="text-sm font-medium" style={{ color: s.text }}>{row.label}</p>
                          {row.sub && <p className="text-xs mt-0.5" style={{ color: s.muted }}>{row.sub}</p>}
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
        <div className="flex items-center justify-between px-6 py-4 shrink-0 border-t" style={{ borderColor: s.divider }}>
          <button onClick={handleCancel} className="text-sm transition-colors cursor-pointer" style={{ color: s.muted }}>Cancel</button>
          <button onClick={handleSave}
            className="px-6 py-2.5 rounded-full text-sm font-semibold hover:opacity-90 active:scale-[0.98] transition-all cursor-pointer"
            style={{ backgroundColor: activeTheme.color, color: isDark ? "#0c0a07" : "#ffffff" }}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
