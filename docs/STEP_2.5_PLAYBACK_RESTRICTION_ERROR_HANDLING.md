# Step 2.5: Playback Restriction Error Handling & Graceful Auto-Skip

## The Big Picture
In YouTube watch parties, certain videos have third-party embedding disabled by their creators or record labels (Error 101 / 150), or are region-locked/private (Error 100). When such a video is queued or selected, leaving the room stuck on a static error screen disrupts the party flow.

In **Step 2.5**, we implement a seamless, non-blocking error recovery system:
1. **Auto-Skip Countdown**: If a restricted video encounters an error and there are more videos in the communal queue, a 5-second countdown starts automatically.
2. **Room Alert**: A friendly system notification is posted to the room chat so all participants know why the video was skipped.
3. **Empty Queue Fallback**: If the queue is empty, the player provides convenient recovery options (open on YouTube, browse recommendations, or replay previous video) without showing a disruptive modal.

---

## Sub-step Breakdown

### 1. Auto-Skip Countdown Engine
- When `onError` triggers (e.g. error codes 101, 150, 100) in `YoutubePlayer.tsx`:
  - Check if there are upcoming unplayed videos in `queue`.
  - If yes: start a 5-second interval countdown (`skipCountdown`).
  - Render an active countdown indicator in the error card:
    `"Playback restricted by owner. Skipping to next in queue in {skipCountdown}s..."`
  - Provide interactive buttons:
    - `[Skip Now]`: Immediately advances to the next queued video.
    - `[Cancel]`: Stops the countdown and keeps the player on the manual error card.
  - When the countdown reaches 0:
    - The host automatically removes the restricted track and calls `playQueueItem` on the next track, synchronizing playback for the whole room.

### 2. Room Notification
- In `onError`, trigger `sendMessage` to notify everyone in the room:
  `⚠️ "[Video Title]" cannot be played in third-party apps (disabled by owner). Skipping to next...`
- Ensures transparency for all connected guests without covering their screens with a modal dialog.

### 3. Empty Queue Recovery Options
- If no upcoming videos exist in the queue:
  - Display non-disruptive, action-oriented recovery buttons:
    - **Watch on YouTube**: Direct link in a new tab.
    - **Explore Recommendations**: Smoothly scrolls down to the Discovery Grid.
    - **Play Trending Video**: Instantly switches to the top recommended video to keep the lounge active.

---

## Files to be Modified
1. `src/components/watch-party/youtube/YoutubePlayer.tsx` - Implement error countdown timer, room alert broadcast, cancel/skip actions, and empty queue fallback buttons.
2. `docs/STEP_2.5_PLAYBACK_RESTRICTION_ERROR_HANDLING.md` - Documentation for this step.
