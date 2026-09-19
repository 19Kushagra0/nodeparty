# Step 14: Redesign Queue to Match Native YouTube Typography & Aesthetics (Anti-AI Slop)

## Big Picture
Transform the queue tab UI from generic "AI-slop" patterns (neon pink borders, loud all-caps labels, dashed boxes, and generic placeholder music notes) into an authentic, premium YouTube playlist/queue interface. 

We will adopt native YouTube typography (500-weight 2-line clamped titles, muted channel metadata, corner thumbnail timestamps) and sleek, clean surfaces that match real YouTube watch playlists.

---

## Feature Breakdown

### 1. Native YouTube Typography & Clean Labels
- Replace loud uppercase text (`NOW PLAYING`, `UPCOMING QUEUE`) with clean YouTube-style headers:
  - `"Now playing"` with a subtle, refined indicator.
  - `"Next in queue"` with a clean item count.
- Format video titles to match YouTube: `text-[13px] font-medium leading-snug line-clamp-2`.
- Format channel & metadata: `text-[11px] font-normal text-zinc-500 dark:text-zinc-400`.
- Native thumbnail duration badges: standard black pill in the bottom-right corner of the thumbnail.

### 2. Remove "AI Slop" Visuals
- **Remove pink borders & neon text**: Replace the tacky pink border and "Live on Stage" text with a polished, subtle surface highlight and a sleek playing status indicator.
- **Remove dashed border empty state**: Replace the generic dashed box with a clean, solid, modern YouTube empty queue card with a direct `"Browse Recommended"` action button.

### 3. Polish Queue Items
- Up Next queue items styled like YouTube playlist rows: thumbnail on left, index number, 2-line title, clean channel/added-by footer, and discrete hover action controls.

---

## Files to be Modified
1. `src/components/watch-party/youtube/YoutubeUpNextQueue.tsx`
   - Implement native YouTube typography, remove pink borders and dashed empty state, and refine video cards.
