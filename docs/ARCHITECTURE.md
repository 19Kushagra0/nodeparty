# Architecture: NodeParty

## Tech Stack
- **Framework**: Next.js 16.2.12 (App Router)
- **UI Library**: React 19.2.4
- **Styling**: Tailwind CSS v4 (with `@tailwindcss/postcss`)
- **State Management**: Zustand
- **Icons**: Lucide React
- **Language**: TypeScript

## Application Structure
The application utilizes Next.js App Router route groups to separate concerns:
- `src/app/(home)`: Contains the landing page, hero section, and static marketing elements.
- `src/app/(watch-party)`: Contains the core real-time application routes, primarily `room/[roomId]/page.tsx` for the watch party rooms.

### Component Architecture
Components are neatly organized into context-specific directories:
- `src/components/home/`: Components for the landing page (e.g., `InteractiveHeroDemo.tsx`, `FeaturedLounges.tsx`, `JoinRoomCard.tsx`).
- `src/components/watch-party/`: Core functional components for the room.
  - `VideoPlayer.tsx`: The main cinema viewport, custom controls, and ambient lighting.
  - `ParticipantSidebar.tsx`: The right-side panel handling tabs for Chat, Crew/Roles, Up-Next Queue, and Settings.
  - `RoomHeader.tsx`, `InviteModal.tsx`, `ScreenShareModal.tsx`: Secondary room UI.
- `src/components/layout/`: Shared layouts like `Navbar.tsx` and `Footer.tsx`.

## Data Flow & Core Logic
The application operates as a hybrid platform supporting two distinct interaction modes:

1. **Watch Party Mode (Default)**:
   - The primary mode where users watch synchronized streaming video (e.g., via the YouTube IFrame API).
   - A WebSocket signaling server broadcasts lightweight events (`play`, `pause`, `seekTo`) ensuring all clients are perfectly in sync.

2. **Collaborative Browser Mode (Advanced)**:
   - When the Host activates screen sharing, the architecture shifts to a two-part remote-control system:
     - **Visual Layer (WebRTC)**: The host shares a tab (`getDisplayMedia`), broadcasting a live video feed to guests. The Next.js frontend captures guest mouse movements and keyboard events, converting them to normalized percentages (X/Y) over the video bounding box.
     - **Control Layer (Chrome Extension)**: A custom extension installed by the host receives the normalized coordinates and keystrokes via a WebRTC DataChannel. The extension uses the `chrome.debugger` API (`Input.dispatchMouseEvent`/`Input.dispatchKeyEvent`) to inject interactions into the shared tab, granting true remote control.
