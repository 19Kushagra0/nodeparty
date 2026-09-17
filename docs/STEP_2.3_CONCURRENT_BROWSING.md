# Step 2.3: Concurrent Browsing & Discovery

## The Big Picture
In the previous steps, we successfully implemented the live video player and the live YouTube data engine, allowing users to paste a URL and immediately watch it in sync with real metadata.

In **Step 2.3**, we will build a native YouTube-style browsing experience directly into the `YoutubeWorkspaceView`. The goal is to allow users to search for new videos or browse a home feed *concurrently*, meaning you can discover new content without interrupting the video that is currently playing on the main stage. 

## Sub-step Breakdown

### 1. The Home Feed & Search Results UI
We will build a scrollable content area that sits below the active video player. This area will display a grid of video cards (the Home Feed) by default, and seamlessly switch to displaying Search Results when a user types a query into the `YoutubeSearchBar`.

### 2. High-Quality Video Cards
We will create a `YoutubeVideoCard` component that looks and feels like a native YouTube thumbnail card. It will display the video thumbnail, title, channel name, views, and duration.

### 3. Non-Disruptive Interaction
Crucially, clicking on or interacting with the search bar and the browsing grid will *not* pause or affect the currently playing video. The browsing state will remain strictly local to the user, until they explicitly choose to "Watch Now" or "Add to Queue".

## Files to be Modified
1. `src/components/watch-party/YoutubeWorkspaceView.tsx` - We will update this layout to include the new scrollable browsing grid below the active video.
2. `src/components/watch-party/youtube/YoutubeVideoCard.tsx` (NEW) - The reusable component for displaying a video in the feed or search results.
3. `src/components/watch-party/youtube/YoutubeBrowseGrid.tsx` (NEW) - The container component that handles fetching and displaying the grid of videos.
4. `src/components/watch-party/youtube/YoutubeSearchBar.tsx` - We will wire the search bar to update the local browsing state instead of immediately playing the search query.
5. `src/store/useRoomStore.ts` - We will add local state variables to track the current search query and browsing results.
