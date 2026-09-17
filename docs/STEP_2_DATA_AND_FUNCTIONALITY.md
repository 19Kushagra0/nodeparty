# Step 2: Data & Functionality

### The Big Picture: What you get at the end of Step 2
Right now, the YouTube Workspace is a visually designed skeleton/layout with placeholders. 

At the end of Step 2, it becomes a **fully functioning, collaborative YouTube watch party app**. You and your friends will be able to paste any link, watch real YouTube videos together in sync, search for new content without pausing playback, and add videos to a shared "Up Next" queue that automatically plays the next video when the current one ends.

---

### What Each Sub-Step Builds (Feature by Feature)

#### 1. Direct URL "Paste & Play" (Pill Bar Enter)
* **What you can do:** You or anyone in the room can copy any YouTube link (a normal video, a music track, or a YouTube Short), paste it into the top pill search bar, and press **Enter**.
* **What happens:** The video immediately loads for everyone in the room and starts playing in perfect sync at the exact same millisecond. 

#### 2. Live YouTube Data Engine (Backend Connection)
* **What you can do:** Under the hood, this connects the app to real YouTube data.
* **What happens:** Instead of static placeholder text, the app fetches real video titles, channel names, view counts, upload dates, and high-definition video thumbnails.

#### 3. Concurrent Browsing & Search ("Browse while you Watch")
* **What you can do:** Search for any video (e.g., "Lofi hip hop" or "game trailers") or browse category feeds (Music, Gaming, Podcasts) directly below the player.
* **What happens:** You can explore and discover new videos **without interrupting or pausing** the video currently playing on screen for the room.

#### 4. "Watch Now" vs. "Add to Queue"
* **What you can do:** When you click or hover over any video in the search results or recommendations, you get two simple buttons:
  * **Watch Now:** Immediately switches the active video for everyone in the room.
  * **Add to Queue:** Queues it up in the room playlist for later without cutting off the current song or video.
* **What happens:** No more accidentally interrupting someone's favorite video while queuing up the next one!

#### 5. Collaborative Shared Queue ("Up Next" Playlist)
* **What you can do:** A shared playlist where everyone sees what is coming up next.
* **What happens:** 
  * If a friend adds a song, it instantly pops up on everyone’s screen.
  * You can see who queued what and upvote or remove videos.
  * When the current video ends, the system automatically starts playing the next queued video for everyone, completely hands-free.

---

### Files to be modified for Sub-step 1:
When we start **Sub-step 1 (Direct URL Pill Bar Enter Feature)**, we will update:
1. `src/components/watch-party/youtube/YoutubeSearchBar.tsx` — Parse YouTube URL formats (`watch?v=`, `youtu.be/`, `shorts/`), extract the clean video ID, and trigger playback on Enter.
2. `src/stores/useRoomStore.ts` — Ensure the active video ID updates and broadcasts to PartyKit so all guests sync up immediately.
3. `src/components/watch-party/YoutubeWorkspaceView.tsx` & `src/components/watch-party/youtube/YoutubePlayerPlaceholder.tsx` — Mount the real synchronized YouTube video player when a video is loaded.
