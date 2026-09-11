# Architecture: NodeParty

## 1. Executive Summary & Philosophy
NodeParty is a hybrid real-time synchronized social entertainment platform built with Next.js 16, React 19, Tailwind CSS v4, and Zustand. It provides two core operational modes:
1. **Watch Party Mode (Default)**: Perfect-sync streaming video (via YouTube IFrame / `react-youtube`) synchronized over a WebSocket signaling plane (PartyKit).
2. **Collaborative Browser Mode (Advanced)**: Real-time tab sharing via WebRTC with low-latency remote cursor telemetry and permission-gated remote mouse/keyboard control mediated through a Host web app bridge and a lightweight companion Chrome Extension (`chrome.debugger`).

---

## 2. Tech Stack

### Core Framework & Runtime
* **Framework**: Next.js 16.2.12 (App Router with Turbopack)
* **UI Library**: React 19.2.4
* **Language**: TypeScript 5+ (Strict Mode)
* **Styling**: Tailwind CSS v4 (with `@tailwindcss/postcss`)
* **State Management**: Zustand 5.0.15
* **Motion & Icons**: Lucide React (`^1.28.0`), Framer Motion (`^13.2.0`)

### Real-Time & Media Pipeline
* **Real-Time Signaling & State Sync**: PartyKit (`^0.0.115`), PartySocket (`^1.3.0`)
* **Video Playback Engine**: `react-youtube` (`^10.1.0`) / YouTube IFrame API
* **WebRTC Transport**: Native Browser `RTCPeerConnection` (`getDisplayMedia` for visual feed, `RTCDataChannel` for cursor telemetry and input packets)
* **Control Layer (Host)**: Manifest V3 Companion Chrome Extension utilizing `chrome.debugger` (Chrome DevTools Protocol `Input` domain)

---

## 3. Application Structure & Route Hierarchy

The application leverages Next.js App Router route groups to cleanly isolate marketing discovery from cinema workspace rooms:

```
src/
├── app/
│   ├── (home)/
│   │   └── page.tsx                         # Landing page route -> mounts HomePageContainer
│   ├── (watch-party)/
│   │   ├── layout.tsx                       # Minimal zero-margin wrapper
│   │   └── room/
│   │       └── [roomId]/
│   │           └── page.tsx                 # Watch party room route -> mounts RoomShell
│   ├── globals.css                          # Cinema tokens, Tap House Gold variables, keyframe animations
│   └── layout.tsx                           # Root HTML, fonts (Geist Sans/Mono, Inter), metadata
├── components/
│   ├── home/                                # Landing page components
│   │   ├── HomePageContainer.tsx            # Main homepage container & layout orchestrator
│   │   ├── CinemaProjectorBeam.tsx          # Full-bleed ambient projector beam animation
│   │   ├── JoinRoomCard.tsx                 # Tabbed Quick Start & 6-digit passcode join card
│   │   ├── InteractiveHeroDemo.tsx          # Interactive mini cinema stage demo with live reactions
│   │   ├── HowItWorks.tsx                   # 3-step visual workflow and feature gallery
│   │   └── CreateRoomModal.tsx              # Modal for custom room creation & privacy presets
│   ├── layout/                              # Global and persistent layout elements
│   │   ├── Navbar.tsx                       # Global header with live user ticker and quick launch
│   │   ├── Footer.tsx                       # Minimal modern footer
│   │   └── RoomSidebar.tsx                  # 3-column Left Navigation Rail (layout, mic, cam, snapshot, settings)
│   └── watch-party/                         # Cinema Room UI components
│       ├── RoomShell.tsx                    # Top-level responsive room container & theme backdrop
│       ├── RoomClientView.tsx               # Main room view orchestrator & collapsible sidebar rail
│       ├── CinematicVideoPlayer.tsx         # Primary cinema player, ambient glow, notch, and transport dock
│       ├── GridStageView.tsx                # Alternative multi-participant video/camera grid layout
│       ├── ParticipantSidebar.tsx           # 3-tab right sidebar: Chat, React (Soundboard), Users (Friends list)
│       ├── MobileBottomSheet.tsx            # Slide-up drawer (< lg viewports) housing ParticipantSidebar
│       ├── MultiplayerCursors.tsx           # Overlay rendering remote cursors over the active media canvas
│       ├── InviteModal.tsx                  # 1-click clipboard link, room passcode, QR code, social share
│       ├── ScreenShareModal.tsx             # Tab sharing trigger and virtual co-browsing tabs
│       ├── SettingsModal.tsx                # Audio/video device selector, playback preferences, hotkeys
│       └── CapturedMomentsModal.tsx         # Photo album modal for moments captured in the room
├── data/
│   ├── mockLounges.ts                       # Preset lounge definitions
│   ├── mockParticipants.ts                  # Mock chat messages, participants, queue items
│   └── mockPresets.ts                       # Curated YouTube cinema trailers and video presets
├── hooks/
│   └── useRoomTheme.ts                      # Theme hook (Dark "Tap House Gold" vs Light zinc/white)
├── icons/
│   └── index.ts                             # Centralized Lucide icon exports
├── store/
│   └── useRoomStore.ts                      # Unified Zustand store for playback, social, queue, & room state
└── types/
    └── index.ts                             # TypeScript definitions (Participant, Role, QueueItem, etc.)
```

---

## 4. Room Layout & Viewport Architecture

The watch party theater utilizes a **3-column responsive desktop architecture** that adapts gracefully to mobile viewports:

```
┌──────────────────────────────────────────────────────────────────────────────────────────┐
│  RoomShell Container (Full Viewport, Dynamic Theme Backdrop)                            │
│                                                                                          │
│  ┌──────────────┐  ┌──────────────────────────────────────────────┐  ┌────────────────┐  │
│  │ Column 1:    │  │ Column 2: Player & Stage Center              │  │ Column 3:      │  │
│  │ RoomSidebar  │  │                                              │  │ Participant-   │  │
│  │ (Left Rail)  │  │  ┌────────────────────────────────────────┐  │  │ Sidebar        │  │
│  │              │  │  │ Cinematic Notch Capsule (Top)          │  │  │ (Right Panel)  │  │
│  │ • Mode (Cin/ │  │  │ • Room Code Pill • Host • Next Item    │  │  │                │  │
│  │   Grid)      │  │  └────────────────────────────────────────┘  │  │ Tabs:          │  │
│  │ • Mic Toggle │  │                                              │  │ • Chat         │  │
│  │ • Cam Toggle │  │  Active Canvas:                              │  │ • React &      │  │
│  │ • Snapshot   │  │  • CinematicVideoPlayer (Ambient Glow) OR    │  │   Soundboard   │  │
│  │   Flash      │  │  • GridStageView (Camera/Screen Grid)        │  │ • Users &      │  │
│  │ • Settings   │  │                                              │  │   Volume       │  │
│  │ • Leave Room │  │  ┌────────────────────────────────────────┐  │  │                │  │
│  │              │  │  │ Floating Transport Dock (Bottom)       │  │  │ (Collapses to  │  │
│  │              │  │  │ Play/Pause • Scrubber • Volume • Full  │  │  │  mini rail)    │  │
│  │              │  │  └────────────────────────────────────────┘  │  │                │  │
│  └──────────────┘  └──────────────────────────────────────────────┘  └────────────────┘  │
└──────────────────────────────────────────────────────────────────────────────────────────┘
```

* **Mobile Viewports (`< lg`)**:
  * The left rail (`RoomSidebar`) is hidden.
  * A fixed bottom control dock provides quick access to microphone, camera, snapshot, and chat.
  * Tapping chat or users opens the **`MobileBottomSheet`**, a smooth slide-up drawer (82dvh) mounting `ParticipantSidebar`.

---

## 5. Theme & Design System

The application implements a dynamic dual-theme system governed by `useRoomTheme.ts`:

### Dark Mode: "Tap House Gold" (Default)
* **Background (`bg`)**: `#0c0a07` (Deep Warm Obsidian)
* **Surface (`surface`)**: `#161310` (Charcoal Slate)
* **Surface Hover (`surfaceHover`)**: `#1e1a14`
* **Borders (`border`, `borderHover`)**: `#27211a` / `#3a3022`
* **Text (`text`, `muted`)**: `#f2e9d6` (Parchment White) / `#907a5a` (Warm Muted Ochre)
* **Accent (`accent`, `accentHover`)**: `#c8962e` (Tap House Gold) / `#dba940`

### Light Mode: Clean Minimalist
* **Background (`bg`)**: `#F9FAFB`
* **Surface (`surface`)**: `#FFFFFF`
* **Border (`border`)**: `#E4E4E7`
* **Accent (`accent`)**: `#F43F5E` (Projection Crimson)
* **Text (`text`, `muted`)**: `#18181B` / `#71717A`

---

## 6. Real-Time Data Flow & Interaction Modes

### Mode 1: Watch Party Mode (Default)
1. **Clock & Playback Synchronization**:
   * The host acts as the authoritative clock source.
   * State changes (`play`, `pause`, `seekTo`, `rateChange`) broadcast through the **PartyKit WebSocket signaling room**.
   * Client players (`react-youtube` / YouTube IFrame API) execute drift-correction algorithms:
     * If client drift > 1.5 seconds: hard seek to host timestamp.
     * If client drift between 0.3s and 1.5s: smoothly throttle playback rate (e.g., 0.95x or 1.05x) until synchronized, preventing audio stutter.
2. **Social Channels**:
   * Chat messages, floating emoji reaction bursts (with coordinate offsets), and Web Audio synthesizer soundboard triggers broadcast across the WebSocket room.

---

### Mode 2: Collaborative Browser Mode (Advanced)

When the host shares a tab to co-browse or watch external content, the architecture shifts to a high-performance, security-governed pipeline:

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

#### Why the Host NodeParty Page Bridges to the Extension:
* **Manifest V3 Service Worker Lifecycle**: Chrome MV3 service workers terminate after 30 seconds of inactivity and lack full DOM capabilities for maintaining persistent WebRTC peer connections. By maintaining the WebRTC DataChannel in the active **Host NodeParty web page**, the connection stays stable and responsive.
* **Host Authority & Immediate Kill Switch**: The host web page is the policy enforcement point. If the host revokes control or presses `Escape`, the page immediately halts forwarding messages to the extension.
* **Separation of Concerns**: The extension remains small, stateless, and focused strictly on tab verification and DevTools protocol input dispatch.

---

## 7. Security & Session Governance: `CONTROL SESSION`

To prevent arbitrary remote code execution or unauthorized input injection into arbitrary tabs, every collaborative session enforces strict session governance:

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

### Verification Pipeline per Incoming Command:
1. **Origin Verification**: The extension's `externally_connectable` rules restrict messaging strictly to verified NodeParty origins (e.g., `https://nodeparty.app` or `http://localhost:3000`).
2. **Guest Authorization**: Is `senderGuestId === session.authorizedGuestId`?
3. **Session State**: Is `session.status === "active"`?
4. **Target Tab Validation**: Does `targetTabId` match the tab originally selected for screen sharing? Is `chrome.debugger` currently attached to it?
5. **Coordinate Clamping**: Normalized percentage coordinates must satisfy $0.00 \le X, Y \le 1.00$. The extension translates these to absolute pixels using `chrome.tabs.get(targetTabId)`.
6. **Key Whitelisting**: Dangerous OS-level hotkeys (e.g., `Ctrl+Alt+Del`, system-level shortcuts) are sanitized and dropped.

### Host Transparency & Infobar:
* `chrome.debugger` displays the native Chrome infobar: *"NodeParty is debugging this browser"*.
* The extension listens to `chrome.debugger.onDetach` to automatically notify the NodeParty host page if the debugger is detached, updating the UI in real time.
