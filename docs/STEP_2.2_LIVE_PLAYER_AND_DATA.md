# Step 2.2: Live Player & YouTube Data Engine

## The Big Picture
In Step 2.1, we built the "brain" (the state and the network broadcast) for pasting a YouTube URL. However, the visual stage is still rendering the `YoutubePlayerPlaceholder` component instead of an actual video player. 

In Step 2.2, we will bring the stage to life. We will mount a real, working YouTube video player that automatically plays the URL stored in the room's state. In addition, we will replace the hardcoded placeholder text below the video (like "Cyberpunk 2077" and "1.8M views") with the actual live data of the video you are currently watching.

## Sub-step Breakdown

### 1. Embed the Real Video Player (`react-youtube`)
We will swap out the `YoutubePlayerPlaceholder` with an actual `<YouTube />` component in the main workspace view.
* **Result**: When you paste a link and press Enter, the video will instantly appear and start playing.

### 2. Live Video Metadata (The Data Engine)
We will use the installed `youtube-sr` package to automatically fetch the video's real details whenever the URL changes.
* **Result**: The title, channel name, views, and upload date directly under the video will accurately match whatever you are watching.

## Files to be Modified
1. `src/components/watch-party/youtube/YoutubePlayer.tsx` (NEW) - The actual video component wrapper.
2. `src/components/watch-party/YoutubeWorkspaceView.tsx` - Swapping the placeholder for the real player conditionally.
3. `src/components/watch-party/youtube/YoutubeVideoMetadata.tsx` - Hooking up real data instead of static text.
4. `src/store/useRoomStore.ts` - Adding the live metadata fetching state.
