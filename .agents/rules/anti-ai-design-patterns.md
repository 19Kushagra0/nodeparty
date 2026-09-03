# Anti-AI Design & Cliché Blacklist (Living Document)

## Core Invariant
If generated UI code includes ANY of the banned patterns below, the output immediately fails the quality floor. Never use these shortcuts.

---

## 🚫 The Banned AI Patterns & Clichés

### 1. The "Fake Telemetry" Pulsing Green Dot Pill Badge
* **The Banned Pattern:** `<div className="rounded-full ... animate-pulse">` with a green/emerald dot and monospace text floating directly above the `<h1>` (e.g. `[ 🟢 Just Launched v1.0 ]`, `[ 🟢 Private WebRTC Club ]`).
* **Why it fails:** This is the #1 mocked "AI-generated SaaS" trope on Twitter and Reddit ("The Vibe-Coded Starter Pack"). It screams cheap template.
* **What to do instead:** 
  - **Option A (Pure Confidence):** Let the bold `<h1>` speak for itself with zero clutter above it.
  - **Option B (Editorial Eyebrow):** A subtle, static, tracked uppercase text label (`text-xs font-semibold uppercase tracking-[0.25em] text-[#c8962e]`) with NO pill border and NO pulsing dot.

---

### 2. The "Alternating 50/50 Sandwich"
* **The Banned Pattern:** Consecutive feature sections alternating *Text-Left/Image-Right*, then *Image-Left/Text-Right*.
* **Why it fails:** Standard generic LLM layout that feels like an uninspired Bootstrap template.
* **What to do instead:** Asymmetrical Bento grids, editorial splits (massive typography on left, horizontal scroll on right), or live interactive component stages.

---

### 3. Unsplash Stock Photo Fillers
* **The Banned Pattern:** Using stock photos of empty movie theaters, generic guys wearing headsets, or stock office setups to fill card slots.
* **Why it fails:** Shows zero product reality, feels like a placeholder website.
* **What to do instead:** Render actual interactive component state (mini video player, live synced chat bubbles, audio waveform visualizers, real stream controls).

---

### 4. The Flat "Caution-Tape" Solid Banner
* **The Banned Pattern:** Full-width flat solid colored blocks (e.g. solid yellow/gold `py-8` rectangle) that cut harshly across a dark mode.
* **Why it fails:** Destroys dark-mode ocular immersion like construction hazard tape.
* **What to do instead:** Ambient dark spotlight stages with top/bottom hairline borders (`border-y border-[#c8962e]/20`) and radial light diffusion.

---

### 5. Arbitrary Micro-Font Spam
* **The Banned Pattern:** Hardcoding arbitrary micro-font classes (`text-[9px]`, `text-[10px]`, `text-[11px]`) across components.
* **Why it fails:** Flagged by `impeccable detect`. Breaks typographic harmony, creates accessibility failure, and signals careless AI code generation.
* **What to do instead:** Follow strict typographic scale steps: `text-xs` (12px), `text-sm` (14px), `text-base` (16px), `text-lg` (18px) with calibrated line heights.

---

### 6. Flat 1px Gray Borders & Generic Shadows
* **The Banned Pattern:** Flat `border border-gray-800` or `1px solid #27211a` on a dark box with default drop shadows.
* **Why it fails:** Makes containers look like flat cardboard web divs.
* **What to do instead:** Machined "Double-Bezel" (Doppelrand) architecture: outer hairline ring (`ring-1 ring-white/10`) with large outer radius, and a recessed inner core with a specular top-edge highlight (`shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)]`).

---

### 7. The Default "AI-Purple Mesh" Gradient
* **The Banned Pattern:** Saturated purple-to-blue or cyan radial mesh gradients (`bg-gradient-to-r from-indigo-500 to-purple-600`).
* **Why it fails:** The universal AI cliché of 2023–2025.
* **What to do instead:** Bespoke, project-tailored palettes (like NodeParty's Tap House Gold: warm obsidian `#0c0a07`, warm charcoal, and amber-gold).

---

### 8. The "Developer HUD" Keyboard Shortcut Clutter in Consumer Buttons
* **The Banned Pattern:** Cramming `<kbd>Ctrl+K</kbd>` or monospace shortcut boxes inside consumer hero CTA buttons (e.g. `[ Join with code Ctrl+K ]`).
* **Why it fails:** Creates messy "box-inside-a-box" visual clutter and treats a consumer media/entertainment website like an internal IDE or terminal debugger.
* **What to do instead:** High-craft secondary buttons (like 21st.dev's Liquid Glass Button with `backdrop-blur-md`, subtle specular highlights, and an animated hover arrow) or clean, uncluttered ghost links.

---

## 📝 Living Document Protocol
Whenever a user or agent catches a new visual habit that feels artificial or templated during a session, immediately append it to this document with:
1. The Banned Pattern
2. Why it Fails
3. What to Do Instead
