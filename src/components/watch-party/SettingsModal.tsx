"use client";

import { useState } from "react";
import { X, Check, Volume2, Monitor, Palette } from "lucide-react";
import { useRoomStore } from "@/store/useRoomStore";

// ─── Types ───────────────────────────────────────────────────────────────────

type Section = "theme" | "audio" | "display";

interface Toggle {
  label: string;
  sub?: string;
  key: string;
}

// ─── Theme Data ───────────────────────────────────────────────────────────────

interface ThemeOption {
  id: string;
  name: string;
  color: string;
  current?: boolean;
  mode: "light" | "dark";
}

const themes: ThemeOption[] = [
  { id: "red",    name: "Red",    color: "#F43F5E", current: true,  mode: "light" },
  { id: "yellow", name: "Yellow", color: "#EAB308", current: false, mode: "dark"  },
];

// ─── Sub-components ──────────────────────────────────────────────────────────

function Toggle({
  enabled,
  onChange,
}: {
  enabled: boolean;
  onChange: () => void;
}) {
  return (
    <button
      role="switch"
      aria-checked={enabled}
      onClick={onChange}
      className={`relative w-10 h-5.5 rounded-full transition-colors duration-200 cursor-pointer shrink-0 ${
        enabled ? "bg-zinc-900" : "bg-zinc-200"
      }`}
    >
      <span
        className={`absolute top-[3px] w-4 h-4 rounded-full bg-white shadow-sm transition-all duration-200 ${
          enabled ? "left-[22px]" : "left-[3px]"
        }`}
      />
    </button>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-400 mb-3">
      {children}
    </p>
  );
}

function Row({
  label,
  sub,
  right,
}: {
  label: string;
  sub?: string;
  right: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-zinc-100 last:border-0">
      <div>
        <p className="text-sm font-medium text-zinc-800">{label}</p>
        {sub && <p className="text-xs text-zinc-400 mt-0.5">{sub}</p>}
      </div>
      <div className="ml-4 shrink-0">{right}</div>
    </div>
  );
}

// ─── Main Modal ───────────────────────────────────────────────────────────────

export function SettingsModal() {
  const { isSettingsModalOpen, setSettingsModalOpen } = useRoomStore();

  const [section, setSection]             = useState<Section>("theme");
  const [selectedTheme, setSelectedTheme] = useState("red");
  const [mode, setMode]                   = useState<"light" | "dark">("light");

  // Audio
  const [volume, setVolume]             = useState(80);
  const [spatialAudio, setSpatialAudio] = useState(true);
  const [notifSounds, setNotifSounds]   = useState(true);
  const [micNoise, setMicNoise]         = useState(false);

  // Display
  const [quality, setQuality]           = useState<"4k" | "1080p" | "720p">("4k");
  const [ambientGlow, setAmbientGlow]   = useState(true);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [compactChat, setCompactChat]   = useState(false);

  if (!isSettingsModalOpen) return null;

  const visibleThemes = themes.filter((t) => t.mode === mode);
  const activeTheme = themes.find((t) => t.id === selectedTheme) || visibleThemes[0] || themes[0];

  const handleModeChange = (newMode: "light" | "dark") => {
    setMode(newMode);
    setSelectedTheme(newMode === "light" ? "red" : "yellow");
  };

  const navItems: { id: Section; label: string; icon: React.ReactNode }[] = [
    { id: "theme",   label: "Theme",   icon: <Palette   className="w-3.5 h-3.5" /> },
    { id: "audio",   label: "Audio",   icon: <Volume2   className="w-3.5 h-3.5" /> },
    { id: "display", label: "Display", icon: <Monitor   className="w-3.5 h-3.5" /> },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-zinc-950/40 backdrop-blur-md animate-in fade-in duration-200"
      onClick={() => setSettingsModalOpen(false)}
    >
      <div
        className="w-full max-w-xl bg-white border border-zinc-200/80 rounded-[28px] sm:rounded-[32px] shadow-[0_20px_60px_rgba(0,0,0,0.13)] overflow-hidden flex flex-col animate-in zoom-in-95 duration-200"
        style={{ maxHeight: "min(90vh, 560px)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Header ── */}
        <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-zinc-100 shrink-0">
          <h3 className="text-base font-bold text-zinc-900 tracking-tight">Settings</h3>
          <button
            onClick={() => setSettingsModalOpen(false)}
            className="w-7 h-7 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-400 hover:text-zinc-700 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* ── Body: sidebar + content ── */}
        <div className="flex flex-1 min-h-0">

          {/* Left nav */}
          <nav className="flex flex-col gap-0.5 p-3 border-r border-zinc-100 shrink-0 w-[130px]">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setSection(item.id)}
                className={`flex items-center gap-2.5 w-full px-3 py-2.5 rounded-xl text-left text-sm transition-all cursor-pointer ${
                  section === item.id
                    ? "bg-zinc-100 text-zinc-900 font-semibold"
                    : "text-zinc-500 hover:text-zinc-800 hover:bg-zinc-50 font-medium"
                }`}
              >
                <span className={section === item.id ? "text-zinc-700" : "text-zinc-400"}>
                  {item.icon}
                </span>
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right content */}
          <div className="flex-1 overflow-y-auto px-6 py-5 min-h-0">

            {/* ── THEME ── */}
            {section === "theme" && (
              <div className="space-y-6 animate-in fade-in duration-150">

                {/* Mode: Light / Dark */}
                <div>
                  <SectionLabel>Interface mode</SectionLabel>
                  <div className="grid grid-cols-2 gap-2.5">
                    {/* Light */}
                    <button
                      onClick={() => handleModeChange("light")}
                      className={`relative flex flex-col gap-2 p-3 rounded-2xl border transition-all cursor-pointer text-left ${
                        mode === "light"
                          ? "border-zinc-300 bg-zinc-50 ring-1 ring-zinc-300"
                          : "border-zinc-200 bg-white hover:bg-zinc-50"
                      }`}
                    >
                      {/* Mini preview */}
                      <div className="w-full h-12 rounded-xl bg-white border border-zinc-200 overflow-hidden flex flex-col gap-1 p-1.5">
                        <div className="flex gap-1">
                          <div className="w-8 h-1.5 rounded-full bg-zinc-200" />
                          <div className="w-5 h-1.5 rounded-full bg-zinc-100" />
                        </div>
                        <div className="flex gap-1">
                          <div className="w-5 h-1.5 rounded-full bg-zinc-100" />
                          <div className="w-8 h-1.5 rounded-full bg-zinc-200" />
                        </div>
                        <div className="w-6 h-1.5 rounded-full mt-auto bg-[#F43F5E]" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className={`text-xs font-semibold ${mode === "light" ? "text-zinc-900" : "text-zinc-500"}`}>
                          Light
                        </span>
                        {mode === "light" && (
                          <Check className="w-3 h-3 text-zinc-700 stroke-[3]" />
                        )}
                      </div>
                    </button>

                    {/* Dark */}
                    <button
                      onClick={() => handleModeChange("dark")}
                      className={`relative flex flex-col gap-2 p-3 rounded-2xl border transition-all cursor-pointer text-left ${
                        mode === "dark"
                          ? "border-zinc-600 bg-zinc-900 ring-1 ring-zinc-600"
                          : "border-zinc-200 bg-white hover:bg-zinc-50"
                      }`}
                    >
                      {/* Mini preview */}
                      <div className="w-full h-12 rounded-xl bg-zinc-900 border border-zinc-700 overflow-hidden flex flex-col gap-1 p-1.5">
                        <div className="flex gap-1">
                          <div className="w-8 h-1.5 rounded-full bg-zinc-600" />
                          <div className="w-5 h-1.5 rounded-full bg-zinc-700" />
                        </div>
                        <div className="flex gap-1">
                          <div className="w-5 h-1.5 rounded-full bg-zinc-700" />
                          <div className="w-8 h-1.5 rounded-full bg-zinc-600" />
                        </div>
                        <div className="w-6 h-1.5 rounded-full mt-auto bg-[#EAB308]" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className={`text-xs font-semibold ${mode === "dark" ? "text-white" : "text-zinc-500"}`}>
                          Dark
                        </span>
                        {mode === "dark" && (
                          <Check className="w-3 h-3 text-white stroke-[3]" />
                        )}
                      </div>
                    </button>
                  </div>
                </div>

                {/* Accent color */}
                <div>
                  <SectionLabel>Accent color</SectionLabel>
                  <div className="space-y-1">
                    {visibleThemes.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => setSelectedTheme(t.id)}
                        className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl border transition-all cursor-pointer ${
                          selectedTheme === t.id
                            ? "bg-zinc-50 border-zinc-200"
                            : "border-transparent hover:bg-zinc-50/80"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className="w-4 h-4 rounded-full shrink-0"
                            style={{ backgroundColor: t.color }}
                          />
                          <span className={`text-sm ${selectedTheme === t.id ? "font-semibold text-zinc-900" : "font-medium text-zinc-500"}`}>
                            {t.name}
                          </span>
                          {t.current && (
                            <span className="text-[10px] text-zinc-400 font-normal">default</span>
                          )}
                        </div>
                        {selectedTheme === t.id && (
                          <Check className="w-3.5 h-3.5 text-zinc-700 stroke-[2.5]" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}


            {/* ── AUDIO ── */}
            {section === "audio" && (
              <div className="space-y-5 animate-in fade-in duration-150">
                <div>
                  <SectionLabel>Volume</SectionLabel>
                  <div className="flex items-center gap-3 py-1">
                    <span className="text-xs text-zinc-400 w-4 text-right shrink-0">0</span>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={volume}
                      onChange={(e) => setVolume(Number(e.target.value))}
                      className="flex-1 h-1.5 rounded-full appearance-none cursor-pointer accent-zinc-900 bg-zinc-200"
                    />
                    <span className="text-xs font-semibold text-zinc-700 w-8 shrink-0">{volume}%</span>
                  </div>
                </div>

                <div>
                  <SectionLabel>Options</SectionLabel>
                  <div className="rounded-2xl border border-zinc-100 bg-[#F9FAFB] divide-y divide-zinc-100 overflow-hidden">
                    <div className="px-4">
                      <Row
                        label="Spatial Audio"
                        sub="3D positional sound for participants"
                        right={<Toggle enabled={spatialAudio} onChange={() => setSpatialAudio((p) => !p)} />}
                      />
                    </div>
                    <div className="px-4">
                      <Row
                        label="Notification sounds"
                        right={<Toggle enabled={notifSounds} onChange={() => setNotifSounds((p) => !p)} />}
                      />
                    </div>
                    <div className="px-4">
                      <Row
                        label="Mic noise suppression"
                        sub="Reduce background noise"
                        right={<Toggle enabled={micNoise} onChange={() => setMicNoise((p) => !p)} />}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ── DISPLAY ── */}
            {section === "display" && (
              <div className="space-y-5 animate-in fade-in duration-150">
                <div>
                  <SectionLabel>Stream quality</SectionLabel>
                  <div className="flex gap-2">
                    {(["4k", "1080p", "720p"] as const).map((q) => (
                      <button
                        key={q}
                        onClick={() => setQuality(q)}
                        className={`flex-1 py-2 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                          quality === q
                            ? "bg-zinc-900 text-white border-zinc-900"
                            : "bg-[#F9FAFB] text-zinc-500 border-zinc-200 hover:border-zinc-300 hover:text-zinc-700"
                        }`}
                      >
                        {q === "4k" ? "4K" : q}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <SectionLabel>Visual</SectionLabel>
                  <div className="rounded-2xl border border-zinc-100 bg-[#F9FAFB] divide-y divide-zinc-100 overflow-hidden">
                    <div className="px-4">
                      <Row
                        label="Ambient glow"
                        sub="Backlight behind the player"
                        right={<Toggle enabled={ambientGlow} onChange={() => setAmbientGlow((p) => !p)} />}
                      />
                    </div>
                    <div className="px-4">
                      <Row
                        label="Compact chat"
                        sub="Smaller message bubbles"
                        right={<Toggle enabled={compactChat} onChange={() => setCompactChat((p) => !p)} />}
                      />
                    </div>
                    <div className="px-4">
                      <Row
                        label="Reduce motion"
                        right={<Toggle enabled={reduceMotion} onChange={() => setReduceMotion((p) => !p)} />}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── Footer ── */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-zinc-100 shrink-0">
          <button
            onClick={() => setSettingsModalOpen(false)}
            className="text-sm text-zinc-400 hover:text-zinc-700 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={() => setSettingsModalOpen(false)}
            className={`px-6 py-2.5 rounded-full text-sm font-semibold shadow-xs hover:opacity-90 active:scale-[0.98] transition-all cursor-pointer ${
              activeTheme.id === "yellow" ? "text-zinc-950" : "text-white"
            }`}
            style={{ backgroundColor: activeTheme.color }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
