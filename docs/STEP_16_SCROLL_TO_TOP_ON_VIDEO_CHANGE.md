# Step 16: Scroll Stage Area to Top on Video Change

## Big Picture
In the YouTube Workspace (`YoutubeWorkspaceView.tsx`), users scroll down the stage container to explore discovery videos, browse related titles, or inspect search results. However, when selecting a video to watch ("Watch Now" or clicking a video card), the scroll container historically retained its scrolled-down offset. This forced users to manually scroll back up to the top of the canvas to see the newly loaded video player.

This step attaches a scroll container reference to the workspace's main scrollable stage and introduces a synchronized effect that automatically and smoothly scrolls the viewport back to `top: 0` whenever a new video begins playing (via `activeVideoId` or `videoUrl` change).

---

## Feature Breakdown

### 1. Main Stage Scroll Container Reference
- Attach a React `useRef<HTMLDivElement>(null)` to the scrollable container:
  ```tsx
  <div
    ref={scrollContainerRef}
    className="flex-1 w-full min-h-0 overflow-y-auto overflow-x-hidden flex flex-col"
  >
  ```

### 2. Smooth Auto-Scroll on Video Change
- Observe changes to `activeVideoId` and `videoUrl`.
- When either changes to an active video, invoke:
  ```tsx
  scrollContainerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  ```
- Ensures whether a video is triggered from the discovery grid, the search bar, the queue, or synchronized remotely by a watch party co-viewer, the player immediately glides into view at the top.

---

## Files to be Modified
1. `src/components/watch-party/YoutubeWorkspaceView.tsx`
   - Bind `useRef` to the scrollable stage `div` and trigger smooth scroll-to-top on video change.
