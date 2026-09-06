# Immediate Next Steps (TODO)

To make NodeParty a fully functional real-time watch party without overengineering, follow this prioritized roadmap:

## 1. Integrate the YouTube IFrame API
- [ ] In `VideoPlayer.tsx`, replace the static background image with the official [YouTube IFrame Player API](https://developers.google.com/youtube/iframe_api_reference).
- [ ] Bind the UI play/pause/seek controls directly to the `YT.Player` instance methods.
- [ ] Hook into the YouTube player's `onStateChange` events to update the local Zustand store when the video naturally buffers or ends.

## 2. Implement Real-Time WebSockets
*For simplicity and low-latency, consider a dedicated Node.js + Socket.IO server or a managed service like Socket.io / PartyKit / Pusher.*
- [ ] Set up a WebSocket connection when a user mounts the `/room/[roomId]` route.
- [ ] Implement event emitters in `useRoomStore.ts` for actions like: `play_video`, `pause_video`, `seek_video`, `send_message`, `trigger_reaction`.
- [ ] Listen for incoming WebSocket events to update the local Zustand store (e.g., when the host pauses the video, the server broadcasts `pause_video` to all clients, which then calls `YT.Player.pauseVideo()`).

## 3. Basic Room Management & Authentication
- [ ] Create Next.js API routes (`src/app/api/...`) to handle room creation, generating unique `roomId`s and passcodes.
- [ ] Add a lightweight database (e.g., Redis for ephemeral real-time room state, or SQLite/Postgres via Prisma) to track active rooms and the current video playing in them.
- [ ] Add simple session management (e.g., NextAuth/Auth.js or simple JWT cookies) so users can define their nickname and avatar before joining a room, replacing the hardcoded "Alex (You)".

## 4. Role-Based Access Enforcement
- [ ] Move the source of truth for Roles (Host vs. Viewer) to the backend.
- [ ] Ensure that WebSocket events affecting playback (play, pause, seek, change URL) are only accepted by the server if the sender's session has `Host` or `Moderator` privileges.
- [ ] Update the UI to strictly disable controls based on the server-validated role, moving away from purely trusting the client-side state.
