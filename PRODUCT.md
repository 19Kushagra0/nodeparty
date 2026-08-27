# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary users are casual groups of friends, online communities, and content co-viewers who want to watch YouTube videos, music streams, esports, and series together in real-time without requiring account creation, software downloads, or browser extensions.

## Product Purpose

NodeParty enables frictionless, zero-setup synchronized social watch parties. It exists to recreate the shared joy of sitting together in a cinema lounge or on a couch with friends, offering synchronized video playback, ambient theater immersion, live floating emoji reactions, and real-time chat. Success means instantaneous room launch, effortless joining, rock-solid playback sync, and delightful micro-interactions.

## Positioning

A zero-friction, cinema-grade watch party web application combining instant room access (via shareable links or 6-digit codes) with an immersive ambient theater atmosphere, low-latency playback synchronization, and role-based DJ controls—all without forced sign-ups or browser extension requirements.

## Operating Context

- Web browsers across desktop and mobile devices.
- Co-viewing sessions ranging from quick 10-minute clips to multi-hour watch parties and lo-fi chill sessions.
- Users actively interact through live chat, floating emoji bursts, and collaborative playlist queue management while the video streams.
- Rooms are shared via direct URLs, room codes, QR codes, and social chat apps (Discord, WhatsApp, Twitter).

## Capabilities and Constraints

- **Playback Synchronization**: Real-time synchronized play, pause, seek, and buffer states with sub-millisecond drift alignment.
- **Role-Based Access Control (RBAC)**: Distinct permissions for Host (full control, participant management), Moderator (queue and video management), and Viewer (sync-only watch mode).
- **Live Audience Engagement**: Real-time floating emoji bursts, live chat stream with identity badges, and participant presence.
- **Queue Management**: Dynamic "Up-Next" video playlist queue with drag/reorder and quick-play capabilities.
- **Theater Atmosphere**: Ambient reactive backlight glow, dark obsidian surface tokens, and Theater Mode toggle.
- **Interactive Tools**: Screen sharing modal and interactive virtual browser co-browsing concepts.
- **Technical Constraints**: Browser autoplay policies (requiring user interaction for audio start) and YouTube IFrame embed constraints.

## Brand Commitments

- **Name**: NodeParty
- **Tone & Voice**: Modern, vibrant, energetic, cinema-grade, and socially engaging.
- **Visual Identity**: Deep obsidian and midnight cinema palette (`#07080b`, `#0e1117`, `#141722`), ambient neon/glow accents (rose, cyan, emerald), crisp glassmorphism borders, and sleek dark-mode typography.

## Evidence on Hand

- Functional Next.js 16 + React 19 App Router codebase with Tailwind CSS v4 and Zustand state management ([`src/store/useRoomStore.ts`](file:///c:/Users/Admin/OneDrive/Documents/GitHub/nodeparty/src/store/useRoomStore.ts)).
- Complete watch party room components ([`VideoPlayer.tsx`](file:///c:/Users/Admin/OneDrive/Documents/GitHub/nodeparty/src/components/watch-party/VideoPlayer.tsx), [`ParticipantSidebar.tsx`](file:///c:/Users/Admin/OneDrive/Documents/GitHub/nodeparty/src/components/watch-party/ParticipantSidebar.tsx), [`RoomHeader.tsx`](file:///c:/Users/Admin/OneDrive/Documents/GitHub/nodeparty/src/components/watch-party/RoomHeader.tsx), [`InviteModal.tsx`](file:///c:/Users/Admin/OneDrive/Documents/GitHub/nodeparty/src/components/watch-party/InviteModal.tsx), [`ScreenShareModal.tsx`](file:///c:/Users/Admin/OneDrive/Documents/GitHub/nodeparty/src/components/watch-party/ScreenShareModal.tsx), [`InteractiveVirtualBrowser.tsx`](file:///c:/Users/Admin/OneDrive/Documents/GitHub/nodeparty/src/components/watch-party/InteractiveVirtualBrowser.tsx)).
- Fully designed landing page with interactive demo ([`InteractiveHeroDemo.tsx`](file:///c:/Users/Admin/OneDrive/Documents/GitHub/nodeparty/src/components/home/InteractiveHeroDemo.tsx), [`JoinRoomCard.tsx`](file:///c:/Users/Admin/OneDrive/Documents/GitHub/nodeparty/src/components/home/JoinRoomCard.tsx), [`FeaturedLounges.tsx`](file:///c:/Users/Admin/OneDrive/Documents/GitHub/nodeparty/src/components/home/FeaturedLounges.tsx)).
- Project documentation in [`README.md`](file:///c:/Users/Admin/OneDrive/Documents/GitHub/nodeparty/README.md) and [`AI_AGENT_PROGRESS.md`](file:///c:/Users/Admin/OneDrive/Documents/GitHub/nodeparty/AI_AGENT_PROGRESS.md).

## Product Principles

1. **Zero-Friction Immersion**: Room creation and joining must happen in seconds with zero mandatory logins or extension downloads.
2. **Cinema-Grade Presence**: Immersive ambient glow and expressive floating emoji reactions make distributed friends feel like they share the same physical theater.
3. **Respectful Playback Harmony**: Role-based access control prevents accidental disruptions and troll interruptions while keeping collaborative participation fun and easy.
4. **Snappy, Non-Intrusive Performance**: Video sync, chat, and animation effects must remain lightweight, 60fps, and distraction-free on all devices.

## Accessibility & Inclusion

- High contrast text and controls against deep dark cinema backgrounds.
- Clear visual cues and status indicators (sync latency, active host badges, equalizer animations).
- Keyboard-accessible controls and screen-reader labeled interactive elements.
- Respect for reduced motion preferences on ambient animations and floating particle effects.
