# Step 7: YouTube Infinite Scroll (Client-Side Pagination)

## Big Picture
To safely implement "Load More" / Infinite Scroll without risking our server getting blocked by YouTube (rate limiting), we will use a **Client-Side Pagination** strategy. 

Instead of asking YouTube for more videos every single time the user scrolls (which can look like spam), our server will fetch a large batch of videos upfront (e.g., 50 videos) in a single request. However, the UI will only display the first 12 videos. As the user scrolls to the bottom of the page, the app will smoothly "unlock" and display the next 12 videos from our local batch, creating a seamless infinite scroll experience!

## Feature Breakdown

### 1. Increase Backend Batch Size
- Update the API route (`/api/youtube/search/route.ts`) to request `limit: 50` videos from `youtube-sr` instead of 12. This ensures we have plenty of videos to scroll through from just one safe request.

### 2. Frontend "Infinite Scroll" Logic
- In the YouTube Workspace (`YoutubeWorkspaceView.tsx`), we will add a `displayLimit` state variable starting at 12.
- The UI will only render the videos up to the `displayLimit` (using `Array.slice`).
- We will add an invisible "trigger" element at the very bottom of the video grid. 
- Using an `IntersectionObserver`, when the user's screen hits that trigger element, we will increase `displayLimit` by 12, instantly showing more videos.

## Files to be Modified
1. `src/app/api/youtube/search/route.ts`
   - Increase the `limit` passed to `YouTube.search()` to `50`.
2. `src/components/watch-party/YoutubeWorkspaceView.tsx`
   - Add `displayLimit` state.
   - Add an `IntersectionObserver` hook or a scroll listener to detect when the bottom of the list is reached.
   - Update the mapping logic to `videos.slice(0, displayLimit)`.
   - Add an invisible `div` at the bottom of the grid to trigger the load.
