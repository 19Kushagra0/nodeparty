# Step 13: Remove Icon and "Auto-Sort by Votes" Badge from Queue Header

## Big Picture
In the right sidebar's Queue tab (`YoutubeUpNextQueue.tsx`), the header currently shows an icon box on the left (`ListVideo` icon) and an "Auto-Sort by Votes" pill badge on the right. Per the user's screenshots, we will remove both elements to give the Queue header a clean, minimalist typography-focused title.

---

## Feature Breakdown

### 1. Remove Left Icon Box (`YoutubeUpNextQueue.tsx`)
- Remove the `w-7 h-7 rounded-lg` container holding the `<ListVideo />` icon.
- Align the "Communal Queue" title and track count cleanly to the left edge.

### 2. Remove "Auto-Sort by Votes" Badge (`YoutubeUpNextQueue.tsx`)
- Remove the right-aligned `Auto-Sort by Votes` pill badge.

---

## Files to be Modified
1. `src/components/watch-party/youtube/YoutubeUpNextQueue.tsx`
   - Remove the `ListVideo` icon box and the `Auto-Sort by Votes` badge from the header bar.
