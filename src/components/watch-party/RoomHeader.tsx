"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Check, Copy } from "@/icons";
import { useRoom } from "@/contexts/RoomProvider";

export function RoomHeader() {
  const { roomId } = useRoom();
  const [copied, setCopied] = useState(false);

  const copyRoomLink = () => {
    const fullUrl = window.location.href;
    navigator.clipboard.writeText(fullUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <header className="h-16 px-6 border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-md flex items-center justify-between sticky top-0 z-20">
      <div className="flex items-center gap-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-slate-400 hover:text-slate-200 transition-colors text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Leave Room
        </Link>
        <div className="h-4 w-[1px] bg-slate-800" />
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Room:
          </span>
          <span className="font-mono text-sm font-bold text-red-400 bg-red-950/50 border border-red-500/30 px-2.5 py-0.5 rounded-md">
            {roomId}
          </span>
        </div>
      </div>

      {/* Center/Right Info & Copy Link */}
      <div className="flex items-center gap-3">
        <button
          onClick={copyRoomLink}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700/60 transition-all active:scale-[0.97]"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400 font-semibold">
                Copied Link!
              </span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Share Invite</span>
            </>
          )}
        </button>
      </div>
    </header>
  );
}
