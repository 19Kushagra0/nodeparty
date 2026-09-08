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

export function RoomHeader() {
  const { roomId } = useParams<{ roomId: string }>();
  const router = useRouter();
  const {
    roomName,
    participants,
    currentPreset,
    setInviteModalOpen,
  } = useRoomStore();

  const handleLeave = () => {
    router.push("/");
  };

  return (
    <header className="h-12 sm:h-14 px-1 sm:px-2 flex items-center justify-between z-30 transition-all w-full shrink-0 gap-3">
      {/* Left: Leave Room */}
      <button
        onClick={handleLeave}
        className="flex items-center gap-1.5 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white shadow-2xs hover:shadow-xs hover:-translate-y-0.5 text-zinc-800 transition-all text-xs sm:text-sm font-semibold border border-white shrink-0 cursor-pointer"
      >
        <ChevronLeft className="w-4 h-4 text-zinc-500" />
        <span>Leave Room</span>
      </button>

      {/* Center: Room Name & Participants */}
      <div className="hidden md:flex items-center bg-white/90 shadow-2xs rounded-full px-4 py-1.5 border border-white gap-4 lg:gap-5 shrink-0">
        <h1 className="text-xs sm:text-sm font-bold text-zinc-800 flex items-center gap-1.5">
          <span>{roomName || "Together Hits Different"}</span>
          <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-100" />
        </h1>
        
        <div className="flex items-center gap-2.5">
          {/* Avatars */}
          <div className="flex items-center -space-x-1.5">
            {participants.slice(0, 3).map((p) => (
              <div
                key={p.id}
                className="relative w-6 h-6 rounded-full bg-zinc-200 border-2 border-white flex items-center justify-center text-[10px] font-bold text-zinc-600 shadow-2xs overflow-hidden"
              >
                <div className="w-full h-full bg-pink-100 flex items-center justify-center text-pink-600 text-[10px]">
                  {p.name[0]}
                </div>
              </div>
            ))}
            {participants.length > 3 && (
              <div className="w-6 h-6 rounded-full bg-pink-50 border-2 border-white flex items-center justify-center text-[9px] font-bold text-pink-500 shadow-2xs z-10">
                +{participants.length - 3}
              </div>
            )}
          </div>
          
          {/* People Count */}
          <div className="flex items-center gap-1 text-zinc-600 text-xs font-semibold">
            <User className="w-3.5 h-3.5" />
            <span>{participants.length}</span>
          </div>

          <div className="w-[1px] h-3.5 bg-zinc-200" />

          {/* Share/Link */}
          <button 
            onClick={() => setInviteModalOpen(true)}
            className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-zinc-100 text-zinc-500 transition-colors cursor-pointer"
            title="Invite link"
          >
            <LinkIcon className="w-3 h-3" />
          </button>
          
          {/* More */}
          <button className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-zinc-100 text-zinc-500 transition-colors cursor-pointer">
            <MoreHorizontal className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Right: Now Watching & Room Count */}
      <div className="flex items-center gap-2.5 shrink-0">
        {/* Now Watching Mini Card */}
        <div className="hidden sm:flex items-center gap-2.5 bg-white/90 shadow-2xs border border-white rounded-full pr-3 p-1 cursor-pointer hover:shadow-xs transition-shadow max-w-[260px]">
          <div className="w-7 h-7 rounded-full bg-zinc-200 overflow-hidden shrink-0">
             {/* eslint-disable-next-line @next/next/no-img-element */}
             <img src={currentPreset.thumbnail} alt="Now Watching" className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[9px] font-semibold text-zinc-400 leading-none">Now Watching</span>
            <span className="text-xs font-bold text-zinc-800 leading-tight truncate">{currentPreset.title}</span>
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-zinc-400 shrink-0 ml-0.5" />
        </div>

        {/* Total Room Count - Far Right */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white shadow-2xs border border-white text-zinc-700 text-xs font-semibold shrink-0">
           <Users className="w-3.5 h-3.5 text-zinc-500" />
           <span>{participants.length}</span>
        </div>
      </div>
    </header>
  );
}
