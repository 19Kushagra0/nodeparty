"use client";

import { useEffect, useRef, useState } from "react";
import YouTube, { YouTubeProps } from "react-youtube";
import { useRoomStore, parseYoutubeId } from "@/store/useRoomStore";
import { useRoomTheme } from "@/hooks/useRoomTheme";
import { AlertCircle, RefreshCw, SkipForward } from "lucide-react";

export function YoutubePlayer() {
  const t = useRoomTheme();
  const {
    videoUrl,
    currentPreset,
    isPlaying,
    setIsPlaying,
    volume,
    isMuted,
    setDuration,
    setCurrentTime,
    broadcastPlaybackSync,
    userRole,
    queue,
    playQueueItem,
    removeFromQueue,
  } = useRoomStore();

  const [isMounted, setIsMounted] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const playerRef = useRef<any>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Determine active video ID
  const videoId =
    parseYoutubeId(videoUrl) ||
    currentPreset?.youtubeId ||
    parseYoutubeId(currentPreset?.url || "") ||
    "";

  // Reset error state when videoId changes
  useEffect(() => {
    setHasError(false);
    setErrorMessage("");
  }, [videoId]);

  // Sync isPlaying state to YouTube iframe
  useEffect(() => {
    if (!playerRef.current || typeof playerRef.current.playVideo !== "function") return;
    try {
      if (isPlaying) {
        playerRef.current.playVideo();
      } else {
        playerRef.current.pauseVideo();
      }
    } catch (e) {
      console.warn("[YoutubePlayer] Error toggling play state:", e);
    }
  }, [isPlaying]);

  // Sync volume and mute state
  useEffect(() => {
    if (!playerRef.current || typeof playerRef.current.setVolume !== "function") return;
    try {
      if (isMuted) {
        playerRef.current.mute();
      } else {
        playerRef.current.unMute();
        playerRef.current.setVolume(volume);
      }
    } catch (e) {
      console.warn("[YoutubePlayer] Error setting volume:", e);
    }
  }, [volume, isMuted]);

  // Periodically poll time & duration
  useEffect(() => {
    if (!isMounted) return;

    const interval = setInterval(() => {
      if (!playerRef.current || typeof playerRef.current.getCurrentTime !== "function") return;
      try {
        const time = playerRef.current.getCurrentTime() || 0;
        const dur = playerRef.current.getDuration() || 0;

        setCurrentTime(time);
        if (dur > 0) {
          setDuration(dur);
        }
      } catch {
        // Player might be switching video
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isMounted, setCurrentTime, setDuration]);

  const onReady: YouTubeProps["onReady"] = (event) => {
    playerRef.current = event.target;

    try {
      if (isMuted) {
        event.target.mute();
      } else {
        event.target.unMute();
        event.target.setVolume(volume);
      }

      if (isPlaying) {
        event.target.playVideo();
      }
    } catch (e) {
      console.warn("[YoutubePlayer] onReady setup warning:", e);
    }
  };

  const onStateChange: YouTubeProps["onStateChange"] = (event) => {
    // 1: PLAYING, 2: PAUSED, 0: ENDED
    if (event.data === 1) {
      if (!isPlaying) {
        setIsPlaying(true);
        if (userRole === "host") broadcastPlaybackSync();
      }
    } else if (event.data === 2) {
      if (isPlaying) {
        setIsPlaying(false);
        if (userRole === "host") broadcastPlaybackSync();
      }
    } else if (event.data === 0) {
      setIsPlaying(false);
      if (userRole === "host") broadcastPlaybackSync();
    }
  };

  const onError: YouTubeProps["onError"] = (event) => {
    console.error("[YoutubePlayer] Playback error code:", event.data);
    setHasError(true);
    // YouTube Error codes: 2 (invalid param), 5 (HTML5 error), 100 (not found/private), 101/150 (embed disabled)
    if (event.data === 101 || event.data === 150) {
      setErrorMessage("The owner of this video has disabled playback in third-party embedded apps.");
    } else if (event.data === 100) {
      setErrorMessage("This video could not be found or has been removed/made private.");
    } else {
      setErrorMessage("Unable to stream this video right now.");
    }
  };

  const handleSkipToNext = () => {
    const activeQueueItem = queue.find((q) => q.isPlaying);
    if (activeQueueItem) {
      removeFromQueue(activeQueueItem.id);
    }
    const unplayed = queue.filter((q) => !q.isPlaying);
    if (unplayed.length > 0) {
      playQueueItem(unplayed[0].id);
    }
  };

  const hasNext = queue.filter((q) => !q.isPlaying).length > 0;

  const opts: YouTubeProps["opts"] = {
    width: "100%",
    height: "100%",
    playerVars: {
      autoplay: 1,
      controls: 1,
      modestbranding: 1,
      rel: 0,
      playsinline: 1,
      iv_load_policy: 3,
      origin: typeof window !== "undefined" ? window.location.origin : undefined,
    },
  };

  if (!isMounted) {
    return (
      <div className="w-full px-4 sm:px-6 pt-4 sm:pt-5 pb-2 shrink-0">
        <div
          className="relative w-full aspect-video max-h-[480px] lg:max-h-[540px] xl:max-h-[600px] mx-auto rounded-2xl sm:rounded-3xl overflow-hidden border shadow-lg bg-black/90 flex items-center justify-center animate-pulse"
          style={{ borderColor: t.border }}
        >
          <div className="w-10 h-10 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="w-full px-4 sm:px-6 pt-4 sm:pt-5 pb-2 shrink-0">
        <div
          className="relative w-full aspect-video max-h-[480px] lg:max-h-[540px] xl:max-h-[600px] mx-auto rounded-2xl sm:rounded-3xl overflow-hidden border shadow-lg flex flex-col items-center justify-center p-6 text-center"
          style={{
            backgroundColor: t.isDark ? "#120e0b" : "#fbfbfb",
            borderColor: t.border,
          }}
        >
          <AlertCircle className="w-12 h-12 text-rose-500 mb-3" />
          <h4 className="text-base font-bold mb-1" style={{ color: t.text }}>
            Playback Restricted
          </h4>
          <p className="text-xs sm:text-sm max-w-md mb-4" style={{ color: t.muted }}>
            {errorMessage || "This video cannot be played directly inside the embedded player."}
          </p>
          <div className="flex items-center gap-3">
            <a
              href={`https://www.youtube.com/watch?v=${videoId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-full text-xs font-semibold bg-rose-600 hover:bg-rose-500 text-white transition-all shadow-sm flex items-center gap-1.5"
            >
              Watch directly on YouTube
            </a>
            {hasNext && (
              <button
                onClick={handleSkipToNext}
                className="px-4 py-2 rounded-full text-xs font-semibold bg-white/10 hover:bg-white/20 transition-all shadow-sm flex items-center gap-1.5"
                style={{ color: t.text }}
              >
                <SkipForward className="w-3.5 h-3.5" />
                Skip to Next
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full px-4 sm:px-6 pt-4 sm:pt-5 pb-2 shrink-0">
      <div
        className="relative w-full aspect-video max-h-[480px] lg:max-h-[540px] xl:max-h-[600px] mx-auto rounded-2xl sm:rounded-3xl overflow-hidden border shadow-xl bg-black transition-all duration-300 group"
        style={{ borderColor: t.border }}
      >
        <YouTube
          key={videoId}
          videoId={videoId}
          opts={opts}
          onReady={onReady}
          onStateChange={onStateChange}
          onError={onError}
          className="w-full h-full absolute inset-0"
          iframeClassName="w-full h-full border-none"
        />
      </div>
    </div>
  );
}
