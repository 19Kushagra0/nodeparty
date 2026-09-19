"use client";

import { useRoomStore } from "@/store/useRoomStore";
import { useRoomTheme } from "@/hooks/useRoomTheme";
import { Play, ThumbsUp, Trash2 } from "lucide-react";

export function YoutubeUpNextQueue() {
  const { queue, voteQueueItem, playQueueItem, removeFromQueue } = useRoomStore();
  const t = useRoomTheme();

  const nowPlaying = queue.find((q) => q.isPlaying) || queue[0];
  const upcomingQueue = queue.filter((q) => q !== nowPlaying);

  return (
    <div className="flex-1 min-h-0 flex flex-col font-sans overflow-hidden">
      {/* 1. Header Bar */}
      <div className="flex items-center justify-between pb-2.5 px-1 shrink-0 border-b mb-2.5" style={{ borderColor: t.border }}>
        <div className="flex items-baseline gap-2">
          <h3 className="text-xs font-semibold leading-none" style={{ color: t.text }}>
            Queue
          </h3>
          <span className="text-[11px] font-normal" style={{ color: t.muted }}>
            {queue.length} {queue.length === 1 ? "video" : "videos"}
          </span>
        </div>
      </div>

      {/* Scrollable Container */}
      <div className="flex-1 min-h-0 overflow-y-auto space-y-3 pr-1 pb-3">
        {/* 2. "Now Playing" Stage Track */}
        {nowPlaying && (
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between px-1">
              <span className="text-[11px] font-medium flex items-center gap-1.5" style={{ color: t.muted }}>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                Now playing
              </span>
              {nowPlaying.duration && (
                <span className="text-[11px] font-normal" style={{ color: t.muted }}>
                  {nowPlaying.duration}
                </span>
              )}
            </div>

            <div
              className="relative p-2.5 rounded-xl border transition-all duration-200 overflow-hidden"
              style={{
                backgroundColor: t.isDark ? "rgba(255,255,255,0.03)" : t.surface,
                borderColor: t.border,
              }}
            >
              <div className="flex gap-2.5 items-start">
                {/* Thumbnail */}
                <div className="relative w-24 aspect-video rounded-lg overflow-hidden shrink-0 bg-black/20 border" style={{ borderColor: t.border }}>
                  <img
                    src={nowPlaying.thumbnail}
                    alt={nowPlaying.title}
                    className="w-full h-full object-cover"
                  />
                  {/* YouTube Duration badge */}
                  {nowPlaying.duration && (
                    <div className="absolute bottom-1 right-1 bg-black/80 px-1 py-0.5 rounded text-[9px] font-medium text-white leading-none">
                      {nowPlaying.duration}
                    </div>
                  )}
                  {/* Animated Equalizer Wave Overlay */}
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center pointer-events-none">
                    <div className="flex items-end gap-0.5 h-2.5 px-1 py-0.5 rounded bg-black/40 backdrop-blur-xs">
                      <span className="w-0.5 bg-white rounded-full animate-[bounce_1s_infinite_100ms] h-full" />
                      <span className="w-0.5 bg-white rounded-full animate-[bounce_1s_infinite_300ms] h-3/4" />
                      <span className="w-0.5 bg-white rounded-full animate-[bounce_1s_infinite_200ms] h-1/2" />
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0 flex flex-col justify-between self-stretch">
                  <div>
                    <h4
                      className="text-[13px] font-medium leading-snug line-clamp-2 cursor-pointer hover:underline"
                      style={{ color: t.text }}
                      title={nowPlaying.title}
                    >
                      {nowPlaying.title}
                    </h4>
                    <p className="text-[11px] font-normal truncate mt-1" style={{ color: t.muted }}>
                      {nowPlaying.channel}
                    </p>
                  </div>
                  <div className="flex items-center justify-between text-[10px] font-normal mt-1.5" style={{ color: t.muted }}>
                    <span className="truncate">Added by {nowPlaying.addedBy}</span>
                    <span className="font-medium text-emerald-600 dark:text-emerald-400 shrink-0 ml-1">Playing</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 3. Upcoming Up-Next List */}
        <div className="flex flex-col gap-1.5 pt-1">
          <div className="flex items-center justify-between px-1">
            <span className="text-[11px] font-medium" style={{ color: t.muted }}>
              Next in queue {upcomingQueue.length > 0 ? `(${upcomingQueue.length})` : ""}
            </span>
          </div>

          {upcomingQueue.length === 0 ? (
            <div
              className="rounded-xl p-5 text-center flex flex-col items-center justify-center gap-1.5 border"
              style={{
                borderColor: t.border,
                backgroundColor: t.isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.015)",
              }}
            >
              <p className="text-xs font-medium" style={{ color: t.text }}>
                Queue is empty
              </p>
              <p className="text-[11px] font-normal leading-relaxed max-w-[210px]" style={{ color: t.muted }}>
                Click &ldquo;+ Queue&rdquo; on any video below or paste a YouTube URL to add tracks.
              </p>
              <button
                type="button"
                onClick={() => {
                  const el = document.querySelector("#youtube-discovery-grid");
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
                className="mt-2 px-3 py-1.5 rounded-full text-[11px] font-medium transition-all active:scale-95 cursor-pointer border shadow-2xs hover:opacity-90"
                style={{
                  borderColor: t.border,
                  color: t.text,
                  backgroundColor: t.isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
                }}
              >
                Browse videos
              </button>
            </div>
          ) : (
            <div className="space-y-1.5">
              {upcomingQueue.map((item, idx) => (
                <div
                  key={item.id}
                  className="group relative p-2 rounded-xl border transition-all duration-200 flex gap-2.5 items-center hover:shadow-xs"
                  style={{
                    backgroundColor: t.isDark ? "rgba(255,255,255,0.02)" : t.surface,
                    borderColor: t.border,
                  }}
                >
                  {/* Rank Index */}
                  <span
                    className="w-4 text-center font-normal text-[11px] shrink-0"
                    style={{ color: t.muted }}
                  >
                    {idx + 1}
                  </span>

                  {/* Video Thumbnail */}
                  <div className="relative w-20 aspect-video rounded-lg overflow-hidden shrink-0 bg-black/20 border" style={{ borderColor: t.border }}>
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute bottom-1 right-1 bg-black/80 px-1 py-0.5 rounded text-[9px] font-medium text-white leading-none">
                      {item.duration}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0 flex flex-col justify-center">
                    <h4
                      className="text-[12px] sm:text-[13px] font-medium leading-snug line-clamp-2 group-hover:underline cursor-pointer"
                      style={{ color: t.text }}
                      title={item.title}
                    >
                      {item.title}
                    </h4>
                    <p className="text-[11px] font-normal truncate mt-0.5" style={{ color: t.muted }}>
                      {item.channel}
                    </p>
                    <span className="text-[10px] font-normal mt-0.5 truncate" style={{ color: t.muted }}>
                      Added by {item.addedBy}
                    </span>
                  </div>

                  {/* Actions & Voting */}
                  <div className="flex items-center gap-1 shrink-0">
                    {/* Play Now Quick Button (Shown on Hover) */}
                    <button
                      type="button"
                      onClick={() => playQueueItem(item.id)}
                      className="w-6 h-6 rounded-full flex items-center justify-center transition-all cursor-pointer opacity-0 group-hover:opacity-100 hover:scale-110 active:scale-95 shadow-xs"
                      style={{
                        backgroundColor: t.isDark ? "#ffffff" : "#18181b",
                        color: t.isDark ? "#000000" : "#ffffff",
                      }}
                      title="Play Next Now"
                    >
                      <Play className="w-3 h-3 fill-current stroke-none ml-0.5" />
                    </button>

                    {/* Upvote Pill */}
                    <button
                      type="button"
                      onClick={() => voteQueueItem(item.id)}
                      className="flex items-center gap-1 px-2 py-1 rounded-full text-[11px] font-medium transition-all cursor-pointer active:scale-95 border"
                      style={{
                        backgroundColor: item.hasVoted
                          ? (t.isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.06)")
                          : (t.isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)"),
                        color: item.hasVoted ? t.text : t.muted,
                        borderColor: item.hasVoted
                          ? (t.isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.15)")
                          : t.border,
                      }}
                      title={item.hasVoted ? "Remove vote" : "Vote up"}
                    >
                      <ThumbsUp
                        className={`w-3 h-3 ${item.hasVoted ? "fill-current" : ""}`}
                      />
                      <span>{item.votes}</span>
                    </button>

                    {/* Delete Item (Shown on Hover) */}
                    <button
                      type="button"
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
