"use client";

import { useState, useEffect, useRef } from "react";
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
    id: "QdBZY2fkU-0",
    title: "Grand Theft Auto VI Trailer 1",
    channel: {
      name: "Rockstar Games",
      icon: "https://yt3.ggpht.com/ytc/AIdro_k6P6v6vO7j4w2h7E2J1H2k0x00ffffff-no-rj",
      verified: true,
    },
    thumbnail: "https://i.ytimg.com/vi/QdBZY2fkU-0/hq720.jpg",
    duration: "1:31",
    views: "220M views",
    uploadedAt: "1 year ago",
    url: "https://www.youtube.com/watch?v=QdBZY2fkU-0",
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
  {
    id: "2Vv-BfVoq4g",
    title: "Ed Sheeran - Perfect (Official Music Video)",
    channel: {
      name: "Ed Sheeran",
      icon: "",
      verified: true,
    },
    thumbnail: "https://i.ytimg.com/vi/2Vv-BfVoq4g/hq720.jpg",
    duration: "4:40",
    views: "3.7B views",
    uploadedAt: "6 years ago",
    url: "https://www.youtube.com/watch?v=2Vv-BfVoq4g",
  },
  {
    id: "hTWKbfoikeg",
    title: "Nirvana - Smells Like Teen Spirit (Official Music Video)",
    channel: {
      name: "Nirvana",
      icon: "",
      verified: true,
    },
    thumbnail: "https://i.ytimg.com/vi/hTWKbfoikeg/hq720.jpg",
    duration: "4:39",
    views: "1.9B views",
    uploadedAt: "14 years ago",
    url: "https://www.youtube.com/watch?v=hTWKbfoikeg",
  },
  {
    id: "OPf0YbXqDm0",
    title: "Mark Ronson - Uptown Funk (Official Video) ft. Bruno Mars",
    channel: {
      name: "Mark Ronson",
      icon: "",
      verified: true,
    },
    thumbnail: "https://i.ytimg.com/vi/OPf0YbXqDm0/hq720.jpg",
    duration: "4:31",
    views: "5.2B views",
    uploadedAt: "9 years ago",
    url: "https://www.youtube.com/watch?v=OPf0YbXqDm0",
  },
  {
    id: "09R8_2nJtjg",
    title: "Maroon 5 - Sugar (Official Music Video)",
    channel: {
      name: "Maroon 5",
      icon: "",
      verified: true,
    },
    thumbnail: "https://i.ytimg.com/vi/09R8_2nJtjg/hq720.jpg",
    duration: "5:02",
    views: "4.1B views",
    uploadedAt: "9 years ago",
    url: "https://www.youtube.com/watch?v=09R8_2nJtjg",
  },
  {
    id: "CevxZvSJLk8",
    title: "Katy Perry - Roar (Official)",
    channel: {
      name: "Katy Perry",
      icon: "",
      verified: true,
    },
    thumbnail: "https://i.ytimg.com/vi/CevxZvSJLk8/hq720.jpg",
    duration: "4:30",
    views: "4.0B views",
    uploadedAt: "10 years ago",
    url: "https://www.youtube.com/watch?v=CevxZvSJLk8",
  },
  {
    id: "YQHsXMglC9A",
    title: "Adele - Hello (Official Music Video)",
    channel: {
      name: "Adele",
      icon: "",
      verified: true,
    },
    thumbnail: "https://i.ytimg.com/vi/YQHsXMglC9A/hq720.jpg",
    duration: "6:07",
    views: "3.2B views",
    uploadedAt: "8 years ago",
    url: "https://www.youtube.com/watch?v=YQHsXMglC9A",
  },
  {
    id: "fJ9rUzIMcZQ",
    title: "Queen – Bohemian Rhapsody (Official Video Remastered)",
    channel: {
      name: "Queen Official",
      icon: "",
      verified: true,
    },
    thumbnail: "https://i.ytimg.com/vi/fJ9rUzIMcZQ/hq720.jpg",
    duration: "6:00",
    views: "1.7B views",
    uploadedAt: "15 years ago",
    url: "https://www.youtube.com/watch?v=fJ9rUzIMcZQ",
  },
  {
    id: "JGwWNGJdvx8",
    title: "Ed Sheeran - Shape of You (Official Music Video)",
    channel: {
      name: "Ed Sheeran",
      icon: "",
      verified: true,
    },
    thumbnail: "https://i.ytimg.com/vi/JGwWNGJdvx8/hq720.jpg",
    duration: "4:24",
    views: "6.2B views",
    uploadedAt: "7 years ago",
    url: "https://www.youtube.com/watch?v=JGwWNGJdvx8",
  },
  {
    id: "e-ORhEE9VVg",
    title: "Taylor Swift - Blank Space",
    channel: {
      name: "Taylor Swift",
      icon: "",
      verified: true,
    },
    thumbnail: "https://i.ytimg.com/vi/e-ORhEE9VVg/hq720.jpg",
    duration: "4:33",
    views: "3.4B views",
    uploadedAt: "9 years ago",
    url: "https://www.youtube.com/watch?v=e-ORhEE9VVg",
  },
  {
    id: "L_LUpnjgPso",
    title: "Interstellar — Main Theme (Hans Zimmer)",
    channel: {
      name: "Hans Zimmer",
      icon: "",
      verified: true,
    },
    thumbnail: "https://i.ytimg.com/vi/L_LUpnjgPso/hq720.jpg",
    duration: "4:11",
    views: "58M views",
    uploadedAt: "5 years ago",
    url: "https://www.youtube.com/watch?v=L_LUpnjgPso",
  },
  {
    id: "oea5nB_p_lA",
    title: "Cyberpunk 2077 — Night City Wire: Episode 1",
    channel: {
      name: "Cyberpunk 2077",
      icon: "",
      verified: true,
    },
    thumbnail: "https://i.ytimg.com/vi/oea5nB_p_lA/hq720.jpg",
    duration: "25:12",
    views: "3.4M views",
    uploadedAt: "3 years ago",
    url: "https://www.youtube.com/watch?v=oea5nB_p_lA",
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

  const recommendedVideos = useRoomStore((state) => state.recommendedVideos);
  const isFetchingRecommended = useRoomStore((state) => state.isFetchingRecommended);
  const fetchRecommendedVideos = useRoomStore((state) => state.fetchRecommendedVideos);

  const loadMoreVideos = useRoomStore((state) => state.loadMoreVideos);
  const isFetchingMore = useRoomStore((state) => state.isFetchingMore);

  const [displayLimit, setDisplayLimit] = useState(12);
  const observerTarget = useRef<HTMLDivElement | null>(null);

  const activeVideoId =
    parseYoutubeId(videoUrl) ||
    currentPreset?.youtubeId ||
    parseYoutubeId(currentPreset?.url || "") ||
    "";

  const isSearchActive = searchQuery.trim().length > 0;
  
  // Filter out the currently active video from related videos so it doesn't duplicate what's currently playing
  const filteredRelated = relatedVideos.filter((v) => v.id !== activeVideoId);
  const isRelatedActive = !isSearchActive && filteredRelated.length > 0;

  // On initial room mount without search or related, fetch recommended trending videos
  useEffect(() => {
    if (!isSearchActive && !isRelatedActive && recommendedVideos.length === 0) {
      fetchRecommendedVideos();
    }
  }, [isSearchActive, isRelatedActive, recommendedVideos.length, fetchRecommendedVideos]);

  // Reset pagination limit whenever search query or active video changes
  useEffect(() => {
    setDisplayLimit(12);
  }, [searchQuery, activeVideoId]);

  const defaultFeed = recommendedVideos.length > 0 ? recommendedVideos : CURATED_DISCOVERY_VIDEOS;

  const videosToDisplay = isSearchActive
    ? searchResults
    : isRelatedActive
    ? filteredRelated
    : defaultFeed;

  const visibleVideos = videosToDisplay.slice(0, displayLimit);
  // We keep hasMore true as long as we haven't hit a crazy limit, so we can fetch more
  const hasMore = displayLimit < videosToDisplay.length || videosToDisplay.length < 100;

  // Infinite scroll trigger via IntersectionObserver
  useEffect(() => {
    const currentTarget = observerTarget.current;
    if (!currentTarget || !hasMore || isFetchingMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          if (displayLimit < videosToDisplay.length) {
            setDisplayLimit((prev) => Math.min(prev + 12, videosToDisplay.length));
          } else {
            loadMoreVideos();
          }
        }
      },
      {
        root: null,
        rootMargin: "300px",
        threshold: 0.1,
      }
    );

    observer.observe(currentTarget);
    return () => {
      observer.disconnect();
    };
  }, [hasMore, videosToDisplay.length, displayLimit, isFetchingMore, loadMoreVideos]);

  const isLoading =
    isSearching ||
    (!isSearchActive && isFetchingRelated && filteredRelated.length === 0) ||
    (!isSearchActive && !isRelatedActive && isFetchingRecommended && recommendedVideos.length === 0);

  return (
    <div id="youtube-discovery-grid" className="w-full px-4 sm:px-6 pt-2 pb-10 flex flex-col gap-4">
      {/* Section Header (hidden for Related Videos under active player to match native YouTube) */}
      {!isRelatedActive && (
        <div className="flex items-center justify-between border-b pb-3" style={{ borderColor: t.border }}>
          <div className="flex items-center gap-2.5">
            <h2 className="text-sm sm:text-base font-semibold tracking-tight" style={{ color: t.text }}>
              {isSearchActive ? `Search Results for "${searchQuery}"` : "Recommended & Trending"}
            </h2>
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
      )}

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
      {!isLoading && (!isSearchActive || !searchError) && visibleVideos.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-4 gap-y-6 mt-1">
          {visibleVideos.map((video) => (
            <YoutubeVideoCard key={video.id} video={video} />
          ))}
        </div>
      )}

      {/* Infinite Scroll Sentinel & Native YouTube Loading Spinner */}
      {!isLoading && hasMore && (
        <div
          ref={observerTarget}
          className="w-full py-10 flex items-center justify-center"
        >
          <style>
            {`
              @keyframes yt-spinner-dash {
                0% { stroke-dasharray: 1, 200; stroke-dashoffset: 0; }
                50% { stroke-dasharray: 89, 200; stroke-dashoffset: -35px; }
                100% { stroke-dasharray: 89, 200; stroke-dashoffset: -124px; }
              }
            `}
          </style>
          <svg
            className="w-8 h-8 animate-spin"
            viewBox="25 25 50 50"
            role="status"
            aria-label="Loading more videos..."
          >
            <circle
              className="stroke-zinc-500 dark:stroke-zinc-400"
              cx="50"
              cy="50"
              r="20"
              fill="none"
              strokeWidth="4"
              strokeMiterlimit="10"
              style={{
                animation: "yt-spinner-dash 1.5s ease-in-out infinite",
              }}
            />
          </svg>
        </div>
      )}
    </div>
  );
}
