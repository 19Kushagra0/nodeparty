"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { X, Sparkles, Lock, Globe, Shield, Play, MousePointer } from "@/icons";
import { useRoomStore } from "@/store/useRoomStore";
import { PrivacyMode } from "@/types";

export function CreateRoomModal() {
  const router = useRouter();
  const { isCreateModalOpen, setCreateModalOpen, setRoomName } = useRoomStore();

  const [partyName, setPartyName] = useState("Cyberpunk Midnight Screening 🍿");
  const [privacy, setPrivacy] = useState<PrivacyMode>("public");
  const [controlMode, setControlMode] = useState<"host" | "collaborative">("collaborative");
  const [isLaunching, setIsLaunching] = useState(false);

  if (!isCreateModalOpen) return null;

  const handleLaunch = () => {
    setIsLaunching(true);
    const newRoomId = "party-" + Math.random().toString(36).substring(2, 8);
    setRoomName(partyName);

    setTimeout(() => {
      setCreateModalOpen(false);
      router.push(`/room/${newRoomId}`);
    }, 300);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg bg-[#0e111a] border border-white/[0.12] rounded-3xl p-6 sm:p-8 shadow-2xl shadow-rose-950/40 text-left space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-white/[0.08]">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-xl bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center text-white shadow-md shadow-rose-950/50">
                <Sparkles className="w-4 h-4" />
              </span>
              <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                Create Watch Party
              </h2>
            </div>
            <p className="text-xs text-zinc-400">
              Host a synchronized cinema lounge with interactive co-browsing and voice chat.
            </p>
          </div>

          <button
            onClick={() => setCreateModalOpen(false)}
            className="p-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <div className="space-y-5">
          {/* Party Title */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-300">
              Watch Party Name
            </label>
            <input
              type="text"
              value={partyName}
              onChange={(e) => setPartyName(e.target.value)}
              placeholder="e.g., Cyberpunk Midnight Screening"
              className="w-full px-4 py-3 rounded-2xl bg-zinc-950/90 border border-white/[0.1] text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500/30 transition-colors"
            />
          </div>

          {/* Privacy & Permissions Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Privacy Setting */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-300">
                Lounge Privacy
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setPrivacy("public")}
                  className={`p-3 rounded-2xl border text-left flex flex-col gap-1 transition-all cursor-pointer ${privacy === "public"
                    ? "bg-rose-950/40 border-rose-500/80 text-white"
                    : "bg-zinc-950/60 border-white/[0.07] text-zinc-400 hover:border-white/[0.15]"
                    }`}
                >
                  <div className="flex items-center gap-1.5 text-xs font-semibold">
                    <Globe className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Public</span>
                  </div>
                  <span className="text-[10px] text-zinc-400 leading-tight">
                    Anyone can join
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setPrivacy("friends")}
                  className={`p-3 rounded-2xl border text-left flex flex-col gap-1 transition-all cursor-pointer ${privacy === "friends"
                    ? "bg-rose-950/40 border-rose-500/80 text-white"
                    : "bg-zinc-950/60 border-white/[0.07] text-zinc-400 hover:border-white/[0.15]"
                    }`}
                >
                  <div className="flex items-center gap-1.5 text-xs font-semibold">
                    <Lock className="w-3.5 h-3.5 text-rose-400" />
                    <span>Private</span>
                  </div>
                  <span className="text-[10px] text-zinc-400 leading-tight">
                    Invite link & code
                  </span>
                </button>
              </div>
            </div>

            {/* Playback & Co-Browsing Mode */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-300">
                Co-Browsing Mode
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setControlMode("collaborative")}
                  className={`p-3 rounded-2xl border text-left flex flex-col gap-1 transition-all cursor-pointer ${controlMode === "collaborative"
                    ? "bg-rose-950/40 border-rose-500/80 text-white"
                    : "bg-zinc-950/60 border-white/[0.07] text-zinc-400 hover:border-white/[0.15]"
                    }`}
                >
                  <div className="flex items-center gap-1.5 text-xs font-semibold">
                    <MousePointer className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Shared Mouse</span>
                  </div>
                  <span className="text-[10px] text-zinc-400 leading-tight">
                    Everyone can click
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setControlMode("host")}
                  className={`p-3 rounded-2xl border text-left flex flex-col gap-1 transition-all cursor-pointer ${controlMode === "host"
                    ? "bg-rose-950/40 border-rose-500/80 text-white"
                    : "bg-zinc-950/60 border-white/[0.07] text-zinc-400 hover:border-white/[0.15]"
                    }`}
                >
                  <div className="flex items-center gap-1.5 text-xs font-semibold">
                    <Shield className="w-3.5 h-3.5 text-amber-400" />
                    <span>Host Only</span>
                  </div>
                  <span className="text-[10px] text-zinc-400 leading-tight">
                    Host controls screen
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Launch Button */}
          <div className="pt-2">
            <button
              onClick={handleLaunch}
              disabled={isLaunching || !partyName.trim()}
              className="w-full group inline-flex items-center justify-center gap-2.5 py-3.5 rounded-2xl bg-gradient-to-r from-rose-600 via-rose-500 to-pink-600 hover:from-rose-500 hover:to-pink-500 active:scale-[0.99] text-white font-bold text-sm shadow-xl shadow-rose-950/50 border border-rose-400/30 transition-all cursor-pointer disabled:opacity-50"
            >
              {isLaunching ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Launching Lounge...</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-white transition-transform group-hover:scale-110" />
                  <span>Launch Watch Party Now</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
