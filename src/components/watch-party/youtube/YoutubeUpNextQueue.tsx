"use client";

import { useRoomStore } from "@/store/useRoomStore";
import { useRoomTheme } from "@/hooks/useRoomTheme";
import {
  ListVideo,
  Play,
  ThumbsUp,
  Trash2,
  Sparkles,
  Music2,
  Clock,
  Radio,
} from "lucide-react";

export function YoutubeUpNextQueue() {
  const { queue, voteQueueItem, playQueueItem, removeFromQueue } = useRoomStore();
  const t = useRoomTheme();

  const nowPlaying = queue.find((q) => q.isPlaying) || queue[0];
  const upcomingQueue = queue.filter((q) => q !== nowPlaying);

  return (
    <div className="flex-1 min-h-0 flex flex-col font-sans overflow-hidden">
      {/* 1. Header Bar */}
      <div className="flex items-center justify-between pb-3 px-1 shrink-0 border-b mb-3" style={{ borderColor: t.border }}>
        <div className="flex items-center gap-2">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center shadow-xs"
            style={{
              backgroundColor: t.isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.05)",
              color: t.accent,
            }}
          >
            <ListVideo className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold leading-none" style={{ color: t.text }}>
              Communal Queue
            </h3>
            <span className="text-[10px] font-medium" style={{ color: t.muted }}>
              {upcomingQueue.length} {upcomingQueue.length === 1 ? "track" : "tracks"} upcoming
            </span>
          </div>
        </div>

        <span
          className="text-[10px] font-bold px-2 py-0.5 rounded-full border"
          style={{
            backgroundColor: t.surfaceHover,
            borderColor: t.border,
            color: t.muted,
          }}
        >
          Auto-Sort by Votes
        </span>
      </div>

      {/* Scrollable Container */}
      <div className="flex-1 min-h-0 overflow-y-auto space-y-3.5 pr-1 pb-3">
        {/* 2. Pinned "Now Playing" Stage Track */}
        {nowPlaying && (
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between px-1">
              <span
                className="text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 text-rose-500"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
                </span>
                Now Playing
              </span>
              <span className="text-[10px] font-medium flex items-center gap-1" style={{ color: t.muted }}>
                <Clock className="w-3 h-3" /> {nowPlaying.duration}
              </span>
            </div>

            <div
              className="relative p-2.5 rounded-2xl border transition-all duration-300 overflow-hidden shadow-xs"
              style={{
                backgroundColor: t.isDark ? "rgba(255,255,255,0.04)" : "#ffffff",
                borderColor: t.isDark ? "rgba(244,63,94,0.3)" : "rgba(244,63,94,0.25)",
              }}
            >
              <div className="flex gap-2.5 items-start">
                {/* Thumbnail */}
                <div className="relative w-24 aspect-video rounded-xl overflow-hidden shrink-0 bg-black/20 border" style={{ borderColor: t.border }}>
                  <img
                    src={nowPlaying.thumbnail}
                    alt={nowPlaying.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/25 flex items-center justify-center">
                    {/* Animated Equalizer Wave */}
                    <div className="flex items-end gap-0.5 h-3">
                      <span className="w-1 bg-white rounded-full animate-[bounce_1s_infinite_100ms] h-full" />
                      <span className="w-1 bg-white rounded-full animate-[bounce_1s_infinite_300ms] h-3/4" />
                      <span className="w-1 bg-white rounded-full animate-[bounce_1s_infinite_200ms] h-1/2" />
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0 flex flex-col justify-between self-stretch">
                  <div>
                    <h4
                      className="text-xs font-bold truncate leading-tight hover:underline cursor-pointer"
                      style={{ color: t.text }}
                      title={nowPlaying.title}
                    >
                      {nowPlaying.title}
                    </h4>
                    <p className="text-[11px] truncate mt-0.5 font-normal" style={{ color: t.muted }}>
                      {nowPlaying.channel}
                    </p>
                  </div>
                  <div className="flex items-center justify-between text-[10px] mt-1" style={{ color: t.muted }}>
                    <span>By {nowPlaying.addedBy}</span>
                    <span className="font-semibold text-rose-500">Live on Stage</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 3. Upcoming Up-Next List */}
        <div className="flex flex-col gap-2 pt-1">
          <div className="flex items-center justify-between px-1">
            <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: t.muted }}>
              Upcoming Queue ({upcomingQueue.length})
            </span>
          </div>

          {upcomingQueue.length === 0 ? (
            <div
              className="rounded-2xl border border-dashed p-6 text-center flex flex-col items-center justify-center gap-2"
              style={{
                borderColor: t.border,
                backgroundColor: t.isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.01)",
              }}
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center mb-1"
                style={{
                  backgroundColor: t.surfaceHover,
                  color: t.muted,
                }}
              >
                <Music2 className="w-5 h-5 opacity-60" />
              </div>
              <p className="text-xs font-semibold" style={{ color: t.text }}>
                Queue is clear
              </p>
              <p className="text-[11px] max-w-[200px] leading-relaxed font-normal" style={{ color: t.muted }}>
                Click &ldquo;+ Queue&rdquo; on any video in the Discovery Grid or paste a link to add tracks!
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {upcomingQueue.map((item, idx) => (
                <div
                  key={item.id}
                  className="group relative p-2 rounded-2xl border transition-all duration-200 flex gap-2.5 items-center hover:shadow-xs"
                  style={{
                    backgroundColor: t.isDark ? "rgba(255,255,255,0.03)" : t.surface,
                    borderColor: t.border,
                  }}
                >
                  {/* Rank Index */}
                  <span
                    className="w-4 text-center font-bold text-[11px] shrink-0"
                    style={{ color: t.muted }}
                  >
                    {idx + 1}
                  </span>

                  {/* Video Thumbnail */}
                  <div className="relative w-20 aspect-video rounded-xl overflow-hidden shrink-0 bg-black/20 border" style={{ borderColor: t.border }}>
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute bottom-1 right-1 bg-black/80 px-1 py-0.2 rounded text-[9px] font-bold text-white leading-none">
                      {item.duration}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0 flex flex-col justify-center">
                    <h4
                      className="text-xs font-semibold truncate leading-tight group-hover:underline cursor-pointer"
                      style={{ color: t.text }}
                      title={item.title}
                    >
                      {item.title}
                    </h4>
                    <p className="text-[10px] truncate mt-0.5" style={{ color: t.muted }}>
                      {item.channel}
                    </p>
                    <span className="text-[9px] font-medium mt-0.5 truncate" style={{ color: t.muted }}>
                      Added by {item.addedBy}
                    </span>
                  </div>

                  {/* Actions & Voting */}
                  <div className="flex items-center gap-1 shrink-0">
                    {/* Play Now Quick Button (Shown on Hover) */}
                    <button
                      onClick={() => playQueueItem(item.id)}
                      className="w-7 h-7 rounded-full flex items-center justify-center transition-all cursor-pointer opacity-0 group-hover:opacity-100 hover:scale-110 active:scale-95 shadow-xs"
                      style={{
                        backgroundColor: t.isDark ? "#ffffff" : "#18181b",
                        color: t.isDark ? "#000000" : "#ffffff",
                      }}
                      title="Play Next Now"
                    >
                      <Play className="w-3.5 h-3.5 fill-current stroke-none ml-0.5" />
                    </button>

                    {/* Upvote Pill */}
                    <button
                      onClick={() => voteQueueItem(item.id)}
                      className="flex items-center gap-1 px-2 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer active:scale-95 border"
                      style={{
                        backgroundColor: item.hasVoted
                          ? t.accent
                          : t.isDark
                          ? "rgba(255,255,255,0.06)"
                          : "rgba(0,0,0,0.04)",
                        color: item.hasVoted ? t.accentFg : t.text,
                        borderColor: item.hasVoted ? t.accent : t.border,
                      }}
                      title={item.hasVoted ? "Remove Upvote" : "Upvote Track"}
                    >
                      <ThumbsUp
                        className={`w-3 h-3 ${item.hasVoted ? "fill-current" : ""}`}
                      />
                      <span>{item.votes}</span>
                    </button>

                    {/* Delete Item (Shown on Hover) */}
                    <button
                      onClick={() => removeFromQueue(item.id)}
                      className="w-6 h-6 rounded-full flex items-center justify-center transition-all cursor-pointer opacity-0 group-hover:opacity-100 hover:text-rose-500 hover:bg-rose-500/10 active:scale-95"
                      style={{ color: t.muted }}
                      title="Remove from Queue"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
