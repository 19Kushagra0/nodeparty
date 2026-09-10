"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { useRoomStore } from "@/store/useRoomStore";
import { useRoomTheme } from "@/hooks/useRoomTheme";
import { ParticipantSidebar } from "@/components/watch-party/ParticipantSidebar";

/**
 * MobileBottomSheet
 * Slide-up drawer used on small viewports (< lg) to surface
 * the ParticipantSidebar (chat / reactions / users).
 * Triggered by the mobile bottom bar.
 */
export function MobileBottomSheet() {
  const { isRightSidebarOpen, toggleRightSidebar } = useRoomStore();
  const t = useRoomTheme();
  const sheetRef = useRef<HTMLDivElement>(null);

  // Close on backdrop click
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) toggleRightSidebar();
  };

  // Close on Escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isRightSidebarOpen) toggleRightSidebar();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isRightSidebarOpen, toggleRightSidebar]);

  // Prevent body scroll while sheet is open
  useEffect(() => {
    document.body.style.overflow = isRightSidebarOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isRightSidebarOpen]);

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={handleBackdropClick}
        className={`lg:hidden fixed inset-0 z-[200] transition-all duration-300 ${
          isRightSidebarOpen
            ? "bg-black/60 backdrop-blur-sm pointer-events-auto"
            : "bg-transparent pointer-events-none"
        }`}
      >
        {/* Sheet panel */}
        <div
          ref={sheetRef}
          className="absolute bottom-0 left-0 right-0 rounded-t-[28px] flex flex-col transition-transform duration-300 ease-out will-change-transform border-t border-x"
          style={{
            height: "82dvh",
            backgroundColor: t.isDark ? "#14110e" : "#ffffff",
            borderColor: t.border,
            transform: isRightSidebarOpen ? "translateY(0)" : "translateY(100%)",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Drag Handle */}
          <div className="flex items-center justify-center pt-3 pb-1 shrink-0">
            <div
              className="w-10 h-1 rounded-full"
              style={{ backgroundColor: t.border }}
            />
          </div>

          {/* Close Button */}
          <button
            onClick={toggleRightSidebar}
            className="absolute top-3 right-4 p-1.5 rounded-full transition-colors cursor-pointer"
            style={{ color: t.muted, backgroundColor: t.surfaceHover }}
            aria-label="Close panel"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Content */}
          <div className="flex-1 min-h-0 overflow-hidden p-3">
            <ParticipantSidebar />
          </div>
        </div>
      </div>
    </>
  );
}
