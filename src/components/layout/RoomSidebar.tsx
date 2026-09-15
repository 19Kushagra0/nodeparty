"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Settings,
  Mic,
  MicOff,
  Video,
  VideoOff,
  LayoutGrid,
  Camera,
  LogOut,
  MessageSquare,
  Tv,
  ScreenShare,
} from "lucide-react";
import { useRoomStore } from "@/store/useRoomStore";
import { useRoomTheme } from "@/hooks/useRoomTheme";

export function RoomSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const {
    roomId,
    isMicOn,
    toggleMic,
    isVideoOn,
    toggleVideo,
    setSettingsModalOpen,
    setScreenShareModalOpen,
    layoutMode,
    setLayoutMode,
    captureMoment,
    isRightSidebarOpen,
    toggleRightSidebar,
    setActiveSidebarTab,
    activeWorkspace,
    setActiveWorkspace,
  } = useRoomStore();

  const t = useRoomTheme();
  const isRoomPage = pathname.startsWith("/room");
  const targetRoomHref = `/room/${roomId || "123"}`;

  const toggleLayout = () => {
    setLayoutMode(layoutMode === "cinema" ? "grid" : "cinema");
  };
  const handleOpenGeneralWorkspace = () => {
    setActiveWorkspace("general");
    if (!isRoomPage) {
      router.push(targetRoomHref);
    }
  };
  const handleOpenYoutubeWorkspace = () => {
    setLayoutMode("cinema");
    setActiveWorkspace("youtube");
    if (!isRoomPage) {
      router.push(targetRoomHref);
    }
  };
  const handleLeave = () => router.push("/");

  const openChat = () => {
    setActiveSidebarTab("chat");
    if (!isRightSidebarOpen) toggleRightSidebar();
  };

  return (
    <>
      {/* ── Desktop / Tablet Left Rail (lg+) ───────────────────────── */}
      <aside className="hidden lg:flex w-14 sm:w-16 lg:w-18 h-full flex-col items-center justify-between py-1 sm:py-2 shrink-0 z-20 overflow-y-auto no-scrollbar">
        <div
          className="w-full flex flex-col items-center rounded-[28px] sm:rounded-[32px] p-2 sm:p-2.5 py-4 sm:py-5 gap-3.5 sm:gap-4"
          style={{ backgroundColor: t.surface, border: `1px solid ${t.border}` }}
        >
          <nav className="flex flex-col gap-3 sm:gap-3.5 items-center w-full justify-start">
            {/* Screen Share / General Room Workspace (Old UI) */}
            <button
              onClick={handleOpenGeneralWorkspace}
              className="relative p-2 sm:p-2.5 rounded-2xl transition-all cursor-pointer hover:opacity-90 flex items-center justify-center"
              style={{
                backgroundColor: isRoomPage && activeWorkspace === "general" ? t.surfaceHover : "transparent",
                color: isRoomPage && activeWorkspace === "general" ? t.accent : t.muted,
              }}
              title="Screen Share / General Room (Old UI)"
            >
              <ScreenShare className="w-5 h-5" strokeWidth={2.1} />
              {isRoomPage && activeWorkspace === "general" && (
                <div className="absolute -right-2 sm:-right-2.5 top-1/2 -translate-y-1/2 w-1 h-5 rounded-full" style={{ backgroundColor: t.accent }} />
              )}
            </button>

            {/* YouTube Watch Together Workspace */}
            <button
              onClick={handleOpenYoutubeWorkspace}
              className="relative p-2 sm:p-2.5 rounded-2xl transition-all cursor-pointer hover:opacity-90 flex items-center justify-center"
              style={{
                backgroundColor: isRoomPage && activeWorkspace === "youtube" ? t.surfaceHover : "transparent",
                color: isRoomPage && activeWorkspace === "youtube" ? t.accent : t.muted,
              }}
              title="YouTube Watch Together Workspace"
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
              {isRoomPage && activeWorkspace === "youtube" && (
                <div className="absolute -right-2 sm:-right-2.5 top-1/2 -translate-y-1/2 w-1 h-5 rounded-full" style={{ backgroundColor: t.accent }} />
              )}
            </button>

            <button
              onClick={toggleLayout}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all cursor-pointer"
              style={{
                backgroundColor: t.surfaceHover,
                color: layoutMode === "grid" ? t.accent : t.muted,
                border: `1px solid ${t.border}`,
              }}
              title={`Switch to ${layoutMode === "cinema" ? "Grid" : "Cinema"} Layout`}
            >
              <LayoutGrid className="w-[18px] h-[18px]" strokeWidth={2.1} />
            </button>

            <button
              onClick={() => setScreenShareModalOpen(true)}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all cursor-pointer hover:opacity-80"
              style={{
                backgroundColor: t.surfaceHover,
                color: t.muted,
                border: `1px solid ${t.border}`,
              }}
              title="Start Screen Sharing"
            >
              <Tv className="w-[18px] h-[18px]" strokeWidth={2.1} />
            </button>
          </nav>

          <div className="w-8 sm:w-9 h-[2px] rounded-full my-1 sm:my-1.5" style={{ backgroundColor: t.border }} />

          <div className="flex flex-col gap-3 sm:gap-3.5 items-center w-full">
            <button
              onClick={toggleMic}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all cursor-pointer"
              style={{
                backgroundColor: isMicOn ? t.surfaceHover : (t.isDark ? "#2a1a0a" : "#fff1f2"),
                color: isMicOn ? t.muted : (t.isDark ? t.accent : "#f43f5e"),
                border: `1px solid ${t.border}`,
              }}
              title={isMicOn ? "Mute Microphone" : "Unmute Microphone"}
            >
              {isMicOn ? <Mic className="w-[18px] h-[18px]" strokeWidth={2.25} /> : <MicOff className="w-[18px] h-[18px]" strokeWidth={2.25} />}
            </button>

            <button
              onClick={toggleVideo}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all cursor-pointer"
              style={{
                backgroundColor: isVideoOn ? t.surfaceHover : (t.isDark ? "#2a1a0a" : "#fff1f2"),
                color: isVideoOn ? t.muted : (t.isDark ? t.accent : "#f43f5e"),
                border: `1px solid ${t.border}`,
              }}
              title={isVideoOn ? "Turn off Video" : "Start Video"}
            >
              {isVideoOn ? <Video className="w-[18px] h-[18px]" strokeWidth={2.25} /> : <VideoOff className="w-[18px] h-[18px]" strokeWidth={2.25} />}
            </button>

            <button
              onClick={() => captureMoment()}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all cursor-pointer"
              style={{ backgroundColor: t.surfaceHover, color: t.muted, border: `1px solid ${t.border}` }}
              title="Capture Screenshot Moment"
            >
              <Camera className="w-[18px] h-[18px]" strokeWidth={2.25} />
            </button>

            <button
              onClick={handleLeave}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer"
              style={{ backgroundColor: t.accent }}
              title="Leave Room"
            >
              <LogOut className="w-[18px] h-[18px]" strokeWidth={2.25} style={{ color: t.accentFg }} />
            </button>
          </div>
        </div>

        <div className="flex flex-col items-center pb-1">
          <button
            onClick={() => setSettingsModalOpen(true)}
            className="p-2 rounded-2xl transition-all cursor-pointer"
            style={{ color: t.muted }}
            title="Settings"
          >
            <Settings className="w-[18px] h-[18px]" strokeWidth={2.25} />
          </button>
        </div>
      </aside>

      {/* ── Mobile Bottom Bar (< lg) ─────────────────────────────────── */}
      <nav
        className="lg:hidden fixed bottom-0 left-0 right-0 z-[190] flex items-center justify-around px-4 py-2"
        style={{
          backgroundColor: t.isDark ? "rgba(20, 17, 14, 0.94)" : "rgba(255,255,255,0.94)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderTop: `1px solid ${t.border}`,
          paddingBottom: "max(8px, env(safe-area-inset-bottom))",
        }}
      >
        {/* Mic */}
        <button onClick={toggleMic} className="flex flex-col items-center gap-0.5 cursor-pointer" title={isMicOn ? "Mute" : "Unmute"}>
          <div
            className="w-11 h-11 rounded-2xl flex items-center justify-center transition-all"
            style={{
              backgroundColor: isMicOn ? t.surfaceHover : (t.isDark ? "#2a1a0a" : "#fff1f2"),
              border: `1px solid ${t.border}`,
            }}
          >
            {isMicOn
              ? <Mic className="w-5 h-5" strokeWidth={2.1} style={{ color: t.muted }} />
              : <MicOff className="w-5 h-5" strokeWidth={2.1} style={{ color: t.isDark ? t.accent : "#f43f5e" }} />}
          </div>
          <span className="text-[9px] font-semibold" style={{ color: t.muted }}>{isMicOn ? "Mute" : "Unmute"}</span>
        </button>

        {/* Camera */}
        <button onClick={toggleVideo} className="flex flex-col items-center gap-0.5 cursor-pointer" title={isVideoOn ? "Stop Cam" : "Start Cam"}>
          <div
            className="w-11 h-11 rounded-2xl flex items-center justify-center transition-all"
            style={{
              backgroundColor: isVideoOn ? t.surfaceHover : (t.isDark ? "#2a1a0a" : "#fff1f2"),
              border: `1px solid ${t.border}`,
            }}
          >
            {isVideoOn
              ? <Video className="w-5 h-5" strokeWidth={2.1} style={{ color: t.muted }} />
              : <VideoOff className="w-5 h-5" strokeWidth={2.1} style={{ color: t.isDark ? t.accent : "#f43f5e" }} />}
          </div>
          <span className="text-[9px] font-semibold" style={{ color: t.muted }}>Camera</span>
        </button>

        {/* Chat / Panel toggle */}
        <button onClick={openChat} className="flex flex-col items-center gap-0.5 cursor-pointer" title="Open Chat">
          <div
            className="w-11 h-11 rounded-2xl flex items-center justify-center transition-all"
            style={{ backgroundColor: t.surfaceHover, border: `1px solid ${t.border}` }}
          >
            <MessageSquare className="w-5 h-5" strokeWidth={2.1} style={{ color: t.muted }} />
          </div>
          <span className="text-[9px] font-semibold" style={{ color: t.muted }}>Chat</span>
        </button>

        {/* Settings */}
        <button onClick={() => setSettingsModalOpen(true)} className="flex flex-col items-center gap-0.5 cursor-pointer" title="Settings">
          <div
            className="w-11 h-11 rounded-2xl flex items-center justify-center transition-all"
            style={{ backgroundColor: t.surfaceHover, border: `1px solid ${t.border}` }}
          >
            <Settings className="w-5 h-5" strokeWidth={2.1} style={{ color: t.muted }} />
          </div>
          <span className="text-[9px] font-semibold" style={{ color: t.muted }}>Settings</span>
        </button>

        {/* Leave */}
        <button onClick={handleLeave} className="flex flex-col items-center gap-0.5 cursor-pointer" title="Leave Room">
          <div
            className="w-11 h-11 rounded-2xl flex items-center justify-center transition-all"
            style={{ backgroundColor: t.accent }}
          >
            <LogOut className="w-5 h-5" strokeWidth={2.1} style={{ color: t.accentFg }} />
          </div>
          <span className="text-[9px] font-semibold" style={{ color: t.muted }}>Leave</span>
        </button>
      </nav>
    </>
  );
}
