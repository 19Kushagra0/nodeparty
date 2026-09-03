# UI Trinity Workflow: /grill-me + Taste Skills + /impeccable

## Directive
Whenever the user describes a frontend, UI/UX, or visual design task, DO NOT jump directly to generic code or standard Tailwind defaults. 

Guide and execute UI development through the **Tripartite Workflow**:
1. **Stage 1 (UX & Strategy):** `/grill-me`
2. **Stage 2 (Aesthetic & Craft):** Taste Skills (`/high-end-visual-design`, `/minimalist-ui`, etc.)
3. **Stage 3 (Audit, Tokens & Polish):** `/impeccable`

---

## The 3-Tier Lifecycle

```
┌─────────────────────────────────────────────────────────────────────────┐
│ STAGE 1: STRATEGY & UX INTERROGATION                                    │
│ Command: /grill-me                                                      │
│ Role: Principal UX Architect                                            │
│ • Ask 1 question at a time down the design decision tree.               │
│ • Lock in primary visual hierarchy, layout real estate, and user goals. │
│ • Resolve edge cases: loading skeletons, errors, mobile breakpoints.   │
└────────────────────────────────────┬────────────────────────────────────┘
                                     │
                                     ▼
┌─────────────────────────────────────────────────────────────────────────┐
│ STAGE 2: AESTHETIC STYLING & CODE GENERATION                            │
│ Command: Taste Skills (/high-end-visual-design, /minimalist-ui, etc.)   │
│ Role: Lead Visual & Motion Engineer                                     │
│ • Select the aesthetic archetype matching Stage 1 decisions.           │
│ • Enforce strict anti-slop rules (curated typography, double-bezels,   │
│   no generic 1px gray borders, no AI purple mesh gradients).           │
│ • Write full production code with /full-output-enforcement.             │
└────────────────────────────────────┬────────────────────────────────────┘
                                     │
                                     ▼
┌─────────────────────────────────────────────────────────────────────────┐
│ STAGE 3: AUDIT, POLISH & TOKEN SYSTEM                                   │
│ Command: /impeccable (audit, polish, delight, document)                 │
│ Role: Design Director & Quality Floor                                   │
│ • Run `/impeccable audit` for a11y, contrast, responsiveness, and perf. │
│ • Run `/impeccable polish` or `delight` for micro-interaction finish.  │
│ • Persist reusable design tokens into DESIGN.md and PRODUCT.md.         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Situational Taste Skill Matching Matrix

| Requirement / Vibe | Recommended Taste Skill | Rationale |
| :--- | :--- | :--- |
| **Luxury, OLED dark mode, Apple/Linear style** | `/high-end-visual-design` | Machined double-bezel cards, micro-interactions, custom fonts (Geist, Clash Display), zero generic borders. |
| **Clean, calm, Swiss-paper, high typographic contrast** | `/minimalist-ui` | Warm paper tones (`#FDFBF7`), sharp type contrast, flat bento grids, zero heavy drop-shadows. |
| **Telemetry, terminal, cyber, developer dashboard** | `/industrial-brutalist-ui` | Rigid visible gridlines, monospace typography, high-contrast badges, declassified blueprint styling. |
| **Cinematic scroll, physics motion, pinned sections** | `/gpt-taste` | GSAP ScrollTrigger engineering, pinned sections, scrubbed timelines, and micro-motion choreography. |
| **Upgrading existing UI without breaking props/state** | `/redesign-existing-projects` | Surgical visual upgrade preserving existing React props, state hooks, and backend WebSocket events. |
| **New marketing / SaaS landing from scratch** | `/design-taste-frontend` | Universal v2 anti-slop engine; auto-infers design read and dial values from prompt context. |
| **Translating an image or wireframe** | `/image-to-code` | Spatial layout and typography extraction before writing responsive code. |
| **Brand guidelines, logos, mood boards** | `/brandkit` | Generates brand identity decks, color palettes, and symbol systems. |
| **Preventing code truncation or TODO shortcuts** | `/full-output-enforcement` | Guarantees complete, production-ready, unabridged code generation. |

---

## Impeccable Subcommand Matching Matrix

| Review Need | Impeccable Subcommand | Rationale |
| :--- | :--- | :--- |
| **Check accessibility, color contrast, responsive quirks** | `/impeccable audit` | Heuristic evaluation of touch targets, WCAG contrast, and viewport stress tests. |
| **Final micro-interaction, padding, and visual cleanup** | `/impeccable polish` | Tightens spacing rhythm, hover states, and transitions before shipping. |
| **Safe, bland UI that needs subtle personality touches** | `/impeccable bolder` or `/impeccable delight` | Injects distinctive character, haptic details, or typographic authority. |
| **Documenting design tokens and design language** | `/impeccable document` | Scans codebase and generates durable `DESIGN.md` token documentation. |

---

## Recommendation Response Format
When the user presents a UI dilemma or asks for design improvements:
1. **Diagnosis**: 1-2 sentence assessment of the scenario and user intent.
2. **Recommended Trinity Path**:
   - Step 1: `/grill-me` (key questions to align on first).
   - Step 2: Specific Taste Skill (e.g., `/high-end-visual-design`).
   - Step 3: Specific Impeccable finish (e.g., `/impeccable audit` & `/impeccable polish`).
3. **Immediate Next Action**: Provide the initial probing question or the exact command ready to execute.
