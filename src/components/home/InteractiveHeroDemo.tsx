"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Play, Pause, Volume2, VolumeX, Zap, Users, MessageSquare, Radio, ArrowUpRight } from "@/icons";

interface DemoReaction {
  id: string;
  emoji: string;
  sender: string;
  color: string;
  leftPercent: number;
}

export function InteractiveHeroDemo() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [activeTab, setActiveTab] = useState<"chat" | "crew">("chat");
  const [reactions, setReactions] = useState<DemoReaction[]>([]);
  const [currentTimeSec, setCurrentTimeSec] = useState(48);

  const triggerEmoji = useCallback((emoji: string, sender = "You") => {
    const newReaction: DemoReaction = {
      id: Math.random().toString(36).substring(2, 9),
      emoji,
      sender,
      color: "from-rose-500 to-pink-600",
      leftPercent: 20 + Math.random() * 60,
    };
    setReactions((prev) => [...prev, newReaction]);

    setTimeout(() => {
      setReactions((prev) => prev.filter((r) => r.id !== newReaction.id));
    }, 2500);
  }, []);

  // Periodic simulated reactions
  useEffect(() => {
    const emojis = ["🔥", "🍿", "❤️", "😮", "⚡"];
    const names = ["Elena", "Marcus", "Chloe", "Kai"];
    const interval = setInterval(() => {
      const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
      const randomName = names[Math.floor(Math.random() * names.length)];
      triggerEmoji(randomEmoji, randomName);
    }, 2800);

    return () => clearInterval(interval);
  }, [triggerEmoji]);

  return (
    <div className="relative w-full max-w-5xl mx-auto">
      {/* Ambient Diffuse Stage Backlight */}
      <div className="cinema-ambient-stage bg-[#c8962e]/15" />

      <div className="relative w-full rounded-2xl overflow-hidden bg-[#161310] border border-[#27211a]">
        {/* Top Master Window Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#0c0a07] border-b border-[#27211a] text-xs">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
              <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
              <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
            </div>
            <span className="text-zinc-400 font-mono text-xs flex items-center gap-1.5 pl-2 border-l border-white/[0.08]">
              <Radio className="w-3 h-3 text-zinc-300" />
              <span>STAGE • #CYBER-4096</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-zinc-300">
              <Zap className="w-3 h-3 text-zinc-400" />
              <span>SYNC LOCKED</span>
            </div>

            <Link
              href="/room/lounge-demo"
              className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-white hover:bg-zinc-200 text-black font-bold text-xs transition-colors"
            >
              <span>Launch Room</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
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
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/60" />
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
                  <span className="text-xs text-zinc-300 font-mono">{r.sender}</span>
                </div>
              ))}
            </div>

            {/* Top Video Overlay Bar */}
            <div className="relative z-10 p-4 flex items-center justify-between bg-gradient-to-b from-black/80 to-transparent">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-white text-black font-mono text-xs font-bold uppercase tracking-wider">
                  LIVE STREAM
                </span>
                <span className="text-xs font-mono text-zinc-300">
                  4K HDR • 60 FPS
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-300 bg-black/60 px-2.5 py-1 rounded-full border border-white/10">
                <Users className="w-3.5 h-3.5 text-zinc-400" />
                <span>5 Viewers In Sync</span>
              </div>
            </div>

            {/* Middle Big Play Indicator */}
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
            <div className="relative z-10 p-4 bg-gradient-to-t from-black via-black/90 to-transparent space-y-3">
              {/* Scrubber Line */}
              <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden cursor-pointer">
                <div
                  className="h-full bg-white transition-all duration-300"
                  style={{ width: `${(currentTimeSec / 120) * 100}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
                  </button>

                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>

                  <span className="font-mono text-zinc-300 text-xs">
                    00:{currentTimeSec < 10 ? `0${currentTimeSec}` : currentTimeSec} / 02:00
                  </span>
                </div>

                {/* Quick Emoji Trigger Bar */}
                <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md p-1 rounded-full border border-white/10">
                  {["🔥", "🍿", "❤️", "😮", "⚡"].map((emoji) => (
                    <button
                      key={emoji}
                      onClick={() => triggerEmoji(emoji)}
                      className="w-7 h-7 rounded-full hover:bg-white/20 active:scale-125 transition-all flex items-center justify-center text-sm cursor-pointer"
                      title={`React with ${emoji}`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Social & Crew Column (4 cols) */}
          <div className="lg:col-span-4 bg-[#161310] border-t lg:border-t-0 lg:border-l border-[#27211a] p-4 flex flex-col justify-between text-left">
            {/* Header Tabs */}
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab("chat")}
                  className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                    activeTab === "chat"
                      ? "bg-white/10 text-white"
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
                      ? "bg-white/10 text-white"
                      : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  <Users className="w-3.5 h-3.5" />
                  <span>Crew (5)</span>
                </button>
              </div>

              <span className="text-xs font-mono text-zinc-300 bg-white/[0.04] border border-white/10 px-2 py-0.5 rounded-full flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                SYNCED
              </span>
            </div>

            {/* Chat Content */}
            {activeTab === "chat" ? (
              <div className="flex-1 my-3 space-y-3 overflow-y-auto max-h-[220px] text-xs">
                <div className="py-1 text-xs text-zinc-400 font-mono">
                  <span className="text-white font-bold">ENGINE:</span> Stream sync locked. 5 viewers aligned.
                </div>

                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 rounded-full bg-white/[0.08] border border-white/10 flex items-center justify-center text-xs font-bold text-white shrink-0">
                    E
                  </div>
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1.5">
                      <span className="font-semibold text-zinc-200 text-xs">Elena</span>
                      <span className="text-xs font-mono bg-white/[0.08] text-zinc-300 border border-white/10 px-1 rounded font-bold">
                        MOD
                      </span>
                    </div>
                    <p className="text-zinc-300 text-xs leading-snug">
                      Popcorn is popped! This 4K trailer looks unbelievable 🍿
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 rounded-full bg-white/[0.08] border border-white/10 flex items-center justify-center text-xs font-bold text-white shrink-0">
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
                  { name: "Alex (You)", role: "HOST" },
                  { name: "Elena Rostova", role: "MOD" },
                  { name: "Marcus Vance", role: "VIEWER" },
                  { name: "Chloe Zhao", role: "VIEWER" },
                ].map((u) => (
                  <div
                    key={u.name}
                    className="flex items-center justify-between p-2 rounded-lg bg-black/40 border border-white/[0.04]"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-white/[0.08] border border-white/10 flex items-center justify-center text-xs font-bold text-white">
                        {u.name[0]}
                      </div>
                      <span className="font-medium text-zinc-200 text-xs">{u.name}</span>
                    </div>
                    <span className="text-xs text-zinc-400 font-mono">{u.role}</span>
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
                  className="flex-1 bg-black/40 border border-white/[0.08] rounded-xl px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white/40"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      triggerEmoji("🔥");
                      (e.target as HTMLInputElement).value = "";
                    }
                  }}
                />
                <button
                  onClick={() => triggerEmoji("🔥")}
                  className="px-3.5 py-2 rounded-xl bg-white hover:bg-zinc-200 text-black text-xs font-bold transition-colors cursor-pointer"
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
