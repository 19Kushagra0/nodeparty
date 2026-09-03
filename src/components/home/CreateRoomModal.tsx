"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { X, Lock, Globe, Shield, Play, MousePointer, Film } from "@/icons";
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

  const selectedClass = "bg-[#c8962e]/15 border-[#c8962e]/60 text-[#f2e9d6]";
  const unselectedClass = "bg-[#1e1a14] border-[#27211a] text-[#907a5a] hover:border-[#3a3022]";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg bg-[#161310] border border-[#27211a] rounded-2xl p-6 sm:p-8 shadow-2xl text-left space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-[#27211a]">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-xl bg-[#c8962e] flex items-center justify-center text-[#0c0a07]">
                <Film className="w-4 h-4" />
              </span>
              <h2 className="text-xl sm:text-2xl font-black tracking-tight text-[#f2e9d6]">
                Create Cinema Room
              </h2>
            </div>
            <p className="text-xs text-[#907a5a]">
              Host a synchronized screening room with interactive co-browsing and low-latency chat.
            </p>
          </div>

          <button
            onClick={() => setCreateModalOpen(false)}
            className="p-2 rounded-xl bg-[#27211a] hover:bg-[#3a3022] text-[#907a5a] hover:text-[#f2e9d6] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <div className="space-y-5">
          {/* Party Title */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-[#b09070]">
              Room Title
            </label>
            <input
              type="text"
              value={partyName}
              onChange={(e) => setPartyName(e.target.value)}
              placeholder="e.g., Cyberpunk Midnight Screening"
              className="w-full px-4 py-3 rounded-xl bg-[#0c0a07] border border-[#27211a] text-[#f2e9d6] placeholder-[#5a4d3a] text-sm focus:outline-none focus:border-[#c8962e] focus:ring-1 focus:ring-[#c8962e]/30 transition-colors"
            />
          </div>

          {/* Privacy & Permissions Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Privacy Setting */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#b09070]">
                Privacy Mode
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setPrivacy("public")}
                  className={`p-3 rounded-xl border text-left flex flex-col gap-1 transition-all cursor-pointer ${privacy === "public" ? selectedClass : unselectedClass
                    }`}
                >
                  <div className="flex items-center gap-1.5 text-xs font-semibold">
                    <Globe className="w-3.5 h-3.5 text-[#c8962e]" />
                    <span>Public</span>
                  </div>
                  <span className="text-xs text-[#907a5a] leading-tight">Open to all</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPrivacy("friends")}
                  className={`p-3 rounded-xl border text-left flex flex-col gap-1 transition-all cursor-pointer ${privacy === "friends" ? selectedClass : unselectedClass
                    }`}
                >
                  <div className="flex items-center gap-1.5 text-xs font-semibold">
                    <Lock className="w-3.5 h-3.5 text-[#c8962e]" />
                    <span>Private</span>
                  </div>
                  <span className="text-xs text-[#907a5a] leading-tight">Invite code</span>
                </button>
              </div>
            </div>

            {/* Playback & Co-Browsing Mode */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#b09070]">
                DJ Control Mode
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setControlMode("collaborative")}
                  className={`p-3 rounded-xl border text-left flex flex-col gap-1 transition-all cursor-pointer ${controlMode === "collaborative" ? selectedClass : unselectedClass
                    }`}
                >
                  <div className="flex items-center gap-1.5 text-xs font-semibold">
                    <MousePointer className="w-3.5 h-3.5 text-[#c8962e]" />
                    <span>Shared</span>
                  </div>
                  <span className="text-xs text-[#907a5a] leading-tight">Everyone plays</span>
                </button>

                <button
                  type="button"
                  onClick={() => setControlMode("host")}
                  className={`p-3 rounded-xl border text-left flex flex-col gap-1 transition-all cursor-pointer ${controlMode === "host" ? selectedClass : unselectedClass
                    }`}
                >
                  <div className="flex items-center gap-1.5 text-xs font-semibold">
                    <Shield className="w-3.5 h-3.5 text-[#c8962e]" />
                    <span>Host DJ</span>
                  </div>
                  <span className="text-xs text-[#907a5a] leading-tight">Host controls</span>
                </button>
              </div>
            </div>
          </div>

          {/* Launch Button */}
          <div className="pt-2">
            <button
              onClick={handleLaunch}
              disabled={isLaunching || !partyName.trim()}
              className="w-full inline-flex items-center justify-center gap-2.5 py-3.5 rounded-xl bg-[#c8962e] hover:bg-[#dba940] active:scale-[0.99] text-[#0c0a07] font-bold text-sm border border-[#dba940]/30 transition-colors cursor-pointer disabled:opacity-50"
            >
              {isLaunching ? (
                <>
                  <span className="w-4 h-4 border-2 border-[#0c0a07] border-t-transparent rounded-full animate-spin" />
                  <span>Launching Room...</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-[#0c0a07]" />
                  <span>Launch Cinema Room</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
