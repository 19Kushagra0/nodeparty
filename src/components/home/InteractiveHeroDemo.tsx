"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Users,
  MessageSquare,
  ArrowUpRight,
  ChevronRight,
  MoreHorizontal,
  Smile,
  Settings,
  Maximize2,
} from "@/icons";

interface DemoReaction {
  id: string;
  emoji: string;
  sender: string;
  leftPercent: number;
}

interface DemoChatMessage {
  id: string;
  name: string;
  time: string;
  text: string;
  avatar?: string;
  initial?: string;
}

const INITIAL_MESSAGES: DemoChatMessage[] = [
  {
    id: "1",
    name: "Elena",
    time: "2m ago",
    text: "Popcorn is popped! This 4K trailer looks unbelievable 🍿",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=120&auto=format&fit=crop",
  },
  {
    id: "2",
    name: "Marcus",
    time: "1m ago",
    text: "Sync is perfect here! The sound design on this is unreal 🔥",
    initial: "M",
  },
  {
    id: "3",
    name: "Aarav",
    time: "1m ago",
    text: "Can’t wait for this game 🎮",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=120&auto=format&fit=crop",
  },
  {
    id: "4",
    name: "Priya",
    time: "just now",
    text: "This looks insane ❤️",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=120&auto=format&fit=crop",
  },
  {
    id: "5",
    name: "K",
    time: "just now",
    text: "Next weekend we play together?",
    initial: "K",
  },
];

const CREW_MEMBERS = [
  {
    name: "Elena",
    role: "MOD",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=120&auto=format&fit=crop",
  },
  { name: "Marcus", role: "VIEWER", initial: "M" },
  {
    name: "Aarav",
    role: "VIEWER",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=120&auto=format&fit=crop",
  },
  {
    name: "Priya",
    role: "VIEWER",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=120&auto=format&fit=crop",
  },
  { name: "K", role: "VIEWER", initial: "K" },
];

export function InteractiveHeroDemo() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [activeTab, setActiveTab] = useState<"chat" | "crew">("chat");
  const [reactions, setReactions] = useState<DemoReaction[]>([]);
  const [currentTimeSec, setCurrentTimeSec] = useState(48);
  const [messages, setMessages] = useState<DemoChatMessage[]>(INITIAL_MESSAGES);
  const [chatInput, setChatInput] = useState("");

  const triggerEmoji = useCallback((emoji: string, sender = "You") => {
    const newReaction: DemoReaction = {
      id: Math.random().toString(36).substring(2, 9),
      emoji,
      sender,
      leftPercent: 20 + Math.random() * 60,
    };
    setReactions((prev) => [...prev, newReaction]);

    setTimeout(() => {
      setReactions((prev) => prev.filter((r) => r.id !== newReaction.id));
    }, 2500);
  }, []);

  // Periodic simulated reactions
  useEffect(() => {
    const emojis = ["🔥", "🍿", "❤️", "🤯"];
    const names = ["Elena", "Marcus", "Aarav", "Priya"];
    const interval = setInterval(() => {
      const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
      const randomName = names[Math.floor(Math.random() * names.length)];
      triggerEmoji(randomEmoji, randomName);
    }, 4500);

    return () => clearInterval(interval);
  }, [triggerEmoji]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const newMsg: DemoChatMessage = {
      id: Math.random().toString(36).substring(2, 9),
      name: "You",
      time: "just now",
      text: chatInput,
      initial: "Y",
    };

    setMessages((prev) => [...prev, newMsg]);
    triggerEmoji("🔥", "You");
    setChatInput("");
  };

  return (
    <div className="relative w-full rounded-3xl overflow-hidden bg-[#0c0a07] border border-[#27211a] p-4 sm:p-7 md:p-10 lg:p-12 font-[family-name:var(--font-inter),Inter,system-ui,sans-serif]">
      {/* Background Ambient Warm Golden Glow (matching reference image) */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Core warm ambient aura radiating behind demo player */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_65%_at_50%_50%,rgba(200,150,46,0.2)_0%,rgba(140,95,25,0.06)_50%,transparent_75%)]" />

        {/* Top & bottom subtle horizon amber glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-28 bg-[radial-gradient(ellipse_60%_100%_at_50%_0%,rgba(200,150,46,0.14)_0%,transparent_70%)]" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-28 bg-[radial-gradient(ellipse_60%_100%_at_50%_100%,rgba(200,150,46,0.12)_0%,transparent_70%)]" />
      </div>

      {/* The Demo Window (centered with exact proportion to background) */}
      <div className="relative w-full max-w-5xl mx-auto rounded-[22px] overflow-hidden bg-[#120f0c] border border-[#c8962e]/45 shadow-[0_25px_70px_-15px_rgba(0,0,0,0.95),0_0_50px_rgba(200,150,46,0.15)]">
        {/* Top Master Window Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#0c0a07] border-b border-[#27211a] text-xs">
          <div className="flex items-center gap-3">
            {/* macOS Window Controls */}
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
            </div>

            {/* Brand Title */}
            <span className="font-bold text-sm tracking-tight text-white ml-1">
              Node<span className="text-[#f5a524]">Party</span>
            </span>

            {/* Breadcrumb Path */}
            <div className="hidden sm:flex items-center gap-2 pl-3 border-l border-white/10 text-xs">
              <span className="w-2.5 h-2.5 rounded-full border border-zinc-500/80 inline-block" />
              <span className="text-zinc-500">/</span>
              <span className="text-zinc-100 font-medium">Cyber Night</span>
              <ChevronRight className="w-3 h-3 text-zinc-500" />
              <span className="text-zinc-500">Room #4096</span>
            </div>

            {/* In Room Count */}
            <div className="hidden md:flex items-center gap-1.5 pl-3 border-l border-white/10 text-xs text-zinc-400">
              <Users className="w-3.5 h-3.5 text-zinc-400" />
              <span>5 in room</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <Link
              href="/room/lounge-demo"
              className="hidden min-[400px]:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#f5a524] hover:bg-[#dba940] active:scale-[0.98] text-[#0c0a07] font-bold text-xs transition-all cursor-pointer shadow-sm"
            >
              <span>Launch Room</span>
              <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </Link>

            <button
              type="button"
              aria-label="More options"
              className="text-zinc-400 hover:text-white p-1 rounded transition-colors cursor-pointer"
            >
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Interactive Cinema Body Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[380px] sm:min-h-[440px]">
          {/* Left Hero Video Simulation Canvas (8 cols) */}
          <div className="lg:col-span-8 relative bg-black flex flex-col justify-between overflow-hidden group">
            {/* Simulated Cinema Video Feed Poster */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200&auto=format&fit=crop')`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/60" />
            </div>

            {/* Floating Emoji Reactions Stream */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {reactions.map((r) => (
                <div
                  key={r.id}
                  className="absolute bottom-16 animate-float-reaction flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/10 text-xs"
                  style={{ left: `${r.leftPercent}%` }}
                >
                  <span className="text-base">{r.emoji}</span>
                  <span className="text-xs text-zinc-300 font-medium">{r.sender}</span>
                </div>
              ))}
            </div>

            {/* Top Video Overlay Bar */}
            <div className="relative z-10 p-4 flex items-center justify-between bg-gradient-to-b from-black/80 to-transparent">
              <div className="flex flex-col">
                <span className="text-white font-semibold text-xs sm:text-sm drop-shadow-sm">
                  Cyber Showdown – Official Trailer
                </span>
                <span className="text-zinc-400 text-[11px] font-normal">
                  4K HDR • 60 FPS
                </span>
              </div>
            </div>

            {/* Middle Big Play Indicator (only when paused) */}
            <div className="relative z-10 my-auto flex items-center justify-center pointer-events-none">
              <div
                className={`w-14 h-14 rounded-full bg-white text-black flex items-center justify-center transition-all duration-300 ${
                  isPlaying ? "opacity-0 scale-90" : "opacity-100 scale-100"
                }`}
              >
                <Play className="w-6 h-6 fill-black ml-1" />
              </div>
            </div>

            {/* Bottom Scrubber & Interactive Controls Bar */}
            <div className="relative z-10 p-4 bg-gradient-to-t from-black via-black/90 to-transparent space-y-2.5">
              {/* Scrubber Line */}
              <div
                className="w-full h-1 bg-white/20 rounded-full overflow-hidden cursor-pointer"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const clickPercent = (e.clientX - rect.left) / rect.width;
                  setCurrentTimeSec(Math.floor(clickPercent * 120));
                }}
              >
                <div
                  className="h-full bg-[#f5a524] transition-all duration-300 rounded-full"
                  style={{ width: `${(currentTimeSec / 120) * 100}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="text-white hover:text-zinc-300 transition-colors cursor-pointer"
                    aria-label={isPlaying ? "Pause" : "Play"}
                  >
                    {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white" />}
                  </button>

                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="text-white hover:text-zinc-300 transition-colors cursor-pointer"
                    aria-label={isMuted ? "Unmute" : "Mute"}
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>

                  <span className="text-zinc-300 text-xs font-medium">
                    00:{currentTimeSec < 10 ? `0${currentTimeSec}` : currentTimeSec} / 02:00
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    className="px-1.5 py-0.5 rounded text-[10px] font-bold border border-zinc-500 text-zinc-300 hover:text-white hover:border-zinc-300 transition-colors cursor-pointer"
                  >
                    CC
                  </button>

                  <button
                    type="button"
                    className="text-zinc-400 hover:text-white transition-colors cursor-pointer"
                    aria-label="Settings"
                  >
                    <Settings className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    className="text-zinc-400 hover:text-white transition-colors cursor-pointer"
                    aria-label="Fullscreen"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Social & Crew Column (4 cols) */}
          <div className="lg:col-span-4 bg-[#100e0b] border-t lg:border-t-0 lg:border-l border-[#27211a] p-4 flex flex-col justify-between text-left">
            {/* Header Tabs */}
            <div className="flex items-center gap-2 pb-3 border-b border-white/[0.08]">
              <button
                onClick={() => setActiveTab("chat")}
                className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  activeTab === "chat"
                    ? "bg-[#1f1a14] border border-[#3a3022]/60 text-white shadow-sm"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#f5a524]" />
                <span>Live Chat</span>
              </button>
              <button
                onClick={() => setActiveTab("crew")}
                className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  activeTab === "crew"
                    ? "bg-[#1f1a14] border border-[#3a3022]/60 text-white shadow-sm"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                <Users className="w-3.5 h-3.5 text-zinc-400" />
                <span>Crew (5)</span>
              </button>
            </div>

            {/* Content Area */}
            {activeTab === "chat" ? (
              <div className="flex-1 my-3 space-y-3 overflow-y-auto max-h-[340px] lg:max-h-[380px] text-xs pr-1">
                {messages.map((msg) => (
                  <div key={msg.id} className="flex items-start gap-2.5">
                    {msg.avatar ? (
                      <img
                        src={msg.avatar}
                        alt={msg.name}
                        className="w-6 h-6 rounded-full object-cover shrink-0 mt-0.5 border border-white/10"
                      />
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-zinc-800 border border-white/10 flex items-center justify-center text-xs font-medium text-zinc-200 shrink-0 mt-0.5">
                        {msg.initial || msg.name[0]}
                      </div>
                    )}
                    <div className="space-y-0.5 flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-zinc-200 text-xs truncate">{msg.name}</span>
                        <span className="text-[11px] text-zinc-500 shrink-0">{msg.time}</span>
                      </div>
                      <p className="text-zinc-300 text-xs leading-snug break-words">{msg.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex-1 my-3 space-y-2 text-xs overflow-y-auto max-h-[250px]">
                {CREW_MEMBERS.map((u) => (
                  <div
                    key={u.name}
                    className="flex items-center justify-between p-2 rounded-lg bg-black/40 border border-white/[0.04]"
                  >
                    <div className="flex items-center gap-2">
                      {u.avatar ? (
                        <img
                          src={u.avatar}
                          alt={u.name}
                          className="w-6 h-6 rounded-full object-cover shrink-0 border border-white/10"
                        />
                      ) : (
                        <div className="w-6 h-6 rounded-full bg-zinc-800 border border-white/10 flex items-center justify-center text-xs font-medium text-zinc-200 shrink-0">
                          {u.initial || u.name[0]}
                        </div>
                      )}
                      <span className="font-medium text-zinc-200 text-xs">{u.name}</span>
                    </div>
                    <span className="text-xs text-zinc-500 font-medium">{u.role}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Bottom Input & Quick Reactions Bar */}
            <div className="pt-3 border-t border-white/[0.08]">
              <div className="flex items-center gap-2">
                <form onSubmit={handleSendMessage} className="flex-1 min-w-0">
                  <div className="flex items-center bg-white/[0.04] border border-white/10 rounded-full px-3 py-1.5 focus-within:border-white/30 transition-colors">
                    <input
                      type="text"
                      placeholder="Type a message..."
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      className="flex-1 bg-transparent text-xs text-white placeholder-zinc-500 focus:outline-none min-w-0"
                    />
                    <button
                      type="button"
                      onClick={() => triggerEmoji("😊", "You")}
                      className="text-zinc-400 hover:text-white transition-colors cursor-pointer ml-1 shrink-0"
                    >
                      <Smile className="w-4 h-4" />
                    </button>
                  </div>
                </form>

                {/* Quick Emoji Reactions */}
                <div className="flex items-center gap-1.5 shrink-0">
                  {["🔥", "🍿", "❤️", "🤯"].map((emoji) => (
                    <button
                      key={emoji}
                      type="button"
                      onClick={() => triggerEmoji(emoji, "You")}
                      className="hover:scale-125 active:scale-95 transition-transform text-sm sm:text-base cursor-pointer px-0.5"
                      title={`React with ${emoji}`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
