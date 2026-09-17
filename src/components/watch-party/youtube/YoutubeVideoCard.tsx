"use client";

import { useState } from "react";
import { Play, ListPlus, Check, CheckCircle2 } from "lucide-react";
import type { YoutubeSearchResult } from "@/types";
import { useRoomTheme } from "@/hooks/useRoomTheme";
import { useRoomStore } from "@/store/useRoomStore";

interface YoutubeVideoCardProps {
  video: YoutubeSearchResult;
}

export function YoutubeVideoCard({ video }: YoutubeVideoCardProps) {
  const t = useRoomTheme();
  const setVideoUrl = useRoomStore((state) => state.setVideoUrl);
  const addToQueue = useRoomStore((state) => state.addToQueue);
  const [justAdded, setJustAdded] = useState(false);

  const handleWatchNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    setVideoUrl(video.url);
  };

  const handleAddToQueue = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToQueue({
      title: video.title,
      channel: video.channel.name,
      duration: video.duration,
      thumbnail: video.thumbnail,
      url: video.url,
    });
    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
    }, 2000);
  };

  const isLive = video.duration.toUpperCase() === "LIVE";

  return (
    <div className="group relative flex flex-col gap-3 rounded-2xl p-2 transition-all duration-200 hover:bg-black/[0.03] dark:hover:bg-white/[0.04]">
      {/* Thumbnail Container */}
      <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-zinc-900 shadow-sm">
        {/* Thumbnail Image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={video.thumbnail}
          alt={video.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Duration Badge */}
        <div
          className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded text-xs font-semibold font-mono tracking-tight flex items-center gap-1 shadow-md pointer-events-none transition-opacity duration-200 group-hover:opacity-20"
          style={{
            backgroundColor: isLive ? "#dc2626" : "rgba(0, 0, 0, 0.8)",
            color: "#ffffff",
          }}
        >
          {isLive && <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
          {video.duration}
        </div>

        {/* Hover Action Overlay */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-200 flex items-center justify-center gap-2 p-3 backdrop-blur-[2px]">
          <button
            onClick={handleWatchNow}
            type="button"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider shadow-lg cursor-pointer transform translate-y-1 group-hover:translate-y-0 transition-all duration-200 hover:scale-105 active:scale-95"
            style={{
              backgroundColor: t.accent,
              color: t.accentFg,
            }}
            title="Switch stream to this video now"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Watch Now</span>
          </button>

          <button
            onClick={handleAddToQueue}
            type="button"
            disabled={justAdded}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold backdrop-blur-md bg-white/20 hover:bg-white/30 text-white shadow-lg cursor-pointer transform translate-y-1 group-hover:translate-y-0 transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-80"
            title="Add to shared party queue"
          >
            {justAdded ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-300">Queued</span>
              </>
            ) : (
              <>
                <ListPlus className="w-3.5 h-3.5" />
                <span>Queue</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Video Details */}
      <div className="flex items-start gap-3 px-0.5">
        {/* Channel Icon */}
        <div className="relative shrink-0">
          {video.channel.icon ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={video.channel.icon}
              alt={video.channel.name}
              className="w-9 h-9 rounded-full object-cover mt-0.5 ring-1 ring-black/10 dark:ring-white/10"
              onError={(e) => {
                (e.target as HTMLElement).style.display = "none";
              }}
            />
          ) : (
            <div
              className="w-9 h-9 rounded-full mt-0.5 flex items-center justify-center font-bold text-xs uppercase"
              style={{
                backgroundColor: t.isDark ? "#2a241e" : "#e4e4e7",
                color: t.text,
              }}
            >
              {video.channel.name.charAt(0) || "Y"}
            </div>
          )}
        </div>

        {/* Text Details */}
        <div className="flex-1 min-w-0">
          <h3
            className="text-sm font-semibold line-clamp-2 leading-snug tracking-tight transition-colors group-hover:text-amber-500"
            style={{ color: t.text }}
            title={video.title}
          >
            {video.title}
          </h3>

          <div className="flex flex-col mt-1 text-xs" style={{ color: t.muted }}>
            <div className="flex items-center gap-1 hover:opacity-100 transition-opacity">
              <span className="truncate font-medium">{video.channel.name}</span>
              {video.channel.verified && (
                <CheckCircle2 className="w-3 h-3 shrink-0 text-zinc-400" />
              )}
            </div>
            <div className="flex items-center gap-1.5 mt-0.5 text-zinc-400 dark:text-zinc-500">
              <span>{video.views}</span>
              {video.uploadedAt && (
                <>
                  <span>•</span>
                  <span>{video.uploadedAt}</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
