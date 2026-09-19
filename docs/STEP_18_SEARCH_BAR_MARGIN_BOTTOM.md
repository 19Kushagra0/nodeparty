# Step 18: Add Subtle Bottom Margin to Search Bar Container

## Big Picture
In the YouTube Workspace, the search bar container currently has `mb-0 pb-1`, placing the bottom of the input pill almost directly flush against the video thumbnails and discovery feed content underneath.

We will add a clean, subtle bottom margin (`mb-2 sm:mb-2.5`) to give comfortable breathing room between the search bar and the content stage below it.

---

## Feature Breakdown

### 1. Increase Bottom Spacing on Search Bar Wrapper
- In [`src/components/watch-party/YoutubeWorkspaceView.tsx`](file:///c:/Users/Admin/OneDrive/Documents/GitHub/nodeparty/src/components/watch-party/YoutubeWorkspaceView.tsx):
  - Update the wrapper element from:
    ```tsx
    className={`w-full flex items-center justify-center px-4 sm:px-6 lg:px-8 pb-1 mb-0 relative z-10 ...`}
    ```
    to:
    ```tsx
    className={`w-full flex items-center justify-center px-4 sm:px-6 lg:px-8 pb-1.5 mb-2 sm:mb-2.5 relative z-10 ...`}
    ```
- This adds ~8px to 10px of elegant vertical separation, preventing the search pill from visually colliding with the video cards below.

---

## Files to be Modified
1. `src/components/watch-party/YoutubeWorkspaceView.tsx`
   - Adjust search bar wrapper margin and padding to add the subtle bottom spacing.
