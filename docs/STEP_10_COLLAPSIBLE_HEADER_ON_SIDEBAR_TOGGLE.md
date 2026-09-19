# Step 10: Auto-Hide Top Header When Right Sidebar Collapses

## Big Picture
When the user collapses the right sidebar (sliding it away to the right rail, as shown in Image 2), the YouTube workspace enters an expanded viewing canvas. To maximize the vertical viewing area and create an immersive cinema experience, the top header (both the `< NodeParty` brand button and the center room details notch modal, shown in Image 3) will smoothly fade out and slide up out of view.

When the right sidebar is expanded again, the top header smoothly slides back down and reappears.

---

## Feature Breakdown

### 1. Header Visibility Bound to `isRightSidebarOpen`
- In `YoutubeWorkspaceView.tsx`:
  - When `isRightSidebarOpen` is `true`: Header (`< NodeParty` and `WorkspaceNotch`) is fully visible (`opacity-100 translate-y-0`).
  - When `isRightSidebarOpen` is `false` (sidebar slid to right): Header smoothly animates out of view (`opacity-0 -translate-y-8 pointer-events-none`).

### 2. Smooth Responsive Search Bar Spacing
- Dynamically adjust the top padding of the search bar container:
  - Sidebar Open: `pt-[76px]` (leaves space for the notch).
  - Sidebar Collapsed: `pt-3.5 sm:pt-4` (smoothly moves search bar and video player up to reclaim vertical screen space).
  - Transition with `transition-all duration-300 ease-in-out` for a fluid, polished feel.

---

## Files to be Modified
1. `src/components/watch-party/YoutubeWorkspaceView.tsx`
   - Bind top header container animation classes and search container top padding to `isRightSidebarOpen`.
