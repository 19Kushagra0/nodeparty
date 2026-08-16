"use client";

import { Users, Info } from "@/icons";
import { useRoomStore } from "@/store/useRoomStore";
import type { Role } from "@/types";

export function ParticipantSidebar() {
  const { participants, userRole, changeParticipantRole } = useRoomStore();

  const getRoleStyle = (role: Role) => {
    switch (role) {
      case "host":
        return "bg-rose-950/80 text-rose-300 border-rose-800/60 hover:bg-rose-900/80";
      case "moderator":
        return "bg-amber-950/80 text-amber-300 border-amber-800/60 hover:bg-amber-900/80";
      case "participant":
      default:
        return "bg-zinc-800/90 text-zinc-300 border-zinc-700/70 hover:bg-zinc-700/80";
    }
  };

  const getRoleLabel = (role: Role) => {
    switch (role) {
      case "host":
        return "Host";
      case "moderator":
        return "Mod";
      case "participant":
      default:
        return "Viewer";
    }
  };

  const renderAvatar = (role: Role, name: string) => {
    const initial = name.charAt(0).toUpperCase();
    return (
      <div className="relative">
        <div
          className={`w-8 h-8 rounded-full text-xs font-bold flex items-center justify-center border shadow-sm ${role === "host"
              ? "bg-rose-950/90 border-rose-700/80 text-rose-300"
              : role === "moderator"
                ? "bg-amber-950/90 border-amber-700/80 text-amber-300"
                : "bg-zinc-800 border-zinc-700 text-zinc-200"
            }`}
        >
          {initial}
        </div>
        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-zinc-900" />
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-5">
      {/* User List Panel */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 flex flex-col gap-3.5 shadow-sm">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-300 flex items-center gap-2">
            <Users className="w-4 h-4 text-zinc-400" />
            Participants ({participants.length})
          </h3>
          <span className="text-[10px] bg-emerald-950/60 text-emerald-400 border border-emerald-800/40 px-2.5 py-0.5 rounded-full font-mono font-medium flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Live Sync
          </span>
        </div>

        <div className="space-y-2">
          {participants.map((p) => (
            <div
              key={p.id}
              className={`flex items-center justify-between p-2.5 rounded-xl border transition-all ${p.isMe
                  ? "bg-zinc-950 border-zinc-700/90 shadow-sm"
                  : "bg-zinc-950/60 border-zinc-800/60 hover:border-zinc-700/60"
                }`}
            >
              <div className="flex items-center gap-3">
                {renderAvatar(p.role, p.name)}
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-semibold text-zinc-100">
                    {p.name}
                  </span>
                  {p.isMe && (
                    <span className="text-[10px] text-zinc-400 font-normal">
                      (You)
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center">
                {userRole === "host" && !p.isMe ? (
                  <div className="relative inline-flex items-center">
                    <select
                      className={`appearance-none text-[11px] font-semibold rounded-lg px-2.5 py-1 pr-6 border cursor-pointer outline-none transition-colors ${getRoleStyle(
                        p.role
                      )}`}
                      value={p.role}
                      onChange={(e) =>
                        changeParticipantRole(p.id, e.target.value as Role)
                      }
                    >
                      <option value="host" className="bg-zinc-900 text-rose-300">
                        Host
                      </option>
                      <option value="moderator" className="bg-zinc-900 text-amber-300">
                        Mod
                      </option>
                      <option value="participant" className="bg-zinc-900 text-zinc-300">
                        Viewer
                      </option>
                    </select>
                    {/* Chevron down overlay for custom select look */}
                    <svg
                      className="w-3 h-3 absolute right-2 pointer-events-none text-zinc-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                ) : (
                  <span
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border ${getRoleStyle(
                      p.role
                    )}`}
                  >
                    {getRoleLabel(p.role)}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Activity / Event Feed */}
      <div className="flex-1 bg-zinc-900 border border-zinc-800 rounded-2xl p-4 flex flex-col gap-3 shadow-sm min-h-[220px]">
        <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-300 border-b border-zinc-800 pb-3 flex items-center gap-2">
          <Info className="w-4 h-4 text-zinc-400" />
          Room Activity
        </h3>
        <div className="flex-1 space-y-2 text-xs font-mono overflow-y-auto">
          <div className="text-zinc-500">
            [System] Watch room created successfully.
          </div>
          <div className="text-emerald-400">[Join] Sarah joined the room.</div>
          <div className="text-emerald-400">[Join] John joined the room.</div>
          <div className="text-zinc-400">[Event] Alex paused playback.</div>
        </div>
      </div>
    </div>
  );
}
