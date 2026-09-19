"use client";

import { ChevronLeft } from "lucide-react";
import { useRoomTheme } from "@/hooks/useRoomTheme";
import { useRoomStore } from "@/store/useRoomStore";

interface RoomBrandButtonProps {
  className?: string;
  onClick?: () => void;
}

export function RoomBrandButton({ className = "", onClick }: RoomBrandButtonProps) {
  const t = useRoomTheme();
  const resetToRecommendations = useRoomStore((state) => state.resetToRecommendations);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onClick) {
      onClick();
    } else {
      resetToRecommendations();
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`group inline-flex items-center gap-2.5 sm:gap-3 cursor-pointer select-none transition-all active:scale-95 bg-transparent border-0 p-0 text-left outline-none ${className}`}
      title="Back to Recommendations"
      aria-label="Back to Recommendations"
    >
      {/* Squircle / Rounded Back Button */}
      <div
        className="w-8 h-8 sm:w-9 sm:h-9 rounded-[13px] sm:rounded-[14px] flex items-center justify-center transition-all duration-200 group-hover:scale-105 shadow-2xs"
        style={{
          backgroundColor: t.isDark ? "#1e1a14" : "#ffffff",
          border: `1px solid ${t.border}`,
          color: t.text,
        }}
      >
        <ChevronLeft className="w-4 h-4 stroke-[2.5] transition-transform group-hover:-translate-x-0.5" />
      </div>

      {/* Brand Text */}
      <span
        className="font-bold text-sm sm:text-[15px] tracking-tight transition-opacity group-hover:opacity-80"
        style={{ color: t.text }}
      >
        NodeParty
      </span>
    </button>
  );
}
