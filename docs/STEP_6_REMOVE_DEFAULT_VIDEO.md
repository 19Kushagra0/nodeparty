# Step 6: Remove Default Video on Load

## Big Picture
When users open the YouTube workspace, it currently pre-loads a default video ("Costa Rica in 4K") at the top of the screen. We want to remove this so that the workspace starts clean. The video player should remain completely hidden, allowing the search and discovery feed to take up the full screen until the user explicitly clicks on a video to play.

## Feature Breakdown
1. **Remove Default State**: Update the global room state to start with an empty video URL instead of pre-selecting the first curated preset.
2. **Hide the Player Area**: Update the `YoutubeWorkspaceView` so that if no video is currently selected, the entire player section (including the placeholder) is hidden. This will allow the YouTube home feed to shift up and look like a native browsing experience.

## Files to be Modified
1. `src/store/useRoomStore.ts`
   - Change the initial state of `videoUrl` from `curatedVideoPresets[0].url` to `""`.
   - Change the initial state of `currentPreset` to `null`.
2. `src/components/watch-party/YoutubeWorkspaceView.tsx`
   - Add a conditional check: only render `<YoutubePlayer />` or `<YoutubePlayerPlaceholder />` if an active video is selected. Otherwise, render nothing in that top spot.
3. `src/components/watch-party/youtube/YoutubeVideoMetadata.tsx`
   - Ensure the metadata component is also hidden if there is no active video.
