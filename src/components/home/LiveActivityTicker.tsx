"use client";

import { useEffect, useState } from "react";
import { Zap, Sparkles, Flame, Users } from "@/icons";

const mockLiveEvents = [
  { icon: Flame, text: "Elena and 8 viewers reacted 🔥 in Sci-Fi Universe", time: "2s ago", color: "text-rose-400" },
  { icon: Users, text: "Marcus created lounge: 'Cyberpunk 2077 Night City'", time: "6s ago", color: "text-cyan-400" },
  { icon: Sparkles, text: "42 new viewers tuned into 'Lo-Fi Study Sanctuary'", time: "14s ago", color: "text-purple-400" },
  { icon: Zap, text: "Sub-millisecond drift sync verified: 12ms across 5 nodes", time: "22s ago", color: "text-emerald-400" },
];

export function LiveActivityTicker() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % mockLiveEvents.length);
    }, 3800);
    return () => clearInterval(timer);
  }, []);

  const event = mockLiveEvents[currentIndex];
  const Icon = event.icon;

  return (
    <div className="w-full max-w-3xl mx-auto px-4">
      <div className="flex items-center justify-between gap-3 px-4 py-2.5 rounded-2xl bg-zinc-950/80 border border-white/[0.08] backdrop-blur-md shadow-lg shadow-black/20 text-xs">
        <div className="flex items-center gap-2 shrink-0">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-mono text-[10px] uppercase font-bold tracking-wider text-zinc-400">
            Live Stream Feed
          </span>
        </div>

        <div className="flex-1 min-w-0 flex items-center gap-2 text-zinc-300 font-medium truncate">
          <Icon className={`w-3.5 h-3.5 shrink-0 ${event.color}`} />
          <span className="truncate">{event.text}</span>
        </div>

        <span className="text-[10px] font-mono text-zinc-500 shrink-0">
          {event.time}
        </span>
      </div>
    </div>
  );
}
