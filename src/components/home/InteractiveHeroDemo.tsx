"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Play, Pause, Volume2, VolumeX, Zap, Users, MessageSquare, Radio, ArrowUpRight } from "@/icons";

interface DemoReaction {
  id: string;
  emoji: string;
  sender: string;
  avatarBg: string;
  leftPercent: number;
}

let reactionCounter = 0;

export function InteractiveHeroDemo() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(38);
  const [reactions, setReactions] = useState<DemoReaction[]>([
    { id: "demo-1", emoji: "🔥", sender: "Sarah", avatarBg: "from-rose-500 to-pink-600", leftPercent: 25 },
    { id: "demo-2", emoji: "🍿", sender: "Kenji", avatarBg: "from-cyan-500 to-blue-600", leftPercent: 65 },
  ]);

  const [activeTab, setActiveTab] = useState<"chat" | "crew">("chat");

  // Simulated progress ticker
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 0.5));
    }, 400);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const triggerEmoji = useCallback((emoji: string) => {
    reactionCounter += 1;
    const offset = 20 + ((reactionCounter * 17) % 60);
    const newReaction: DemoReaction = {
      id: `react-${reactionCounter}`,
      emoji,
      sender: "You",
      avatarBg: "from-rose-500 to-pink-600",
      leftPercent: offset,
    };
    setReactions((prev) => [...prev.slice(-6), newReaction]);
    setTimeout(() => {
      setReactions((prev) => prev.filter((r) => r.id !== newReaction.id));
    }, 2800);
  }, []);

  return (
    <div className="relative w-full max-w-5xl mx-auto rounded-3xl p-1 bg-gradient-to-b from-white/[0.12] via-white/[0.04] to-transparent shadow-2xl shadow-rose-950/20">
      {/* Background ambient glow behind preview */}
      <div className="absolute -inset-4 bg-gradient-to-r from-rose-600/20 via-purple-600/15 to-cyan-600/20 rounded-3xl blur-2xl opacity-60 pointer-events-none" />

      <div className="relative bg-[#0d0f17] border border-white/[0.08] rounded-[22px] overflow-hidden">
        {/* Top Mini Window Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#08090e] border-b border-white/[0.06] text-xs">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
            </div>
            <span className="text-zinc-400 font-mono text-[11px] flex items-center gap-1.5 pl-2 border-l border-white/[0.08]">
              <Radio className="w-3 h-3 text-rose-400 animate-pulse" />
              <span>LIVE LOUNGE • #CYBER-4096</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-cyan-950/50 border border-cyan-500/30 text-[11px] font-mono text-cyan-300">
              <Zap className="w-3 h-3 text-cyan-400" />
              <span>12ms Sync Drift</span>
            </div>

            <Link
              href="/room/lounge-demo"
              className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-medium text-xs transition-colors"
            >
              <span>Enter Room</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Interactive Cinema Body Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[380px] sm:min-h-[440px]">
          {/* Left Hero Video Simulation Canvas (8 cols) */}
          <div className="lg:col-span-8 relative bg-black flex flex-col justify-between overflow-hidden group">
            {/* Simulated Cinema Video Feed Poster with High Dynamic Overlay */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200&auto=format&fit=crop')`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/60" />
            </div>

            {/* Floating Emoji Reactions Stream */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
              {reactions.map((r) => (
                <div
                  key={r.id}
                  style={{ left: `${r.leftPercent}%`, bottom: "20%" }}
                  className="absolute animate-float-reaction flex flex-col items-center gap-1 z-30"
                >
                  <span className="text-3xl sm:text-4xl drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] filter">
                    {r.emoji}
                  </span>
                  <span
                    className={`text-[9px] font-bold text-white px-1.5 py-0.5 rounded-full bg-gradient-to-r ${r.avatarBg} shadow-md border border-white/20`}
                  >
                    {r.sender}
                  </span>
                </div>
              ))}
            </div>

            {/* Video Top Metadata Bar */}
            <div className="relative z-10 p-4 flex items-start justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-rose-600/90 text-white text-[10px] font-black tracking-wider uppercase">
                    NOW PLAYING
                  </span>
                  <span className="px-2 py-0.5 rounded bg-black/60 backdrop-blur-md text-zinc-300 text-[10px] font-mono border border-white/10">
                    4K HDR • 60 FPS
                  </span>
                </div>
                <h3 className="text-sm sm:text-base font-bold text-white drop-shadow-md">
                  Cyberpunk 2077: Phantom Liberty — Official Cinematic
                </h3>
              </div>

              {/* Sound Wave Indicator */}
              {isPlaying && (
                <div className="flex items-end gap-1 h-5 px-2 py-1 rounded-md bg-black/60 backdrop-blur-md border border-white/10">
                  <span className="w-1 bg-rose-400 rounded-full animate-equalizer-1" />
                  <span className="w-1 bg-rose-500 rounded-full animate-equalizer-2" />
                  <span className="w-1 bg-pink-400 rounded-full animate-equalizer-3" />
                </div>
              )}
            </div>

            {/* Center Playback Trigger Overlay (shows on hover) */}
            <div className="relative z-10 self-center my-auto flex items-center justify-center">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-16 h-16 rounded-2xl bg-rose-600/90 hover:bg-rose-500 text-white flex items-center justify-center shadow-xl shadow-rose-950/60 backdrop-blur-md border border-white/20 transition-transform active:scale-95 cursor-pointer"
                title={isPlaying ? "Pause Video" : "Play Video"}
              >
                {isPlaying ? (
                  <Pause className="w-7 h-7 fill-white" />
                ) : (
                  <Play className="w-7 h-7 fill-white ml-1" />
                )}
              </button>
            </div>

            {/* Interactive Control & Reaction Bar */}
            <div className="relative z-10 p-4 space-y-3 bg-gradient-to-t from-black/95 via-black/80 to-transparent">
              {/* Progress Scrubber */}
              <div className="space-y-1">
                <div
                  className="h-1.5 w-full bg-white/20 rounded-full overflow-hidden cursor-pointer relative"
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const clickX = e.clientX - rect.left;
                    setProgress((clickX / rect.width) * 100);
                  }}
                >
                  <div
                    className="h-full bg-gradient-to-r from-rose-500 to-pink-500 rounded-full transition-all"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] font-mono text-zinc-400">
                  <span>01:24</span>
                  <span>03:42</span>
                </div>
              </div>

              {/* Bottom Row Controls + Instant Emojis */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>

                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                  >
                    {isMuted ? <VolumeX className="w-4 h-4 text-zinc-400" /> : <Volume2 className="w-4 h-4 text-white" />}
                  </button>

                  <span className="text-[11px] text-zinc-400 hidden sm:inline">
                    Host: <strong className="text-zinc-200">Alex</strong> (broadcasting)
                  </span>
                </div>

                {/* Instant Emoji Reaction Burst Buttons */}
                <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-2 py-1 rounded-xl border border-white/10">
                  <span className="text-[10px] text-zinc-400 font-medium px-1 hidden sm:inline">
                    React:
                  </span>
                  {["🔥", "🍿", "😂", "💜", "👏"].map((emoji) => (
                    <button
                      key={emoji}
                      onClick={() => triggerEmoji(emoji)}
                      className="text-base hover:scale-125 active:scale-95 transition-transform p-1 cursor-pointer"
                      title={`Send ${emoji}`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Social & Chat Simulator (4 cols) */}
          <div className="lg:col-span-4 bg-[#0a0c12] border-t lg:border-t-0 lg:border-l border-white/[0.08] flex flex-col justify-between p-4">
            {/* Sidebar Tabs */}
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab("chat")}
                  className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                    activeTab === "chat"
                      ? "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                      : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Live Chat</span>
                </button>
                <button
                  onClick={() => setActiveTab("crew")}
                  className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                    activeTab === "crew"
                      ? "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                      : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  <Users className="w-3.5 h-3.5" />
                  <span>Crew (5)</span>
                </button>
              </div>

              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-2 py-0.5 rounded-full flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Synced
              </span>
            </div>

            {/* Chat Content */}
            {activeTab === "chat" ? (
              <div className="flex-1 my-3 space-y-3 overflow-y-auto max-h-[220px] text-xs">
                <div className="p-2 rounded-lg bg-zinc-900/60 border border-white/[0.05] text-[11px] text-zinc-400">
                  <span className="text-rose-400 font-semibold">✨ Room Engine:</span> Video stream lock established. All 5 participants synced.
                </div>

                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 flex items-center justify-center text-[10px] font-bold text-white shrink-0">
                    E
                  </div>
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1.5">
                      <span className="font-semibold text-zinc-200 text-xs">Elena</span>
                      <span className="text-[9px] bg-amber-500/20 text-amber-300 border border-amber-500/30 px-1 rounded font-bold">
                        MOD
                      </span>
                    </div>
                    <p className="text-zinc-300 text-xs leading-snug">
                      Popcorn is popped! This 4K trailer looks unbelievable 🍿
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-violet-500 to-indigo-600 flex items-center justify-center text-[10px] font-bold text-white shrink-0">
                    M
                  </div>
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1.5">
                      <span className="font-semibold text-zinc-200 text-xs">Marcus</span>
                    </div>
                    <p className="text-zinc-300 text-xs leading-snug">
                      Sync is perfect here! The sound design on this is unreal 🔥
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex-1 my-3 space-y-2 text-xs">
                {[
                  { name: "Alex (You)", role: "Host 👑", color: "from-rose-500 to-pink-600" },
                  { name: "Elena Rostova", role: "Mod ⭐", color: "from-amber-500 to-orange-600" },
                  { name: "Marcus Vance", role: "Viewer", color: "from-violet-500 to-indigo-600" },
                  { name: "Chloe Zhao", role: "Viewer", color: "from-emerald-500 to-teal-600" },
                ].map((u) => (
                  <div
                    key={u.name}
                    className="flex items-center justify-between p-2 rounded-lg bg-zinc-900/60 border border-white/[0.04]"
                  >
                    <div className="flex items-center gap-2">
                      <div className={`w-6 h-6 rounded-full bg-gradient-to-r ${u.color} flex items-center justify-center text-[10px] font-bold text-white`}>
                        {u.name[0]}
                      </div>
                      <span className="font-medium text-zinc-200 text-xs">{u.name}</span>
                    </div>
                    <span className="text-[10px] text-zinc-400 font-mono">{u.role}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Quick Demo Message Input */}
            <div className="pt-2 border-t border-white/[0.08]">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Type a reaction message..."
                  className="flex-1 bg-zinc-900/90 border border-white/[0.1] rounded-xl px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-rose-500"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      triggerEmoji("🔥");
                      (e.target as HTMLInputElement).value = "";
                    }
                  }}
                />
                <button
                  onClick={() => triggerEmoji("🔥")}
                  className="px-3 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold cursor-pointer"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
