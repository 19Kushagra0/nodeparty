# Step 9: Halve the Spacing Between Search Bar and YouTube Video Player

## Big Picture
The current vertical distance between the bottom of the YouTube search bar and the top of the video player card is approximately 38px (composed of bottom margin on the search container + top padding on the video player wrapper). We will reduce this gap by 50% to make the layout more compact and cohesive.

---

## Feature Breakdown

### 1. Adjust Search Bar Container Margin (`YoutubeWorkspaceView.tsx`)
- Reduce `mb-[10px] pb-2` on the search bar wrapper to `mb-0 pb-1`.

### 2. Adjust Video Player Top Padding (`YoutubePlayer.tsx`)
- Reduce the top padding of the `YoutubePlayer` wrapper from `pt-4 sm:pt-5` to `pt-2 sm:pt-2.5`.
- Apply the same consistent padding to loading and error states to eliminate any visual layout shifting.

---

## Files to be Modified
1. `src/components/watch-party/YoutubeWorkspaceView.tsx`
   - Reduce search container bottom spacing (`mb-[10px]` -> `mb-0`, `pb-2` -> `pb-1`).
2. `src/components/watch-party/youtube/YoutubePlayer.tsx`
   - Halve top padding (`pt-4 sm:pt-5` -> `pt-2 sm:pt-2.5`).
