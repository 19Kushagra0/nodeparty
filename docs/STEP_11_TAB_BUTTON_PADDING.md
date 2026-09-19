# Step 11: Increase Padding on Right Sidebar Tab Buttons

## Big Picture
As shown in the user's screenshots, the active tab pill button (`Users`, `Chat`, `React`, `Queue`) in the right sidebar is currently snug with `py-1.5` and no horizontal padding. We will increase the internal padding to `py-2 px-2.5 sm:px-3` and the container padding to give the icons and labels comfortable breathing room.

---

## Feature Breakdown

### 1. Tab Button Padding & Spacing (`ParticipantSidebar.tsx`)
- Update the tab buttons:
  - Increase vertical padding from `py-1.5` to `py-2`.
  - Add horizontal padding `px-2.5 sm:px-3` to give the pills balanced curved edges.
  - Increase icon-to-text spacing from `gap-1` to `gap-1.5`.
- Update the outer tab capsule:
  - Adjust padding to `p-1.5` for balanced borders around the active pill.
  - Harmonize the collapse chevron button height (`w-9 h-9`) to match the new tab bar height.

---

## Files to be Modified
1. `src/components/watch-party/ParticipantSidebar.tsx`
   - Adjust padding and gap classes on the navigation tab pills.
