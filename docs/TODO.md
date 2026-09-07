# Immediate Next Steps (TODO)

To finalize NodeParty as a hybrid platform, follow these phases:

## Phase 1: Watch Party Mode (Default)
- [ ] Set up a WebSocket signaling server (e.g., PartyKit, Liveblocks).
- [ ] Integrate the YouTube IFrame API into the `CinematicVideoPlayer`.
- [ ] Synchronize video playback states (Play, Pause, Seek) across all connected clients via the signaling server.
- [ ] Implement a "Share Screen" button to toggle into Collaborative Browser Mode.

## Phase 2: Collaborative Browser Mode (Visual Layer)
- [ ] Implement WebRTC tab sharing triggered by the "Share Screen" button.
- [ ] Establish WebRTC peer connections via the signaling server.
- [ ] Implement logic to capture local guest pointer interactions over the video feed and normalize them into X/Y percentages.
- [ ] Render custom floating React cursors over the video feed for remote users based on their coordinates.

## Phase 3: Collaborative Browser Mode (Control Layer)
- [ ] Build the "Pass the Mouse" permission UI for hosts and guests.
- [ ] Implement the WebRTC DataChannel to efficiently send interaction event packets (e.g., clicks, keystrokes).
- [ ] Build the companion Chrome Extension background script to be installed by the Host.
- [ ] Program the Chrome Extension to capture incoming DataChannel packets, validate the `targetTabId` of the shared tab, and execute the events directly using the Chrome DevTools Protocol (`chrome.debugger` API).
