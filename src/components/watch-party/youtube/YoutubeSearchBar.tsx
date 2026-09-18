"use client";

import { useState } from "react";
import { Search, Link2, X, Loader2 } from "lucide-react";
import { useRoomTheme } from "@/hooks/useRoomTheme";
import { useRoomStore } from "@/store/useRoomStore";

export function YoutubeSearchBar() {
  const t = useRoomTheme();
  const setVideoUrl = useRoomStore((state) => state.setVideoUrl);
  const searchYoutube = useRoomStore((state) => state.searchYoutube);
  const clearSearch = useRoomStore((state) => state.clearSearch);
  const isSearching = useRoomStore((state) => state.isSearching);
  const [query, setQuery] = useState("");

  const isUrl =
    query.trim().startsWith("http://") ||
    query.trim().startsWith("https://") ||
    query.trim().includes("youtube.com") ||
    query.trim().includes("youtu.be");

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;

    if (isUrl) {
      setVideoUrl(trimmed);
      setQuery("");
    } else {
      searchYoutube(trimmed);
    }
  };

  const handleClear = () => {
    setQuery("");
    clearSearch();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="w-full flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3">
      <div
        className="relative flex-1 flex items-center rounded-full transition-all duration-200 shadow-inner group"
        style={{
          backgroundColor: t.isDark ? "#1a1612" : "#ffffff",
          border: `1px solid ${isUrl ? t.accent : t.border}`,
        }}
      >
        <div className="hidden sm:flex pl-4 pr-2 items-center pointer-events-none">
          {isSearching ? (
            <Loader2 className="w-4 h-4 animate-spin text-amber-500" />
          ) : isUrl ? (
            <Link2
              className="w-4 h-4 transition-colors animate-pulse"
              style={{ color: t.accent }}
            />
          ) : (
            <Search className="w-4 h-4 text-zinc-400 group-focus-within:text-zinc-200 transition-colors" />
          )}
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search YouTube or paste video URL (Press Enter)..."
          className={`w-full pl-4 sm:pl-0 py-2.5 sm:py-2.5 bg-transparent text-xs sm:text-sm outline-none placeholder:text-zinc-500 font-medium ${
            isUrl ? "pr-28" : "pr-20 sm:pr-32"
          }`}
          style={{ color: t.text }}
        />

        <div className="absolute right-2.5 flex items-center gap-1.5">
          {query.length > 0 && (
            <button
              type="button"
              onClick={handleClear}
              className="p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer"
              title="Clear search"
            >
              <X className="w-4 h-4 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors" />
            </button>
          )}

          {isUrl ? (
            <button
              type="button"
              onClick={() => handleSubmit()}
              className="px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase shadow-sm cursor-pointer hover:opacity-90 active:scale-95 transition-all"
              style={{
                backgroundColor: t.accent,
                color: t.accentFg,
              }}
              title="Click to play URL"
            >
              Play Link
            </button>
          ) : (
            <>
              <button
                type="button"
                onClick={() => handleSubmit()}
                disabled={isSearching}
                className="hidden sm:flex items-center gap-1 px-3 py-1 rounded-full text-xs font-mono font-semibold cursor-pointer hover:opacity-80 active:scale-95 transition-all disabled:opacity-50"
                style={{
                  backgroundColor: t.isDark ? "#241f1a" : "#f0f0f2",
                  color: t.muted,
                }}
                title="Press Enter to search"
              >
                {isSearching ? (
                  <span>Searching...</span>
                ) : (
                  <>
                    <span>⏎</span>
                    <span>Search</span>
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => handleSubmit()}
                disabled={isSearching}
                className="flex sm:hidden p-2 rounded-full transition-all cursor-pointer hover:opacity-80 active:opacity-60 disabled:opacity-50"
                style={{ backgroundColor: t.isDark ? "#241f1a" : "#f0f0f2" }}
                title="Search"
              >
                {isSearching ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-500" />
                ) : (
                  <Search className="w-3.5 h-3.5" style={{ color: t.muted }} />
                )}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
