---
name: NodeParty
description: Cinema-grade synchronized watch party lounge and broadcast console
colors:
  primary: "#c8962e"
  primary-hover: "#dba940"
  accent-crimson: "#f43f5e"
  accent-cyan: "#06b6d4"
  accent-amber: "#f59e0b"
  accent-emerald: "#10b981"
  background: "#0c0a07"
  surface: "#161310"
  surface-card: "#1e1a14"
  surface-border: "#27211a"
  foreground: "#f2e9d6"
  foreground-muted: "#907a5a"
typography:
  display:
    fontFamily: "var(--font-geist-sans), system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 5vw, 4.5rem)"
    fontWeight: 900
    lineHeight: 1.08
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "var(--font-geist-sans), system-ui, sans-serif"
    fontSize: "clamp(1.75rem, 3vw, 2.5rem)"
    fontWeight: 800
    lineHeight: 1.15
    letterSpacing: "-0.02em"
  title:
    fontFamily: "var(--font-geist-sans), system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: "-0.01em"
  body:
    fontFamily: "var(--font-geist-sans), system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  label:
    fontFamily: "var(--font-geist-mono), monospace"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "0.08em"
rounded:
  sm: "6px"
  md: "12px"
  lg: "16px"
  xl: "24px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "#0c0a07"
    rounded: "{rounded.lg}"
    padding: "12px 24px"
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
  button-secondary:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.lg}"
    padding: "12px 20px"
---

# Design System: NodeParty

## Overview

**Creative North Star: "Tap House Gold Cinema Console"**

NodeParty pairs the atmospheric warmth of a vintage private screening lounge with the precision of a modern broadcast master control deck. The visual space is built on deep warm obsidian and layered charcoal slate surfaces, punctuated by warm gold projection accents, crisp optical borders, subtle ambient screen backlighting, and monospaced telemetry readouts.

The interface prioritizes immersion during playback while keeping collaborative co-viewing controls (chat, soundboard, role actions, and floating audience reactions) tactile and responsive.

**Key Characteristics:**

- Deep obsidian (`#0c0a07`) and charcoal slate (`#161310`) surfaces with high-contrast parchment foreground legibility (`#f2e9d6`).
- Warm gold projection accents (`#c8962e`) paired with functional tally accents (recording crimson, phosphor cyan, cue amber).
- Monospace SMPTE timecodes, room codes, and sync telemetry.
- Tactile control docks, floating reaction physics, and real-time Web Audio soundboard feedback.
- Dynamic theme switching between Dark (Tap House Gold) and Light (Minimalist Zinc via `useRoomTheme.ts`).

## Colors

### Dark Palette: Tap House Gold (Default)

- **Tap House Gold** (`#c8962e`): Primary action buttons, active toggles, highlighted states, and brand marks.
- **Gold Hover** (`#dba940`): Primary button hover state.
- **Deep Obsidian** (`#0c0a07`): Foundational page canvas and theater background.
- **Cinema Surface** (`#161310`): Elevated containers, sidebars, and control docks.
- **Cinema Card** (`#1e1a14`): Nested cards, input wells, and queue items.
- **Precision Border** (`#27211a`): Sub-pixel optical separators between dark planes.
- **Border Hover** (`#3a3022`): Elevated border on hover/focus.
- **Parchment White** (`#f2e9d6`): High-contrast primary headlines and text.
- **Muted Ochre** (`#907a5a`): Secondary labels, timestamps, and placeholder text.

### Light Palette: Minimalist Zinc (Secondary Theme)

- **Background**: `#F9FAFB`
- **Surface**: `#FFFFFF`
- **Surface Hover**: `#F4F4F5`
- **Border**: `#E4E4E7`
- **Accent**: `#F43F5E` (Projection Crimson)
- **Text**: `#18181B`
- **Muted**: `#71717A`

### Secondary Tally Accents

- **Projection Crimson** (`#f43f5e`): Recording indicators, live badges, and destructive actions.
- **Phosphor Cyan** (`#06b6d4`): Latency telemetry, guest presence indicators, and preview badges.
- **Cue Amber** (`#f59e0b`): Playback warnings, moderator controls, and timecode highlights.
- **Sync Emerald** (`#10b981`): Active live stream connectivity and locked sync status.

---

## Typography

**Display & Body Font:** Geist Sans (with system fallback `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`)
**Telemetry & Label Font:** Geist Mono (with `monospace` fallback)
**Editorial Accent Font:** Inter (for hero banner statements)

### Hierarchy

- **Display** (Font Weight 900, `clamp(2.5rem, 5vw, 4.5rem)`, Line Height 1.08): Hero headlines. Stark, commanding, and tightly tracked (`-0.03em`).
- **Headline** (Font Weight 800, `clamp(1.75rem, 3vw, 2.5rem)`, Line Height 1.15): Section titles and modal headers.
- **Title** (Font Weight 700, `1.25rem`, Line Height 1.3): Card headings, player labels, and sidebar titles.
- **Body** (Font Weight 400, `0.9375rem`, Line Height 1.6): Explanatory copy and message content.
- **Label** (Font Weight 600, `0.75rem`, Line Height 1, Letter Spacing `0.08em` uppercase): Timecodes, status pills, and room code badges.

---

## Layout & Viewport Density

- **Theater Shell**: 3-column edge-to-edge desktop layout (`RoomShell` + `RoomSidebar` rail + Stage + `ParticipantSidebar`).
- **Mobile Adaptability**: Hidden left rail on `< lg`, slide-up `MobileBottomSheet` (82dvh) for chat/reactions/users, touch-friendly bottom dock.
- **Marketing Grid**: 12-column responsive grid with max width of 1280px (`max-w-7xl`).
- **Corner Radii**: 6px for chips/badges, 12px for inputs, 16px/24px for cards and modals, 28px/44px for the outer room shell container.
