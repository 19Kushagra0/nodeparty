"use client";

import { useState } from "react";
import { Link2, Check, Copy, Crown, ChevronLeft } from "lucide-react";
import { useRoomTheme } from "@/hooks/useRoomTheme";
import { useRoomStore } from "@/store/useRoomStore";

export function RoomDetailsPill() {
  const t = useRoomTheme();
  const {
    roomId,
    roomPasscode,
    participants,
    currentPreset,
    isUrlBarOpen,
    setIsUrlBarOpen,
    setVideoUrl,
  } = useRoomStore();

  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [inputUrl, setInputUrl] = useState("");
  const [isEditingUrl, setIsEditingUrl] = useState(false);

  const host = participants.find((p) => p.role === "host");
  const hostName = host ? host.name.replace(" (You)", "") : "Alex";

  const handleCopyCode = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(roomPasscode || roomId);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  const handleCopyUrl = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedUrl(true);
      setTimeout(() => setCopiedUrl(false), 2000);
    }
  };

  if (isUrlBarOpen) {
    return (
      <div
        className="rounded-full flex items-center font-semibold shadow-2xs transition-all whitespace-nowrap max-w-[94%] select-none animate-in fade-in zoom-in-95 duration-200"
        style={{
          backgroundColor: t.isDark ? "#1e1a14" : "#ffffff",
          color: t.text,
          border: `1px solid ${t.border}`,
          paddingTop: "clamp(3px, 0.6vw, 8px)",
          paddingBottom: "clamp(3px, 0.6vw, 8px)",
          paddingLeft: "clamp(8px, 1.6vw, 22px)",
          paddingRight: "clamp(8px, 1.6vw, 20px)",
          gap: "clamp(5px, 1vw, 14px)",
        }}
      >
        <Link2
          className="shrink-0"
          style={{ color: t.muted, width: "clamp(12px, 1.2vw, 16px)", height: "clamp(12px, 1.2vw, 16px)" }}
          strokeWidth={2.2}
        />
        {isEditingUrl ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (inputUrl.trim()) {
                setVideoUrl(inputUrl.trim());
              }
              setIsEditingUrl(false);
            }}
            className="flex items-center min-w-0"
          >
            <input
              type="text"
              autoFocus
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              onBlur={() => setIsEditingUrl(false)}
              placeholder="Paste video URL..."
              className="notch-input-responsive bg-transparent border-none outline-none font-mono font-medium text-[clamp(10px,1.1vw,13px)] w-[110px] min-[420px]:w-[145px] min-[635px]:w-60"
              style={{ color: t.text }}
            />
          </form>
        ) : (
          <div
            onClick={() => {
              setInputUrl(currentPreset?.url || "");
              setIsEditingUrl(true);
            }}
            className="cursor-pointer flex items-center gap-0.5 tracking-tight font-medium hover:opacity-85 transition-opacity"
            title="Click to enter/paste a YouTube URL"
            style={{ fontSize: "clamp(10px, 1.1vw, 13px)" }}
          >
            <span className="notch-domain-prefix hidden min-[635px]:inline" style={{ color: t.muted }}>nodeparty.app/</span>
            <span style={{ color: t.muted }}>room/</span>
            <span className="font-bold font-mono" style={{ color: t.accent }}>
              {roomPasscode || roomId || "CYBER-4096"}
            </span>
          </div>
        )}
        <span className="select-none font-light opacity-30 px-0.5" style={{ color: t.muted, fontSize: "clamp(10px, 1.1vw, 14px)" }}>
          |
        </span>
        <button onClick={handleCopyUrl} className="cursor-pointer hover:opacity-80 transition-opacity flex items-center shrink-0" title="Copy full room link">
          {copiedUrl ? (
            <Check className="text-emerald-500 stroke-[2.5]" style={{ width: "clamp(11px, 1.1vw, 15px)", height: "clamp(11px, 1.1vw, 15px)" }} />
          ) : (
            <Copy style={{ color: t.muted, width: "clamp(11px, 1.1vw, 15px)", height: "clamp(11px, 1.1vw, 15px)" }} strokeWidth={2.2} />
          )}
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsUrlBarOpen(false);
          }}
          className="flex items-center gap-0.5 px-1.5 min-[635px]:px-2 py-0.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer text-xs font-semibold shrink-0"
          style={{ color: t.muted }}
          title="Back to Room Code"
        >
          <ChevronLeft className="stroke-[2.5]" style={{ width: "clamp(10px, 1.1vw, 13px)", height: "clamp(10px, 1.1vw, 13px)" }} />
          <span className="notch-code-label hidden min-[635px]:inline" style={{ fontSize: "clamp(9px, 1vw, 11px)" }}>CODE</span>
        </button>
      </div>
    );
  }

  return (
    <div
      className="rounded-full flex items-center font-semibold shadow-2xs transition-all whitespace-nowrap max-w-[94%] animate-in fade-in zoom-in-95 duration-200"
      style={{
        backgroundColor: t.isDark ? "#1e1a14" : "#ffffff",
        color: t.text,
        border: `1px solid ${t.border}`,
        paddingTop: "clamp(3px, 0.6vw, 8px)",
        paddingBottom: "clamp(3px, 0.6vw, 8px)",
        paddingLeft: "clamp(8px, 1.8vw, 24px)",
        paddingRight: "clamp(6px, 1.5vw, 20px)",
        gap: "clamp(5px, 1vw, 13px)",
      }}
    >
      <button onClick={handleCopyCode} className="flex items-center gap-1 sm:gap-1.5 cursor-pointer hover:opacity-85 transition-opacity select-none group/code whitespace-nowrap" title="Click to copy Room Code">
        <span className="font-semibold tracking-wider uppercase hidden min-[621px]:inline" style={{ color: t.muted, fontSize: "clamp(8px, 0.9vw, 11px)" }}>CODE:</span>
        <span className="font-mono font-bold tracking-wider whitespace-nowrap" style={{ color: t.accent, fontSize: "clamp(10px, 1.1vw, 13px)" }}>{roomPasscode || roomId}</span>
        <span className="transition-colors ml-0.5 inline-flex items-center" style={{ color: t.muted }}>
          {copiedCode ? (
            <Check className="text-emerald-500 stroke-[2.5]" style={{ width: "clamp(10px, 1.1vw, 14px)", height: "clamp(10px, 1.1vw, 14px)" }} />
          ) : (
            <Copy style={{ width: "clamp(10px, 1.1vw, 14px)", height: "clamp(10px, 1.1vw, 14px)" }} />
          )}
        </span>
      </button>
      <span className="font-bold select-none" style={{ color: t.border, fontSize: "clamp(8px, 0.9vw, 12px)" }}>•</span>
      <div className="flex items-center gap-1 sm:gap-1.5 select-none whitespace-nowrap min-w-0 max-w-[75px] sm:max-w-[130px] md:max-w-[180px]">
        <Crown className="stroke-[2.2] shrink-0" style={{ color: t.accent, width: "clamp(10px, 1.1vw, 14px)", height: "clamp(10px, 1.1vw, 14px)" }} />
        <span className="font-medium hidden min-[621px]:inline shrink-0" style={{ color: t.muted, fontSize: "clamp(8px, 0.9vw, 11px)" }}>Host:</span>
        <span className="font-bold truncate" title={hostName} style={{ color: t.text, fontSize: "clamp(10px, 1.1vw, 13px)" }}>{hostName}</span>
      </div>
      <span className="font-bold select-none opacity-40" style={{ color: t.muted, fontSize: "clamp(8px, 0.9vw, 12px)" }}>•</span>
      <button onClick={(e) => { e.stopPropagation(); setIsUrlBarOpen(true); }} className="flex items-center gap-1 px-1.5 py-0.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer text-xs font-semibold shrink-0" style={{ color: t.accent }} title="Switch to URL Bar">
        <Link2 style={{ width: "clamp(10px, 1.1vw, 13px)", height: "clamp(10px, 1.1vw, 13px)" }} strokeWidth={2.2} />
        <span style={{ fontSize: "clamp(9px, 1vw, 11px)" }}>URL</span>
      </button>
    </div>
  );
}
