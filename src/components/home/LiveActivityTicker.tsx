"use client";

import { useEffect, useState } from "react";
import { Zap, Flame, Users, Film } from "@/icons";

const mockLiveEvents = [
  { icon: Flame, text: "Elena and 8 viewers reacted 🔥 in Sci-Fi Universe", time: "2s ago" },
  { icon: Users, text: "Marcus created lounge: 'Cyberpunk 2077 Night City'", time: "6s ago" },
  { icon: Film, text: "42 viewers synchronized on 'Interstellar 4K Trailer'", time: "14s ago" },
  { icon: Zap, text: "Sub-frame drift alignment locked: 0.04s across 6 nodes", time: "22s ago" },
];

export function LiveActivityTicker() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % mockLiveEvents.length);
    }, 4200);
    return () => clearInterval(timer);
  }, []);

  const event = mockLiveEvents[currentIndex];
  const Icon = event.icon;

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="flex items-center justify-between gap-3 px-4 py-2 rounded-xl bg-[#161310] border border-[#27211a] text-xs">
        <div className="flex items-center gap-2 shrink-0">
          <span className="h-1.5 w-1.5 rounded-full bg-[#c8962e]" />
          <span className="text-xs uppercase font-bold tracking-widest text-[#907a5a]">
            FEED
          </span>
        </div>

        <div className="flex-1 min-w-0 flex items-center gap-2 text-[#b09070] font-medium truncate">
          <Icon className="w-3.5 h-3.5 shrink-0 text-[#907a5a]" />
          <span className="truncate">{event.text}</span>
        </div>

        <span className="text-xs text-[#5a4d3a] shrink-0">
          {event.time}
        </span>
      </div>
    </div>
  );
}
