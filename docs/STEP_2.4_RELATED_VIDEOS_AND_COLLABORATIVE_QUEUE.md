# Step 2.4: Related Videos & Collaborative Queue Management

## The Big Picture
In the previous steps, we integrated the live YouTube player and built concurrent browsing/discovery so guests can search and discover videos while watching.

In **Step 2.4**, we complete the YouTube social watching loop with two core capabilities:
1. **Dynamic "Related Videos" Feed**: When a video is playing, the discovery feed automatically suggests relevant content tailored to the active video's topic/creator, giving users an organic "Up Next" browsing experience.
2. **Collaborative Queue Synchronization & Auto-Play**: The "Up Next" queue becomes fully synchronized in real-time across all room members via PartyKit. When users add, vote on, or remove queue items, everyone's queue stays in sync. When the currently playing video ends, the host automatically triggers the next queued video so the party continues without manual intervention.

---

## Sub-step Breakdown

### 1. Related Videos State & Fetching Engine
- In `src/store/useRoomStore.ts`, introduce `relatedVideos: YoutubeSearchResult[]` and an asynchronous action `fetchRelatedVideos(title: string)`.
- Use the internal `/api/youtube/search` endpoint with the active video's title to retrieve high-relevance recommendations without relying on brittle third-party direct-related scrapers.
- In `src/components/watch-party/YoutubeWorkspaceView.tsx`, trigger `fetchRelatedVideos` when the active video's title changes.

### 2. Discovery Grid UI Adaptability
- In `src/components/watch-party/youtube/YoutubeDiscoveryGrid.tsx`, dynamically adjust feed contents:
  - If a search query is active $\rightarrow$ display **Search Results**.
  - If a video is playing and search is idle $\rightarrow$ display **Related Videos / Up Next**.
  - If no video is active and search is idle $\rightarrow$ display **Curated / Trending Videos**.
- Update the section header cleanly without AI slop/card-within-card styling.

### 3. PartyKit Queue Broadcasting & Synchronization
- In `party/index.ts`, permit and relay the `sync_queue` message type across connected room participants.
- In `src/store/useRoomStore.ts`:
  - Whenever `addToQueue`, `voteQueueItem`, or `removeFromQueue` occurs, broadcast a `{ type: "sync_queue", queue }` message via the active PartyKit WebSocket.
  - In `connectToRoom`'s WebSocket listener, handle incoming `sync_queue` messages to update the local queue for all guests in real time.

### 4. Host-Authoritative Auto-Play
- In `src/components/watch-party/youtube/YoutubePlayer.tsx`, listen to YouTube player state `0` (ENDED).
- If the current participant is the room `host`:
  - Check the queue for the first unplayed item.
  - Call `playQueueItem(nextItem.id)` which updates the active video and broadcasts the change to all participants.

---

## Files to be Modified
1. `party/index.ts` - Allow broadcasting `sync_queue` message events among room peers.
2. `src/store/useRoomStore.ts` - Add `relatedVideos` state, `fetchRelatedVideos`, and PartyKit queue synchronization.
3. `src/components/watch-party/YoutubeWorkspaceView.tsx` - Trigger fetching related videos upon active video title changes.
4. `src/components/watch-party/youtube/YoutubeDiscoveryGrid.tsx` - Render related videos feed when a video is playing.
5. `src/components/watch-party/youtube/YoutubePlayer.tsx` - Add host-authoritative auto-play trigger upon video completion (`state === 0`).
6. `docs/TODO.md` - Check off completed items under Step 2.
