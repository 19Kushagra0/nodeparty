"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ChevronLeft,
  Link as LinkIcon,
  MoreHorizontal,
  ChevronRight,
  Heart,
  User,
  Users
} from "lucide-react";
import { useRoomStore } from "@/store/useRoomStore";
import { useRoomTheme } from "@/hooks/useRoomTheme";

export function RoomHeader() {
  const { roomId } = useParams<{ roomId: string }>();
  const router = useRouter();
  const {
    roomName,
    participants,
    currentPreset,
    setInviteModalOpen,
  } = useRoomStore();

  const t = useRoomTheme();

  const handleLeave = () => {
    router.push("/");
  };

  return (
    <header className="h-12 sm:h-14 px-1 sm:px-2 flex items-center justify-between z-30 transition-all w-full shrink-0 gap-3">
      {/* Left: Leave Room */}
      <button
        onClick={handleLeave}
        className="flex items-center gap-1.5 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full hover:-translate-y-0.5 transition-all text-xs sm:text-sm font-semibold shrink-0 cursor-pointer"
        style={{ backgroundColor: t.surface, color: t.text, border: `1px solid ${t.border}` }}
      >
        <ChevronLeft className="w-4 h-4" style={{ color: t.muted }} />
        <span>Leave Room</span>
      </button>

      {/* Center: Room Name & Participants */}
      <div
        className="hidden md:flex items-center rounded-full px-4 py-1.5 gap-4 lg:gap-5 shrink-0"
        style={{ backgroundColor: `${t.surface}e6`, border: `1px solid ${t.border}` }}
      >
        <h1 className="text-xs sm:text-sm font-bold flex items-center gap-1.5" style={{ color: t.text }}>
          <span>{roomName || "Together Hits Different"}</span>
          <Heart className="w-3.5 h-3.5 fill-current" style={{ color: t.accent }} />
        </h1>
        
        <div className="flex items-center gap-2.5">
          {/* Avatars */}
          <div className="flex items-center -space-x-1.5">
            {participants.slice(0, 3).map((p) => (
              <div
                key={p.id}
                className="relative w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold overflow-hidden"
                style={{ backgroundColor: t.surfaceHover, border: `2px solid ${t.surface}`, color: t.accent }}
              >
                {p.name[0]}
              </div>
            ))}
            {participants.length > 3 && (
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold z-10"
                style={{ backgroundColor: t.surfaceHover, border: `2px solid ${t.surface}`, color: t.accent }}
              >
                +{participants.length - 3}
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-1 text-xs font-semibold" style={{ color: t.muted }}>
            <User className="w-3.5 h-3.5" />
            <span>{participants.length}</span>
          </div>

          <div className="w-[1px] h-3.5" style={{ backgroundColor: t.border }} />

          <button 
            onClick={() => setInviteModalOpen(true)}
            className="w-6 h-6 flex items-center justify-center rounded-full transition-colors cursor-pointer"
            style={{ color: t.muted }}
            title="Invite link"
          >
            <LinkIcon className="w-3 h-3" />
          </button>
          
          <button
            className="w-6 h-6 flex items-center justify-center rounded-full transition-colors cursor-pointer"
            style={{ color: t.muted }}
          >
            <MoreHorizontal className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Right: Now Watching & Room Count */}
      <div className="flex items-center gap-2.5 shrink-0">
        <div
          className="hidden sm:flex items-center gap-2.5 rounded-full pr-3 p-1 cursor-pointer hover:opacity-90 transition-opacity max-w-[260px]"
          style={{ backgroundColor: `${t.surface}e6`, border: `1px solid ${t.border}` }}
        >
          <div className="w-7 h-7 rounded-full overflow-hidden shrink-0" style={{ backgroundColor: t.surfaceHover }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={currentPreset.thumbnail} alt="Now Watching" className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[9px] font-semibold leading-none" style={{ color: t.muted }}>Now Watching</span>
            <span className="text-xs font-bold leading-tight truncate" style={{ color: t.text }}>{currentPreset.title}</span>
          </div>
          <ChevronRight className="w-3.5 h-3.5 shrink-0 ml-0.5" style={{ color: t.muted }} />
        </div>

        <div
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold shrink-0"
          style={{ backgroundColor: t.surface, border: `1px solid ${t.border}`, color: t.muted }}
        >
          <Users className="w-3.5 h-3.5" />
          <span>{participants.length}</span>
        </div>
      </div>
    </header>
  );
}
