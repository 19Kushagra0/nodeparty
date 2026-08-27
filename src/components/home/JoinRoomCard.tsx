"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Plus, Zap, Radio, Check } from "@/icons";
import { useRoomStore } from "@/store/useRoomStore";

export default function JoinRoomCard() {
  const router = useRouter();
  const { setCreateModalOpen } = useRoomStore();
  const [activeTab, setActiveTab] = useState<"quick" | "code">("quick");
  const [roomIdInput, setRoomIdInput] = useState("");
  const [isJoining, setIsJoining] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Global Keyboard Shortcut: Press '/' or 'Cmd/Ctrl+K' to focus room code
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isInputActive =
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA";

      if ((e.key === "/" && !isInputActive) || ((e.metaKey || e.ctrlKey) && e.key === "k")) {
        e.preventDefault();
        setActiveTab("code");
        setTimeout(() => {
          inputRef.current?.focus();
          inputRef.current?.select();
        }, 50);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

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
    <div className="w-full bg-[#161310] border border-[#27211a] rounded-2xl p-6 text-left space-y-5 shadow-2xl">
      {/* Tab Header (Flat, un-nested tab bar with high contrast) */}
      <div className="flex items-center gap-2 border-b border-[#27211a] pb-3">
        <button
          type="button"
          onClick={() => setActiveTab("quick")}
          className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            activeTab === "quick"
              ? "bg-[#c8962e] text-[#0c0a07] shadow-sm"
              : "text-[#d6c8b0] hover:text-[#f2e9d6] hover:bg-[#27211a]/50"
          }`}
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Launch Room</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setActiveTab("code");
            setTimeout(() => inputRef.current?.focus(), 50);
          }}
          className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            activeTab === "code"
              ? "bg-[#27211a] text-[#f2e9d6] border border-[#3a3022]"
              : "text-[#d6c8b0] hover:text-[#f2e9d6] hover:bg-[#27211a]/50"
          }`}
        >
          <Radio className="w-3.5 h-3.5 text-[#c8962e]" />
          <span>Join with Code</span>
          <kbd className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-[#2c251e] text-[10px] font-mono font-bold text-[#f2e9d6] border border-[#524332]">
            /
          </kbd>
        </button>
      </div>

      {activeTab === "quick" ? (
        <div className="space-y-4">
          <div className="space-y-1">
            <h2 className="text-sm font-bold text-[#f2e9d6]">Instant Cinema Room</h2>
            <p className="text-xs text-[#c4b59d] leading-relaxed">
              Create a private synchronized room in seconds. Invite friends with zero setup.
            </p>
          </div>

          <button
            onClick={handleQuickCreate}
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#c8962e] hover:bg-[#dba940] active:scale-[0.98] text-[#0c0a07] font-bold text-sm transition-all cursor-pointer shadow-lg shadow-amber-950/20"
          >
            <Plus className="w-4 h-4" />
            <span>Enter Cinema</span>
          </button>

          <div className="pt-1 flex items-center justify-center gap-4 text-xs font-medium">
            <span className="flex items-center gap-1.5 text-[#ded3be]">
              <Zap className="w-3.5 h-3.5 text-[#c8962e]" /> Zero Sign-Up
            </span>
            <span className="text-[#524332]">•</span>
            <span className="flex items-center gap-1.5 text-[#ded3be]">
              <Check className="w-3.5 h-3.5 text-[#c8962e]" /> Sub-Frame Sync
            </span>
          </div>
        </div>
      ) : (
        <form onSubmit={handleJoinRoom} className="space-y-4">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-[#f2e9d6] flex items-center gap-1.5">
                <span>Room Code or Invite URL</span>
                <kbd className="px-1.5 py-0.5 rounded bg-[#2c251e] text-[10px] font-mono font-bold text-[#f2e9d6] border border-[#524332]">
                  /
                </kbd>
              </label>
              <button
                type="button"
                onClick={handlePasteCode}
                className="text-xs text-[#c8962e] hover:text-[#dba940] font-semibold cursor-pointer underline underline-offset-2"
              >
                Paste Clipboard
              </button>
            </div>
            <div className="relative">
              <input
                ref={inputRef}
                type="text"
                placeholder="e.g. CYBER-4096 or room/abc123"
                value={roomIdInput}
                onChange={(e) => setRoomIdInput(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[#0c0a07] border border-[#3a3022] text-[#f2e9d6] placeholder-[#7d6f5c] text-sm focus:outline-none focus:border-[#c8962e] transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={!roomIdInput.trim() || isJoining}
            className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-[#27211a] hover:bg-[#3a3022] disabled:opacity-40 text-[#f2e9d6] font-bold text-sm border border-[#3a3022] transition-colors cursor-pointer disabled:cursor-not-allowed"
          >
            {isJoining ? (
              <span className="w-4 h-4 border-2 border-[#f2e9d6] border-t-transparent rounded-full animate-spin" />
            ) : (
              <span>Connect to Room</span>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
