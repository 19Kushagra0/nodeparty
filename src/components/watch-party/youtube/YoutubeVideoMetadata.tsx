"use client";

import { useState } from "react";
import {
  ThumbsUp,
  ThumbsDown,
  Share2,
  Bookmark,
  MoreHorizontal,
  CheckCircle2,
  Bell,
} from "lucide-react";
import { useRoomTheme } from "@/hooks/useRoomTheme";
import { useRoomStore } from "@/store/useRoomStore";

export function YoutubeVideoMetadata() {
  const t = useRoomTheme();
  const queue = useRoomStore((state) => state.queue);
  const currentItem = queue.find((q) => q.isPlaying) || queue[0];

  const [isSubscribed, setIsSubscribed] = useState(false);
  const [likeState, setLikeState] = useState<"none" | "liked" | "disliked">("none");
  const [likeCount, setLikeCount] = useState(48200);
  const [isDescExpanded, setIsDescExpanded] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleLike = () => {
    if (likeState === "liked") {
      setLikeState("none");
      setLikeCount((c) => c - 1);
    } else {
      setLikeState("liked");
      setLikeCount((c) => c + 1);
    }
  };

  const handleDislike = () => {
    if (likeState === "disliked") {
      setLikeState("none");
    } else {
      if (likeState === "liked") {
        setLikeCount((c) => c - 1);
      }
      setLikeState("disliked");
    }
  };

  const formattedLikes =
    likeCount >= 1000
      ? `${(likeCount / 1000).toFixed(1).replace(".0", "")}K`
      : likeCount.toString();

  const title = currentItem?.title || "Cyberpunk 2077: Phantom Liberty — Official Cinematic 4K Trailer";
  const channel = currentItem?.channel || "CD PROJEKT RED";

  return (
    <div className="w-full px-4 sm:px-6 pt-1 pb-4 shrink-0 font-sans">
      {/* 1. Video Title */}
      <h1
        className="text-base sm:text-lg md:text-xl font-bold tracking-tight leading-snug line-clamp-2 select-text"
        style={{ color: t.text }}
      >
        {title}
      </h1>

      {/* 2. Channel Row & Action Buttons */}
      <div className="mt-3 flex flex-col md:flex-row md:items-center md:justify-between gap-3.5">
        {/* Left: Channel Avatar, Name, Subs, and Subscribe Button */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Channel Avatar */}
          <div
            className="w-10 h-10 sm:w-10.5 sm:h-10.5 rounded-full overflow-hidden border shrink-0 bg-gradient-to-tr from-rose-500 to-amber-500 flex items-center justify-center font-bold text-white text-sm shadow-sm"
            style={{ borderColor: t.border }}
          >
            {channel.slice(0, 2).toUpperCase()}
          </div>

          {/* Channel Name & Sub Count */}
          <div className="flex flex-col min-w-0 pr-1">
            <div className="flex items-center gap-1.5">
              <span
                className="text-sm font-semibold truncate hover:underline cursor-pointer"
                style={{ color: t.text }}
              >
                {channel}
              </span>
              <CheckCircle2 className="w-3.5 h-3.5 fill-zinc-500 text-white shrink-0" />
            </div>
            <span className="text-xs truncate font-normal" style={{ color: t.muted }}>
              1.48M subscribers
            </span>
          </div>

          {/* Subscribe Button */}
          <button
            onClick={() => setIsSubscribed(!isSubscribed)}
            className="ml-1 sm:ml-2 px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer flex items-center gap-1.5 active:scale-95 shadow-sm outline-none"
            style={{
              backgroundColor: isSubscribed
                ? t.isDark
                  ? "#27272a"
                  : "#e4e4e7"
                : "#cc0000",
              color: isSubscribed ? (t.isDark ? "#f4f4f5" : "#18181b") : "#ffffff",
            }}
          >
            {isSubscribed ? (
              <>
                <Bell className="w-3.5 h-3.5 fill-current stroke-none" />
                <span>Subscribed</span>
              </>
            ) : (
              <span>Subscribe</span>
            )}
          </button>
        </div>

        {/* Right: Interaction Pill Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
          {/* Like / Dislike Grouped Pill */}
          <div
            className="flex items-center rounded-full border overflow-hidden shrink-0 shadow-sm"
            style={{
              backgroundColor: t.isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.05)",
              borderColor: t.border,
            }}
          >
            <button
              onClick={handleLike}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-medium transition-colors cursor-pointer hover:bg-black/5 dark:hover:bg-white/10 active:scale-95"
              style={{
                color: likeState === "liked" ? t.accent : t.text,
              }}
              title="Like"
            >
              <ThumbsUp
                className={`w-4 h-4 ${likeState === "liked" ? "fill-current" : ""}`}
              />
              <span>{formattedLikes}</span>
            </button>

            <div
              className="w-[1px] h-4 shrink-0"
              style={{
                backgroundColor: t.isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.12)",
              }}
            />

            <button
              onClick={handleDislike}
              className="px-3 py-2 text-xs sm:text-sm font-medium transition-colors cursor-pointer hover:bg-black/5 dark:hover:bg-white/10 active:scale-95"
              style={{
                color: likeState === "disliked" ? t.accent : t.text,
              }}
              title="Dislike"
            >
              <ThumbsDown
                className={`w-4 h-4 ${likeState === "disliked" ? "fill-current" : ""}`}
              />
            </button>
          </div>

          {/* Share Pill */}
          <button
            onClick={() => {
              if (navigator.clipboard) {
                navigator.clipboard.writeText(window.location.href);
              }
            }}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-full border text-xs sm:text-sm font-medium transition-all cursor-pointer hover:bg-black/5 dark:hover:bg-white/10 active:scale-95 shrink-0 shadow-sm"
            style={{
              backgroundColor: t.isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.05)",
              borderColor: t.border,
              color: t.text,
            }}
            title="Share Video"
          >
            <Share2 className="w-4 h-4" />
            <span>Share</span>
          </button>

          {/* Save / Bookmark Pill */}
          <button
            onClick={() => setIsSaved(!isSaved)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-full border text-xs sm:text-sm font-medium transition-all cursor-pointer hover:bg-black/5 dark:hover:bg-white/10 active:scale-95 shrink-0 shadow-sm"
            style={{
              backgroundColor: t.isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.05)",
              borderColor: t.border,
              color: isSaved ? t.accent : t.text,
            }}
            title="Save to Watch Later"
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? "fill-current" : ""}`} />
            <span className="hidden sm:inline">Save</span>
          </button>

          {/* More Options Button */}
          <button
            className="w-9 h-9 rounded-full border flex items-center justify-center transition-all cursor-pointer hover:bg-black/5 dark:hover:bg-white/10 active:scale-95 shrink-0 shadow-sm"
            style={{
              backgroundColor: t.isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.05)",
              borderColor: t.border,
              color: t.text,
            }}
            title="More Options"
          >
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 3. Description Snippet Box */}
      <div
        onClick={() => setIsDescExpanded(!isDescExpanded)}
        className="mt-3.5 rounded-2xl p-3.5 sm:p-4 text-xs sm:text-sm transition-all duration-200 cursor-pointer border select-text hover:brightness-95 dark:hover:brightness-110"
        style={{
          backgroundColor: t.isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)",
          borderColor: t.border,
        }}
      >
        <div className="flex items-center gap-2 font-semibold mb-1" style={{ color: t.text }}>
          <span>1.8M views</span>
          <span className="text-[10px]">•</span>
          <span>Streamed 2 days ago</span>
        </div>

        <p
          className={`leading-relaxed font-normal ${
            isDescExpanded ? "" : "line-clamp-2"
          }`}
          style={{ color: t.muted }}
        >
          Welcome to the official NodeParty cinema lounge! Experience cinematic trailers, 
          synced audio-visual streams, and curated live broadcasts directly with your friends. 
          Queue up upcoming videos, vote on what plays next, and chat in real-time.
        </p>

        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsDescExpanded(!isDescExpanded);
          }}
          className="mt-1 font-semibold text-xs transition-colors hover:underline cursor-pointer block"
          style={{ color: t.text }}
        >
          {isDescExpanded ? "Show less" : "...more"}
        </button>
      </div>
    </div>
  );
}
