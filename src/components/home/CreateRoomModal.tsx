"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { X } from "@/icons";
import { useRoomStore } from "@/store/useRoomStore";
import { PrivacyMode } from "@/types";

export function CreateRoomModal() {
  const router = useRouter();
  const {
    isCreateModalOpen,
    setCreateModalOpen,
    setRoomName,
  } = useRoomStore();

  const [partyName, setPartyName] = useState("Cyberpunk Midnight Screening 🍿");
  const [privacy, setPrivacy] = useState<PrivacyMode>("public");
  const [controlMode, setControlMode] = useState<"host" | "collaborative">("collaborative");
  const [isLaunching, setIsLaunching] = useState(false);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isCreateModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isCreateModalOpen]);

  // Handle Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isCreateModalOpen) {
        setCreateModalOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isCreateModalOpen, setCreateModalOpen]);

  if (!isCreateModalOpen) return null;

  const handleLaunch = () => {
    if (!partyName.trim() || isLaunching) return;

    setIsLaunching(true);
    const newRoomId = "party-" + Math.random().toString(36).substring(2, 8);
    setRoomName(partyName.trim());

    setCreateModalOpen(false);
    router.push(`/room/${newRoomId}`);
  };

  return (
    <div
      className="fixed inset-0 z-[260] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={() => setCreateModalOpen(false)}
    >
      {/* Solid Clean Modal Card */}
      <div
        className="relative w-full max-w-xl bg-[#14110d] border border-[#27211a] rounded-[28px] sm:rounded-[32px] p-6 sm:p-8 space-y-7 shadow-2xl text-left transition-all my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 pb-5 border-b border-[#27211a]">
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-[#f2e9d6]">
              Create Cinema Room
            </h2>
            <p className="text-xs sm:text-sm text-[#96836c] leading-relaxed max-w-md">
              Host a synchronized screening room with interactive co-browsing and low-latency audio.
            </p>
          </div>

          <button
            onClick={() => setCreateModalOpen(false)}
            className="w-9 h-9 rounded-full bg-[#1e1a14] hover:bg-[#27211a] border border-[#27211a] text-[#96836c] hover:text-[#f2e9d6] flex items-center justify-center transition-all cursor-pointer shrink-0 active:scale-90"
            title="Close (Esc)"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Form */}
        <div className="space-y-7">
          {/* Party Title Section */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-[#bda98e]">
                Room Title
              </label>
              <span className="text-[11px] font-medium text-[#7d6c59]">
                Shown to all invited viewers
              </span>
            </div>

            {/* Room Title Input — Large, Prominent, Highly Readable */}
            <div className="relative rounded-2xl bg-[#0c0a07] border border-[#27211a] focus-within:border-[#c8962e] transition-all">
              <input
                type="text"
                value={partyName}
                onChange={(e) => setPartyName(e.target.value)}
                placeholder="e.g., Cyberpunk Midnight Screening"
                className="w-full px-5 py-3.5 sm:py-4 bg-transparent text-base sm:text-lg font-semibold text-[#f2e9d6] placeholder-[#574836] focus:outline-none tracking-tight"
              />
            </div>
          </div>

          {/* Privacy & Permissions Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {/* Privacy Setting Column */}
            <div className="space-y-2.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[#bda98e]">
                Privacy Mode
              </label>

              <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                {/* Open to all button */}
                <button
                  type="button"
                  onClick={() => setPrivacy("public")}
                  className={`h-12 px-2 sm:px-3 rounded-xl sm:rounded-2xl border text-center flex items-center justify-center transition-all cursor-pointer relative active:scale-[0.98] ${
                    privacy === "public"
                      ? "bg-[#1e1a14] border-[#c8962e] text-[#f2e9d6]"
                      : "bg-[#0c0a07] border-[#27211a] hover:border-[#3d3224] text-[#8e7b68] hover:text-[#ded2c1]"
                  }`}
                >
                  <span className={`text-xs sm:text-sm font-bold whitespace-nowrap ${privacy === "public" ? "text-[#f2e9d6]" : "text-[#d6c7b2]"}`}>
                    Open to all
                  </span>
                </button>

                {/* Invite code button */}
                <button
                  type="button"
                  onClick={() => setPrivacy("friends")}
                  className={`h-12 px-2 sm:px-3 rounded-xl sm:rounded-2xl border text-center flex items-center justify-center transition-all cursor-pointer relative active:scale-[0.98] ${
                    privacy === "friends"
                      ? "bg-[#1e1a14] border-[#c8962e] text-[#f2e9d6]"
                      : "bg-[#0c0a07] border-[#27211a] hover:border-[#3d3224] text-[#8e7b68] hover:text-[#ded2c1]"
                  }`}
                >
                  <span className={`text-xs sm:text-sm font-bold whitespace-nowrap ${privacy === "friends" ? "text-[#f2e9d6]" : "text-[#d6c7b2]"}`}>
                    Invite code
                  </span>
                </button>
              </div>
            </div>

            {/* DJ Control Mode Column */}
            <div className="space-y-2.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[#bda98e]">
                DJ Control Mode
              </label>

              <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                {/* Everyone plays button */}
                <button
                  type="button"
                  onClick={() => setControlMode("collaborative")}
                  className={`h-12 px-2 sm:px-3 rounded-xl sm:rounded-2xl border text-center flex items-center justify-center transition-all cursor-pointer relative active:scale-[0.98] ${
                    controlMode === "collaborative"
                      ? "bg-[#1e1a14] border-[#c8962e] text-[#f2e9d6]"
                      : "bg-[#0c0a07] border-[#27211a] hover:border-[#3d3224] text-[#8e7b68] hover:text-[#ded2c1]"
                  }`}
                >
                  <span className={`text-xs sm:text-sm font-bold whitespace-nowrap ${controlMode === "collaborative" ? "text-[#f2e9d6]" : "text-[#d6c7b2]"}`}>
                    Everyone plays
                  </span>
                </button>

                {/* Host controls button */}
                <button
                  type="button"
                  onClick={() => setControlMode("host")}
                  className={`h-12 px-2 sm:px-3 rounded-xl sm:rounded-2xl border text-center flex items-center justify-center transition-all cursor-pointer relative active:scale-[0.98] ${
                    controlMode === "host"
                      ? "bg-[#1e1a14] border-[#c8962e] text-[#f2e9d6]"
                      : "bg-[#0c0a07] border-[#27211a] hover:border-[#3d3224] text-[#8e7b68] hover:text-[#ded2c1]"
                  }`}
                >
                  <span className={`text-xs sm:text-sm font-bold whitespace-nowrap ${controlMode === "host" ? "text-[#f2e9d6]" : "text-[#d6c7b2]"}`}>
                    Host controls
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Launch Button Section */}
          <div className="pt-4 sm:pt-5 border-t border-[#27211a]">
            <button
              onClick={handleLaunch}
              disabled={isLaunching || !partyName.trim()}
              className="w-full flex items-center justify-center py-4 rounded-2xl bg-[#c8962e] hover:bg-[#dba940] active:scale-[0.99] text-[#0c0a07] font-black text-sm sm:text-base tracking-wide transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
            >
              {isLaunching ? (
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-[#0c0a07] border-t-transparent rounded-full animate-spin" />
                  <span>Launching Room...</span>
                </div>
              ) : (
                <span>Launch Cinema Room</span>
              )}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
