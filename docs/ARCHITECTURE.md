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
Currently, the application relies entirely on client-side state management using **Zustand** (`src/store/useRoomStore.ts`). 
- The Zustand store serves as a centralized "mock server."
- All mock data is seeded from `src/data/` (e.g., `mockParticipants.ts`, `mockPresets.ts`, `mockLounges.ts`).
- When a user interacts with the UI (e.g., sending a chat, reacting, seeking the video, adding to the queue), the components dispatch actions to the Zustand store, which updates the local client state.
- **Data flow is currently unidirectional and strictly local.** There are no active API calls or WebSocket connections emitting these state changes to a backend or other clients.
