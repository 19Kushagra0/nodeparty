"use client";

import { useEffect, useRef, useState } from "react";
import YouTube, { YouTubeProps } from "react-youtube";
import { useRoomStore, parseYoutubeId } from "@/store/useRoomStore";
import { useRoomTheme } from "@/hooks/useRoomTheme";
import { AlertCircle, RefreshCw, SkipForward, ExternalLink, Compass, Play } from "lucide-react";

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
    sendMessage,
    setVideoUrl,
    relatedVideos,
  } = useRoomStore();

  const [isMounted, setIsMounted] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [skipCountdown, setSkipCountdown] = useState<number | null>(null);
  const playerRef = useRef<any>(null);
  const countdownTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Determine active video ID
  const videoId =
    parseYoutubeId(videoUrl) ||
    currentPreset?.youtubeId ||
    parseYoutubeId(currentPreset?.url || "") ||
    "";

  // Reset error state and countdown when videoId changes
  useEffect(() => {
    setHasError(false);
    setErrorMessage("");
    setSkipCountdown(null);
    if (countdownTimerRef.current) {
      clearInterval(countdownTimerRef.current);
      countdownTimerRef.current = null;
    }
  }, [videoId]);

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (countdownTimerRef.current) {
        clearInterval(countdownTimerRef.current);
      }
    };
  }, []);

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
      if (userRole === "host") {
        broadcastPlaybackSync();
        // Auto-play the next queued video if available
        const activeQueueItem = queue.find((q) => q.isPlaying);
        const upcomingQueue = queue.filter((q) => !q.isPlaying);
        if (upcomingQueue.length > 0) {
          console.log("⏭️ [YoutubePlayer] Video ended. Host auto-playing next queued video:", upcomingQueue[0].title);
          if (activeQueueItem) {
            removeFromQueue(activeQueueItem.id);
          }
          playQueueItem(upcomingQueue[0].id);
        }
      }
    }
  };

  const handleSkipToNext = () => {
    if (countdownTimerRef.current) {
      clearInterval(countdownTimerRef.current);
      countdownTimerRef.current = null;
    }
    setSkipCountdown(null);

    const activeQueueItem = queue.find((q) => q.isPlaying);
    if (activeQueueItem) {
      removeFromQueue(activeQueueItem.id);
    }
    const unplayed = queue.filter((q) => !q.isPlaying);
    if (unplayed.length > 0) {
      playQueueItem(unplayed[0].id);
    }
  };

  const handleCancelAutoSkip = () => {
    if (countdownTimerRef.current) {
      clearInterval(countdownTimerRef.current);
      countdownTimerRef.current = null;
    }
    setSkipCountdown(null);
  };

  const onError: YouTubeProps["onError"] = (event) => {
    try {
      const errCode = event?.data;
      console.warn("[YoutubePlayer] Playback code:", errCode);
      setHasError(true);

      // YouTube Error codes: 2 (invalid param), 5 (HTML5 error), 100 (not found/private), 101/150 (embed disabled)
      let msg = "Playback on other websites has been disabled by the video owner.";
      if (errCode === 101 || errCode === 150) {
        msg = "Playback on other websites has been disabled by the video owner.";
      } else if (errCode === 100) {
        msg = "This video is unavailable, deleted, or marked private.";
      }
      setErrorMessage(msg);

      // Broadcast room notification to chat safely
      try {
        const currentTitle = currentPreset?.title || "Video";
        if (typeof sendMessage === "function") {
          sendMessage(`⚠️ "${currentTitle}" cannot be played (embedding disabled by owner).`);
        }
      } catch {
        // Chat broadcast error shouldn't impact player
      }

      // Check if there are upcoming videos in the queue to auto-skip to
      const upcomingQueue = (queue || []).filter((q) => !q?.isPlaying);
      if (upcomingQueue.length > 0) {
        setSkipCountdown(5);
        if (countdownTimerRef.current) clearInterval(countdownTimerRef.current);
        countdownTimerRef.current = setInterval(() => {
          setSkipCountdown((prev) => {
            if (prev === null) return null;
            if (prev <= 1) {
              if (countdownTimerRef.current) clearInterval(countdownTimerRef.current);
              countdownTimerRef.current = null;
              if (userRole === "host") {
                try {
                  handleSkipToNext();
                } catch {
                  // Ignore
                }
              }
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      }
    } catch (handlerErr) {
      console.warn("[YoutubePlayer] Handled error in player error handler:", handlerErr);
      setHasError(true);
      setErrorMessage("Playback on other websites has been disabled by the video owner.");
    }
  };

  const hasNext = (queue || []).filter((q) => !q?.isPlaying).length > 0;

  const opts: YouTubeProps["opts"] = {
    width: "100%",
    height: "100%",
    playerVars: {
      autoplay: 0,
      controls: 1,
      modestbranding: 1,
      rel: 0,
      playsinline: 1,
      iv_load_policy: 3,
      origin: typeof window !== "undefined" ? window.location.origin : undefined,
    },
  };

  if (!videoId) {
    return null;
  }

  if (!isMounted) {
    return (
      <div className="w-full px-4 sm:px-6 pt-2 sm:pt-2.5 pb-2 shrink-0">
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
    const unplayed = queue.filter((q) => !q.isPlaying);
    const hasNext = unplayed.length > 0;
    const thumbnail = currentPreset?.thumbnail;

    return (
      <div className="w-full px-4 sm:px-6 pt-2 sm:pt-2.5 pb-2 shrink-0">
        <div
          className="relative w-full aspect-video max-h-[480px] lg:max-h-[540px] xl:max-h-[600px] mx-auto rounded-2xl sm:rounded-3xl overflow-hidden border shadow-xl bg-black flex flex-col items-center justify-center p-6 text-center select-none"
          style={{ borderColor: t.border }}
        >
          {/* Subtle Ambient Thumbnail Backdrop */}
          {thumbnail && (
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <img
                src={thumbnail}
                alt=""
                className="w-full h-full object-cover opacity-15 filter blur-2xl scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/60" />
            </div>
          )}

          <div className="relative z-10 flex flex-col items-center max-w-md">
            {/* Minimal YouTube Warning Icon */}
            <AlertCircle className="w-9 h-9 text-zinc-400 stroke-[1.5] mb-3" />

            <h3 className="text-base sm:text-lg font-medium text-white tracking-tight">
              Video unavailable
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1 mb-5 leading-relaxed">
              {errorMessage || "Playback on other websites has been disabled by the video owner."}
            </p>

            {hasNext ? (
              skipCountdown !== null && skipCountdown > 0 ? (
                <div className="flex flex-col items-center gap-3">
                  <div className="flex items-center gap-2 text-xs font-medium text-zinc-300 bg-white/10 px-3.5 py-1.5 rounded-full border border-white/10">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                    <span>Playing next in queue in {skipCountdown}s</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleSkipToNext}
                      className="px-4 py-2 rounded-full text-xs font-medium bg-white text-black hover:bg-zinc-200 transition-all flex items-center gap-1.5 cursor-pointer active:scale-95 shadow-sm"
                    >
                      <SkipForward className="w-3.5 h-3.5" />
                      Play now
                    </button>
                    <button
                      type="button"
                      onClick={handleCancelAutoSkip}
                      className="px-4 py-2 rounded-full text-xs font-medium bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700/60 transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
                    >
                      Stay here
                    </button>
                    <a
                      href={`https://www.youtube.com/watch?v=${videoId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-2 text-xs font-medium text-zinc-400 hover:text-white transition-colors flex items-center gap-1.5"
                    >
                      <ExternalLink className="w-3 h-3" />
                      Watch on YouTube
                    </a>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2.5">
                  <a
                    href={`https://www.youtube.com/watch?v=${videoId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-full text-xs font-medium bg-white text-black hover:bg-zinc-200 transition-all flex items-center gap-1.5 shadow-sm"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    Watch on YouTube
                  </a>
                  <button
                    type="button"
                    onClick={handleSkipToNext}
                    className="px-4 py-2 rounded-full text-xs font-medium bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700/60 transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
                  >
                    <SkipForward className="w-3.5 h-3.5" />
                    Skip to Next
                  </button>
                </div>
              )
            ) : (
              <div className="flex flex-wrap items-center justify-center gap-2.5">
                <a
                  href={`https://www.youtube.com/watch?v=${videoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-full text-xs font-medium bg-white text-black hover:bg-zinc-200 transition-all flex items-center gap-1.5 shadow-sm"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Watch on YouTube
                </a>
                <button
                  type="button"
                  onClick={() => {
                    const el = document.querySelector("#youtube-discovery-grid") || document.querySelector("h2");
                    el?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="px-4 py-2 rounded-full text-xs font-medium bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700/60 transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
                >
                  <Compass className="w-3.5 h-3.5" />
                  Explore Recommendations
                </button>
                {relatedVideos && relatedVideos.length > 0 && relatedVideos[0]?.url && (
                  <button
                    type="button"
                    onClick={() => setVideoUrl(relatedVideos[0].url)}
                    className="px-4 py-2 rounded-full text-xs font-medium bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700/60 transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
                  >
                    <Play className="w-3.5 h-3.5" />
                    Play Recommended
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full px-4 sm:px-6 pt-2 sm:pt-2.5 pb-2 shrink-0">
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
