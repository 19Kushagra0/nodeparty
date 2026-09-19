# Step 12: Fix Sidebar Tab Bar Width & Overflow Bug

## Big Picture
In Step 11, adding `px-2` horizontal padding caused the combined width of all 4 tabs (`Chat`, `React`, `Users`, `Queue`) to exceed the 320px sidebar width, causing the `Queue` button to truncate (`Qu...`) and overlap with the collapse arrow button (`>`). 

We will fix this by calibrating the tab dimensions: keeping the comfortable vertical padding (`py-2`), but optimizing the horizontal padding and gaps so all 4 tabs sit perfectly inside the pill without clipping or overlapping the collapse button.

---

## Feature Breakdown

### 1. Calibrate Tab Pill Dimensions (`ParticipantSidebar.tsx`)
- Keep vertical breathing room with `py-2`.
- Reset horizontal padding to `px-1` and icon gap to `gap-1` so each tab occupies ~55–58px, cleanly fitting all 4 tabs within the 240px container.
- Keep outer capsule padding at `p-1` and set collapse button to `w-8 h-8 shrink-0`.
- Add `whitespace-nowrap text-[11px] min-[360px]:text-xs` to ensure labels never wrap or truncate.

---

## Files to be Modified
1. `src/components/watch-party/ParticipantSidebar.tsx`
   - Adjust padding, gap, and sizing on navigation tab pills and collapse button.
