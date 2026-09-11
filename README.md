# 🍿 NodeParty — Real-Time YouTube Watch Party & Collaborative Cinema

> **Watch YouTube videos in perfect real-time synchronization with friends.** Stream with zero lag, send live floating emoji reactions, chat in real-time, trigger procedural soundboard effects, capture live photo memories, and co-browse with synchronized remote cursors.

---

## ✨ Features

- **⚡ Zero-Lag Synchronized Playback**: Play, pause, seek, and buffer commands trigger in sub-millisecond sync across every connected viewer.
- **🔥 Live Floating Emoji Bursts & Web Audio Soundboard**: Click real-time reaction bursts (🔥, 🍿, 😂, 💜, 👏, 🎉) that float up across the cinema canvas, complemented by a procedural Web Audio API soundboard (party horn, applause, bass drop, magic sparkle).
- **💬 Real-Time Live Chat & Event Feed**: Timestamped message bubbles, `@user` mentions, quick vibe shortcuts, and participant presence.
- **📸 In-Room Photo Memories**: Snap instant memories with a real-time screen shutter flash animation, saved to a persistent room photo album.
- **👑 Role-Based Access Control (RBAC)**:
  - **Host**: Complete control over playback, video URLs, and participant permissions (promote/demote/kick).
  - **Moderator**: Can change video URLs and manage the up-next playlist queue.
  - **Viewer / Participant**: Synchronized watch-only mode preventing accidental interruptions.
- **🎨 Dynamic Dual Theme Engine**: Seamless toggle between dark **Tap House Gold** (`#0c0a07`, `#161310`, `#c8962e`) and light **Minimalist Zinc** (`#F9FAFB`, `#F43F5E`).
- **📱 Fully Responsive 3-Column Shell**: Adaptive desktop layout with collapsible right rail, coupled with a smooth slide-up mobile sheet drawer (`MobileBottomSheet`).
- **🔗 Instant 1-Click Invites**: Shareable room links, 6-digit room passcodes, simulated QR codes, and WhatsApp/Twitter quick share.
- **🎮 Interactive Hero Preview**: Test the cinema sync engine, trigger emoji bursts, and preview the live chat right from the landing page.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/) with Turbopack
- **UI Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) + Tap House Gold Tokens
- **State Management**: [Zustand 5](https://github.com/pmndrs/zustand)
- **Real-Time Signaling**: [PartyKit](https://partykit.io/) & [PartySocket](https://github.com/partykit/partykit)
- **Video Playback**: [react-youtube](https://github.com/tjallingt/react-youtube) / YouTube IFrame API
- **WebRTC Transport**: Native Browser `RTCPeerConnection` & `RTCDataChannel`
- **Icons & Motion**: [Lucide React](https://lucide.dev/), [Framer Motion](https://www.framer.com/motion/)
- **Language**: [TypeScript 5](https://www.typescriptlang.org/)

---

## 🚀 Project Milestones & Progress

### 🟢 Completed So Far (Phases 1–3)

#### 1. Architecture & App Structure
- Next.js App Router route groups: `(home)` and `(watch-party)` with clean layout boundaries.
- Full TypeScript strict type definitions for `Participant`, `Role`, `ChatMessage`, `FloatingReaction`, and `QueueItem`.

#### 2. Design System & Frontend Overhaul
- Handcrafted cinema-grade visual hierarchy with Tap House Gold theme tokens (`#0c0a07`, `#161310`, `#c8962e`).
- Ambient dynamic backlight glow around the video canvas and smooth floating particle keyframes.
- Responsive global [`Navbar`](file:///c:/Users/Admin/OneDrive/Documents/GitHub/nodeparty/src/components/layout/Navbar.tsx) and [`Footer`](file:///c:/Users/Admin/OneDrive/Documents/GitHub/nodeparty/src/components/layout/Footer.tsx).

#### 3. Landing Page Experience
- [`HomePageContainer`](file:///c:/Users/Admin/OneDrive/Documents/GitHub/nodeparty/src/components/home/HomePageContainer.tsx): Full-bleed cinema atmosphere with [`CinemaProjectorBeam`](file:///c:/Users/Admin/OneDrive/Documents/GitHub/nodeparty/src/components/home/CinemaProjectorBeam.tsx).
- [`InteractiveHeroDemo`](file:///c:/Users/Admin/OneDrive/Documents/GitHub/nodeparty/src/components/home/InteractiveHeroDemo.tsx): Interactive mini-theater hero preview with real-time emoji bursts and chat ticker.
- [`JoinRoomCard`](file:///c:/Users/Admin/OneDrive/Documents/GitHub/nodeparty/src/components/home/JoinRoomCard.tsx): Dual-mode card for instant room launch or joining with a 6-digit code.
- [`HowItWorks`](file:///c:/Users/Admin/OneDrive/Documents/GitHub/nodeparty/src/components/home/HowItWorks.tsx): 3-step visual workflow.
- [`CreateRoomModal`](file:///c:/Users/Admin/OneDrive/Documents/GitHub/nodeparty/src/components/home/CreateRoomModal.tsx): Interactive room launcher modal with privacy controls.

#### 4. Watch Party Room (`/room/[roomId]`)
- [`RoomShell`](file:///c:/Users/Admin/OneDrive/Documents/GitHub/nodeparty/src/components/watch-party/RoomShell.tsx): Outer rounded container with ambient backdrop blur.
- [`RoomSidebar`](file:///c:/Users/Admin/OneDrive/Documents/GitHub/nodeparty/src/components/layout/RoomSidebar.tsx): Left navigation rail with cinema/grid layout toggle, mic/cam switches, moment snapshot trigger, and settings.
- [`RoomClientView`](file:///c:/Users/Admin/OneDrive/Documents/GitHub/nodeparty/src/components/watch-party/RoomClientView.tsx): Orchestrator managing stage views, shutter camera flash animation, and collapsible right rail.
- [`CinematicVideoPlayer`](file:///c:/Users/Admin/OneDrive/Documents/GitHub/nodeparty/src/components/watch-party/CinematicVideoPlayer.tsx): Ambient glow cinema canvas, top notch capsule with room code copy & next item indicator, floating transport controls, and floating reactions.
- [`GridStageView`](file:///c:/Users/Admin/OneDrive/Documents/GitHub/nodeparty/src/components/watch-party/GridStageView.tsx): Multi-participant grid view mode alternative.
- [`ParticipantSidebar`](file:///c:/Users/Admin/OneDrive/Documents/GitHub/nodeparty/src/components/watch-party/ParticipantSidebar.tsx): 3-tab panel for **Live Chat**, **React & Soundboard** (with Web Audio synthesizer), and **Users** (friends list & volume sliders).
- [`MobileBottomSheet`](file:///c:/Users/Admin/OneDrive/Documents/GitHub/nodeparty/src/components/watch-party/MobileBottomSheet.tsx): Slide-up mobile drawer on viewports `< lg`.
- Modals: [`InviteModal`](file:///c:/Users/Admin/OneDrive/Documents/GitHub/nodeparty/src/components/watch-party/InviteModal.tsx), [`SettingsModal`](file:///c:/Users/Admin/OneDrive/Documents/GitHub/nodeparty/src/components/watch-party/SettingsModal.tsx), [`CapturedMomentsModal`](file:///c:/Users/Admin/OneDrive/Documents/GitHub/nodeparty/src/components/watch-party/CapturedMomentsModal.tsx), [`ScreenShareModal`](file:///c:/Users/Admin/OneDrive/Documents/GitHub/nodeparty/src/components/watch-party/ScreenShareModal.tsx).

---

## 🟡 Immediate Next Steps & Roadmap

### Phase 4: Real Watch Party Sync (In Progress)
- [ ] Set up PartyKit WebSocket signaling server.
- [ ] Integrate `react-youtube` (`YT.Player`) into `CinematicVideoPlayer`.
- [ ] Synchronize video playback states (Play, Pause, Seek, Rate) with host clock drift correction.
- [ ] Synchronize live chat messages and floating emoji reaction bursts over WebSocket channels.
- [ ] Test across two real browser windows.

### Phase 5A: Screen Sharing (Visual Feed)
- [ ] Implement `getDisplayMedia` tab capture.
- [ ] Establish WebRTC peer connection via PartyKit signaling.
- [ ] Render video feed on guest screens.

### Phase 5B: Remote Pointers (Coordinate Mapping)
- [ ] Calculate normalized pointer coordinates over video bounding box.
- [ ] Transmit coordinates via WebRTC DataChannel.
- [ ] Render remote cursors (`MultiplayerCursors.tsx`) with zero click injection.

### Phase 6: Remote Control (Host Page Bridge + Extension)
- [ ] Build "Pass the Mouse" permission UI and `CONTROL SESSION` state machine.
- [ ] Build companion Chrome Extension (Manifest V3, `debugger` permission, `externally_connectable`).
- [ ] Bridge approved commands from Host web page to extension.
- [ ] Inject mouse and keyboard events into shared tab using `chrome.debugger`.
- [ ] Implement host kill switch and status transparency UI.

---

## 💻 Getting Started

### Prerequisites
- Node.js 18.18+ or 20+
- npm, pnpm, or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/19Kushagra0/nodeparty.git
   cd nodeparty
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
npm run start
```

---

## 📄 License
MIT License. Created with ❤️ for smooth, synchronized social streaming.
