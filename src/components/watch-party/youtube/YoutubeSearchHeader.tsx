"use client";

import { useState } from "react";
import { useRoomTheme } from "@/hooks/useRoomTheme";

const CATEGORIES = [
  { id: "all", label: "All" },
  { id: "gaming", label: "Gaming" },
  { id: "green-lantern", label: "Green Lantern" },
  { id: "dc-comics", label: "DC Comics" },
  { id: "podcasts", label: "Podcasts" },
  { id: "live", label: "Live" },
  { id: "pvz", label: "Plants vs. Zombies" },
  { id: "music", label: "Music" },
  { id: "mixes", label: "Mixes" },
  { id: "trailers", label: "Trailers" },
];

export function YoutubeSearchHeader() {
  const t = useRoomTheme();
  const [activeCategory, setActiveCategory] = useState("all");

  return (
    <div
      className="w-full flex flex-col gap-3 px-4 sm:px-6 py-3 shrink-0 border-b backdrop-blur-md transition-colors"
      style={{
        backgroundColor: t.isDark
          ? "rgba(20, 17, 14, 0.85)"
          : "rgba(245, 245, 247, 0.85)",
        borderColor: t.border,
      }}
    >
      {/* Category Filter Pills */}
      <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-1 px-1">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className="px-3 py-1.5 rounded-lg text-[14px] font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer outline-none select-none"
              style={{
                backgroundColor: isActive
                  ? t.isDark
                    ? "#f1f1f1"
                    : "#0f0f0f"
                  : t.isDark
                    ? "#272727"
                    : "rgba(0, 0, 0, 0.05)",
                color: isActive
                  ? t.isDark
                    ? "#0f0f0f"
                    : "#ffffff"
                  : t.isDark
                    ? "#f1f1f1"
                    : "#0f0f0f",
              }}
            >
              {cat.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
