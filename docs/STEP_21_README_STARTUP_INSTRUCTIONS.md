# Step 21: Update README.md with Complete Multi-Server Startup Instructions

## Big Picture
The current `README.md` only mentions `npm run dev` in its "Getting Started" section, leaving out the PartyKit real-time signaling server (`npm run party:dev`). Because NodeParty relies on PartyKit for room presence, synchronized playback (play/pause/seek), live chat, and emoji bursts, users following the existing guide will experience connection issues or miss real-time functionality when entering rooms.

This step updates [`README.md`](file:///c:/Users/Admin/OneDrive/Documents/GitHub/nodeparty/README.md) to thoroughly explain the two-server architecture and provide step-by-step instructions to run both services locally.

---

## Feature Breakdown

### 1. Dual-Service Architecture Clarification
- Explain the role of the two local services:
  - **Next.js Web App** (`http://localhost:3000`): UI, SSR, and YouTube API routes.
  - **PartyKit Signaling Server** (`localhost:1999`): WebSocket sync engine for playback, chat, emojis, and participant presence.

### 2. Updated Getting Started & Startup Instructions
- Replace the single `npm run dev` step with clear two-terminal instructions:
  - **Terminal 1**: `npm run dev`
  - **Terminal 2**: `npm run party:dev`
- Add an explanatory callout highlighting why `party:dev` is required for real-time room synchronization.

### 3. Multi-User Verification Guide
- Add a short walkthrough on verifying multi-user sync (opening two browser windows or an incognito tab to test real-time room sync).

---

## Files to be Modified
1. [`README.md`](file:///c:/Users/Admin/OneDrive/Documents/GitHub/nodeparty/README.md)
   - Update the "Getting Started" section to include complete installation, two-server startup commands (`npm run dev` & `npm run party:dev`), and testing instructions.
