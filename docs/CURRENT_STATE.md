# Current State: NodeParty

## 1. What is Working & Completed (Phases 1–3)

### UI / UX & Responsive Shell
* **3-Column Theater Architecture**: Full-height responsive layout inside [`RoomShell.tsx`](file:///c:/Users/Admin/OneDrive/Documents/GitHub/nodeparty/src/components/watch-party/RoomShell.tsx) with rounded container, darkroom blur, and ambient lighting.
* **Left Navigation Rail ([`RoomSidebar.tsx`](file:///c:/Users/Admin/OneDrive/Documents/GitHub/nodeparty/src/components/layout/RoomSidebar.tsx))**:
  * Cinema / Grid layout mode toggle.
  * Mic and camera toggle controls.
  * Instant room snapshot button (triggers shutter flash animation).
  * Settings modal trigger and room exit button.
* **Main Stage Orchestration ([`RoomClientView.tsx`](file:///c:/Users/Admin/OneDrive/Documents/GitHub/nodeparty/src/components/watch-party/RoomClientView.tsx))**:
  * Dynamic swapping between Cinema Player and Grid Stage View ([`GridStageView.tsx`](file:///c:/Users/Admin/OneDrive/Documents/GitHub/nodeparty/src/components/watch-party/GridStageView.tsx)).
  * Camera shutter flash overlay on moment capture (`isShutterFlashing`).
  * Right social sidebar that smoothly collapses into a tactile mini rail with quick-action icons and friend count badge.
* **Mobile Experience ([`MobileBottomSheet.tsx`](file:///c:/Users/Admin/OneDrive/Documents/GitHub/nodeparty/src/components/watch-party/MobileBottomSheet.tsx))**:
  * Smooth slide-up sheet (82dvh) mounting the full `ParticipantSidebar` on viewports `< lg`.
  * Touch-optimized bottom bar with quick access to mic, cam, reactions, and chat.
* **Dual Theme Engine ([`useRoomTheme.ts`](file:///c:/Users/Admin/OneDrive/Documents/GitHub/nodeparty/src/hooks/useRoomTheme.ts))**:
  * Dynamic switching between dark **Tap House Gold** (`#0c0a07`, `#161310`, `#c8962e`) and light **Minimalist Zinc** (`#F9FAFB`, `#FFFFFF`, `#F43F5E`).
* **Participant Sidebar ([`ParticipantSidebar.tsx`](file:///c:/Users/Admin/OneDrive/Documents/GitHub/nodeparty/src/components/watch-party/ParticipantSidebar.tsx))**:
  * **Chat Tab**: Real-time message bubbles, user mentions (`@user`), and replies.
  * **React Tab**: 16 reaction chips, vibe shortcuts, toss popcorn action, and a procedural **Web Audio API Sound FX Synthesizer** (generating real-time party horn, applause, bass drop, and magic sparkle).
  * **Users Tab**: Active participant list with role badges (Host, Moderator, Participant), grid/list toggle, and per-user mute & volume sliders.
* **Modals & Overlays**:
  * [`InviteModal.tsx`](file:///c:/Users/Admin/OneDrive/Documents/GitHub/nodeparty/src/components/watch-party/InviteModal.tsx): 1-click clipboard link copy, 6-digit room passcode badge, QR code generator, and WhatsApp/Twitter share.
  * [`SettingsModal.tsx`](file:///c:/Users/Admin/OneDrive/Documents/GitHub/nodeparty/src/components/watch-party/SettingsModal.tsx): Comprehensive modal for audio input/output, camera devices, playback preferences, privacy mode, and hotkey reference.
  * [`CapturedMomentsModal.tsx`](file:///c:/Users/Admin/OneDrive/Documents/GitHub/nodeparty/src/components/watch-party/CapturedMomentsModal.tsx): Photo album gallery for moments snapped during party sessions with likes and delete actions.
  * [`ScreenShareModal.tsx`](file:///c:/Users/Admin/OneDrive/Documents/GitHub/nodeparty/src/components/watch-party/ScreenShareModal.tsx): UI for initiating screen share and switching virtual co-browsing tabs.
  * [`CreateRoomModal.tsx`](file:///c:/Users/Admin/OneDrive/Documents/GitHub/nodeparty/src/components/home/CreateRoomModal.tsx): Homepage modal for configuring new rooms with privacy and preset selections.
* **Homepage Experience**:
  * [`HomePageContainer.tsx`](file:///c:/Users/Admin/OneDrive/Documents/GitHub/nodeparty/src/components/home/HomePageContainer.tsx) with [`CinemaProjectorBeam.tsx`](file:///c:/Users/Admin/OneDrive/Documents/GitHub/nodeparty/src/components/home/CinemaProjectorBeam.tsx), [`JoinRoomCard.tsx`](file:///c:/Users/Admin/OneDrive/Documents/GitHub/nodeparty/src/components/home/JoinRoomCard.tsx), [`InteractiveHeroDemo.tsx`](file:///c:/Users/Admin/OneDrive/Documents/GitHub/nodeparty/src/components/home/InteractiveHeroDemo.tsx), and [`HowItWorks.tsx`](file:///c:/Users/Admin/OneDrive/Documents/GitHub/nodeparty/src/components/home/HowItWorks.tsx).
* **Local State Management**:
  * Unified Zustand store ([`useRoomStore.ts`](file:///c:/Users/Admin/OneDrive/Documents/GitHub/nodeparty/src/store/useRoomStore.ts)) managing all UI state, playback, social interaction, permissions, and modals.
* **Prepared Packages**:
  * `partykit` (`^0.0.115`), `partysocket` (`^1.3.0`), `react-youtube` (`^10.1.0`), and `framer-motion` (`^13.2.0`) installed in `package.json`.

---

## 2. What is Currently Mocked or Disconnected

* **Video Playback**:
  * In [`CinematicVideoPlayer.tsx`](file:///c:/Users/Admin/OneDrive/Documents/GitHub/nodeparty/src/components/watch-party/CinematicVideoPlayer.tsx), playback is currently mocked using a static preset poster image and CSS timer.
  * `react-youtube` / YouTube IFrame API has not yet been wired to replace the mock poster.
* **Real-Time Network Sync**:
  * There is currently zero live client-to-client connectivity.
  * Playback commands (play, pause, seek), chat messages, and emoji bursts currently only mutate local client state in Zustand.
* **Screen Sharing & WebRTC**:
  * The `ScreenShareModal` opens and simulates tab switching, but no actual `navigator.mediaDevices.getDisplayMedia` capture or WebRTC peer connections are negotiated.
* **Control Layer & Chrome Extension**:
  * The Chrome Extension has not been built yet.
  * Remote mouse coordinate capture and input dispatch are non-functional until Phase 5 & 6.

---

## 3. Component Inventory: Active vs. Orphaned

### Active Production Components
* **Room Core**: `RoomShell.tsx`, `RoomSidebar.tsx`, `RoomClientView.tsx`, `CinematicVideoPlayer.tsx`, `GridStageView.tsx`, `ParticipantSidebar.tsx`, `MobileBottomSheet.tsx`, `MultiplayerCursors.tsx`.
* **Modals**: `InviteModal.tsx`, `SettingsModal.tsx`, `CapturedMomentsModal.tsx`, `ScreenShareModal.tsx`, `CreateRoomModal.tsx`.
* **Home**: `HomePageContainer.tsx`, `CinemaProjectorBeam.tsx`, `JoinRoomCard.tsx`, `InteractiveHeroDemo.tsx`, `HowItWorks.tsx`, `Navbar.tsx`, `Footer.tsx`.

### Orphaned / Deprecated Components (Candidates for Cleanup)
* `src/components/watch-party/VideoPlayer.tsx` (superseded by `CinematicVideoPlayer.tsx`).
* `src/components/watch-party/RoomHeader.tsx` (superseded by `RoomSidebar.tsx` and notch in `CinematicVideoPlayer.tsx`).
* `src/components/watch-party/UpNextQueue.tsx` (orphaned; queue item switching is partially built into player notch).
* `src/components/watch-party/MediaInfoCard.tsx` (orphaned).
* `src/components/watch-party/WatchPartyControls.tsx` (orphaned).
* `src/components/home/FeaturedLounges.tsx` (removed from homepage during redesign).
* `src/components/home/LiveActivityTicker.tsx` (orphaned).
