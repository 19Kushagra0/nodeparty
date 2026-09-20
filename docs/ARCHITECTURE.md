# Architecture: NodeParty

## 1. Executive Summary & Philosophy
NodeParty is a hybrid real-time synchronized social entertainment and collaborative cinema platform built with Next.js 16, React 19, Tailwind CSS v4, and Zustand. It provides two core operational environments:
1. **Watch Party & YouTube Workspace Mode (Default)**: Native YouTube browsing, real-time query search, live related recommendations, collaborative playlist queueing, and perfect-sync video playback (via `react-youtube` / YouTube IFrame API) synchronized over a WebSocket signaling plane (PartyKit).
2. **Collaborative Browser & Meet Mode (Advanced)**: Dynamic face-to-face video conferencing grid (`GridStageView`), real-time tab screen sharing via WebRTC, low-latency remote cursor telemetry, and permission-gated remote mouse/keyboard control mediated through a Host web app bridge and a companion Chrome Extension (`chrome.debugger`).

---

## 2. Tech Stack

### Core Framework & Runtime
* **Framework**: Next.js 16.2.12 (App Router with Turbopack)
* **UI Library**: React 19.2.4
* **Language**: TypeScript 5+ (Strict Mode)
* **Styling**: Tailwind CSS v4 (with `@tailwindcss/postcss`)
* **State Management**: Zustand 5.0.15
* **Motion & Icons**: Lucide React (`^1.28.0`), Framer Motion (`^13.2.0`)

### Backend Services & Media Pipeline
* **Real-Time Signaling & State Sync**: PartyKit (`^0.0.115`), PartySocket (`^1.3.0`) running an authoritative room state server (`party/index.ts`).
* **Video Playback Engine**: `react-youtube` (`^10.1.0`) / YouTube IFrame API with host-authoritative drift correction.
* **YouTube Discovery & Metadata Engine**: `youtube-sr` (`^4.3.11`) running in server-side Next.js route handlers (`/api/youtube/search`, `/api/youtube/video`) eliminating CORS limits and API quota restrictions.
* **Audio Synthesis**: Procedural Web Audio API soundboard synthesizer (`useRoomStore.ts`) generating haptic audio effects (party horn, applause, bass drop, magic sparkle).
* **WebRTC Transport**: Native Browser `RTCPeerConnection` (`getDisplayMedia` for visual feed, `RTCDataChannel` for cursor telemetry and input packets).
* **Control Layer (Host)**: Manifest V3 Companion Chrome Extension utilizing `chrome.debugger` (Chrome DevTools Protocol `Input` domain).

---

## 3. Application Structure & Route Hierarchy

```
src/
├── app/
│   ├── (home)/
│   │   └── page.tsx                         # Landing page route -> mounts HomePageContainer
│   ├── (watch-party)/
│   │   ├── layout.tsx                       # Minimal zero-margin room layout wrapper
│   │   └── room/
│   │       └── [roomId]/
│   │           └── page.tsx                 # Watch party room route -> mounts RoomShell
│   ├── api/
│   │   └── youtube/
│   │       ├── search/
│   │       │   └── route.ts                 # Server-side YouTube search handler (youtube-sr)
│   │       └── video/
│   │           └── route.ts                 # Server-side video metadata & related videos handler
│   ├── globals.css                          # Cinema design tokens, Tap House Gold variables, keyframe animations
│   └── layout.tsx                           # Root HTML layout, Geist & Inter typography
├── components/
│   ├── home/                                # Landing page components
│   │   ├── HomePageContainer.tsx            # Main homepage orchestrator
│   │   ├── CinemaProjectorBeam.tsx          # Full-bleed ambient projector beam animation
│   │   ├── JoinRoomCard.tsx                 # Tabbed Quick Start & 6-digit passcode join card
│   │   ├── InteractiveHeroDemo.tsx          # Interactive mini cinema stage demo with live reactions
│   │   ├── HowItWorks.tsx                   # 3-step visual workflow and feature gallery
│   │   └── CreateRoomModal.tsx              # Modal for custom room creation & privacy presets
│   ├── layout/                              # Global layout elements
│   │   ├── Navbar.tsx                       # Global header with live ticker and quick launch
│   │   ├── Footer.tsx                       # Modern minimal footer
│   │   └── RoomSidebar.tsx                  # Left Navigation Rail (workspace toggle, mic, cam, snapshot, settings)
│   └── watch-party/                         # Cinema Room UI components
│       ├── RoomShell.tsx                    # Top-level responsive room container & workspace router
│       ├── RoomClientView.tsx               # General / Meet Mode orchestrator (CinematicMeetStage / GridStageView)
│       ├── CinematicMeetStage.tsx           # Meet & screen-share stage with floating control dock
│       ├── CinematicVideoPlayer.tsx         # Cinema player with ambient backlighting & floating dock
│       ├── GridStageView.tsx                # Multi-participant camera & screen share grid view
│       ├── ParticipantSidebar.tsx           # 3-tab social panel: Chat, React (Soundboard), Users (Friends list)
│       ├── MobileBottomSheet.tsx            # Slide-up mobile drawer (< lg viewports) housing ParticipantSidebar
│       ├── MultiplayerCursors.tsx           # Overlay rendering remote peer cursors over active media
│       ├── RoomBrandButton.tsx              # Header brand button that resets to recommended discovery feed
│       ├── RoomDetailsPill.tsx              # Floating pill displaying room code and host status
│       ├── WorkspaceNotch.tsx               # Dipped notch capsule for workspace switching
│       ├── YoutubeWorkspaceView.tsx         # Top-level orchestrator for YouTube Watch Together mode
│       ├── youtube/                         # Dedicated YouTube Workspace components
│       │   ├── YoutubeDiscoveryGrid.tsx     # Infinite scroll video grid with circular loading spinner
│       │   ├── YoutubePlayer.tsx            # Embedded react-youtube player with host sync & notch overlay
│       │   ├── YoutubePlayerPlaceholder.tsx # Empty stage state when no video is selected
│       │   ├── YoutubeSearchBar.tsx         # Real-time search bar with direct URL enter support
│       │   ├── YoutubeSearchHeader.tsx      # Filter chips and search status bar
│       │   ├── YoutubeUpNextQueue.tsx       # Collaborative synced queue with drag/remove & auto-play
│       │   ├── YoutubeVideoCard.tsx         # YouTube-styled card (thumbnails, timestamps, title clamping)
│       │   └── YoutubeVideoMetadata.tsx     # Live video details, channel subscribe pill, expandable description
│       └── modals/
│           ├── InviteModal.tsx              # 1-click clipboard link, room passcode, QR code, social share
│           ├── ScreenShareModal.tsx         # Tab sharing trigger and virtual co-browsing tabs
│           ├── SettingsModal.tsx            # Audio/video device selector, playback preferences, hotkeys
│           └── CapturedMomentsModal.tsx     # Photo album modal for moments captured in the room
├── data/
│   ├── mockLounges.ts                       # Preset lounge configurations
│   ├── mockParticipants.ts                  # Mock chat messages, participants, queue items
│   └── mockPresets.ts                       # Curated YouTube cinema trailers and video presets
├── hooks/
│   └── useRoomTheme.ts                      # Theme hook (Dark "Tap House Gold" vs Light zinc/white)
├── party/
│   └── index.ts                             # PartyKit WebSocket server handling presence, sync, and queue
├── store/
│   └── useRoomStore.ts                      # Unified Zustand store for playback, social, queue, & room state
└── types/
    └── index.ts                             # TypeScript definitions (Participant, Role, QueueItem, VideoPreset)
```

---

## 4. Room Layout & Dual Workspace Architecture

[`RoomShell.tsx`](file:///c:/Users/Admin/OneDrive/Documents/GitHub/nodeparty/src/components/watch-party/RoomShell.tsx) serves as the top-level container, orchestrating layout across viewports and routing between two primary workspaces via `activeWorkspace: "youtube" | "general"` in [`useRoomStore.ts`](file:///c:/Users/Admin/OneDrive/Documents/GitHub/nodeparty/src/store/useRoomStore.ts):

```
┌──────────────────────────────────────────────────────────────────────────────────────────┐
│  RoomShell Container (100dvh, Dynamic Theme Backdrop)                                   │
│                                                                                          │
│  ┌──────────────┐  ┌──────────────────────────────────────────────┐  ┌────────────────┐  │
│  │ Column 1:    │  │ Column 2: Active Workspace Stage             │  │ Column 3:      │  │
│  │ RoomSidebar  │  │                                              │  │ Participant-   │  │
│  │ (Left Rail)  │  │  Workspace A: YoutubeWorkspaceView           │  │ Sidebar        │  │
│  │              │  │  • Search Bar + Direct URL Entry             │  │ (Right Panel)  │  │
│  │ • Workspace  │  │  • Synced Player / Empty Placeholder         │  │                │  │
│  │   Switchers  │  │  • Video Metadata & Channel Details          │  │ Tabs:          │  │
│  │   (YT / Meet)│  │  • Infinite Scroll Discovery Grid            │  │ • Chat         │  │
│  │ • Mic Toggle │  │  • Collaborative Up Next Queue Tab           │  │ • React &      │  │
│  │ • Cam Toggle │  │                                              │  │   Soundboard   │  │
│  │ • Snapshot   │  │  Workspace B: RoomClientView                 │  │ • Users &      │  │
│  │   Flash      │  │  • CinematicMeetStage (Screen Share/WebRTC)  │  │   Volume       │  │
│  │ • Settings   │  │  • GridStageView (Face-to-Face Video Grid)   │  │                │  │
│  │ • Leave Room │  │                                              │  │ (Collapses to  │  │
│  │              │  │                                              │  │  mini rail)    │  │
│  └──────────────┘  └──────────────────────────────────────────────┘  └────────────────┘  │
└──────────────────────────────────────────────────────────────────────────────────────────┘
```

* **Desktop Viewports (`lg+`)**: 3-column theater with an adaptive left rail, wide center stage, and a collapsible right social sidebar.
* **Mobile Viewports (`< lg`)**: The left rail collapses into a touch-optimized bottom control dock; the right social sidebar is housed in the slide-up **`MobileBottomSheet`** (82dvh).

---

## 5. Theme & Design System

The application enforces strict anti-AI design patterns and implements a dynamic dual-theme engine governed by [`useRoomTheme.ts`](file:///c:/Users/Admin/OneDrive/Documents/GitHub/nodeparty/src/hooks/useRoomTheme.ts):

### Dark Mode: "Tap House Gold" (Default)
* **Background (`bg`)**: `#0c0a07` (Deep Warm Obsidian)
* **Surface (`surface`)**: `#161310` (Charcoal Slate)
* **Surface Hover (`surfaceHover`)**: `#1e1a14`
* **Borders (`border`, `borderHover`)**: `#27211a` / `#3a3022`
* **Text (`text`, `muted`)**: `#f2e9d6` (Parchment White) / `#907a5a` (Warm Muted Ochre)
* **Accent (`accent`, `accentHover`)**: `#c8962e` (Tap House Gold) / `#dba940`

### Light Mode: Clean Minimalist Zinc
* **Background (`bg`)**: `#F9FAFB`
* **Surface (`surface`)**: `#FFFFFF`
* **Border (`border`)**: `#E4E4E7`
* **Accent (`accent`)**: `#F43F5E` (Projection Crimson)
* **Text (`text`, `muted`)**: `#18181B` / `#71717A`

### Architectural Craft Rules
* **Machined Double-Bezel (Doppelrand)**: Outer hairline ring (`ring-1 ring-white/10`) with specular top-edge highlight (`shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)]`).
* **Banned AI Patterns**: Zero arbitrary micro-fonts (`text-[10px]`), no fake pulsing telemetry green dots, no alternating 50/50 layouts, no generic AI-purple mesh gradients.

---

## 6. Real-Time Data Flow & Signaling Plane

### PartyKit Server Protocol ([`party/index.ts`](file:///c:/Users/Admin/OneDrive/Documents/GitHub/nodeparty/party/index.ts))
The PartyKit signaling server coordinates room state over WebSockets with the following message contract:

| Message Type | Direction | Payload | Behavior |
| :--- | :--- | :--- | :--- |
| `identify` | Client $\rightarrow$ Server | `{ role, userId }` | Registers connection identity and initiates presence broadcast. |
| `sync_presence` | Server $\rightarrow$ Room | `{ count, participants }` | Updates connected user list and participant count. |
| `sync_playback` | Host $\rightarrow$ Guests | `{ isPlaying, currentTime, playbackRate }` | Authoritative host clock packet. Guests run drift correction. |
| `change_video` | Peer $\rightarrow$ Room | `{ url, preset }` | Synchronously loads new active video for all participants. |
| `sync_queue` | Peer $\rightarrow$ Room | `{ queue }` | Broadcasts collaborative playlist additions, deletions, and reorders. |
| `chat_message` | Peer $\rightarrow$ Room | `{ message }` | Real-time chat bubbles with timestamp and user tags. |
| `reaction_burst`| Peer $\rightarrow$ Room | `{ burst }` | Floating emoji bursts with random viewport offsets. |

### Playback Drift Correction Engine
Guests synchronize with the host's authoritative clock using a dual-threshold strategy:
* **Drift $> 1.5$ seconds**: Hard seek directly to host timestamp.
* **Drift $0.3\text{s} - 1.5\text{s}$**: Smooth rate throttling ($0.95\times$ or $1.05\times$) to catch up seamlessly without audio pop or buffer interruption.

---

## 7. Collaborative Browser Mode & Remote Telemetry (Phase 5B & 5C)

When the room switches to tab sharing or co-browsing, the architecture transitions to WebRTC transport and remote control:

```
NODEPLAY ROOM
┌───────────────────────────────────────────────────────────────────────────────────────┐
│                                                                                       │
│       HOST BROWSER                                          GUEST BROWSER             │
│   ┌───────────────────────────┐                         ┌───────────────────────────┐ │
│   │    Host NodeParty Page    │                         │   Guest NodeParty Page    │ │
│   │                           │◄───── WebRTC Video ─────│                           │ │
│   │                           │   (getDisplayMedia tab) │                           │ │
│   │                           │                         │                           │ │
│   │                           │◄── WebRTC DataChannel ──│                           │ │
│   │                           │    (Normalized coords,  │                           │ │
│   │                           │     clicks, keystrokes) │                           │ │
│   └─────────────┬─────────────┘                         └───────────────────────────┘ │
│                 │                                                                     │
└─────────────────┼─────────────────────────────────────────────────────────────────────┘
                  │
                  │ Extension Messaging (chrome.runtime.sendMessage / externally_connectable)
                  ▼
   ┌──────────────────────────────┐
   │      NODEPLAY EXTENSION      │
   │  (Manifest V3 Background)    │
   │                              │
   │  • Validate Origin & Token   │
   │  • Validate targetTabId      │
   │  • Permission Verification   │
   │  • Input Sanitization        │
   └──────────────┬───────────────┘
                  │
                  │ chrome.debugger (Input.dispatchMouseEvent / Input.dispatchKeyEvent)
                  ▼
   ┌──────────────────────────────┐
   │    HOST'S AUTHORIZED TAB     │
   │                              │
   │  Mouse Move / Clicks         │
   │  Keystrokes / Typing         │
   │  Scroll / Drag               │
   └──────────────────────────────┘
```

### Security & Session Governance: `ControlSession`
```typescript
interface ControlSession {
  roomId: string;
  hostUserId: string;
  authorizedGuestId: string | null;
  targetTabId: number;
  controlToken: string;
  status: "idle" | "requested" | "active" | "paused" | "revoked";
  rateLimit: {
    maxEventsPerSec: number;
  };
}
```

* **Origin Verification**: Restricts messaging to verified NodeParty origins.
* **Coordinate Clamping**: Normalized percentage coordinates ($0.00 \le X, Y \le 1.00$) translated to pixels using target tab metrics.
* **Host Immediate Kill Switch**: The host web page can immediately pause or terminate control forwarding via `Escape` or modal toggle.
