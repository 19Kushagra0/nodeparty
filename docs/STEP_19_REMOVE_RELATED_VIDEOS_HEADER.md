# Step 19: Remove Header Text / Up Next Header from YouTube Discovery Grid

## Big Picture
In [`src/components/watch-party/youtube/YoutubeDiscoveryGrid.tsx`](file:///c:/Users/Admin/OneDrive/Documents/GitHub/nodeparty/src/components/watch-party/youtube/YoutubeDiscoveryGrid.tsx), a noisy section header is currently rendered above the video feed:
> **Up Next / Related Videos** `29 of 29`  
> *Videos related to what you're watching right now*

This header adds unnecessary clutter and amateur counter badges (`29 of 29`) that don't exist on native YouTube. When users are watching a video, related video recommendations should sit seamlessly beneath the player without redundant explanatory text or counter pills.

---

## Feature Breakdown

### 1. Remove the "Up Next / Related Videos" Header Block
- In `YoutubeDiscoveryGrid.tsx`, when related videos are displayed beneath the active video (`isRelatedActive`):
  - Completely omit the noisy section header (`Up Next / Related Videos`, `29 of 29` badge, and subtitle).
  - Let the video recommendation grid start cleanly right below the player/metadata.

### 2. Remove Noisy Subtitles & Counter Badges Across Feed States
- Strip out the subtitle `<p className="text-xs">{headerSubtitle}</p>` and counter pills (`{visibleVideos.length} of ...`).
- For search results, keep only a clean, minimal title (e.g. `Results for "..."` with the `Clear Search` button).
- For the home discovery feed, keep it clean and minimal without redundant subtitles or pill counters.

---

## Files to be Modified
1. `src/components/watch-party/youtube/YoutubeDiscoveryGrid.tsx`
   - Remove the header text block (title, counter pill, and subtitle) when displaying related videos, and remove noisy secondary subtitles.
