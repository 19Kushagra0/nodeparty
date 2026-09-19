# Step 5B: Collaborative Browser Mode — Telemetry & Remote Cursors

## Big Picture
Before we build the video grid (Phase 5C) or remote host control (Phase 6), we need to allow users to see each other's mouse cursors on the screen. The goal of this step is to accurately track where a guest is pointing on their video, translate those coordinates to match the host's screen perfectly, and broadcast those movements in real-time.

## Feature Breakdown

### 1. Coordinate Normalization Math
- We will add event listeners for `pointermove` over the shared active canvas (like the YouTube video player).
- Because everyone has different screen sizes, we can't just send exact X/Y pixels. Instead, we will calculate normalized percentages (from `0.0` to `1.0`) taking into account any aspect-ratio letterboxing (black bars on the sides/top) so the cursor perfectly aligns with the video content.

### 2. Real-Time Transmission
- We will set up a transmission layer to send these coordinates. 
- *Note on Architecture:* While `TODO.md` mentions `RTCDataChannel`, we can either establish a WebRTC DataChannel (which is fast but complex to connect) or simply use our existing, highly optimized `PartyKit` WebSocket connection to broadcast cursor movements at 30Hz, which is standard for multiplayer cursors. I recommend starting with `PartyKit` to reduce connection failures, but we can implement WebRTC if strict peer-to-peer is required.

### 3. Remote Cursor Rendering
- We will update the `<MultiplayerCursors />` overlay component.
- This overlay will listen for incoming cursor coordinates and render floating mouse pointers (with the guest's name and colored avatar) precisely on top of the video feed.
- This is purely visual telemetry; zero actual clicks will be injected yet (that comes in Phase 6).

## Files to be Modified
1. `src/components/watch-party/MultiplayerCursors.tsx`
   - Implement the visual rendering of the remote cursors with smooth animation (framer-motion or CSS transitions).
2. `src/components/watch-party/RoomClientView.tsx` (or the video stage wrapper)
   - Add the `pointermove` capture logic and the math to normalize coordinates.
3. `src/store/useRoomStore.ts`
   - Add state and functions to handle outgoing cursor broadcast packets and process incoming cursor packets.
