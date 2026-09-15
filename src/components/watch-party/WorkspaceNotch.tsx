"use client";

import { useRoomTheme } from "@/hooks/useRoomTheme";

interface WorkspaceNotchProps {
  children: React.ReactNode;
}

export function WorkspaceNotch({ children }: WorkspaceNotchProps) {
  const t = useRoomTheme();

  return (
    <div className="pointer-events-auto absolute top-0 left-1/2 -translate-x-1/2 z-[100] flex items-start justify-center animate-in fade-in slide-in-from-top-2 duration-300 w-full min-[425px]:w-[80%] sm:w-[60%] max-w-[600px]">
      {/* Curved Notch Background */}
      <svg
        className="block transition-all w-full"
        style={{
          height: "clamp(48px, 6.5vw, 68px)",
        }}
        viewBox="0 0 560 66"
        fill="none"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M 0 -2 L 0 0 C 35 0, 35 64, 70 64 L 490 64 C 525 64, 525 0, 560 0 L 560 -2 Z"
          fill={t.surface}
          stroke={t.border}
          strokeWidth={1}
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {/* Inner Children (Search Bar) */}
      <div
        className="absolute inset-0 flex items-center justify-center w-full"
        style={{
          paddingBottom: "clamp(8px, 1.5vw, 16px)",
          paddingTop: "clamp(4px, 0.6vw, 8px)",
          paddingLeft: "max(13%, 30px)",
          paddingRight: "max(13%, 30px)",
        }}
      >
        {children}
      </div>
    </div>
  );
}
