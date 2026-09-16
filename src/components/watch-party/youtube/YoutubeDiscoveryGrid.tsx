"use client";

import { CheckCircle2, MoreVertical } from "lucide-react";
import { useRoomTheme } from "@/hooks/useRoomTheme";

interface MockVideo {
  id: string;
  title: string;
  channel: string;
  avatar: string;
  thumbnail: string;
  duration: string;
  views: string;
  uploadedAt: string;
}

const MOCK_VIDEOS: MockVideo[] = [
  {
    id: "v1",
    title: "synthwave radio - chill beats to relax / study / code to",
    channel: "Lofi Girl",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80",
    thumbnail: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=640&auto=format&fit=crop&q=80",
    duration: "LIVE",
    views: "24.1K watching",
    uploadedAt: "Streaming now",
  },
  {
    id: "v2",
    title: "Building a Full-Stack Realtime Web App in 2026",
    channel: "DevSphere",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80",
    thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=640&auto=format&fit=crop&q=80",
    duration: "24:18",
    views: "184K views",
    uploadedAt: "3 days ago",
  },
  {
    id: "v3",
    title: "Cyberpunk 2077: Phantom Liberty 4K Ultra Graphics Showcase",
    channel: "GameMatrix",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=80",
    thumbnail: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=640&auto=format&fit=crop&q=80",
    duration: "18:42",
    views: "512K views",
    uploadedAt: "1 week ago",
  },
  {
    id: "v4",
    title: "Deep House Sunset Session & Chillout Mix",
    channel: "Soundwave Collective",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&auto=format&fit=crop&q=80",
    thumbnail: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=640&auto=format&fit=crop&q=80",
    duration: "1:02:15",
    views: "920K views",
    uploadedAt: "2 weeks ago",
  },
  {
    id: "v5",
    title: "The Future of Artificial Intelligence & Robotics",
    channel: "FutureTech Lab",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&auto=format&fit=crop&q=80",
    thumbnail: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=640&auto=format&fit=crop&q=80",
    duration: "32:10",
    views: "340K views",
    uploadedAt: "4 days ago",
  },
  {
    id: "v6",
    title: "Top 10 Insane Esports Plays of the Year",
    channel: "Highlight Reel",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=80&auto=format&fit=crop&q=80",
    thumbnail: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=640&auto=format&fit=crop&q=80",
    duration: "14:05",
    views: "1.2M views",
    uploadedAt: "2 weeks ago",
  },
];

export function YoutubeDiscoveryGrid() {
  const t = useRoomTheme();

  return (
    <div className="w-full px-4 sm:px-6 pt-3 pb-8 flex flex-col gap-4">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm sm:text-base font-semibold tracking-tight" style={{ color: t.text }}>
            Recommended & Trending
          </h2>
          <p className="text-xs" style={{ color: t.muted }}>
            Browse videos to play next without interrupting the room
          </p>
        </div>
      </div>

      {/* Video Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-4 gap-y-8 mt-2">
        {MOCK_VIDEOS.map((video) => (
          <div
            key={video.id}
            className="group flex flex-col gap-3 cursor-pointer"
          >
            {/* Thumbnail Box */}
            <div className="relative aspect-video w-full overflow-hidden bg-zinc-900 rounded-xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
              />

              {/* Duration Badge */}
              <div
                className="absolute bottom-1.5 right-1.5 px-1 rounded text-[12px] font-medium font-mono tracking-tight flex items-center gap-1 shadow-sm"
                style={{
                  backgroundColor: video.duration === "LIVE" ? "#cc0000" : "rgba(0, 0, 0, 0.8)",
                  color: "#ffffff",
                }}
              >
                {video.duration === "LIVE" && <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
                {video.duration}
              </div>
            </div>

            {/* Video Details */}
            <div className="flex items-start gap-3">
              {/* Channel Avatar */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={video.avatar}
                alt={video.channel}
                className="w-9 h-9 rounded-full object-cover shrink-0 mt-0.5"
              />

              {/* Text Info */}
              <div className="flex-1 min-w-0 pr-2">
                <h3
                  className="text-[16px] font-semibold line-clamp-2 leading-tight"
                  style={{ color: t.text }}
                  title={video.title}
                >
                  {video.title}
                </h3>

                <div className="flex flex-col mt-1 text-[14px] leading-snug" style={{ color: t.muted }}>
                  <div className="flex items-center gap-1 hover:text-white transition-colors">
                    <span className="truncate">{video.channel}</span>
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  </div>
                  <div className="flex items-center gap-1">
                    <span>{video.views}</span>
                    <span>•</span>
                    <span>{video.uploadedAt}</span>
                  </div>
                </div>
              </div>

              {/* Three Dot Menu */}
              <button
                className="opacity-0 group-hover:opacity-100 p-1 -mt-1 -mr-2 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors shrink-0 cursor-pointer"
                style={{ color: t.text }}
                onClick={(e) => e.stopPropagation()}
              >
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
