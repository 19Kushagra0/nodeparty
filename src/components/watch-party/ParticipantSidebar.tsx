"use client";

import { useState } from "react";
import {
  MessageSquare,
  Users,
  ListVideo,
  Settings,
  Send,
  Plus,
  Play,
  ThumbsUp,
  Crown,
  ShieldCheck,
  Mic,
  MicOff,
  Zap,
} from "@/icons";
import { useRoomStore } from "@/store/useRoomStore";
import { Role } from "@/types";

export function ParticipantSidebar() {
  const {
    activeSidebarTab,
    setActiveSidebarTab,
    participants,
    messages,
    sendMessage,
    addMessageReaction,
    triggerReaction,
    queue,
    addToQueue,
    voteQueueItem,
    playQueueItem,
    userRole,
    roomPasscode,
    syncDriftMs,
    resyncWithHost,
    isResyncing,
    toggleMuteParticipant,
    changeParticipantRole,
  } = useRoomStore();

  const [inputMessage, setInputMessage] = useState("");
  const [isAddingToQueue, setIsAddingToQueue] = useState(false);
  const [newQueueTitle, setNewQueueTitle] = useState("");
  const [newQueueUrl, setNewQueueUrl] = useState("");

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputMessage.trim()) {
      sendMessage(inputMessage.trim());
      setInputMessage("");
    }
  };

  const handleAddQueue = (e: React.FormEvent) => {
    e.preventDefault();
    if (newQueueTitle.trim()) {
      addToQueue({
        title: newQueueTitle.trim(),
        channel: "YouTube Selection",
        duration: "04:15",
        thumbnail: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=600&auto=format&fit=crop",
        url: newQueueUrl.trim() || "https://www.youtube.com/watch?v=jfKfPfyJRdk",
      });
      setNewQueueTitle("");
      setNewQueueUrl("");
      setIsAddingToQueue(false);
    }
  };

  const getRoleBadge = (role: Role) => {
    switch (role) {
      case "host":
        return (
          <span className="text-xs font-mono bg-rose-500/20 text-rose-300 border border-rose-500/30 px-1.5 py-0.5 rounded font-bold flex items-center gap-1">
            <Crown className="w-2.5 h-2.5 text-rose-400" />
            <span>HOST</span>
          </span>
        );
      case "moderator":
        return (
          <span className="text-xs font-mono bg-amber-500/20 text-amber-300 border border-amber-500/30 px-1.5 py-0.5 rounded font-bold flex items-center gap-1">
            <ShieldCheck className="w-2.5 h-2.5 text-amber-400" />
            <span>MOD</span>
          </span>
        );
      case "participant":
      default:
        return (
          <span className="text-xs font-mono bg-[#141722] text-zinc-400 border border-white/[0.06] px-1.5 py-0.5 rounded font-medium">
            VIEWER
          </span>
        );
    }
  };

  return (
    <div className="w-full bg-[#07080b] lg:bg-black border-t lg:border border-white/[0.08] lg:rounded-[20px] p-4 sm:p-5 flex flex-col justify-between shadow-xl min-h-[580px] lg:h-full">
      {/* Top Tabs Switcher (Segmented Control) */}
      <div className="flex items-center p-1 bg-[#0a0c12] rounded-xl border border-white/[0.06] mb-4 relative">
        <button
          onClick={() => setActiveSidebarTab("chat")}
          className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            activeSidebarTab === "chat"
              ? "bg-white/[0.08] text-white shadow-sm ring-1 ring-white/10"
              : "text-zinc-500 hover:text-zinc-300"
          }`}
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Chat</span>
        </button>

        <button
          onClick={() => setActiveSidebarTab("crew")}
          className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            activeSidebarTab === "crew"
              ? "bg-white/[0.08] text-white shadow-sm ring-1 ring-white/10"
              : "text-zinc-500 hover:text-zinc-300"
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          <span>Crew ({participants.length})</span>
        </button>

        <button
          onClick={() => setActiveSidebarTab("queue")}
          className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            activeSidebarTab === "queue"
              ? "bg-white/[0.08] text-white shadow-sm ring-1 ring-white/10"
              : "text-zinc-500 hover:text-zinc-300"
          }`}
        >
          <ListVideo className="w-3.5 h-3.5" />
          <span>Queue ({queue.length})</span>
        </button>

        <button
          onClick={() => setActiveSidebarTab("settings")}
          className={`p-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center ml-1 ${
            activeSidebarTab === "settings"
              ? "bg-white/[0.08] text-white shadow-sm ring-1 ring-white/10"
              : "text-zinc-500 hover:text-zinc-300"
          }`}
          title="Room Settings"
        >
          <Settings className="w-4 h-4" />
        </button>
      </div>

      {/* Tab 1: Live Chat */}
      {activeSidebarTab === "chat" && (
        <div className="flex-1 flex flex-col justify-between space-y-4 overflow-hidden">
          {/* Messages Feed */}
          <div className="flex-1 space-y-3.5 overflow-y-auto pr-1 max-h-[440px] text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`group/msg flex items-start gap-3 p-2 rounded transition-colors ${
                  msg.isSystem
                    ? "bg-white/[0.02] border-l-2 border-zinc-600 text-zinc-400 font-mono text-[11px]"
                    : "hover:bg-white/[0.03]"
                }`}
              >
                {/* Avatar */}
                <div
                  className={`w-6 h-6 rounded bg-[#101218] flex items-center justify-center text-[10px] font-mono font-bold text-zinc-300 shrink-0 border border-white/[0.08] shadow-sm`}
                >
                  {msg.senderName[0]}
                </div>

                <div className="flex-1 min-w-0 space-y-1">
                  {/* Sender Header */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-zinc-200 text-xs truncate">
                        {msg.senderName}
                      </span>
                      {getRoleBadge(msg.senderRole)}
                    </div>
                    <span className="text-xs font-mono text-zinc-500 shrink-0">
                      {msg.timestamp}
                    </span>
                  </div>

                  {/* Message Content */}
                  <p className="text-zinc-300 text-xs leading-relaxed break-words">
                    {msg.text}
                  </p>

                  {/* Reactions on this message */}
                  {msg.reactions && Object.keys(msg.reactions).length > 0 && (
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      {Object.entries(msg.reactions).map(([emoji, count]) => (
                        <button
                          key={emoji}
                          onClick={() => addMessageReaction(msg.id, emoji)}
                          className="px-2 py-0.5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.08] text-xs font-mono text-zinc-300 flex items-center gap-1 cursor-pointer transition-colors"
                        >
                          <span>{emoji}</span>
                          <span className="font-bold">{count}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Quick Reaction Tap Bar */}
          <div className="flex items-center gap-1 pt-2 border-t border-white/[0.06]">
            {["🔥", "🍿", "😂", "❤️", "👏", "🎉"].map((emoji) => (
              <button
                key={emoji}
                onClick={() => triggerReaction(emoji)}
                className="text-base hover:scale-125 transition-transform p-1 cursor-pointer"
                title={`Send ${emoji}`}
              >
                {emoji}
              </button>
            ))}
          </div>

          {/* Chat Message Input */}
          <form onSubmit={handleSendMessage} className="flex items-center gap-2 pt-2 border-t border-white/[0.06]">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Message lounge..."
              className="flex-1 px-3 py-2 rounded bg-[#0a0c12] border border-white/[0.08] text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-white/20 transition-colors"
            />
            <button
              type="submit"
              disabled={!inputMessage.trim()}
              className="p-2 rounded bg-white text-black hover:bg-zinc-200 disabled:opacity-20 transition-colors cursor-pointer shrink-0"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}

      {/* Tab 2: Crew & Roles */}
      {activeSidebarTab === "crew" && (
        <div className="flex-1 flex flex-col justify-between space-y-4">
          <div className="space-y-2.5 overflow-y-auto max-h-[440px] pr-1">
            {participants.map((p) => (
              <div
                key={p.id}
                className="p-2.5 rounded bg-transparent border-b border-white/[0.04] last:border-b-0 hover:bg-white/[0.02] transition-colors flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  {/* Avatar with speaking wave */}
                  <div className="relative">
                    <div
                      className="w-8 h-8 rounded bg-[#101218] flex items-center justify-center text-[10px] font-mono font-bold text-zinc-300 border border-white/[0.08]"
                    >
                      {p.name[0]}
                    </div>
                    {p.isSpeaking && (
                      <span className="absolute -bottom-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-black" />
                    )}
                  </div>

                  <div className="min-w-0 space-y-0.5">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-zinc-100 text-xs truncate">
                        {p.name}
                      </span>
                      {p.isMe && (
                        <span className="text-xs text-zinc-500 font-normal">
                          (You)
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-zinc-400 font-mono truncate">
                      {p.statusText || "Synced in lounge"}
                    </p>
                  </div>
                </div>

                {/* Role Switcher or Badge */}
                <div className="flex items-center gap-2">
                  {userRole === "host" && !p.isMe ? (
                    <select
                      value={p.role}
                      onChange={(e) => changeParticipantRole(p.id, e.target.value as Role)}
                      className="bg-zinc-900 border border-white/[0.1] text-zinc-300 text-xs font-bold rounded-lg px-2 py-1 outline-none cursor-pointer"
                    >
                      <option value="host">Make Host 👑</option>
                      <option value="moderator">Make Mod ⭐</option>
                      <option value="participant">Viewer</option>
                    </select>
                  ) : (
                    getRoleBadge(p.role)
                  )}

                  {/* Mic mute/unmute */}
                  <button
                    onClick={() => toggleMuteParticipant(p.id)}
                    className="p-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-zinc-400 hover:text-white transition-colors cursor-pointer"
                    title={p.isMuted ? "Unmute Mic" : "Mute Mic"}
                  >
                    {p.isMuted ? <MicOff className="w-3.5 h-3.5 text-rose-400" /> : <Mic className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Resync Engine Action */}
          <div className="pt-3 border-t border-white/[0.06] space-y-2">
            <button
              onClick={resyncWithHost}
              className={`w-full py-2.5 rounded-xl bg-cyan-950/40 hover:bg-cyan-900/50 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer ${
                isResyncing ? "animate-pulse" : ""
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>{isResyncing ? "Recalibrating Sync..." : `Resync with Host (${syncDriftMs}ms)`}</span>
            </button>
          </div>
        </div>
      )}

      {/* Tab 3: Up Next Queue */}
      {activeSidebarTab === "queue" && (
        <div className="flex-1 flex flex-col justify-between space-y-4">
          <div className="space-y-2.5 overflow-y-auto max-h-[420px] pr-1">
            {queue.map((item, idx) => (
              <div
                key={item.id}
                className={`group/qitem relative p-2 rounded border-l-2 transition-colors flex items-center justify-between gap-3 ${
                  item.isPlaying
                    ? "bg-rose-500/10 border-rose-500"
                    : "bg-transparent border-transparent hover:bg-white/[0.02] border-b border-b-white/[0.04]"
                }`}
              >
                {/* Thumbnail + Rank Badge */}
                <div className="relative w-16 h-11 rounded-lg overflow-hidden shrink-0 bg-zinc-900">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  {item.isPlaying ? (
                    <div className="absolute inset-0 bg-rose-600/70 flex items-center justify-center">
                      <Play className="w-4 h-4 fill-white text-white" />
                    </div>
                  ) : (
                    <div className="absolute top-1 left-1 px-1.5 py-0.2 rounded bg-black/80 text-xs font-mono font-bold text-zinc-300">
                      #{idx}
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0 space-y-0.5">
                  <div className="flex items-center gap-1.5">
                    {item.isPlaying && (
                      <span className="text-xs font-mono font-bold uppercase tracking-wider text-rose-400 bg-rose-500/10 px-1 rounded">
                        NOW PLAYING
                      </span>
                    )}
                  </div>
                  <h4 className="text-xs font-bold text-white truncate">
                    {item.title}
                  </h4>
                  <div className="flex items-center gap-2 text-xs text-zinc-400 font-mono">
                    <span>{item.duration}</span>
                    <span>•</span>
                    <span className="text-zinc-500">{item.addedBy}</span>
                  </div>
                </div>

                {/* Queue Actions: Upvote button */}
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => voteQueueItem(item.id)}
                    className={`px-2.5 py-1.5 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                      item.hasVoted
                        ? "bg-rose-500 hover:bg-rose-600 text-white"
                        : "bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-white/[0.06]"
                    }`}
                    title="Upvote Video to Move Up"
                  >
                    <ThumbsUp className={`w-3.5 h-3.5 ${item.hasVoted ? "fill-white" : ""}`} />
                    <span>{item.votes}</span>
                  </button>

                  {userRole !== "participant" && !item.isPlaying && (
                    <button
                      onClick={() => playQueueItem(item.id)}
                      className="p-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white transition-colors cursor-pointer"
                      title="Play Next Immediately"
                    >
                      <Play className="w-3.5 h-3.5 fill-white" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Add to Queue Button / Form */}
          <div className="pt-3 border-t border-white/[0.06]">
            {isAddingToQueue ? (
              <form onSubmit={handleAddQueue} className="space-y-2">
                <input
                  type="text"
                  placeholder="Video Title or Subject..."
                  value={newQueueTitle}
                  onChange={(e) => setNewQueueTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#141722] border border-white/[0.08] text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-rose-500"
                />
                <input
                  type="text"
                  placeholder="YouTube URL (optional)..."
                  value={newQueueUrl}
                  onChange={(e) => setNewQueueUrl(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#141722] border border-white/[0.08] text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-rose-500"
                />
                <div className="flex gap-2">
                  <button
                    type="submit"
                    disabled={!newQueueTitle.trim()}
                    className="flex-1 py-2 rounded-xl bg-rose-500 hover:bg-rose-600 disabled:opacity-40 text-white text-xs font-bold transition-colors cursor-pointer"
                  >
                    Submit to Queue
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsAddingToQueue(false)}
                    className="px-3 py-2 rounded-xl bg-[#141722] text-zinc-400 text-xs font-semibold hover:text-white transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <button
                onClick={() => setIsAddingToQueue(true)}
                className="w-full py-2.5 rounded-xl bg-[#141722] hover:bg-[#1a1e2c] border border-white/[0.08] text-zinc-200 hover:text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4 text-rose-400" />
                <span>Suggest Next Video</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Tab 4: Room Settings */}
      {activeSidebarTab === "settings" && (
        <div className="flex-1 space-y-4 text-xs text-left">
          <div className="p-4 rounded-xl bg-[#141722] border border-white/[0.06] space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-xs font-mono">
              Lounge Security & Sync
            </h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-zinc-300">
                <span>Room Passcode</span>
                <span className="font-mono font-bold text-rose-400">{roomPasscode}</span>
              </div>
              <div className="flex items-center justify-between text-zinc-300">
                <span>Drift Tolerance</span>
                <span className="font-mono text-cyan-400">&plusmn;15ms (Ultra)</span>
              </div>
              <div className="flex items-center justify-between text-zinc-300">
                <span>Spatial Voice</span>
                <span className="text-emerald-400 font-semibold">Enabled</span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#141722] border border-white/[0.06] space-y-2">
            <h4 className="font-bold text-white uppercase tracking-wider text-xs font-mono">
              Host Controls
            </h4>
            <p className="text-zinc-400 text-xs leading-relaxed">
              As Host, you have exclusive control over video seeking, queue playback priorities, and room moderation.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
