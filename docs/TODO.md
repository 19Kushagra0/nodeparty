# Immediate Next Steps & Roadmap (TODO)

The frontend architecture, responsive 3-column UI, theme engine, and local state management are complete (Phases 1–3). Follow this phased engineering sequence:

---

## 🟢 Phase 1–3: Frontend UI, UX & State (COMPLETED)
- [x] Responsive 3-column desktop shell & mobile slide-up sheet (`RoomShell.tsx`, `RoomSidebar.tsx`, `RoomClientView.tsx`, `MobileBottomSheet.tsx`).
- [x] Dark "Tap House Gold" and Light minimalist theme system (`useRoomTheme.ts`, `globals.css`).
- [x] Cinema player viewport with ambient backlighting, dipped notch, and floating transport controls (`CinematicVideoPlayer.tsx`).
- [x] Multi-participant grid view mode (`GridStageView.tsx`).
- [x] Chat, React (Web Audio API soundboard), and Users sidebar tabs (`ParticipantSidebar.tsx`).
- [x] Photo snapshot album with screen shutter flash overlay (`CapturedMomentsModal.tsx`).
- [x] Settings modal, invite modal, screen share modal, create room modal.
- [x] Unified local state management with Zustand (`useRoomStore.ts`).
- [x] Dependencies installed in `package.json`: `partykit`, `partysocket`, `react-youtube`, `framer-motion`.

---

## 🟡 Phase 4: Watch Party Sync (Default Mode — In Progress)
*Objective: Achieve rock-solid multi-browser synchronized YouTube playback and real-time chat before touching browser control.*

- [ ] **PartyKit WebSocket Signaling Server**:
  - [ ] Initialize a PartyKit server project or config within the workspace.
  - [ ] Implement room connection handling (`onConnect`, `onMessage`, `onClose`) with room IDs and client presence.
  - [ ] Wire `partysocket` in [`useRoomStore.ts`](file:///c:/Users/Admin/OneDrive/Documents/GitHub/nodeparty/src/store/useRoomStore.ts) to connect clients to the room room.
- [ ] **Real YouTube IFrame Integration**:
  - [ ] Replace the mock background poster in [`CinematicVideoPlayer.tsx`](file:///c:/Users/Admin/OneDrive/Documents/GitHub/nodeparty/src/components/watch-party/CinematicVideoPlayer.tsx) with the `react-youtube` (`YT.Player`) component.
  - [ ] Bind local player events (`onReady`, `onStateChange`, play, pause, seek) to the store.
- [ ] **Authoritative Playback Synchronization**:
  - [ ] Designate the room Host as the authoritative clock source.
  - [ ] Broadcast timestamped playback clock packets (`play`, `pause`, `seekTo`, `playbackRate`).
  - [ ] Implement drift correction on non-host clients:
    - *Drift > 1.5s*: Hard seek to host position.
    - *Drift 0.3s–1.5s*: Smooth rate throttle (e.g., 0.95x or 1.05x) to catch up without audio pop.
- [ ] **Real-Time Social Sync**:
  - [ ] Broadcast chat messages across WebSocket to all room participants.
  - [ ] Broadcast floating emoji reaction bursts and soundboard triggers with origin coordinates.
  - [ ] Synchronize participant presence and role updates (Host, Moderator, Participant).
- [ ] **Multi-Browser Verification**:
  - [ ] Test with two distinct browser windows: Host starts room, Guest joins via room code/URL, both verify synchronized play, pause, and seek.

---

## 🟡 Phase 5A: Collaborative Browser Mode — Tab Screen Sharing (Visual Feed)
*Objective: Stream host tab video feed to guests over WebRTC.*

- [ ] Implement `navigator.mediaDevices.getDisplayMedia({ video: { displaySurface: "browser" }, audio: true })` triggered from [`ScreenShareModal.tsx`](file:///c:/Users/Admin/OneDrive/Documents/GitHub/nodeparty/src/components/watch-party/ScreenShareModal.tsx).
- [ ] Utilize the PartyKit signaling server to exchange WebRTC SDP offers, answers, and ICE candidates between Host and Guests.
- [ ] Render the incoming `MediaStream` video track in place of the YouTube player on guest screens.

---

## 🟡 Phase 5B: Collaborative Browser Mode — Telemetry & Remote Cursors
*Objective: Accurately map and broadcast mouse positions without injecting clicks.*

- [ ] **Coordinate Normalization Math**:
  - [ ] Capture `pointermove` events over the video element on the Guest browser.
  - [ ] Calculate normalized percentages ($0.00 \le X, Y \le 1.00$) accounting for aspect-ratio letterboxing (`object-fit: contain`) and high-DPI scaling.
- [ ] **WebRTC DataChannel Transmission**:
  - [ ] Establish an `RTCDataChannel` between Guest and Host NodeParty pages.
  - [ ] Transmit throttled cursor coordinates (~30–60Hz) over the DataChannel.
- [ ] **Remote Cursor Rendering**:
  - [ ] Render floating cursor overlays ([`MultiplayerCursors.tsx`](file:///c:/Users/Admin/OneDrive/Documents/GitHub/nodeparty/src/components/watch-party/MultiplayerCursors.tsx)) on both Host and Guest screens showing guest name, avatar, and pointer position.
  - [ ] Verify pixel-perfect alignment against the video feed with zero click injection.

---

## 🟡 Phase 6: Collaborative Browser Mode — Control Layer (Host Web Page Bridge + Extension)
*Objective: Enable secure, permissioned remote mouse/keyboard control of the host's shared tab.*

- [ ] **Permission Handshake & "Pass the Mouse" UI**:
  - [ ] Guest clicks "Request Control".
  - [ ] Host receives a visible prompt to Approve or Deny.
  - [ ] Host maintains an instant **Revoke Control** kill switch button (and `Escape` hotkey).
- [ ] **Security & `CONTROL SESSION` Governance**:
  - [ ] Generate a secure `controlToken` tied to `roomId`, `hostUserId`, `authorizedGuestId`, and `targetTabId`.
  - [ ] Enforce permission validation on the Host NodeParty page before any message is bridged to the extension.
- [ ] **Companion Chrome Extension (Manifest V3)**:
  - [ ] Create extension directory with `manifest.json` (permissions: `["debugger", "tabs"]`, `externally_connectable` restricted to NodeParty origins).
  - [ ] Service worker listening to `chrome.runtime.onMessageExternal`.
- [ ] **Host Web Page to Extension Messaging Bridge**:
  - [ ] Host NodeParty page uses `chrome.runtime.sendMessage(EXTENSION_ID, packet)` to forward authorized Guest input packets to the extension.
- [ ] **Input Injection via `chrome.debugger`**:
  - [ ] Extension attaches `chrome.debugger.attach({ tabId: targetTabId }, "1.3")` upon control authorization.
  - [ ] Dispatch mouse events via `Input.dispatchMouseEvent` (`mousePressed`, `mouseReleased`, `mouseMoved`, `mouseWheel`).
  - [ ] Dispatch keyboard events via `Input.dispatchKeyEvent` (`rawKeyDown`, `keyUp`, `char`).
  - [ ] Listen to `chrome.debugger.onDetach` to automatically notify the Host page when control is severed.
- [ ] **Extension Transparency UI**:
  - [ ] Display extension popup / status badge showing active control state, guest name, and a one-click "Stop Control" button.

---

## 🧹 Codebase Cleanup
- [ ] Remove or archive orphaned legacy components:
  - `src/components/watch-party/VideoPlayer.tsx`
  - `src/components/watch-party/RoomHeader.tsx`
  - `src/components/watch-party/UpNextQueue.tsx`
  - `src/components/watch-party/MediaInfoCard.tsx`
  - `src/components/watch-party/WatchPartyControls.tsx`
  - `src/components/home/FeaturedLounges.tsx`
  - `src/components/home/LiveActivityTicker.tsx`
- [ ] Fix stale references in `PRODUCT.md` (remove phantom `InteractiveVirtualBrowser.tsx`) and update `DESIGN.md` / `README.md` to match the source of truth.
