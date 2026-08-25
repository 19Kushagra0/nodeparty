"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Zap, Sparkles, Radio, Check } from "@/icons";
import { useRoomStore } from "@/store/useRoomStore";

export default function JoinRoomCard() {
  const router = useRouter();
  const { setCreateModalOpen } = useRoomStore();
  const [activeTab, setActiveTab] = useState<"quick" | "code">("quick");
  const [roomIdInput, setRoomIdInput] = useState("");
  const [isJoining, setIsJoining] = useState(false);

  const handleQuickCreate = () => {
    setCreateModalOpen(true);
  };

  const handleJoinRoom = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanedId = roomIdInput.trim();
    if (!cleanedId) return;

    setIsJoining(true);
    const extractedId = cleanedId.includes("/room/")
      ? cleanedId.split("/room/")[1].split("?")[0]
      : cleanedId.replace("#", "");

    setTimeout(() => {
      router.push(`/room/${extractedId}`);
    }, 300);
  };

  const handlePasteCode = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setRoomIdInput(text.trim());
      }
    } catch {
      // Ignore clipboard permission errors
    }
  };

  return (
    <div className="w-full max-w-md bg-[#0e111a]/95 border border-white/[0.1] rounded-3xl p-6 shadow-2xl shadow-rose-950/30 text-left space-y-5 backdrop-blur-xl">
      {/* Switcher Tabs */}
      <div className="flex items-center p-1 bg-zinc-950/80 rounded-2xl border border-white/[0.08]">
        <button
          type="button"
          onClick={() => setActiveTab("quick")}
          className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            activeTab === "quick"
              ? "bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-md shadow-rose-950/40"
              : "text-zinc-400 hover:text-white"
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Create Party</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("code")}
          className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            activeTab === "code"
              ? "bg-zinc-800 text-white shadow-sm border border-white/[0.1]"
              : "text-zinc-400 hover:text-white"
          }`}
        >
          <Radio className="w-3.5 h-3.5 text-cyan-400" />
          <span>Join with Code</span>
        </button>
      </div>

      {activeTab === "quick" ? (
        <div className="space-y-4">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-sm font-bold text-white">Start Your Cinema Room</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Pick a video, customize privacy, and invite your crew in 5 seconds.
            </p>
          </div>

          <button
            onClick={handleQuickCreate}
            className="w-full group relative inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-rose-600 via-rose-500 to-pink-600 hover:from-rose-500 hover:to-pink-500 active:scale-[0.98] text-white font-bold text-sm shadow-xl shadow-rose-950/50 border border-rose-400/30 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4 transition-transform group-hover:rotate-90 duration-300" />
            <span>Configure & Launch Room</span>
          </button>

          <div className="pt-2 flex items-center justify-center gap-4 text-[11px] font-mono text-zinc-400">
            <span className="flex items-center gap-1">
              <Zap className="w-3 h-3 text-cyan-400" /> Zero Sign-Up
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Check className="w-3 h-3 text-emerald-400" /> Free 4K HDR
            </span>
          </div>
        </div>
      ) : (
        <form onSubmit={handleJoinRoom} className="space-y-4">
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-zinc-300">Room Code or Invite URL</label>
              <button
                type="button"
                onClick={handlePasteCode}
                className="text-[10px] text-rose-400 hover:text-rose-300 font-semibold cursor-pointer"
              >
                Paste Clipboard
              </button>
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="e.g. CYBER-4096 or room/abc123"
                value={roomIdInput}
                onChange={(e) => setRoomIdInput(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-zinc-950/90 border border-white/[0.1] text-white placeholder-zinc-500 font-mono text-sm focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500/30 transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={!roomIdInput.trim() || isJoining}
            className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-zinc-800 hover:bg-zinc-700 disabled:opacity-40 text-white font-bold text-sm border border-white/[0.08] transition-all cursor-pointer disabled:cursor-not-allowed"
          >
            {isJoining ? (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <span>Connect to Room</span>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
