# Step 8: Top-Left Header Brand & Back Button (`< NodeParty`)

## Big Picture
To the left of the top modal notch capsule (`CODE: CYBER-4096 ... Host: Alex ...`), we will add a dedicated brand back button consisting of a rounded squircle `<` (Chevron Left) icon button paired with the bold **NodeParty** brand text. Clicking it seamlessly navigates the user back to the home lounge (`/`).

---

## Feature Breakdown

### 1. Brand Back Button Component (`RoomBrandButton.tsx`)
- A reusable component featuring:
  - A rounded-2xl / squircle icon container with a crisp `ChevronLeft` arrow.
  - The bold **NodeParty** logo typography beside it.
  - Hover states: gentle scaling and theme-aware surface highlighting.
  - Action: Clicking navigates back to `/` using Next.js `useRouter` / `<Link>`.

### 2. Positioning & Placement in Workspace Stage
- Place the brand button in the top-left corner of the stage canvas (`absolute top-3 left-4 sm:left-6 z-[110]`) in [`YoutubeWorkspaceView.tsx`](file:///c:/Users/Admin/OneDrive/Documents/GitHub/nodeparty/src/components/watch-party/YoutubeWorkspaceView.tsx).
- Ensure it sits gracefully to the left of the center-dipped `WorkspaceNotch`.
- Align styling across both Dark and Light themes.

---

## Files to be Created & Modified
1. `src/components/watch-party/RoomBrandButton.tsx` (NEW)
   - Reusable `< NodeParty` brand button with squircle icon and home navigation.
2. `src/components/watch-party/YoutubeWorkspaceView.tsx` (MODIFY)
   - Mount the `RoomBrandButton` at the top-left of the workspace canvas stage to the left of `WorkspaceNotch`.
3. `src/components/watch-party/CinematicMeetStage.tsx` (MODIFY - Optional/Unified)
   - Update the existing top-left "Back to Home" button to use this new matching `< NodeParty` design for total visual consistency across all room modes.
