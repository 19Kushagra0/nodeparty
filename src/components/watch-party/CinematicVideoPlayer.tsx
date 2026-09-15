"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  ChevronLeft,
  ChevronUp,
  ChevronDown,
  MessageSquare,
  Users,
  Copy,
  Check,
  Crown,
  Link2,
} from "lucide-react";
import { useRoomStore } from "@/store/useRoomStore";
import { useRoomTheme } from "@/hooks/useRoomTheme";
import { MultiplayerCursors } from "./MultiplayerCursors";
import YouTube from "react-youtube";

export function CinematicVideoPlayer() {
  const router = useRouter();
  const t = useRoomTheme();
  const {
    roomId,
    roomPasscode,
    currentPreset,
    isPlaying,
    togglePlay,
    currentTime,
    duration,
    seekTo,
    volume,
    setVolume,
    isMuted,
    toggleMute,
    reactions,
    participants,
    messages,
    queue,
    playQueueItem,
    setSettingsModalOpen,
    isUrlBarOpen,
    setIsUrlBarOpen,
    setVideoUrl,
  } = useRoomStore();

  const host = participants.find((p) => p.role === "host");
  const hostName = host ? host.name.replace(" (You)", "") : "Alex";

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isNotchOpen, setIsNotchOpen] = useState(true);
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [inputUrl, setInputUrl] = useState("");
  const [isEditingUrl, setIsEditingUrl] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const playerRef = useRef<any>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const browserContainerRef = useRef<HTMLDivElement>(null);

  // Sync Zustand store 'isPlaying' state to the actual YouTube player
  useEffect(() => {
    if (!playerRef.current) {
      console.log("⚠️ [YouTube] togglePlay called but player not ready yet!");
      return;
    }
    if (isPlaying) {
      console.log("▶️ [YouTube] Calling playVideo()");
      playerRef.current.playVideo();
    } else {
      console.log("⏸️ [YouTube] Calling pauseVideo()");
      playerRef.current.pauseVideo();
    }
  }, [isPlaying]);

  // Sync Zustand store volume/mute state to the actual YouTube player
  useEffect(() => {
    if (!playerRef.current || typeof playerRef.current.setVolume !== "function") return;

    console.log(`🔊 [YouTube] Applying Volume -> Muted: ${isMuted}, Volume: ${volume}`);
    if (isMuted) {
      playerRef.current.mute();
      playerRef.current.setVolume(0);
    } else {
      if (playerRef.current.isMuted()) {
        playerRef.current.unMute();
      }
      playerRef.current.setVolume(volume);
    }
  }, [volume, isMuted]);

  // Sync play/pause to native player when it changes
  useEffect(() => {
    if (!playerRef.current || typeof playerRef.current.playVideo !== "function") return;
    if (isPlaying) {
      playerRef.current.playVideo();
    } else {
      playerRef.current.pauseVideo();
    }
  }, [isPlaying]);

  // Periodic time polling and drift correction
  useEffect(() => {
    let tickCount = 0;
    const interval = setInterval(() => {
      if (!playerRef.current || typeof playerRef.current.getCurrentTime !== "function") return;

      const actualTime = playerRef.current.getCurrentTime();
      const state = useRoomStore.getState();

      // Update duration for all clients (Host & Guest)
      const actualDuration = playerRef.current.getDuration();
      if (actualDuration && actualDuration !== state.duration) {
        state.setDuration(actualDuration);
      }

      if (state.userRole === "host") {
        state.setCurrentTime(actualTime);

        // Broadcast every 2 seconds (4 * 500ms) to keep guests in sync, even when paused
        tickCount++;
        if (tickCount % 4 === 0) {
          state.broadcastPlaybackSync();
        }
      } else {
        // Guest drift correction
        state.setCurrentTime(actualTime); // Keep guest UI progress bar perfectly smooth

        if (!state.lastSyncTimestamp) return; // Wait for first sync packet

        const elapsedSinceSync = (Date.now() - state.lastSyncTimestamp) / 1000;
        const expectedHostTime = state.hostSyncTime + (state.isPlaying ? elapsedSinceSync * state.playbackRate : 0);
        const drift = actualTime - expectedHostTime;

        if (Math.abs(drift) > 1.5) {
          console.log(`⏱️ Drift > 1.5s (${drift.toFixed(2)}s). Hard seeking to ${expectedHostTime.toFixed(2)}.`);
          playerRef.current.seekTo(expectedHostTime, true);
        } else if (state.isPlaying && Math.abs(drift) > 0.3) {
          const targetRate = drift > 0 ? 0.95 : 1.05;
          if (playerRef.current.getPlaybackRate() !== targetRate) {
            console.log(`⏱️ Drift 0.3s-1.5s (${drift.toFixed(2)}s). Throttling rate to ${targetRate}.`);
            playerRef.current.setPlaybackRate(targetRate);
          }
        } else {
          if (playerRef.current.getPlaybackRate() !== state.playbackRate) {
            playerRef.current.setPlaybackRate(state.playbackRate);
          }
        }
      }
    }, 500);

    return () => clearInterval(interval);
  }, []);

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

  // Listen to native fullscreen change events (e.g. Esc key or browser controls)
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
    navigator.clipboard.writeText(roomPasscode || roomId);
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

  const nextItem = queue.find((item) => !item.isPlaying) || queue[0];

  const handlePlayNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (nextItem) {
      playQueueItem(nextItem.id);
    }
  };

  const handleBackToHome = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push("/");
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const state = useRoomStore.getState();
    // In Host-Authored mode, only the host can scrub the timeline
    if (state.userRole !== "host") return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, clickX / rect.width));
    const targetTime = percentage * duration;

    if (playerRef.current && typeof playerRef.current.seekTo === "function") {
      playerRef.current.seekTo(targetTime, true);
    }
    seekTo(targetTime);
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = Math.floor(secs % 60);
    return `${mins.toString().padStart(2, "0")}:${remainder.toString().padStart(2, "0")}`;
  };

  const toggleFullscreen = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!browserContainerRef.current) return;
    if (!document.fullscreenElement) {
      browserContainerRef.current.requestFullscreen?.().catch(() => { });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.().catch(() => { });
      setIsFullscreen(false);
    }
  };

  return (
    <div className="w-full h-full min-h-0 relative flex flex-col">
      {/* Machined Double-Bezel Container with pronounced organic rounded corners */}
      <div
        ref={browserContainerRef}
        data-cinema-player="true"
        onMouseMove={handlePlayerMouseMove}
        onMouseEnter={handlePlayerMouseMove}
        onMouseLeave={handlePlayerMouseLeave}
        className={`relative w-full h-full min-h-0 bg-black overflow-hidden select-none transition-all duration-200 ${isFullscreen
          ? "!rounded-none fixed inset-0 w-screen h-screen z-[9999]"
          : "rounded-[32px] sm:rounded-[42px] lg:rounded-[48px]"
          } ${!showControls ? "cursor-none" : ""}`}
      >
        {/* Active Content Background Poster / YouTube Player */}
        <div className="absolute inset-0 bg-black">
          {currentPreset.youtubeId ? (
            <YouTube
              videoId={currentPreset.youtubeId}
              opts={{
                width: "100%",
                height: "100%",
                playerVars: {
                  autoplay: 0,
                  controls: 0, // Hide native controls, we are using our custom UI now!
                  disablekb: 1,
                  modestbranding: 1,
                  rel: 0,
                },
              }}
              onReady={(e) => {
                console.log("🎥 [YouTube] Player is READY! Saving player reference.");
                playerRef.current = e.target;

                // Apply initial playback state
                const state = useRoomStore.getState();
                if (state.isPlaying) {
                  e.target.playVideo();
                } else {
                  e.target.pauseVideo();
                }

                // Apply initial volume state
                if (state.isMuted) {
                  e.target.mute();
                  e.target.setVolume(0);
                } else {
                  e.target.unMute();
                  e.target.setVolume(state.volume);
                }
              }}
              onStateChange={(e) => {
                const stateNames = {
                  "-1": "UNSTARTED",
                  "0": "ENDED",
                  "1": "PLAYING",
                  "2": "PAUSED",
                  "3": "BUFFERING",
                  "5": "CUED"
                };
                const stateString = e.data.toString() as keyof typeof stateNames;
                console.log(`🎥 [YouTube] State Changed to: ${stateNames[stateString] || e.data}`);
              }}
              className="absolute inset-0 w-full h-full pointer-events-none" // Disabled so custom UI overlay handles clicks
              iframeClassName="w-full h-full scale-[1.2]" // Scale up slightly to hide youtube branding/bars
            />
          ) : (
            <div
              className="absolute inset-0 bg-cover bg-center transition-opacity duration-700"
              style={{ backgroundImage: `url('${currentPreset.thumbnail}')` }}
            />
          )}
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

        {/* Interactive Screen Share Overlay */}
        <MultiplayerCursors containerRef={browserContainerRef} />

        {/* Center Dipped Notch & Modal Capsule - Always visible at top-0 regardless of hover or inactivity */}
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
                /* URL Capsule matching user mockup: [🔗 nodeparty.app/room/CYBER-4096 | 📋] */
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
                  {/* Link Icon */}
                  <Link2
                    className="shrink-0"
                    style={{
                      color: t.muted,
                      width: "clamp(12px, 1.2vw, 16px)",
                      height: "clamp(12px, 1.2vw, 16px)",
                    }}
                    strokeWidth={2.2}
                  />

                  {/* URL Text / Input */}
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
                        setInputUrl(currentPreset.url || "");
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

                  {/* Divider */}
                  <span
                    className="select-none font-light opacity-30 px-0.5"
                    style={{
                      color: t.muted,
                      fontSize: "clamp(10px, 1.1vw, 14px)",
                    }}
                  >
                    |
                  </span>

                  {/* Copy Button */}
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

                  {/* Return to Room Code button */}
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
                  {/* Code Name & Copy Button */}
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

                  {/* Dot Separator */}
                  <span
                    className="font-bold select-none"
                    style={{
                      color: t.border,
                      fontSize: "clamp(8px, 0.9vw, 12px)",
                    }}
                  >
                    •
                  </span>

                  {/* Host Info */}
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

                  {/* Dot Separator */}
                  <span
                    className="font-bold select-none opacity-40"
                    style={{
                      color: t.muted,
                      fontSize: "clamp(8px, 0.9vw, 12px)",
                    }}
                  >
                    •
                  </span>

                  {/* Switch to URL Bar Button */}
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

                  {/* Toggle Button inside to Disappear/Collapse */}
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

        {/* Top Floating Controls Header (Back to Home & Show details) - Hides/shows with mouse hover */}
        <div
          className={`absolute top-0 left-0 right-0 z-[90] flex items-start justify-between pointer-events-none px-3 sm:px-5 md:px-7 lg:px-8 transition-all duration-300 ease-out ${showControls
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-2 pointer-events-none"
            }`}
        >
          {/* Left Pill: Back to Home (Hidden on phones, visible on sm+) */}
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

          {/* Right Header Area (Show Info button when modal is closed) */}
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

        {/* Center Giant Play/Pause (Only visible when paused) */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
            <div className="w-14 h-14 sm:w-18 sm:h-18 rounded-full bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center shadow-2xl">
              <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-white ml-1 opacity-95 text-white" />
            </div>
          </div>
        )}

        {/* Clickable Area for Play/Pause or Autoplay Bypass */}
        <div
          className="absolute inset-0 z-0 cursor-pointer"
          onClick={() => {
            const state = useRoomStore.getState();
            if (state.userRole === "host") {
              togglePlay();
            } else {
              // Guest clicked the video. If they are blocked by browser autoplay rules,
              // this user interaction will unblock it and force it to play.
              if (state.isPlaying && playerRef.current) {
                console.log("▶️ [YouTube] Guest manually clicked video to bypass autoplay block.");
                playerRef.current.playVideo();
              }
            }
          }}
        />

        {/* Bottom Progress Bar & Controls */}
        <div
          className={`absolute bottom-0 left-0 right-0 p-4 sm:p-5 z-50 transition-all duration-300 bg-gradient-to-t from-black/85 via-black/40 to-transparent flex flex-col gap-3 ${showControls
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-2 pointer-events-none"
            }`}
        >

          {/* Progress Line */}
          <div
            className="h-1.5 sm:h-2 w-full bg-white/20 rounded-full cursor-pointer relative overflow-hidden"
            onClick={handleSeek}
          >
            {/* Buffer / Loaded */}
            <div
              className="h-full bg-white/30 rounded-full absolute left-0 top-0 pointer-events-none"
              style={{ width: `${Math.min(100, ((currentTime + 45) / duration) * 100)}%` }}
            />
            {/* Play Line */}
            <div
              className="h-full rounded-full relative pointer-events-none"
              style={{
                width: `${(currentTime / duration) * 100}%`,
                backgroundColor: t.accent,
                boxShadow: `0 0 10px ${t.accent}80`,
              }}
            />
          </div>

          {/* Bottom Actions Row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={togglePlay}
                className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer backdrop-blur-md"
              >
                {isPlaying ? <Pause className="w-5 h-5 fill-white" /> : <Play className="w-5 h-5 fill-white ml-0.5" />}
              </button>

              <div className="flex items-center gap-2 group/vol bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-xl p-2 px-3 transition-colors">
                <button
                  onClick={toggleMute}
                  className="text-white cursor-pointer"
                >
                  {isMuted || volume === 0 ? (
                    <VolumeX className="w-5 h-5 text-rose-400" />
                  ) : (
                    <Volume2 className="w-5 h-5" />
                  )}
                </button>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={isMuted ? 0 : volume}
                  onChange={(e) => {
                    console.log(`🎚️ [UI] Slider dragged to: ${e.target.value}`);
                    setVolume(Number(e.target.value));
                  }}
                  className="w-16 sm:w-20 opacity-100 h-1.5 rounded-full cursor-pointer transition-all duration-300 appearance-none"
                  style={{
                    background: `linear-gradient(to right, ${t.accent} 0%, ${t.accent} ${isMuted ? 0 : volume}%, rgba(255,255,255,0.25) ${isMuted ? 0 : volume}%, rgba(255,255,255,0.25) 100%)`,
                    accentColor: t.accent,
                  }}
                />
              </div>

              <span className="text-sm font-medium text-white/90 select-none hidden sm:inline ml-2">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>

            <div className="flex items-center gap-2 sm:gap-2.5">
              {/* HD Badge */}
              <div className="px-2.5 py-1 rounded-xl bg-white/10 backdrop-blur-md text-white text-[11px] font-bold select-none hidden sm:block">
                HD
              </div>

              {/* Fake Subtitles */}
              <button className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer backdrop-blur-md" title="Subtitles">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="14" x="3" y="5" rx="2" ry="2" /><path d="M7 15h4M15 15h2M7 11h2M13 11h4" /></svg>
              </button>

              {/* Settings */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSettingsModalOpen(true);
                }}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer backdrop-blur-md"
                title="Settings"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" /><circle cx="12" cy="12" r="3" /></svg>
              </button>

              {/* Fullscreen Toggle */}
              <button
                onClick={toggleFullscreen}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer backdrop-blur-md"
                title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
              >
                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}



