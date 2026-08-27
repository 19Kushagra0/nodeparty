"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  Copy,
  Check,
  Share2,
  Maximize2,
  Minimize2,
  Sparkles,
  Crown,
} from "@/icons";
import { useRoomStore } from "@/store/useRoomStore";

export function RoomHeader() {
  const { roomId } = useParams<{ roomId: string }>();
  const {
    roomName,
    roomPasscode,
    participants,
    syncDriftMs,
    isTheaterMode,
    toggleTheaterMode,
    ambientGlow,
    toggleAmbientGlow,
    setInviteModalOpen,
    resyncWithHost,
    isResyncing,
  } = useRoomStore();

  const [copiedCode, setCopiedCode] = useState(false);

  const copyRoomCode = () => {
    navigator.clipboard.writeText(roomPasscode || roomId || "CYBER-4096");
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <header className="h-16 px-4 sm:px-6 border-b border-white/[0.08] bg-[#07080b]/95 backdrop-blur-xl flex items-center justify-between sticky top-0 z-30 transition-all">
      {/* Left: Navigation & Room Name */}
      <div className="flex items-center gap-3 sm:gap-4 min-w-0">
        <Link
          href="/"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-zinc-300 hover:text-white transition-colors text-xs font-semibold shrink-0"
          title="Leave Watch Party"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Lobby</span>
        </Link>

        <div className="h-4 w-[1px] bg-white/[0.08] hidden sm:block" />

        <div className="flex items-center gap-2.5 min-w-0">
          <h1 className="text-xs sm:text-sm font-bold text-white truncate max-w-[140px] sm:max-w-[240px] md:max-w-xs">
            {roomName}
          </h1>

          {/* Room Code Badge */}
          <button
            onClick={copyRoomCode}
            className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#141722] hover:bg-[#1a1e2c] border border-white/[0.08] text-xs font-mono text-zinc-300 transition-colors cursor-pointer group"
            title="Click to copy room code"
          >
            <span className="text-zinc-500 font-sans text-xs">CODE:</span>
            <span className="text-rose-400 font-bold">{roomPasscode || roomId}</span>
            {copiedCode ? (
              <Check className="w-3 h-3 text-emerald-400" />
            ) : (
              <Copy className="w-3 h-3 text-zinc-500 group-hover:text-zinc-300" />
            )}
          </button>
        </div>
      </div>

      {/* Center: Live Sync Telemetry */}
      <div className="hidden lg:flex items-center gap-3">
        <button
          onClick={resyncWithHost}
          className={`flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/20 text-xs text-cyan-300 font-mono transition-all hover:bg-cyan-900/40 cursor-pointer ${
            isResyncing ? "animate-pulse ring-2 ring-cyan-400/50" : ""
          }`}
          title="Click to manually recalibrate sync clock with host"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
          <span>{isResyncing ? "Recalibrating..." : `⚡ ${syncDriftMs}ms Drift Lock`}</span>
        </button>

        <span className="text-zinc-600 text-xs">•</span>

        <div className="flex items-center gap-1.5 text-xs text-zinc-400 font-medium">
          <Crown className="w-3.5 h-3.5 text-rose-400" />
          <span>Host: <strong className="text-zinc-200">Alex</strong></span>
        </div>
      </div>

      {/* Right: Participant Stack, Theater Mode & Invite CTA */}
      <div className="flex items-center gap-2.5 sm:gap-3">
        {/* Participant Avatar Stack */}
        <div className="hidden sm:flex items-center -space-x-2 mr-1">
          {participants.slice(0, 4).map((p) => (
            <div
              key={p.id}
              className="relative w-7 h-7 rounded-full bg-[#1e2230] border-2 border-[#07080b] flex items-center justify-center text-xs font-mono font-bold text-white shadow-sm ring-1 ring-white/10"
              title={`${p.name} (${p.role})`}
            >
              {p.name[0]}
              {p.role === "host" && (
                <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-rose-600 border border-white/20 flex items-center justify-center text-xs">
                  👑
                </span>
              )}
            </div>
          ))}
          {participants.length > 4 && (
            <div className="w-7 h-7 rounded-full bg-zinc-800 border-2 border-[#07080b] flex items-center justify-center text-xs font-mono font-bold text-zinc-300">
              +{participants.length - 4}
            </div>
          )}
        </div>

        {/* Ambient Glow Toggle */}
        <button
          onClick={toggleAmbientGlow}
          className={`p-2 rounded-xl border transition-colors cursor-pointer ${
            ambientGlow
              ? "bg-rose-500/10 border-rose-500/30 text-rose-300"
              : "bg-white/[0.04] border-white/[0.08] text-zinc-400 hover:text-white"
          }`}
          title={ambientGlow ? "Ambient Lighting Active" : "Ambient Lighting Off"}
        >
          <Sparkles className="w-4 h-4" />
        </button>

        {/* Theater Mode Toggle */}
        <button
          onClick={toggleTheaterMode}
          className={`p-2 rounded-xl border transition-colors cursor-pointer hidden md:flex items-center gap-1.5 text-xs font-semibold ${
            isTheaterMode
              ? "bg-[#141722] border-white/[0.2] text-white"
              : "bg-white/[0.04] border-white/[0.08] text-zinc-400 hover:text-white"
          }`}
          title="Toggle Cinema Theater Mode"
        >
          {isTheaterMode ? (
            <>
              <Minimize2 className="w-4 h-4" />
              <span>Standard</span>
            </>
          ) : (
            <>
              <Maximize2 className="w-4 h-4" />
              <span>Theater</span>
            </>
          )}
        </button>

        {/* Share Invite Trigger */}
        <button
          onClick={() => setInviteModalOpen(true)}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-rose-500 hover:bg-rose-600 active:scale-95 text-white text-xs font-bold border border-rose-400/20 transition-colors cursor-pointer"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>Invite</span>
        </button>
      </div>
    </header>
  );
}
