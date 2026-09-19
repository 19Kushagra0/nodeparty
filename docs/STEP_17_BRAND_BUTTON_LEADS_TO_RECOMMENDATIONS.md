# Step 17: Route Header Brand Button to Recommended & Trending Feed

## Big Picture
Currently, clicking the `< NodeParty` brand button in the top-left header of the YouTube Workspace acts as a traditional anchor link (`<Link href="/">`), navigating away from the watch party room entirely and redirecting the user to the landing homepage.

Instead of ejecting the user from the room, clicking the `< NodeParty` brand button should function natively like YouTube's top-left logo: returning the user to the clean **"Recommended & Trending"** discovery page inside the watch party lounge:
1. Closes any currently active playing video (returning to the full-screen discovery feed).
2. Clears any active search query and search results.
3. Restores the "Recommended & Trending" feed header and grid.
4. Smoothly scrolls the viewport back up to the top of the page.

---

## Feature Breakdown

### 1. Add `resetToRecommendations` Action in `useRoomStore`
- Clear `videoUrl` and set `currentPreset` to `null`.
- Clear `searchQuery`, `searchResults`, and `searchError`.
- Halt playback (`isPlaying: false`).
- Re-fetch or display the default curated / recommended trending feed.

### 2. Update `RoomBrandButton.tsx`
- Replace the external `<Link href="/">` with an interactive `<button>` (or customizable action).
- Connect the button click handler to `resetToRecommendations()` in the room store.
- Update tooltip / `title` attribute to `"Back to Recommendations"`.

### 3. Smooth Auto-Scroll to Top
- In `YoutubeWorkspaceView.tsx`, ensure that resetting to the recommendation page smoothly scrolls the main stage container back to `top: 0`.

---

## Files to be Modified
1. `src/store/useRoomStore.ts`
   - Add `resetToRecommendations` action to reset video and search state back to the discovery feed.
2. `src/components/watch-party/RoomBrandButton.tsx`
   - Replace `<Link href="/">` with a button triggering the return to the recommendation page.
3. `src/components/watch-party/YoutubeWorkspaceView.tsx`
   - Ensure stage container scrolls to `top: 0` when resetting to recommendations.
