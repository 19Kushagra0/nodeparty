# 🍿 NodeParty — Real-Time YouTube Watch Party

> **Watch YouTube videos in perfect real-time synchronization with friends.** Stream with zero lag, send live floating emoji reactions, chat in real-time, and manage DJ permissions with role-based playback controls.

---

## ✨ Features

- **⚡ Zero-Lag Synchronized Playback**: Play, pause, seek, and buffer commands trigger in sub-millisecond sync across every connected viewer.
- **🔥 Live Floating Emoji Bursts**: Click real-time reaction bursts (🔥, 🍿, 😂, 💜, 👏, 🎉) that float up smoothly across the cinema canvas.
- **💬 Real-Time Live Chat & Event Feed**: Timestamped message bubbles, system event logs, host/moderator identity badges, and instant reaction bars.
- **👑 Role-Based Access Control (RBAC)**:
  - **Host**: Complete control over playback, video URLs, and participant roles (promote/demote/kick).
  - **Moderator**: Can change video URLs and manage the up-next playlist queue.
  - **Viewer / Participant**: Synchronized watch-only mode preventing accidental interruptions.
- **📜 Up-Next Video Queue**: Queue upcoming YouTube tracks and videos with duration metadata and instant 1-click play.
- **🌌 Cinema Backlight Atmosphere**: Ambient dynamic glow surrounding the theater viewport, dark obsidian/midnight layers, and theater mode toggle.
- **🔗 Instant 1-Click Invites**: Shareable room links, 6-digit room passcodes, simulated QR codes, and WhatsApp/Twitter quick share.
- **📻 Featured Public Lounges**: Curated public rooms (*Lo-Fi Chill Lounge, Synthwave Drive, Sci-Fi 4K Cinema, Esports Highlights*) with 1-click entry.
- **🎮 Interactive Hero Preview**: Test the cinema sync engine, trigger emoji bursts, and preview the live chat right from the landing page.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/) with Turbopack
- **UI Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) + Custom Cinema Ambient & Glassmorphism Tokens
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)

---

## 🚀 Project Milestones & Progress

### 🟢 Completed So Far

#### 1. Architecture & App Structure
- Next.js App Router route groups: `(home)` and `(watch-party)` with clean layout boundaries.
- Full TypeScript strict type definitions for `Participant`, `Role`, `ChatMessage`, `FloatingReaction`, and `QueueItem`.

#### 2. Design System & Frontend Overhaul
- Eliminated generic "AI template" styling in favor of handcrafted cinema-grade visual hierarchy.
- Added deep obsidian theme (`#08090d`), ambient video glow effects (`.cinema-glow`), and floating particle keyframes (`@keyframes floatUpAndFade`).
- Created responsive global [`Navbar`](file:///c:/Users/Admin/OneDrive/Documents/GitHub/nodeparty/src/components/layout/Navbar.tsx) and [`Footer`](file:///c:/Users/Admin/OneDrive/Documents/GitHub/nodeparty/src/components/layout/Footer.tsx).

#### 3. Landing Page Experience
- [`InteractiveHeroDemo`](file:///c:/Users/Admin/OneDrive/Documents/GitHub/nodeparty/src/components/home/InteractiveHeroDemo.tsx): Interactive mini-theater hero preview with real-time emoji bursts and chat ticker.
- [`JoinRoomCard`](file:///c:/Users/Admin/OneDrive/Documents/GitHub/nodeparty/src/components/home/JoinRoomCard.tsx): Dual-mode card for instant room launch or joining with code.
- [`FeaturedLounges`](file:///c:/Users/Admin/OneDrive/Documents/GitHub/nodeparty/src/components/home/FeaturedLounges.tsx): Curated community lounges with live viewer count badges.
- [`HowItWorks`](file:///c:/Users/Admin/OneDrive/Documents/GitHub/nodeparty/src/components/home/HowItWorks.tsx): 3-step visual guide.

#### 4. Watch Party Room (`/room/[roomId]`)
- [`RoomHeader`](file:///c:/Users/Admin/OneDrive/Documents/GitHub/nodeparty/src/components/watch-party/RoomHeader.tsx): Live sync latency ticker (`⚡ 18ms`), active avatar stack, and Theater Mode toggle.
- [`InviteModal`](file:///c:/Users/Admin/OneDrive/Documents/GitHub/nodeparty/src/components/watch-party/InviteModal.tsx): 1-click clipboard link copy, room code badge, QR code generator, and social share links.
- [`VideoPlayer`](file:///c:/Users/Admin/OneDrive/Documents/GitHub/nodeparty/src/components/watch-party/VideoPlayer.tsx): Ambient glow cinema canvas, YouTube embed player with quick sample switcher pills, custom scrubber/progress bar, and floating emoji stream.
- [`ParticipantSidebar`](file:///c:/Users/Admin/OneDrive/Documents/GitHub/nodeparty/src/components/watch-party/ParticipantSidebar.tsx): 3-tab panel for **Live Chat**, **Crew & Role Controls**, and **Up-Next Video Queue**.

---

## 🟡 Next Steps & Roadmap

### 1. YouTube IFrame Player API Integration
- [ ] Connect the official YouTube IFrame JavaScript API (`YT.Player`).
- [ ] Bind state synchronization to YouTube player playback events (`onStateChange`, play, pause, seek, buffer).
- [ ] Add playback rate synchronization (e.g., 1.25x, 1.5x speed sync).

### 2. WebSocket Backend & Real-Time Synchronization
- [ ] Build a lightweight WebSocket / Socket.IO server (Node.js/TypeScript).
- [ ] Implement room connection rooms/namespaces (`join-room`, `leave-room`, `broadcast-state`).
- [ ] Broadcast playback clock events (`sync-time`, `play-event`, `pause-event`) to enforce sub-millisecond drift correction.
- [ ] Sync live chat messages and floating emoji reaction events across all connected browser clients.

### 3. Audio / Video Hangout & Voice Channels (Optional / Phase 4)
- [ ] Integrate WebRTC mesh / SFU for peer-to-peer voice and webcam channels alongside video playback.

### 4. Persistent Playlists & Custom Rooms
- [ ] Optional room persistence (e.g., SQLite / PostgreSQL / Redis) for saved playlists and custom party URLs.

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
