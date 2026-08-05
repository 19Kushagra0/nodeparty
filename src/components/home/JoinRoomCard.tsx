"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "@/icons";

export default function JoinRoomCard() {
  const router = useRouter();
  const [roomIdInput, setRoomIdInput] = useState("");

  const handleCreateRoom = () => {
    // Generate a random 6-character room ID
    const newRoomId = Math.random().toString(36).substring(2, 8);
    router.push(`/room/${newRoomId}`);
  };

  const handleJoinRoom = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanedId = roomIdInput.trim();
    if (cleanedId) {
      // Handle full URL or plain Room ID
      const extractedId = cleanedId.includes("/room/")
        ? cleanedId.split("/room/")[1].split("?")[0]
        : cleanedId;
      router.push(`/room/${extractedId}`);
    }
  };

  return (
    <div className="w-full max-w-md bg-slate-900/70 border border-slate-800/80 rounded-2xl p-6 shadow-2xl backdrop-blur-xl space-y-6">
      {/* Create Room Button */}
      <button
        onClick={handleCreateRoom}
        className="w-full group relative inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-semibold shadow-lg shadow-red-600/25 hover:shadow-red-600/40 transition-all duration-200 active:scale-[0.98] cursor-pointer"
      >
        <Plus className="w-5 h-5 transition-transform group-hover:scale-110" />
        Create New Room
      </button>

      <div className="flex items-center gap-4 text-xs font-medium text-slate-500 uppercase tracking-widest">
        <div className="h-[1px] flex-1 bg-slate-800" />
        <span>or join existing</span>
        <div className="h-[1px] flex-1 bg-slate-800" />
      </div>

      {/* Join Room Form */}
      <form onSubmit={handleJoinRoom} className="space-y-3">
        <div className="relative">
          <input
            type="text"
            placeholder="Enter Room Code or Link..."
            value={roomIdInput}
            onChange={(e) => setRoomIdInput(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-red-500/60 focus:ring-1 focus:ring-red-500/60 text-sm transition-all"
          />
        </div>
        <button
          type="submit"
          disabled={!roomIdInput.trim()}
          className="w-full px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:hover:bg-slate-800 text-slate-200 font-medium text-sm transition-all active:scale-[0.98] cursor-pointer"
        >
          Join Room
        </button>
      </form>
    </div>
  );
}
