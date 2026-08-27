"use client";

import { useEffect, useState } from "react";
import { useRoomStore } from "@/store/useRoomStore";
import { MultiplayerCursor } from "@/types";

export function MultiplayerCursors({ containerRef }: { containerRef: React.RefObject<HTMLDivElement | null> }) {
  const { multiplayerCursors, updateMyCursor, showMultiplayerCursors } = useRoomStore();
  const [remoteCursors, setRemoteCursors] = useState<MultiplayerCursor[]>(multiplayerCursors);

  // Track local user mouse movement inside the shared browser canvas
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
      const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
      updateMyCursor(x, y, false);
    };

    const handleMouseDown = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
      const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
      updateMyCursor(x, y, true);
    };

    const handleMouseUp = () => {
      const myCursor = multiplayerCursors.find((c) => c.id === "u1");
      if (myCursor) {
        updateMyCursor(myCursor.x, myCursor.y, false);
      }
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [containerRef, updateMyCursor, multiplayerCursors]);

  // Organic simulated movement of other participant cursors (Elena, Marcus, Chloe)
  useEffect(() => {
    const interval = setInterval(() => {
      setRemoteCursors((prev) =>
        prev.map((cursor) => {
          if (cursor.id === "u1") return cursor; // Don't override my own cursor
          // Smooth wander
          const deltaX = (Math.random() - 0.5) * 8;
          const deltaY = (Math.random() - 0.5) * 8;
          const nextX = Math.max(10, Math.min(90, cursor.x + deltaX));
          const nextY = Math.max(15, Math.min(85, cursor.y + deltaY));
          const isClick = Math.random() < 0.12;

          return {
            ...cursor,
            x: nextX,
            y: nextY,
            isClicking: isClick,
          };
        })
      );
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  const displayedCursors = showMultiplayerCursors
    ? remoteCursors
    : remoteCursors.filter((c) => c.id === "u1");

  return (
    <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden">
      {displayedCursors.map((cursor) => (
        <div
          key={cursor.id}
          style={{
            left: `${cursor.x}%`,
            top: `${cursor.y}%`,
            transition: "left 0.25s cubic-bezier(0.2, 0, 0, 1), top 0.25s cubic-bezier(0.2, 0, 0, 1)",
          }}
          className="absolute flex flex-col items-start -translate-x-1 -translate-y-1 select-none pointer-events-none"
        >
          {/* Cursor SVG Arrow */}
          <div className="relative">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill={cursor.color}
              stroke="white"
              strokeWidth="1.5"
              className="drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] filter transform -rotate-12"
            >
              <path d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.87a.5.5 0 0 0 .35-.85L6.35 2.86a.5.5 0 0 0-.85.35z" />
            </svg>

            {/* Click Ripple Indicator */}
            {cursor.isClicking && (
              <span
                style={{ borderColor: cursor.color }}
                className="absolute -top-2 -left-2 w-8 h-8 rounded-full border-2 animate-ping pointer-events-none"
              />
            )}
          </div>

          {/* Participant Name Tag */}
          <div
            style={{ backgroundColor: cursor.color }}
            className="px-2 py-0.5 rounded-full text-xs font-mono font-bold text-white shadow-lg border border-white/20 whitespace-nowrap -mt-1 ml-3"
          >
            {cursor.name}
          </div>
        </div>
      ))}
    </div>
  );
}
