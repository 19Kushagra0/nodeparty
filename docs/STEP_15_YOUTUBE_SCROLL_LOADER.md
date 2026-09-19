# Step 15: Replace Infinite Scroll Pill with Native YouTube Loading Spinner

## Big Picture
The current infinite scroll bottom container in [`src/components/watch-party/youtube/YoutubeDiscoveryGrid.tsx`](file:///c:/Users/Admin/OneDrive/Documents/GitHub/nodeparty/src/components/watch-party/youtube/YoutubeDiscoveryGrid.tsx) displays an amateur pill badge reading:
> `🟠 Scrolling for more videos (12 of 18)`  
> `Or click here to load more (+12)`

This element looks like an amateur clone ("rip off") rather than the authentic YouTube experience. On YouTube, infinite scroll is smooth and unpretentious:
1. No text pills or clunky counters (`(12 of 18)`).
2. No secondary manual click buttons (`Or click here to load more (+12)`).
3. A clean, authentic YouTube-style circular spinner centered beneath the grid when loading more content.
4. Seamless automatic pagination powered silently by the `IntersectionObserver` sentinel.

---

## Feature Breakdown

### 1. Remove the AI-Slop / Rip-Off Loading Pill
- Eliminate the floating rounded pill (`Scrolling for more videos...`).
- Eliminate the manual text button (`Or click here to load more (+12)`).
- Eliminate noisy counter badges.

### 2. Implement Authentic YouTube Infinite Scroll Spinner
- Render a sleek, centered YouTube-style spinner:
  - Clean circular spinner with YouTube's red / theme accent styling:
    ```tsx
    <div className="w-8 h-8 rounded-full border-2 border-zinc-300 dark:border-zinc-700 border-t-red-600 animate-spin" />
    ```
  - Contained in an unobtrusive bottom padding container (`py-8 flex justify-center`).
- Keep the `ref={observerTarget}` sentinel active so when users scroll within ~200px of the bottom, the next 12 videos load automatically without user friction.

### 3. Clean End-of-Results Treatment
- When all videos have been loaded (`!hasMore`), gracefully hide the spinner without showing verbose debug text, matching YouTube's clean desktop feed behavior.

---

## Files to be Modified
1. `src/components/watch-party/youtube/YoutubeDiscoveryGrid.tsx`
   - Replace the clunky infinite scroll pill with the native YouTube circular spinner and clean sentinel.
