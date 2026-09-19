# Step 5: Meet-Style Grid Layout & Screen Share Pinning

## Big Picture
The goal of this step is to transform the empty `GridStageView` into a fully functional, dynamic Google Meet-style video conferencing grid. This will allow users to see each other face-to-face while chatting or watching content together.

## Feature Breakdown

### 1. Dynamic Video Grid (`GridStageView.tsx`)
- Render a responsive CSS grid that automatically adjusts based on the number of active participants in the room (e.g., 1 person = full screen, 2 people = side-by-side split, 3-4 people = 2x2 grid, etc.).
- Display participant avatars or live video feeds in each grid cell.
- Include nameplates and mic status indicators on each video tile.

### 2. Max Participants Control (PC Only)
- Add a dropdown or slider control to the UI (visible only on larger desktop screens) to let the user choose the maximum number of video feeds shown on the main stage at once.

### 3. Screen Share Pinning 
- Implement a "Pin" functionality. When someone shares their screen or is manually pinned, their feed will take over the main `GridStageView` as the primary focus.
- When a feed is pinned to the main stage, the other participants' video feeds will naturally fall back to being viewed in the "Users" tab of the right-hand `ParticipantSidebar` (which already has a mini-grid mode built in).

## Files to be Modified
1. `src/store/useRoomStore.ts`
   - Add state for `maxGridParticipants` (number).
   - Add state for `pinnedFeedId` (string | null).
2. `src/components/watch-party/GridStageView.tsx`
   - Implement the dynamic grid CSS and logic.
   - Render participant video tiles.
   - Handle the pinned state view.
3. `src/components/watch-party/RoomClientView.tsx` or `src/components/watch-party/RoomHeader.tsx`
   - Add the "Max Participants" control button for desktop viewports.
