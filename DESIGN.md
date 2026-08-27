---
name: NodeParty
description: Cinema-grade synchronized watch party lounge and broadcast console
colors:
  primary: "#f43f5e"
  primary-hover: "#e11d48"
  accent-cyan: "#06b6d4"
  accent-amber: "#f59e0b"
  accent-emerald: "#10b981"
  background: "#07080b"
  surface: "#0e1117"
  surface-card: "#141722"
  surface-border: "rgba(255, 255, 255, 0.08)"
  foreground: "#f4f4f5"
  foreground-muted: "#a1a1aa"
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
    textColor: "#ffffff"
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

**Creative North Star: "The Midnight Cinema Console"**

NodeParty pairs the atmospheric luxury of a private screening room with the precision of a modern broadcast master control deck. The visual space is built on deep optical black and layered obsidian surfaces, punctuated by crisp optical borders, subtle ambient screen backlighting, and monospaced telemetry readouts.

The interface prioritizes immersion during playback while keeping collaborative co-viewing controls (chat, synchronized queue, role actions, and floating audience reactions) tactile and responsive.

**Key Characteristics:**
- Deep obsidian and charcoal slate surfaces with high-contrast foreground legibility.
- Broadcast tally accents (recording crimson, phosphor cyan, cue amber) used purposefully for state, never as arbitrary background noise.
- Monospace SMPTE timecodes, latency meters, and sync telemetry.
- Tactile control docks and floating reaction physics.

## Colors

The palette is anchored in pitch black and layered darkroom obsidians, using vibrant projection and tally accents with intentional restraint.

### Primary
- **Projection Crimson** (`#f43f5e`): Used for primary action buttons, active recording/sync indicators, and user reaction highlights.

### Secondary
- **Phosphor Cyan** (`#06b6d4`): Used for latency telemetry, guest presence indicators, and interactive preview badges.
- **Cue Amber** (`#f59e0b`): Used for playback warnings, moderator controls, and timecode highlights.
- **Sync Emerald** (`#10b981`): Used for active live stream connectivity, locked sync status, and positive verification states.

### Neutral
- **Deep Void Background** (`#07080b`): The foundational canvas for all pages.
- **Cinema Surface** (`#0e1117`): Elevated surfaces, sidebars, and control docks.
- **Cinema Card** (`#141722`): Nested interactive cards, queue items, and input wells.
- **Precision Border** (`rgba(255, 255, 255, 0.08)`): Sub-pixel optical separators between dark planes.
- **Tungsten White** (`#f4f4f5`): High-contrast primary headlines and text.
- **Muted Slate** (`#a1a1aa`): Secondary labels and metadata.

### Named Rules
**The Rarity Accent Rule.** Projection Crimson and vibrant tally accents are reserved for active state, focus, and interaction triggers. They must never cover more than 10% of any viewport.

## Typography

**Display & Body Font:** Geist Sans (with system fallback `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`)
**Telemetry & Label Font:** Geist Mono (with `monospace` fallback)

**Character:** High-density, confident modern sans paired with technical monospaced readouts for timecodes, room codes, and sync indicators.

### Hierarchy
- **Display** (Font Weight 900, `clamp(2.5rem, 5vw, 4.5rem)`, Line Height 1.08): Hero headlines. Stark, commanding, and tightly tracked (`-0.03em`).
- **Headline** (Font Weight 800, `clamp(1.75rem, 3vw, 2.5rem)`, Line Height 1.15): Section titles and modal headers.
- **Title** (Font Weight 700, `1.25rem`, Line Height 1.3): Card headings, player labels, and sidebar titles.
- **Body** (Font Weight 400, `0.9375rem`, Line Height 1.6): Explanatory copy and message content. Max line length 65–75ch.
- **Label** (Font Weight 600, `0.75rem`, Line Height 1, Letter Spacing `0.08em` uppercase): Timecode readouts, status pills, and keyboard shortcut chips.

### Named Rules
**The No-Gradient-Text Rule.** Headlines and typography must use stark solid contrast (Tungsten White or muted slate) rather than multi-color gradients. Hierarchy comes from weight, tracking, and scale.

## Layout

- **Spatial Model**: 12-column responsive grid with a max width of 1280px (`max-w-7xl`) for marketing surfaces; edge-to-edge adaptive workspace layout for the watch party theater room.
- **Rhythm**: 8px baseline grid (`4px`, `8px`, `16px`, `24px`, `32px`, `48px`).
- **Density**: High-density controls inside the watch room dock and sidebar; spacious, breathing layouts on marketing/landing views.

## Elevation & Depth

Surfaces rely on tonal layering (pitch black `#07080b` to elevated obsidian `#0e1117` to card `#141722`) combined with 1px optical borders (`rgba(255, 255, 255, 0.08)`). Diffuse ambient screen glows (`filter: blur(45px)`) reflect the video's average color onto the background.

### Shadow Vocabulary
- **Dock Shadow** (`0 20px 40px -15px rgba(0, 0, 0, 0.7)`): Suspended floating control docks.
- **Cinema Ambient Glow** (`0 0 80px rgba(244, 63, 94, 0.15)`): Diffuse lighting behind active media.

### Named Rules
**The Tonal Layering Rule.** Depth is established through stepped surface brightness and crisp 1px optical borders, never through heavy black drop shadows.

## Shapes

- **Corner Radii**: Rounded 6px (`rounded-sm`) for chips and badges; 12px (`rounded-md`) for buttons and inputs; 16px (`rounded-lg`) for cards and floating docks; 24px (`rounded-xl`) for modal dialogs.
- **Borders**: Continuous 1px borders with low-opacity white (`rgba(255, 255, 255, 0.08)`) with subtle hover brightening (`rgba(255, 255, 255, 0.16)`).

## Components

### Buttons
- **Shape**: Rounded 12px (`rounded-md`) or 16px (`rounded-lg`).
- **Primary**: Solid Projection Crimson (`#f43f5e`), white text, bold font. Hover deepens to `#e11d48`.
- **Secondary / Ghost**: Obsidian surface (`#141722`) with 1px border (`rgba(255, 255, 255, 0.08)`), text `#f4f4f5`.

### Inputs & Room Code Fields
- **Style**: Dark ink background (`#0e1117`), 1px subtle border, monospaced uppercase formatting for room codes.
- **Focus**: Phosphor cyan or crimson 1px outline with soft focus ring.

### Floating Dock Controls
- **Style**: Translucent obsidian (`rgba(14, 17, 23, 0.85)`), backdrop blur (`blur-md`), 1px border, floating at bottom center of the theater room.

## Do's and Don'ts

### Do:
- **Do** use monospaced fonts for room codes, timecodes, and clock latency indicators.
- **Do** preserve the deep optical obsidian contrast hierarchy across all views.
- **Do** provide smooth keyboard focus states and clear hover transitions on all interactive controls.
- **Do** keep floating emoji reactions lightweight and non-distracting during video playback.

### Don't:
- **Don't** use multi-color rainbow gradient text on headlines.
- **Don't** rely on 3-card generic feature grids with floating watermark numbers.
- **Don't** add decorative glowing pill eyebrows above headings without functional purpose.
- **Don't** use pure gray text on colored surfaces; tint secondary text from the background hue.
