"use client";

import { useState } from "react";
import {
  Plus,
  Send,
  Smile,
  Flame,
  MessageSquare,
  Volume2,
  VolumeX,
  Users,
  Crown,
  Shield,
  Mic,
  MicOff,
  UserPlus,
  LayoutGrid,
  List,
  Video,
  Zap,
  Radio,
  Check,
  ChevronRight,
} from "lucide-react";
import { useRoomStore } from "@/store/useRoomStore";
import { useRoomTheme } from "@/hooks/useRoomTheme";

// Web Audio sound FX synthesizer for clean sound feedback
function playSoundFX(type: string) {
  if (typeof window === "undefined") return;
  try {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof window.AudioContext })
        .webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const now = ctx.currentTime;

    if (type === "applause" || type === "popcorn") {
      const bufferSize = ctx.sampleRate * 0.35;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] =
          (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.12));
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      const filter = ctx.createBiquadFilter();
      filter.type = type === "popcorn" ? "bandpass" : "highpass";
      filter.frequency.setValueAtTime(type === "popcorn" ? 1200 : 800, now);
      noise.connect(filter);
      filter.connect(ctx.destination);
      noise.start(now);
    } else if (type === "horn") {
      [440, 554.37, 659.25, 880].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(freq, now + i * 0.04);
        gain.gain.setValueAtTime(0.06, now + i * 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.38);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + i * 0.04);
        osc.stop(now + 0.45);
      });
    } else if (type === "boom") {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.exponentialRampToValueAtTime(32, now + 0.35);
      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.38);
    } else {
      // Crisp pop
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(560, now);
      osc.frequency.exponentialRampToValueAtTime(180, now + 0.08);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.1);
    }
  } catch {
    // Ignore audio context restrictions
  }
}

const PRIMARY_EMOJIS = [
  "🔥", "❤️", "😂", "🍿",
  "👏", "😱", "🚀", "🥳",
  "🤯", "💯", "⚡", "🎉",
  "🍕", "💀", "🤩", "💖",
];

const SOUND_EFFECTS = [
  { id: "horn", name: "Party Horn", emoji: "🎺", sound: "horn" },
  { id: "applause", name: "Applause", emoji: "👏", sound: "applause" },
  { id: "boom", name: "Bass Drop", emoji: "💥", sound: "boom" },
  { id: "magic", name: "Sparkle", emoji: "✨", sound: "magic" },
];

const VIBE_SHORTCUTS = [
  { text: "🍿 Movie Time", emoji: "🍿", label: "Movie Time" },
  { text: "🔥 Hype Moment", emoji: "🔥", label: "Pure Hype" },
  { text: "😂 Laughing", emoji: "😂", label: "Laughing" },
  { text: "🤯 Mind Blown", emoji: "🤯", label: "Mind Blown" },
];

export function ParticipantSidebar() {
  const {
    participants,
    messages,
    sendMessage,
    triggerReaction,
    setInviteModalOpen,
    toggleMuteParticipant,
    toggleRightSidebar,
    activeSidebarTab,
    setActiveSidebarTab,
  } = useRoomStore();
  const t = useRoomTheme();
  const [inputMessage, setInputMessage] = useState("");
  const activeTab = activeSidebarTab;
  const setActiveTab = setActiveSidebarTab;
  const [usersViewMode, setUsersViewMode] = useState<"grid" | "list">("grid");
  const [userMutes, setUserMutes] = useState<Record<string, boolean>>({});
  const [userVolumes, setUserVolumes] = useState<Record<string, number>>({});
  const [selectedUserVolume, setSelectedUserVolume] = useState<string | null>(null);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputMessage.trim()) {
      sendMessage(inputMessage.trim());
      setInputMessage("");
    }
  };

  const handleTriggerEmoji = (emoji: string, soundType?: string) => {
    triggerReaction(emoji, "You");
    playSoundFX(soundType || "pop");
  };

  const handleSendVibe = (vibeText: string, emoji: string) => {
    triggerReaction(emoji, "You");
    playSoundFX("magic");
    sendMessage(`✨ ${vibeText}`);
  };

  const handleTossPopcornToUser = (targetName: string) => {
    triggerReaction("🍿", targetName);
    playSoundFX("popcorn");
  };

  const handleMentionUser = (targetName: string) => {
    setActiveTab("chat");
    setInputMessage(`@${targetName.replace(" (You)", "")} `);
  };

  const handleToggleUserMute = (userId: string) => {
    setUserMutes((prev) => ({
      ...prev,
      [userId]: !prev[userId],
    }));
    playSoundFX("pop");
  };

  const friends = participants.filter((p) => !p.isMe);

  return (
    <div
      className="w-full h-full min-h-0 backdrop-blur-md rounded-[20px] sm:rounded-[24px] p-3 sm:p-4 flex flex-col overflow-hidden"
      style={{ backgroundColor: `${t.surface}cc`, border: `1px solid ${t.border}` }}
    >
      {/* Clean Header & Navigation */}
      <div className="flex items-center justify-between mb-3 px-0.5 shrink-0 gap-2">
        <div
          className="flex-1 min-w-0 flex gap-1 p-1 rounded-full"
          style={{ backgroundColor: t.surfaceHover, border: `1px solid ${t.border}` }}
        >
          <button
            onClick={() => setActiveTab("chat")}
            className={`flex-1 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1 outline-none focus:outline-none focus-visible:outline-none select-none border`}
            style={{
              backgroundColor: activeTab === "chat" ? (t.isDark ? "#221d17" : t.surface) : "transparent",
              color: activeTab === "chat" ? (t.isDark ? t.accent : t.text) : t.muted,
              borderColor: activeTab === "chat" ? (t.isDark ? t.borderHover : t.border) : "transparent",
            }}
            title="Room Chat"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Chat</span>
          </button>
          <button
            onClick={() => setActiveTab("reactions")}
            className={`flex-1 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1 outline-none focus:outline-none focus-visible:outline-none select-none border`}
            style={{
              backgroundColor: activeTab === "reactions" ? (t.isDark ? "#221d17" : t.surface) : "transparent",
              color: activeTab === "reactions" ? (t.isDark ? t.accent : t.text) : t.muted,
              borderColor: activeTab === "reactions" ? (t.isDark ? t.borderHover : t.border) : "transparent",
            }}
            title="Reactions & Soundboard"
          >
            <Smile className="w-3.5 h-3.5" />
            <span>React</span>
          </button>
          <button
            onClick={() => setActiveTab("users")}
            className={`flex-1 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1 outline-none focus:outline-none focus-visible:outline-none select-none border`}
            style={{
              backgroundColor: activeTab === "users" ? (t.isDark ? "#221d17" : t.surface) : "transparent",
              color: activeTab === "users" ? (t.isDark ? t.accent : t.text) : t.muted,
              borderColor: activeTab === "users" ? (t.isDark ? t.borderHover : t.border) : "transparent",
            }}
            title={`View Users (${friends.length})`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Users</span>
          </button>
        </div>

        {/* Minimize / Collapse Button */}
        <button
          onClick={toggleRightSidebar}
          className="w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer outline-none focus:outline-none active:scale-95 shrink-0"
          style={{ backgroundColor: t.surfaceHover, color: t.muted, border: `1px solid ${t.border}` }}
          title="Minimize sidebar to right"
          aria-label="Minimize sidebar to right"
        >
          <ChevronRight className="w-4 h-4 stroke-[2.2]" style={{ color: t.muted }} />
        </button>
      </div>

      {/* Main Content View */}
      {activeTab === "chat" ? (
        <>
          {/* Chat Messages */}
          <div className="flex-1 min-h-0 overflow-y-auto space-y-3 pr-1 pb-2">
            {messages
              .filter((m) => !m.isSystem)
              .map((msg) => (
                <div key={msg.id} className="flex gap-2.5 items-start">
                  <div 
                    className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 overflow-hidden"
                    style={{ backgroundColor: t.surfaceHover, color: t.accent, border: `2px solid ${t.surface}` }}>
                    {msg.senderName[0]}
                  </div>
                  <div className="flex flex-col gap-0.5 items-start min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold" style={{ color: t.text }}>{msg.senderName}</span>
                      <span className="text-[10px] font-medium" style={{ color: t.muted }}>{msg.timestamp}</span>
                    </div>
                    <div
                      className="px-3 py-1.5 rounded-2xl rounded-tl-xs text-xs leading-relaxed max-w-[280px]"
                      style={{ backgroundColor: t.surfaceHover, color: t.text, border: `1px solid ${t.border}` }}
                    >
                      {msg.text}
                    </div>
                  </div>
                </div>
              ))}
          </div>

          {/* Message Input */}
          <form onSubmit={handleSendMessage} className="relative mt-1 shrink-0">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Send message to room..."
              className="w-full text-xs rounded-full pl-3.5 pr-9 py-2 focus:outline-none transition-all"
              style={{ backgroundColor: t.surfaceHover, color: t.text, border: `1px solid ${t.border}`, caretColor: t.accent }}
            />
            <button
              type="submit"
              disabled={!inputMessage.trim()}
              title="Send message"
              aria-label="Send message"
              className="absolute right-1.5 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed active:scale-95"
              style={{ backgroundColor: inputMessage.trim() ? t.accent : t.surfaceHover, color: inputMessage.trim() ? t.accentFg : t.muted }}
            >
              <Send className="w-3 h-3 ml-0.5" />
            </button>
          </form>
        </>
      ) : activeTab === "reactions" ? (
        /* Full Reactions & Soundboard View */
        <div className="flex-1 min-h-0 overflow-y-auto space-y-4 pr-1 pb-2">
          {/* Reaction Burst Board */}
          <div className="space-y-2">
            <div className="text-[11px] font-bold uppercase tracking-wider px-1 flex items-center gap-1.5" style={{ color: t.muted }}>
              <Flame className="w-3.5 h-3.5" style={{ color: t.accent }} />
              <span>Express Reactions</span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {PRIMARY_EMOJIS.map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => handleTriggerEmoji(emoji)}
                  className="aspect-square rounded-2xl active:scale-90 shadow-2xs flex items-center justify-center text-xl transition-all cursor-pointer hover:shadow-xs"
                  style={{
                    backgroundColor: t.surfaceHover,
                    border: `1px solid ${t.border}`,
                  }}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          {/* Soundboard Cues */}
          <div className="space-y-2">
            <div className="text-[11px] font-bold uppercase tracking-wider px-1 flex items-center gap-1.5" style={{ color: t.muted }}>
              <Volume2 className="w-3.5 h-3.5" style={{ color: t.muted }} />
              <span>Sound Cues</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {SOUND_EFFECTS.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => handleTriggerEmoji(s.emoji, s.sound)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl active:scale-95 shadow-2xs transition-all text-left cursor-pointer"
                  style={{
                    backgroundColor: t.surfaceHover,
                    border: `1px solid ${t.border}`,
                  }}
                >
                  <span className="text-base shrink-0">{s.emoji}</span>
                  <span className="text-xs font-semibold truncate" style={{ color: t.text }}>{s.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Vibe Broadcasts */}
          <div className="space-y-2">
            <div className="text-[11px] font-bold uppercase tracking-wider px-1 flex items-center gap-1.5" style={{ color: t.muted }}>
              <Zap className="w-3.5 h-3.5" style={{ color: t.accent }} />
              <span>Room Vibe</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {VIBE_SHORTCUTS.map((v) => (
                <button
                  key={v.text}
                  type="button"
                  onClick={() => handleSendVibe(v.text, v.emoji)}
                  className="px-3 py-2 rounded-xl active:scale-95 shadow-2xs text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer truncate"
                  style={{
                    backgroundColor: t.surfaceHover,
                    border: `1px solid ${t.border}`,
                    color: t.text,
                  }}
                >
                  <span className="shrink-0">{v.emoji}</span>
                  <span className="truncate">{v.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Users / Friends View (Full Box Video with Title, Mic, & Name) */
        <div className="flex-1 min-h-0 overflow-y-auto space-y-3 pr-1 pb-2">
          {/* Header Subtitle / Count & View Switcher */}
          <div className="flex items-center justify-between px-1">
            <span className="text-[11px] font-bold uppercase tracking-wider" style={{ color: t.muted }}>
              Friends Online ({friends.length})
            </span>
            <div className="flex items-center gap-1.5">
              <div
                className="flex p-0.5 rounded-lg border"
                style={{ backgroundColor: t.surfaceHover, borderColor: t.border }}
              >
                <button
                  onClick={() => setUsersViewMode("grid")}
                  className="p-1 rounded-md text-xs transition-all cursor-pointer outline-none select-none border"
                  style={{
                    backgroundColor: usersViewMode === "grid" ? (t.isDark ? "#221d17" : "#ffffff") : "transparent",
                    color: usersViewMode === "grid" ? (t.isDark ? t.accent : "#18181b") : t.muted,
                    borderColor: usersViewMode === "grid" ? t.border : "transparent",
                  }}
                  title="Video Grid View"
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setUsersViewMode("list")}
                  className="p-1 rounded-md text-xs transition-all cursor-pointer outline-none select-none border"
                  style={{
                    backgroundColor: usersViewMode === "list" ? (t.isDark ? "#221d17" : "#ffffff") : "transparent",
                    color: usersViewMode === "list" ? (t.isDark ? t.accent : "#18181b") : t.muted,
                    borderColor: usersViewMode === "list" ? t.border : "transparent",
                  }}
                  title="List View"
                >
                  <List className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* User Video Boxes Grid View (Video shown in whole box with title, mic & name) */}
          {usersViewMode === "grid" ? (
            <div className="grid grid-cols-1 gap-3">
              {friends.map((p) => (
                <div
                  key={p.id}
                  className={`relative aspect-[16/10] sm:aspect-video rounded-[22px] overflow-hidden bg-zinc-950 border transition-all duration-300 group shadow-2xs hover:shadow-xs select-none ${
                    p.isSpeaking
                      ? "border-emerald-400 ring-2 ring-emerald-400/30 shadow-emerald-500/10"
                      : "border-zinc-200/80 hover:border-zinc-300"
                  }`}
                >
                  {/* Full Box Live Video Feed / Portrait */}
                  {p.avatarUrl && p.isCameraOn !== false ? (
                    <img
                      src={p.avatarUrl}
                      alt={p.name}
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500 ease-out"
                    />
                  ) : (
                    <div
                      className={`w-full h-full bg-gradient-to-tr ${
                        p.avatarBg || "from-pink-500 to-rose-600"
                      } flex flex-col items-center justify-center text-white`}
                    >
                      <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center font-bold text-base">
                        {p.name[0]}
                      </div>
                      <span className="text-[11px] font-medium text-white/80 mt-1.5">
                        Camera Paused
                      </span>
                    </div>
                  )}

                  {/* Soft Vignette & Subtle Gradient for Crystal-Clear Text & Badges */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/45 pointer-events-none" />

                  {/* 1. Friend Title (Top-Left) */}
                  {(p.role === "host" || p.role === "moderator") && (
                    <div className="absolute top-2.5 left-2.5 z-10">
                      {p.role === "host" ? (
                        <span
                          className="px-2.5 py-0.5 rounded-full text-[10px] font-bold backdrop-blur-md flex items-center gap-1 shadow-2xs border"
                          style={{
                            backgroundColor: t.isDark ? `${t.accent}e6` : "rgba(244, 63, 94, 0.9)",
                            color: t.accentFg,
                            borderColor: t.isDark ? `${t.accent}80` : "rgba(251, 113, 133, 0.3)",
                          }}
                        >
                          <Crown className="w-3 h-3" /> Host
                        </span>
                      ) : (
                        <span
                          className="px-2.5 py-0.5 rounded-full text-[10px] font-bold backdrop-blur-md flex items-center gap-1 shadow-2xs border"
                          style={{
                            backgroundColor: t.isDark ? "#d97706e6" : "rgba(245, 158, 11, 0.9)",
                            color: "#ffffff",
                            borderColor: "rgba(251, 191, 36, 0.3)",
                          }}
                        >
                          <Shield className="w-3 h-3" /> Mod
                        </span>
                      )}
                    </div>
                  )}

                  {/* 2. Right Mic (Top-Right) */}
                  <div className="absolute top-2.5 right-2.5 z-10">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleMuteParticipant(p.id);
                        playSoundFX("pop");
                      }}
                      className={`p-1.5 rounded-lg backdrop-blur-md shadow-2xs border flex items-center justify-center transition-all active:scale-90 cursor-pointer ${
                        p.isMuted
                          ? "bg-black/60 text-rose-400 border-white/10 hover:bg-black/80 hover:text-rose-300"
                          : "bg-emerald-500/90 text-white border-emerald-400/40 hover:bg-emerald-500 hover:scale-105"
                      }`}
                      title={p.isMuted ? `Unmute ${p.name}` : `Mute ${p.name}`}
                    >
                      {p.isMuted ? (
                        <MicOff className="w-3.5 h-3.5" />
                      ) : (
                        <Mic className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>

                  {/* 3. Bottom Name */}
                  <div className="absolute bottom-2.5 left-3 right-3 z-10 flex items-center justify-between text-white">
                    <span className="text-xs sm:text-sm font-bold truncate drop-shadow-md tracking-tight">
                      {p.name.replace(" (You)", "")}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* User Boxes List View */
            <div className="grid grid-cols-1 gap-2.5">
              {friends.map((p) => (
                <div
                  key={p.id}
                  className="rounded-2xl p-3 shadow-2xs hover:shadow-xs transition-all flex items-center justify-between gap-3 group border"
                  style={{
                    backgroundColor: t.surfaceHover,
                    borderColor: t.border,
                  }}
                >
                  {/* Left: Avatar & Name */}
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="relative shrink-0">
                      {p.avatarUrl ? (
                        <img
                          src={p.avatarUrl}
                          alt={p.name}
                          className="w-10 h-10 rounded-full object-cover border-2 shadow-2xs"
                          style={{ borderColor: t.surface }}
                        />
                      ) : (
                        <div
                          className={`w-10 h-10 rounded-full bg-gradient-to-tr ${
                            p.avatarBg || "from-pink-500 to-rose-600"
                          } text-white font-bold text-xs flex items-center justify-center border-2 shadow-2xs`}
                          style={{ borderColor: t.surface }}
                        >
                          {p.name[0]}
                        </div>
                      )}
                      {p.isSpeaking && (
                        <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border-2" style={{ borderColor: t.surface }} />
                        </span>
                      )}
                    </div>

                    <span className="text-xs font-bold truncate" style={{ color: t.text }}>
                      {p.name.replace(" (You)", "")}
                    </span>
                  </div>

                  {/* Right: Role & Mic Status */}
                  <div className="flex items-center gap-2 shrink-0">
                    {/* Friend Title */}
                    {p.role === "host" ? (
                      <span
                        className="px-2.5 py-0.5 rounded-full text-[10px] font-bold border flex items-center gap-1"
                        style={{
                          backgroundColor: t.isDark ? `${t.accent}20` : "#fff1f2",
                          color: t.accent,
                          borderColor: t.isDark ? `${t.accent}40` : "#fecdd3",
                        }}
                      >
                        <Crown className="w-3 h-3" /> Host
                      </span>
                    ) : p.role === "moderator" ? (
                      <span
                        className="px-2.5 py-0.5 rounded-full text-[10px] font-bold border flex items-center gap-1"
                        style={{
                          backgroundColor: t.isDark ? "#3b2a14" : "#fef3c7",
                          color: t.isDark ? "#f59e0b" : "#d97706",
                          borderColor: t.isDark ? "#523c1c" : "#fde68a",
                        }}
                      >
                        <Shield className="w-3 h-3" /> Mod
                      </span>
                    ) : null}

                    {/* Mic Status Icon */}
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleMuteParticipant(p.id);
                          playSoundFX("pop");
                        }}
                        className="p-1.5 rounded-lg border transition-all active:scale-90 cursor-pointer"
                        style={{
                          backgroundColor: p.isMuted
                            ? (t.isDark ? "#2a1515" : "#f4f4f5")
                            : (t.isDark ? "#062817" : "#ecfdf5"),
                          color: p.isMuted
                            ? (t.isDark ? "#f87171" : "#f43f5e")
                            : (t.isDark ? "#34d399" : "#059669"),
                          borderColor: p.isMuted
                            ? (t.isDark ? "#451a1a" : "#fecdd3")
                            : (t.isDark ? "#064e28" : "#a7f3d0"),
                        }}
                        title={p.isMuted ? `Unmute ${p.name}` : `Mute ${p.name}`}
                      >
                        {p.isMuted ? (
                          <MicOff className="w-3.5 h-3.5" />
                        ) : (
                          <Mic className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Invite More Friends Action Box */}
          <div className="pt-2">
            <button
              onClick={() => setInviteModalOpen(true)}
              className="w-full py-2.5 px-3 rounded-2xl border-2 border-dashed text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-2xs hover:shadow-xs group"
              style={{
                borderColor: t.border,
                color: t.muted,
                backgroundColor: t.surfaceHover,
              }}
            >
              <UserPlus className="w-4 h-4 transition-transform group-hover:scale-110" style={{ color: t.accent }} />
              <span>Invite More Friends</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
