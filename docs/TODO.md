# Immediate Next Steps (TODO)

The frontend architecture, UI components, and local state management are complete (Phases 1-3). To finalize NodeParty as a hybrid platform, follow these backend integration phases:

## Phase 4: Watch Party Sync (Default)
- [ ] Set up a WebSocket signaling server (e.g., PartyKit, Liveblocks, or custom Node/Socket.io).
- [ ] Integrate the YouTube IFrame API into the `CinematicVideoPlayer` to replace the mocked player.
- [ ] Synchronize video playback states (Play, Pause, Seek) across all connected clients via the signaling server.
- [ ] Sync chat messages and floating emoji reactions over WebSocket channels.

## Phase 5: Collaborative Browser Mode (Visual Layer)
- [ ] Implement WebRTC tab sharing triggered by the existing "Screen Share" modal.
- [ ] Establish WebRTC peer connections via the signaling server.
- [ ] Implement logic to capture local guest pointer interactions over the video feed and normalize them into X/Y percentages.
- [ ] Render custom floating React cursors over the video feed for remote users based on their coordinates.

## Phase 6: Collaborative Browser Mode (Control Layer)
- [ ] Build the "Pass the Mouse" permission UI logic (frontend UI exists, needs wiring).
- [ ] Implement the WebRTC DataChannel to efficiently send interaction event packets (e.g., clicks, keystrokes).
- [ ] Build the companion Chrome Extension background script to be installed by the Host.
- [ ] Program the Chrome Extension to capture incoming DataChannel packets, validate the `targetTabId`, and execute events using the Chrome DevTools Protocol (`chrome.debugger` API).
