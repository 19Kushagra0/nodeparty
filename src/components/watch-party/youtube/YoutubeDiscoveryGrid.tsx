"use client";

import { useRoomTheme } from "@/hooks/useRoomTheme";
import { useRoomStore, parseYoutubeId } from "@/store/useRoomStore";
import { YoutubeVideoCard } from "@/components/watch-party/youtube/YoutubeVideoCard";
import type { YoutubeSearchResult } from "@/types";
import { Sparkles, Compass, X, AlertCircle } from "lucide-react";

const CURATED_DISCOVERY_VIDEOS: YoutubeSearchResult[] = [
  {
    id: "jfKfPfyJRdk",
    title: "lofi hip hop radio - beats to relax/study to",
    channel: {
      name: "Lofi Girl",
      icon: "https://yt3.googleusercontent.com/w2kP2b3JgJgEeVZ6PqP=s88-c-k-c0x00ffffff-no-rj",
      verified: true,
    },
    thumbnail: "https://i.ytimg.com/vi/jfKfPfyJRdk/hq720.jpg",
    duration: "LIVE",
    views: "34.5K watching",
    uploadedAt: "Streaming now",
    url: "https://www.youtube.com/watch?v=jfKfPfyJRdk",
  },
  {
    id: "qEv7T3M4qrg",
    title: "Cyberpunk 2077: Phantom Liberty — Official Cinematic Trailer",
    channel: {
      name: "Cyberpunk 2077",
      icon: "https://yt3.ggpht.com/LNNs3oKwnUBT2UzjHhnfjVjwpIk85jv3bya5u80biOS5Wst24PhTR9Upb_3avEBet6dYU5KdNw=s68-c-k-c0x00ffffff-no-rj",
      verified: true,
    },
    thumbnail: "https://i.ytimg.com/vi/qEv7T3M4qrg/hq720.jpg",
    duration: "4:07",
    views: "18.2M views",
    uploadedAt: "1 year ago",
    url: "https://www.youtube.com/watch?v=qEv7T3M4qrg",
  },
  {
    id: "5qap5aO4i9A",
    title: "Lofi Beats to Chill / Study / Relax To ☕ Late Night Chill Session",
    channel: {
      name: "ChilledCow Vibes",
      icon: "",
      verified: false,
    },
    thumbnail: "https://i.ytimg.com/vi/5qap5aO4i9A/hq720.jpg",
    duration: "1:45:20",
    views: "4.8M views",
    uploadedAt: "2 months ago",
    url: "https://www.youtube.com/watch?v=5qap5aO4i9A",
  },
  {
    id: "kJQP7kiw5Fk",
    title: "Luis Fonsi - Despacito ft. Daddy Yankee (4K Ultra Remaster)",
    channel: {
      name: "Luis Fonsi",
      icon: "",
      verified: true,
    },
    thumbnail: "https://i.ytimg.com/vi/kJQP7kiw5Fk/hq720.jpg",
    duration: "4:42",
    views: "8.4B views",
    uploadedAt: "7 years ago",
    url: "https://www.youtube.com/watch?v=kJQP7kiw5Fk",
  },
  {
    id: "dQw4w9WgXcQ",
    title: "Rick Astley - Never Gonna Give You Up (Official Music Video)",
    channel: {
      name: "Rick Astley",
      icon: "",
      verified: true,
    },
    thumbnail: "https://i.ytimg.com/vi/dQw4w9WgXcQ/hq720.jpg",
    duration: "3:33",
    views: "1.5B views",
    uploadedAt: "14 years ago",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
  {
    id: "kqtD5dpn9C8",
    title: "Coldplay - Hymn For The Weekend (Official Video)",
    channel: {
      name: "Coldplay",
      icon: "",
      verified: true,
    },
    thumbnail: "https://i.ytimg.com/vi/kqtD5dpn9C8/hq720.jpg",
    duration: "4:26",
    views: "2.1B views",
    uploadedAt: "8 years ago",
    url: "https://www.youtube.com/watch?v=kqtD5dpn9C8",
  },
];

function VideoCardSkeleton() {
  return (
    <div className="flex flex-col gap-3 rounded-2xl p-2 animate-pulse">
      <div className="aspect-video w-full rounded-xl bg-zinc-300/40 dark:bg-zinc-800/60" />
      <div className="flex items-start gap-3 px-0.5">
        <div className="w-9 h-9 rounded-full bg-zinc-300/40 dark:bg-zinc-800/60 shrink-0 mt-0.5" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-zinc-300/40 dark:bg-zinc-800/60 rounded w-5/6" />
          <div className="h-3 bg-zinc-300/30 dark:bg-zinc-800/50 rounded w-1/2" />
        </div>
      </div>
    </div>
  );
}

export function YoutubeDiscoveryGrid() {
  const t = useRoomTheme();
  const searchQuery = useRoomStore((state) => state.searchQuery);
  const searchResults = useRoomStore((state) => state.searchResults);
  const isSearching = useRoomStore((state) => state.isSearching);
  const searchError = useRoomStore((state) => state.searchError);
  const clearSearch = useRoomStore((state) => state.clearSearch);
  const relatedVideos = useRoomStore((state) => state.relatedVideos);
  const isFetchingRelated = useRoomStore((state) => state.isFetchingRelated);
  const videoUrl = useRoomStore((state) => state.videoUrl);
  const currentPreset = useRoomStore((state) => state.currentPreset);

  const activeVideoId =
    parseYoutubeId(videoUrl) ||
    currentPreset?.youtubeId ||
    parseYoutubeId(currentPreset?.url || "") ||
    "";

  const isSearchActive = searchQuery.trim().length > 0;
  
  // Filter out the currently active video from related videos so it doesn't duplicate what's currently playing
  const filteredRelated = relatedVideos.filter((v) => v.id !== activeVideoId);
  const isRelatedActive = !isSearchActive && filteredRelated.length > 0;

  const videosToDisplay = isSearchActive
    ? searchResults
    : isRelatedActive
    ? filteredRelated
    : CURATED_DISCOVERY_VIDEOS;

  const isLoading = isSearching || (!isSearchActive && isFetchingRelated && filteredRelated.length === 0);

  let headerTitle = "Recommended & Trending";
  let headerSubtitle = "Discover videos to queue or watch together";

  if (isSearchActive) {
    headerTitle = `Search Results for "${searchQuery}"`;
    headerSubtitle = "Browse and watch now or add to queue without interrupting playback";
  } else if (isRelatedActive) {
    headerTitle = "Up Next / Related Videos";
    headerSubtitle = "Videos related to what you're watching right now";
  }

  return (
    <div id="youtube-discovery-grid" className="w-full px-4 sm:px-6 pt-2 pb-10 flex flex-col gap-4">
      {/* Section Header */}
      <div className="flex items-center justify-between border-b pb-3" style={{ borderColor: t.border }}>
        <div className="flex items-center gap-2.5">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm sm:text-base font-semibold tracking-tight" style={{ color: t.text }}>
                {headerTitle}
              </h2>
              {isSearchActive && !isSearching && (
                <span
                  className="px-2 py-0.5 rounded-full text-xs font-medium"
                  style={{
                    backgroundColor: t.isDark ? "#241f1a" : "#e4e4e7",
                    color: t.muted,
                  }}
                >
                  {searchResults.length}
                </span>
              )}
              {isRelatedActive && !isLoading && (
                <span
                  className="px-2 py-0.5 rounded-full text-xs font-medium"
                  style={{
                    backgroundColor: t.isDark ? "#241f1a" : "#e4e4e7",
                    color: t.muted,
                  }}
                >
                  {filteredRelated.length}
                </span>
              )}
            </div>
            <p className="text-xs" style={{ color: t.muted }}>
              {headerSubtitle}
            </p>
          </div>
        </div>

        {/* Clear Search Filter Button */}
        {isSearchActive && (
          <button
            type="button"
            onClick={clearSearch}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold cursor-pointer hover:opacity-80 active:scale-95 transition-all"
            style={{
              backgroundColor: t.isDark ? "#241f1a" : "#f0f0f2",
              color: t.text,
              border: `1px solid ${t.border}`,
            }}
            title="Reset to recommended videos"
          >
            <X className="w-3.5 h-3.5" />
            <span>Clear Search</span>
          </button>
        )}
      </div>

      {/* Loading Skeleton View */}
      {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-4 gap-y-6 mt-1">
          {Array.from({ length: 6 }).map((_, i) => (
            <VideoCardSkeleton key={`skeleton-${i}`} />
          ))}
        </div>
      )}

      {/* Error View */}
      {!isLoading && searchError && isSearchActive && (
        <div className="w-full py-20 px-4 flex flex-col items-center justify-center text-center gap-4 mt-2">
          <AlertCircle className="w-12 h-12 stroke-1 text-zinc-400" />
          <div className="space-y-1.5">
            <h3 className="text-base font-medium" style={{ color: t.text }}>
              Unable to complete search
            </h3>
            <p className="text-sm max-w-sm" style={{ color: t.muted }}>
              {searchError}. You can try another search term or paste a direct YouTube link into the search bar.
            </p>
          </div>
          <button
            type="button"
            onClick={clearSearch}
            className="mt-2 px-5 py-2 rounded-full text-sm font-medium cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 active:scale-95 transition-all"
            style={{
              color: t.text,
              border: `1px solid ${t.border}`,
            }}
          >
            Back to Recommended
          </button>
        </div>
      )}

      {/* Empty Results View */}
      {!isLoading && !searchError && isSearchActive && searchResults.length === 0 && (
        <div className="w-full py-20 px-4 flex flex-col items-center justify-center text-center gap-4 mt-2">
          <Compass className="w-12 h-12 stroke-1 text-zinc-400" />
          <div className="space-y-1.5">
            <h3 className="text-base font-medium" style={{ color: t.text }}>
              No videos found
            </h3>
            <p className="text-sm max-w-sm" style={{ color: t.muted }}>
              We couldn&apos;t find any YouTube videos matching &ldquo;{searchQuery}&rdquo;. Try different keywords or paste a direct link.
            </p>
          </div>
          <button
            type="button"
            onClick={clearSearch}
            className="mt-2 px-5 py-2 rounded-full text-sm font-medium cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 active:scale-95 transition-all"
            style={{
              color: t.text,
              border: `1px solid ${t.border}`,
            }}
          >
            Clear Search
          </button>
        </div>
      )}

      {/* Video Cards Grid */}
      {!isLoading && (!isSearchActive || !searchError) && videosToDisplay.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-4 gap-y-6 mt-1">
          {videosToDisplay.map((video) => (
            <YoutubeVideoCard key={video.id} video={video} />
          ))}
        </div>
      )}
    </div>
  );
}
