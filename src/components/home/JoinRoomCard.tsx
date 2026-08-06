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
    <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl space-y-6 text-left">
      {/* Create Room Primary CTA */}
      <button
        onClick={handleCreateRoom}
        className="w-full group relative inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-rose-600 hover:bg-rose-500 active:bg-rose-700 text-white font-semibold shadow-sm transition-colors cursor-pointer"
      >
        <Plus className="w-5 h-5 transition-transform group-hover:scale-105" />
        Create New Watch Party
      </button>

      <div className="flex items-center gap-4 text-xs font-medium text-zinc-500 uppercase tracking-wider">
        <div className="h-[1px] flex-1 bg-zinc-800" />
        <span>or join room</span>
        <div className="h-[1px] flex-1 bg-zinc-800" />
      </div>

      {/* Join Room Form */}
      <form onSubmit={handleJoinRoom} className="space-y-3">
        <div>
          <input
            type="text"
            placeholder="Enter Room Code or Link..."
            value={roomIdInput}
            onChange={(e) => setRoomIdInput(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500/30 text-sm transition-colors"
          />
        </div>
        <button
          type="submit"
          disabled={!roomIdInput.trim()}
          className="w-full px-5 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 disabled:opacity-40 disabled:hover:bg-zinc-800 text-zinc-200 font-medium text-sm transition-colors cursor-pointer"
        >
          Join Watch Room
        </button>
      </form>
    </div>
  );
}
