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
    <header className="h-16 px-6 border-b border-zinc-800 bg-zinc-950/95 flex items-center justify-between sticky top-0 z-20">
      <div className="flex items-center gap-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-zinc-400 hover:text-rose-500 transition-colors text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Leave Room
        </Link>
        <div className="h-4 w-[1px] bg-zinc-800" />
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-zinc-400">
            Room Code:
          </span>
          <span className="font-mono text-xs font-semibold text-rose-300 bg-rose-950/60 border border-rose-800/50 px-2.5 py-1 rounded-md tracking-wide">
            {roomId}
          </span>
        </div>
      </div>

      {/* Share Invite CTA */}
      <div className="flex items-center gap-3">
        <button
          onClick={copyRoomLink}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-200 text-xs font-medium border border-zinc-700/60 transition-colors cursor-pointer"
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
              <Copy className="w-3.5 h-3.5 text-zinc-400" />
              <span>Share Invite</span>
            </>
          )}
        </button>
      </div>
    </header>
  );
}
