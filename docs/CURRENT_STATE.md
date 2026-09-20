# Current State: NodeParty

## 1. What is Working & Completed (Phases 1–4, Phase 5A)

### UI / UX & Responsive Shell (Phases 1–3)
* **Dual-Workspace Architecture ([`RoomShell.tsx`](file:///c:/Users/Admin/OneDrive/Documents/GitHub/nodeparty/src/components/watch-party/RoomShell.tsx))**:
  * Dynamic routing between **YouTube Workspace** (`activeWorkspace: "youtube"`) and **Meet / General Workspace** (`activeWorkspace: "general"`).
  * Rounded container with ambient lighting, darkroom blur, and responsive layout across desktop and mobile.
* **Left Navigation Rail ([`RoomSidebar.tsx`](file:///c:/Users/Admin/OneDrive/Documents/GitHub/nodeparty/src/components/layout/RoomSidebar.tsx))**:
  * Workspace switchers (YouTube vs. Meet / Screen Share).
  * Microphone and camera state toggles.
  * Instant room snapshot button (triggers shutter flash animation).
  * Settings modal trigger and room exit action.
* **Main Stage Orchestration**:
  * **General Mode ([`RoomClientView.tsx`](file:///c:/Users/Admin/OneDrive/Documents/GitHub/nodeparty/src/components/watch-party/RoomClientView.tsx))**: Swapping between [`CinematicMeetStage.tsx`](file:///c:/Users/Admin/OneDrive/Documents/GitHub/nodeparty/src/components/watch-party/CinematicMeetStage.tsx) and [`GridStageView.tsx`](file:///c:/Users/Admin/OneDrive/Documents/GitHub/nodeparty/src/components/watch-party/GridStageView.tsx).
  * Right social sidebar that smoothly collapses into a tactile mini rail with quick-action icons and friend count badge.
* **Mobile Experience ([`MobileBottomSheet.tsx`](file:///c:/Users/Admin/OneDrive/Documents/GitHub/nodeparty/src/components/watch-party/MobileBottomSheet.tsx))**:
  * Slide-up sheet (82dvh) mounting the full `ParticipantSidebar` on viewports `< lg`.
  * Touch-optimized bottom bar with quick access to mic, cam, reactions, and chat.
* **Dual Theme Engine ([`useRoomTheme.ts`](file:///c:/Users/Admin/OneDrive/Documents/GitHub/nodeparty/src/hooks/useRoomTheme.ts))**:
  * Dynamic switching between dark **Tap House Gold** (`#0c0a07`, `#161310`, `#c8962e`) and light **Minimalist Zinc** (`#F9FAFB`, `#FFFFFF`, `#F43F5E`).
* **Participant Sidebar ([`ParticipantSidebar.tsx`](file:///c:/Users/Admin/OneDrive/Documents/GitHub/nodeparty/src/components/watch-party/ParticipantSidebar.tsx))**:
  * **Chat Tab**: Real-time message bubbles, user mentions, and auto-scroll.
  * **React Tab**: 16 reaction chips, vibe shortcuts, toss popcorn action, and procedural **Web Audio API Sound FX Synthesizer** (party horn, applause, bass drop, magic sparkle).
  * **Users Tab**: Active participant list with role badges (Host, Moderator, Participant), grid/list toggle, and per-user mute & volume sliders.
* **Modals & Overlays**:
  * [`InviteModal.tsx`](file:///c:/Users/Admin/OneDrive/Documents/GitHub/nodeparty/src/components/watch-party/InviteModal.tsx): 1-click clipboard link copy, 6-digit room passcode badge, QR code generator, and WhatsApp/Twitter share.
  * [`SettingsModal.tsx`](file:///c:/Users/Admin/OneDrive/Documents/GitHub/nodeparty/src/components/watch-party/SettingsModal.tsx): Audio/video device selector, playback preferences, privacy mode, and hotkey reference.
  * [`CapturedMomentsModal.tsx`](file:///c:/Users/Admin/OneDrive/Documents/GitHub/nodeparty/src/components/watch-party/CapturedMomentsModal.tsx): Photo album gallery for captured room moments with likes and delete actions.
  * [`ScreenShareModal.tsx`](file:///c:/Users/Admin/OneDrive/Documents/GitHub/nodeparty/src/components/watch-party/ScreenShareModal.tsx): UI for initiating screen share and switching virtual co-browsing tabs.
  * [`CreateRoomModal.tsx`](file:///c:/Users/Admin/OneDrive/Documents/GitHub/nodeparty/src/components/home/CreateRoomModal.tsx): Homepage modal for configuring new rooms with privacy and preset selections.
* **Homepage Experience**:
  * [`HomePageContainer.tsx`](file:///c:/Users/Admin/OneDrive/Documents/GitHub/nodeparty/src/components/home/HomePageContainer.tsx) with [`CinemaProjectorBeam.tsx`](file:///c:/Users/Admin/OneDrive/Documents/GitHub/nodeparty/src/components/home/CinemaProjectorBeam.tsx), [`JoinRoomCard.tsx`](file:///c:/Users/Admin/OneDrive/Documents/GitHub/nodeparty/src/components/home/JoinRoomCard.tsx), [`InteractiveHeroDemo.tsx`](file:///c:/Users/Admin/OneDrive/Documents/GitHub/nodeparty/src/components/home/InteractiveHeroDemo.tsx), and [`HowItWorks.tsx`](file:///c:/Users/Admin/OneDrive/Documents/GitHub/nodeparty/src/components/home/HowItWorks.tsx).

---

### Real-Time Watch Party Sync (Phase 4)
* **PartyKit WebSocket Server ([`party/index.ts`](file:///c:/Users/Admin/OneDrive/Documents/GitHub/nodeparty/party/index.ts))**:
  * Room connection lifecycle (`onConnect`, `onMessage`, `onClose`) with client presence broadcasting (`sync_presence`).
  * Authoritative Host Clock Synchronization (`sync_playback`):
    * Host emits continuous playback packets (`currentTime`, `isPlaying`, `playbackRate`).
    * Guests run drift correction ($> 1.5$s hard seek, $0.3$s–$1.5$s rate throttle).
  * Room-wide video switching (`change_video`) and collaborative queue synchronization (`sync_queue`).
  * Social synchronization: chat messages (`chat_message`) and floating reaction bursts (`reaction_burst`).

---

### Discord-Style YouTube Workspace (Phase 5A)
* **Embedded Player & Metadata ([`YoutubePlayer.tsx`](file:///c:/Users/Admin/OneDrive/Documents/GitHub/nodeparty/src/components/watch-party/youtube/YoutubePlayer.tsx), [`YoutubeVideoMetadata.tsx`](file:///c:/Users/Admin/OneDrive/Documents/GitHub/nodeparty/src/components/watch-party/youtube/YoutubeVideoMetadata.tsx))**:
  * Integrated `react-youtube` replacing static poster mockups.
  * Dynamic metadata display (channel name, subscriber count, views, upload date, expandable description).
  * Empty stage state placeholder ([`YoutubePlayerPlaceholder.tsx`](file:///c:/Users/Admin/OneDrive/Documents/GitHub/nodeparty/src/components/watch-party/youtube/YoutubePlayerPlaceholder.tsx)) when no video is selected.
* **Search & Server-Side API Handlers**:
  * `/api/youtube/search`: Live search queries via `youtube-sr` without CORS or API key quota limits.
  * `/api/youtube/video`: Live video details and related video recommendations.
  * Direct URL entry in search bar: pasting any YouTube URL instantly switches video and syncs playback.
* **Concurrent Discovery Feed ([`YoutubeDiscoveryGrid.tsx`](file:///c:/Users/Admin/OneDrive/Documents/GitHub/nodeparty/src/components/watch-party/youtube/YoutubeDiscoveryGrid.tsx))**:
  * Browse and search videos while video actively plays.
  * Progressive infinite scroll with `IntersectionObserver` sentinel (unlocks 12 items at a time) and authentic circular spinner.
  * Auto-scroll stage back to top on new video selection.
* **Collaborative Up Next Queue ([`YoutubeUpNextQueue.tsx`](file:///c:/Users/Admin/OneDrive/Documents/GitHub/nodeparty/src/components/watch-party/youtube/YoutubeUpNextQueue.tsx))**:
  * Replaced AI-slop styling with authentic YouTube playlist aesthetic (2-line clamped titles, muted channel metadata, corner thumbnail duration pills).
  * Add to queue without interrupting active playback.
  * Auto-plays next video upon finish.
* **Brand Header Button ([`RoomBrandButton.tsx`](file:///c:/Users/Admin/OneDrive/Documents/GitHub/nodeparty/src/components/watch-party/RoomBrandButton.tsx))**:
  * Resets stage to recommended/trending discovery feed and smoothly scrolls to top.

---

## 2. What is Currently in Progress or Planned Next

* **Phase 5B: Meet-Style Video Conference & Dynamic Grid**:
  * Multi-peer camera video feeds and nameplates inside [`GridStageView.tsx`](file:///c:/Users/Admin/OneDrive/Documents/GitHub/nodeparty/src/components/watch-party/GridStageView.tsx).
  * Participant screen share pinning with responsive grid layout adjustments.
* **Phase 5C: Collaborative Browser Mode — WebRTC Telemetry**:
  * Normalized mouse coordinate math ($0.00 \le X, Y \le 1.00$) accounting for aspect ratios and high-DPI scaling.
  * `RTCDataChannel` transmission of cursor telemetry to render remote cursors in [`MultiplayerCursors.tsx`](file:///c:/Users/Admin/OneDrive/Documents/GitHub/nodeparty/src/components/watch-party/MultiplayerCursors.tsx).
* **Phase 6: Host Companion Chrome Extension**:
  * Manifest V3 extension utilizing `chrome.debugger` (CDP `Input.dispatchMouseEvent` / `Input.dispatchKeyEvent`) for remote input execution.

---

## 3. Component Inventory: Active vs. Orphaned

### Active Production Components
* **Room Architecture**: [`RoomShell.tsx`](file:///c:/Users/Admin/OneDrive/Documents/GitHub/nodeparty/src/components/watch-party/RoomShell.tsx), [`RoomSidebar.tsx`](file:///c:/Users/Admin/OneDrive/Documents/GitHub/nodeparty/src/components/layout/RoomSidebar.tsx), [`RoomClientView.tsx`](file:///c:/Users/Admin/OneDrive/Documents/GitHub/nodeparty/src/components/watch-party/RoomClientView.tsx), [`ParticipantSidebar.tsx`](file:///c:/Users/Admin/OneDrive/Documents/GitHub/nodeparty/src/components/watch-party/ParticipantSidebar.tsx), [`MobileBottomSheet.tsx`](file:///c:/Users/Admin/OneDrive/Documents/GitHub/nodeparty/src/components/watch-party/MobileBottomSheet.tsx).
* **YouTube Workspace**: [`YoutubeWorkspaceView.tsx`](file:///c:/Users/Admin/OneDrive/Documents/GitHub/nodeparty/src/components/watch-party/YoutubeWorkspaceView.tsx), [`YoutubePlayer.tsx`](file:///c:/Users/Admin/OneDrive/Documents/GitHub/nodeparty/src/components/watch-party/youtube/YoutubePlayer.tsx), [`YoutubePlayerPlaceholder.tsx`](file:///c:/Users/Admin/OneDrive/Documents/GitHub/nodeparty/src/components/watch-party/youtube/YoutubePlayerPlaceholder.tsx), [`YoutubeSearchBar.tsx`](file:///c:/Users/Admin/OneDrive/Documents/GitHub/nodeparty/src/components/watch-party/youtube/YoutubeSearchBar.tsx), [`YoutubeSearchHeader.tsx`](file:///c:/Users/Admin/OneDrive/Documents/GitHub/nodeparty/src/components/watch-party/youtube/YoutubeSearchHeader.tsx), [`YoutubeDiscoveryGrid.tsx`](file:///c:/Users/Admin/OneDrive/Documents/GitHub/nodeparty/src/components/watch-party/youtube/YoutubeDiscoveryGrid.tsx), [`YoutubeVideoCard.tsx`](file:///c:/Users/Admin/OneDrive/Documents/GitHub/nodeparty/src/components/watch-party/youtube/YoutubeVideoCard.tsx), [`YoutubeVideoMetadata.tsx`](file:///c:/Users/Admin/OneDrive/Documents/GitHub/nodeparty/src/components/watch-party/youtube/YoutubeVideoMetadata.tsx), [`YoutubeUpNextQueue.tsx`](file:///c:/Users/Admin/OneDrive/Documents/GitHub/nodeparty/src/components/watch-party/youtube/YoutubeUpNextQueue.tsx), [`RoomBrandButton.tsx`](file:///c:/Users/Admin/OneDrive/Documents/GitHub/nodeparty/src/components/watch-party/RoomBrandButton.tsx), [`RoomDetailsPill.tsx`](file:///c:/Users/Admin/OneDrive/Documents/GitHub/nodeparty/src/components/watch-party/RoomDetailsPill.tsx), [`WorkspaceNotch.tsx`](file:///c:/Users/Admin/OneDrive/Documents/GitHub/nodeparty/src/components/watch-party/WorkspaceNotch.tsx).
* **Meet & Stage Components**: [`CinematicMeetStage.tsx`](file:///c:/Users/Admin/OneDrive/Documents/GitHub/nodeparty/src/components/watch-party/CinematicMeetStage.tsx), [`GridStageView.tsx`](file:///c:/Users/Admin/OneDrive/Documents/GitHub/nodeparty/src/components/watch-party/GridStageView.tsx), [`CinematicVideoPlayer.tsx`](file:///c:/Users/Admin/OneDrive/Documents/GitHub/nodeparty/src/components/watch-party/CinematicVideoPlayer.tsx), [`MultiplayerCursors.tsx`](file:///c:/Users/Admin/OneDrive/Documents/GitHub/nodeparty/src/components/watch-party/MultiplayerCursors.tsx).
* **Modals**: [`InviteModal.tsx`](file:///c:/Users/Admin/OneDrive/Documents/GitHub/nodeparty/src/components/watch-party/InviteModal.tsx), [`SettingsModal.tsx`](file:///c:/Users/Admin/OneDrive/Documents/GitHub/nodeparty/src/components/watch-party/SettingsModal.tsx), [`CapturedMomentsModal.tsx`](file:///c:/Users/Admin/OneDrive/Documents/GitHub/nodeparty/src/components/watch-party/CapturedMomentsModal.tsx), [`ScreenShareModal.tsx`](file:///c:/Users/Admin/OneDrive/Documents/GitHub/nodeparty/src/components/watch-party/ScreenShareModal.tsx), [`CreateRoomModal.tsx`](file:///c:/Users/Admin/OneDrive/Documents/GitHub/nodeparty/src/components/home/CreateRoomModal.tsx).
* **Home**: [`HomePageContainer.tsx`](file:///c:/Users/Admin/OneDrive/Documents/GitHub/nodeparty/src/components/home/HomePageContainer.tsx), [`CinemaProjectorBeam.tsx`](file:///c:/Users/Admin/OneDrive/Documents/GitHub/nodeparty/src/components/home/CinemaProjectorBeam.tsx), [`JoinRoomCard.tsx`](file:///c:/Users/Admin/OneDrive/Documents/GitHub/nodeparty/src/components/home/JoinRoomCard.tsx), [`InteractiveHeroDemo.tsx`](file:///c:/Users/Admin/OneDrive/Documents/GitHub/nodeparty/src/components/home/InteractiveHeroDemo.tsx), [`HowItWorks.tsx`](file:///c:/Users/Admin/OneDrive/Documents/GitHub/nodeparty/src/components/home/HowItWorks.tsx), [`Navbar.tsx`](file:///c:/Users/Admin/OneDrive/Documents/GitHub/nodeparty/src/components/layout/Navbar.tsx), [`Footer.tsx`](file:///c:/Users/Admin/OneDrive/Documents/GitHub/nodeparty/src/components/layout/Footer.tsx).

### Orphaned / Deprecated Components (Clean-up Candidates)
* `src/components/watch-party/VideoPlayer.tsx` (superseded by `YoutubePlayer.tsx` and `CinematicVideoPlayer.tsx`).
* `src/components/watch-party/RoomHeader.tsx` (superseded by `RoomSidebar.tsx` and `WorkspaceNotch.tsx`).
* `src/components/watch-party/UpNextQueue.tsx` (superseded by `YoutubeUpNextQueue.tsx`).
* `src/components/watch-party/MediaInfoCard.tsx` (superseded by `YoutubeVideoMetadata.tsx`).
* `src/components/watch-party/WatchPartyControls.tsx` (superseded by embedded player controls).
* `src/components/home/FeaturedLounges.tsx` (removed from homepage).
* `src/components/home/LiveActivityTicker.tsx` (orphaned).
