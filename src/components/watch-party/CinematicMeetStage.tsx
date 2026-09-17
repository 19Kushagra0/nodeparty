"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  ChevronLeft,
  ChevronUp,
  Copy,
  Check,
  Crown,
  Link2,
} from "lucide-react";
import { useRoomStore } from "@/store/useRoomStore";
import { useRoomTheme } from "@/hooks/useRoomTheme";
import { GridStageView } from "./GridStageView";

export function CinematicMeetStage() {
  const router = useRouter();
  const t = useRoomTheme();
  const {
    roomId,
    roomPasscode,
    reactions,
    participants,
    isUrlBarOpen,
    setIsUrlBarOpen,
  } = useRoomStore();

  const host = participants.find((p) => p.role === "host");
  const hostName = host ? host.name.replace(" (You)", "") : "Alex";

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isNotchOpen, setIsNotchOpen] = useState(true);
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const browserContainerRef = useRef<HTMLDivElement>(null);

  const handlePlayerMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      setShowControls(false);
    }, 3000);
  };

  const handlePlayerMouseLeave = () => {
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      setShowControls(false);
    }, 3000);
  };

  useEffect(() => {
    controlsTimeoutRef.current = setTimeout(() => {
      setShowControls(false);
    }, 3000);

    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener("webkitfullscreenchange", handleFullscreenChange);
    };
  }, []);

  const handleCopyCode = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(roomPasscode || roomId || "");
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleCopyUrl = (e: React.MouseEvent) => {
    e.stopPropagation();
    const code = roomPasscode || roomId || "CYBER-4096";
    const fullUrl = typeof window !== "undefined"
      ? `${window.location.origin}/room/${code}`
      : `https://nodeparty.app/room/${code}`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  const handleBackToHome = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push("/");
  };

  return (
    <div className="w-full h-full min-h-0 relative flex flex-col">
      <div
        ref={browserContainerRef}
        data-cinema-player="true"
        onMouseMove={handlePlayerMouseMove}
        onMouseEnter={handlePlayerMouseMove}
        onMouseLeave={handlePlayerMouseLeave}
        className={`relative w-full h-full min-h-0 overflow-hidden select-none transition-all duration-200 ${isFullscreen
          ? "!rounded-none fixed inset-0 w-screen h-screen z-[9999]"
          : "rounded-[32px] sm:rounded-[42px] lg:rounded-[48px]"
          } ${!showControls ? "cursor-none" : ""}`}
        style={{ backgroundColor: t.isDark ? "#08090a" : "#f5f5f7" }}
      >
        
        {/* Central Content: Grid Stage */}
        <div className="absolute inset-0 bg-black overflow-hidden">
          <GridStageView />
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
                className={`text-[10px] font-semibold text-white px-2 py-0.5 rounded-full bg-black/40 backdrop-blur border border-white/10`}
              >
                {r.senderName}
              </span>
            </div>
          ))}
        </div>

        {/* Center Dipped Notch & Modal Capsule */}
        {isNotchOpen && (
          <div className="pointer-events-auto absolute top-0 left-1/2 -translate-x-1/2 z-[100] flex items-center justify-center animate-in fade-in slide-in-from-top-2 duration-300 cursor-default">
            {/* White/Dark Curved Notch Background attached seamlessly to top-0 */}
            <svg
              className="block transition-all"
              style={{
                width: "clamp(300px, 84vw, 560px)",
                height: "clamp(38px, 5.4vw, 62px)",
              }}
              viewBox="0 0 560 66"
              fill="none"
              preserveAspectRatio="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M 0 -2 L 0 0 C 25 0, 45 64, 70 64 L 490 64 C 515 64, 535 0, 560 0 L 560 -2 Z"
                fill={t.isDark ? "#14110e" : "#ffffff"}
              />
            </svg>

            {/* Inner Soft-Tinted Modal Capsule */}
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{
                paddingBottom: "clamp(6px, 1.2vw, 14px)",
                paddingTop: "clamp(1px, 0.3vw, 4px)",
              }}
            >
              {isUrlBarOpen ? (
                /* URL Capsule */
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
                    style={{
                      color: t.muted,
                      width: "clamp(12px, 1.2vw, 16px)",
                      height: "clamp(12px, 1.2vw, 16px)",
                    }}
                    strokeWidth={2.2}
                  />

                  <div
                    className="cursor-pointer flex items-center gap-0.5 tracking-tight font-medium hover:opacity-85 transition-opacity"
                    title="Room URL"
                    style={{ fontSize: "clamp(10px, 1.1vw, 13px)" }}
                  >
                    <span className="notch-domain-prefix hidden min-[635px]:inline" style={{ color: t.muted }}>nodeparty.app/</span>
                    <span style={{ color: t.muted }}>room/</span>
                    <span className="font-bold font-mono" style={{ color: t.accent }}>
                      {roomPasscode || roomId || "CYBER-4096"}
                    </span>
                  </div>

                  <span
                    className="select-none font-light opacity-30 px-0.5"
                    style={{
                      color: t.muted,
                      fontSize: "clamp(10px, 1.1vw, 14px)",
                    }}
                  >
                    |
                  </span>

                  <button
                    onClick={handleCopyUrl}
                    className="cursor-pointer hover:opacity-80 transition-opacity flex items-center shrink-0"
                    title="Copy full room link"
                  >
                    {copiedUrl ? (
                      <Check
                        className="text-emerald-500 stroke-[2.5]"
                        style={{
                          width: "clamp(11px, 1.1vw, 15px)",
                          height: "clamp(11px, 1.1vw, 15px)",
                        }}
                      />
                    ) : (
                      <Copy
                        style={{
                          color: t.muted,
                          width: "clamp(11px, 1.1vw, 15px)",
                          height: "clamp(11px, 1.1vw, 15px)",
                        }}
                        strokeWidth={2.2}
                      />
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
                    <ChevronLeft
                      className="stroke-[2.5]"
                      style={{
                        width: "clamp(10px, 1.1vw, 13px)",
                        height: "clamp(10px, 1.1vw, 13px)",
                      }}
                    />
                    <span className="notch-code-label hidden min-[635px]:inline" style={{ fontSize: "clamp(9px, 1vw, 11px)" }}>CODE</span>
                  </button>
                </div>
              ) : (
                /* Default Room Code & Host Info Capsule */
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
                  <button
                    onClick={handleCopyCode}
                    className="flex items-center gap-1 sm:gap-1.5 cursor-pointer hover:opacity-85 transition-opacity select-none group/code whitespace-nowrap"
                    title="Click to copy Room Code"
                  >
                    <span
                      className="font-semibold tracking-wider uppercase hidden min-[621px]:inline"
                      style={{
                        color: t.muted,
                        fontSize: "clamp(8px, 0.9vw, 11px)",
                      }}
                    >
                      CODE:
                    </span>
                    <span
                      className="font-mono font-bold tracking-wider whitespace-nowrap"
                      style={{
                        color: t.accent,
                        fontSize: "clamp(10px, 1.1vw, 13px)",
                      }}
                    >
                      {roomPasscode || roomId}
                    </span>
                    <span className="transition-colors ml-0.5 inline-flex items-center" style={{ color: t.muted }}>
                      {copiedCode ? (
                        <Check
                          className="text-emerald-500 stroke-[2.5]"
                          style={{
                            width: "clamp(10px, 1.1vw, 14px)",
                            height: "clamp(10px, 1.1vw, 14px)",
                          }}
                        />
                      ) : (
                        <Copy
                          style={{
                            width: "clamp(10px, 1.1vw, 14px)",
                            height: "clamp(10px, 1.1vw, 14px)",
                          }}
                        />
                      )}
                    </span>
                  </button>

                  <span
                    className="font-bold select-none"
                    style={{
                      color: t.border,
                      fontSize: "clamp(8px, 0.9vw, 12px)",
                    }}
                  >
                    •
                  </span>

                  <div className="flex items-center gap-1 sm:gap-1.5 select-none whitespace-nowrap min-w-0 max-w-[75px] sm:max-w-[130px] md:max-w-[180px]">
                    <Crown
                      className="stroke-[2.2] shrink-0"
                      style={{
                        color: t.accent,
                        width: "clamp(10px, 1.1vw, 14px)",
                        height: "clamp(10px, 1.1vw, 14px)",
                      }}
                    />
                    <span
                      className="font-medium hidden min-[621px]:inline shrink-0"
                      style={{
                        color: t.muted,
                        fontSize: "clamp(8px, 0.9vw, 11px)",
                      }}
                    >
                      Host:
                    </span>
                    <span
                      className="font-bold truncate"
                      title={hostName}
                      style={{
                        color: t.text,
                        fontSize: "clamp(10px, 1.1vw, 13px)",
                      }}
                    >
                      {hostName}
                    </span>
                  </div>

                  <span
                    className="font-bold select-none opacity-40"
                    style={{
                      color: t.muted,
                      fontSize: "clamp(8px, 0.9vw, 12px)",
                    }}
                  >
                    •
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsUrlBarOpen(true);
                    }}
                    className="flex items-center gap-1 px-1.5 py-0.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer text-xs font-semibold shrink-0"
                    style={{ color: t.accent }}
                    title="Switch to URL Bar"
                  >
                    <Link2
                      style={{
                        width: "clamp(10px, 1.1vw, 13px)",
                        height: "clamp(10px, 1.1vw, 13px)",
                      }}
                      strokeWidth={2.2}
                    />
                    <span style={{ fontSize: "clamp(9px, 1vw, 11px)" }}>URL</span>
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsNotchOpen(false);
                    }}
                    className="p-0.5 sm:p-1 -mr-0.5 sm:-mr-1 rounded-full transition-all cursor-pointer hover:opacity-80 shrink-0 ml-0.5"
                    style={{ color: t.muted }}
                    title="Hide details"
                  >
                    <ChevronUp
                      className="stroke-[2.5]"
                      style={{
                        width: "clamp(10px, 1.1vw, 14px)",
                        height: "clamp(10px, 1.1vw, 14px)",
                      }}
                    />
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Top Floating Controls Header */}
        <div
          className={`absolute top-0 left-0 right-0 z-[90] flex items-start justify-between pointer-events-none px-3 sm:px-5 md:px-7 lg:px-8 transition-all duration-300 ease-out ${showControls
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-2 pointer-events-none"
            }`}
        >
          <div className="hidden sm:block pt-2 sm:pt-3 md:pt-3.5 transition-all duration-300 ease-out">
            <button
              onClick={handleBackToHome}
              className="pointer-events-auto flex items-center justify-center gap-1.5 w-8 h-8 min-[830px]:w-auto min-[830px]:h-auto min-[830px]:px-2.5 min-[1100px]:px-3.5 min-[830px]:py-1.5 rounded-full shadow-2xs transition-all text-xs font-semibold hover:scale-[1.03] active:scale-[0.97] cursor-pointer"
              style={{
                backgroundColor: t.surface,
                color: t.text,
                border: `1px solid ${t.border}`,
              }}
              title="Back to Home"
            >
              <ChevronLeft className="w-3.5 h-3.5 min-[1100px]:w-4 min-[1100px]:h-4 stroke-[2.5]" style={{ color: t.muted }} />
              <span className="hidden min-[830px]:inline min-[1100px]:hidden whitespace-nowrap">Back</span>
              <span className="hidden min-[1100px]:inline whitespace-nowrap">Back to Home</span>
            </button>
          </div>

          <div className="pt-2 sm:pt-3 md:pt-3.5 flex items-center gap-2 pointer-events-auto transition-all duration-300 ease-out">
            {!isNotchOpen && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsNotchOpen(true);
                }}
                className="flex items-center gap-1 sm:gap-1.5 px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 rounded-full shadow-2xs transition-all text-xs sm:text-sm font-bold hover:scale-[1.02] active:scale-[0.98] cursor-pointer animate-in fade-in duration-200"
                style={{
                  backgroundColor: t.surface,
                  color: t.text,
                  border: `1px solid ${t.border}`,
                }}
                title="Show Room Code"
              >
                <span>Details<span className="hidden sm:inline"> / Code</span></span>
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
