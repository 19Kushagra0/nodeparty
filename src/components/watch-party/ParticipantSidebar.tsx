"use client";

import { Users, Info } from "@/icons";
import { useRoom, Role } from "@/contexts/RoomProvider";

export function ParticipantSidebar() {
  const { participants, userRole, changeParticipantRole } = useRoom();

  const renderRoleBadge = (role: Role) => {
    switch (role) {
      case "host":
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-red-950 text-red-400 border border-red-500/30">
            Host
          </span>
        );
      case "moderator":
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-950 text-amber-400 border border-amber-500/30">
            Mod
          </span>
        );
      case "participant":
      default:
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-800 text-slate-400">
            Viewer
          </span>
        );
    }
  };

  const renderAvatar = (role: Role, name: string) => {
    const initial = name.charAt(0).toUpperCase();
    switch (role) {
      case "host":
        return (
          <div className="w-7 h-7 rounded-full bg-red-600/20 border border-red-500/40 text-red-400 text-xs font-bold flex items-center justify-center">
            {initial}
          </div>
        );
      case "moderator":
        return (
          <div className="w-7 h-7 rounded-full bg-amber-600/20 border border-amber-500/40 text-amber-400 text-xs font-bold flex items-center justify-center">
            {initial}
          </div>
        );
      case "participant":
      default:
        return (
          <div className="w-7 h-7 rounded-full bg-slate-700 text-slate-300 text-xs font-bold flex items-center justify-center">
            {initial}
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* User List Panel */}
      <div className="bg-slate-900/70 border border-slate-800/80 rounded-2xl p-4 flex flex-col gap-3 backdrop-blur-md">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
            <Users className="w-4 h-4 text-indigo-400" />
            Participants ({participants.length})
          </h3>
          <span className="text-[10px] bg-indigo-950 text-indigo-400 border border-indigo-500/30 px-2 py-0.5 rounded-full font-mono">
            Live
          </span>
        </div>

        <div className="space-y-2">
          {participants.map((p) => (
            <div
              key={p.id}
              className={`flex items-center justify-between p-2 rounded-lg border ${
                p.isMe
                  ? "bg-slate-950/60 border-slate-700"
                  : "bg-slate-950/40 border-slate-800/40"
              }`}
            >
              <div className="flex items-center gap-2">
                {renderAvatar(p.role, p.name)}
                <div>
                  <div className="text-xs font-medium text-slate-200">
                    {p.name}
                  </div>
                  <div className="text-[10px] text-slate-500 capitalize">
                    {p.role}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                {renderRoleBadge(p.role)}

                {/* Role Management Dropdown - Only Hosts can see it, and only for other users */}
                {userRole === "host" && !p.isMe && (
                  <select
                    className="ml-2 bg-slate-800 text-slate-300 text-[10px] rounded px-1 py-0.5 border border-slate-700 outline-none cursor-pointer hover:bg-slate-700 transition-colors"
                    value={p.role}
                    onChange={(e) => changeParticipantRole(p.id, e.target.value as Role)}
                  >
                    <option value="host">Promote to Host</option>
                    <option value="moderator">Make Mod</option>
                    <option value="participant">Make Viewer</option>
                  </select>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Activity / Event Feed */}
      <div className="flex-1 bg-slate-900/70 border border-slate-800/80 rounded-2xl p-4 flex flex-col gap-3 backdrop-blur-md min-h-[220px]">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 border-b border-slate-800 pb-3 flex items-center gap-2">
          <Info className="w-4 h-4 text-emerald-400" />
          Room Activity
        </h3>
        <div className="flex-1 space-y-2 text-xs font-mono overflow-y-auto">
          <div className="text-slate-500">
            [System] Room created successfully.
          </div>
          <div className="text-emerald-400">[Join] Sarah joined the room.</div>
          <div className="text-emerald-400">[Join] John joined the room.</div>
          <div className="text-slate-400">[Event] Alex paused playback.</div>
        </div>
      </div>
    </div>
  );
}
