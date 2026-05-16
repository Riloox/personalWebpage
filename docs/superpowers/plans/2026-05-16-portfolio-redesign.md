# Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the terminal-themed portfolio with an editorial-warm bento using glassmorphic cards, Instrument Serif + Inter typography, floating language/theme controls, and light + dark themes.

**Architecture:** React + Vite SPA, single source of truth in `src/data/profile.ts`. The redesign adds a `GlassCard` primitive that replaces `BentoCard` terminal chrome, a `useTheme` hook + `[data-theme]` CSS custom properties for light/dark, a `BackgroundMesh` fixed layer, and a `FloatingControls` cluster. Sections continue to emit their content; what changes is the surface (glass cards, no terminal chrome) and the page shell (bento grid + below-bento blocks, no `CtaBar`).

**Tech Stack:** React 18, TypeScript 5, Vite 5, `motion/react` 12 (already installed), CSS custom properties. No new runtime dependencies.

**Source spec:** `docs/superpowers/specs/2026-05-16-portfolio-redesign-design.md`

**Quality gate:** This repo has no test runner. The build gate is `npm run build` (`tsc --noEmit && vite build`). Each task ends with a build run + commit. A manual smoke test in `npm run dev` is called out at strategic checkpoints (end of each phase).

---

## File Structure

### Files to create

| Path | Responsibility |
|---|---|
| `src/hooks/useTheme.ts` | Light/dark theme state with `localStorage` persistence; updates `<html data-theme>` and `<meta name="theme-color">` |
| `src/components/BackgroundMesh.tsx` | Fixed-position decorative layer rendering the radial-gradient mesh + dot grid |
| `src/components/GlassCard.tsx` | Glass surface primitive — replaces `BentoCard`. Span variants drive grid placement and reveal-on-scroll motion |
| `src/components/FloatingControls.tsx` | Fixed top-right pill cluster: `EN/ES` segmented pill + `☀/☾` segmented pill |
| `src/components/TrustCard.tsx` | "Trust earned" bento card content |
| `src/components/StackCard.tsx` | "Core stack" bento card content (chip cloud of `skills.primary`) |
| `src/components/NowCard.tsx` | "Now" bento card with pulsing green dot + current role |
| `src/sections/EducationCertsSection.tsx` | Merged Education + Certifications + Languages below-bento section |

### Files to rewrite

| Path | Reason |
|---|---|
| `index.html` | Swap Google Fonts (drop JetBrains Mono, add Inter); set initial `theme-color` for light |
| `src/index.css` | Full rewrite — terminal theme out, editorial-warm + dark theme tokens, glass classes, bento grid, motion keyframes |
| `src/data/profile.ts` | Remove `availability`; add `trustEarned` and `cvFiles` |
| `src/App.tsx` | New shell: `BackgroundMesh`, `FloatingControls`, bento grid + below-bento sections; no `CtaBar` |
| `src/sections/HeroSection.tsx` | Emits Hero `GlassCard` (4×2) content |
| `src/sections/SkillsSection.tsx` | Emits Skills `GlassCard` (4×2) content |
| `src/sections/ProjectsSection.tsx` | Emits Cleta 4×2 card + three small 2×1 project cards (as a fragment) |
| `src/sections/ExperienceSection.tsx` | Full-width below-bento block, glass-styled |
| `src/sections/ContactSection.tsx` | Full-width below-bento block, glass-styled |
| `src/components/GithubStrip.tsx` | Restyled to use `GlassCard`; cards inside use glass styling |
| `src/components/ProjectCard.tsx` | Restyled to use `GlassCard` instead of `BentoCard` |
| `src/components/ProjectLinks.tsx` | Restyled as chip-style pills |
| `src/components/YoutubeEmbed.tsx` | Minor restyle (inherits new card radius from CSS) |

### Files to delete

| Path | Reason |
|---|---|
| `src/components/BentoCard.tsx` | Terminal chrome replaced by `GlassCard` |
| `src/components/StatusCard.tsx` | Controls move to `FloatingControls`; "open to work" badge dropped |
| `src/components/MetricCard.tsx` | Stat folds into Hero body copy |
| `src/sections/EducationSection.tsx` | Merged into `EducationCertsSection.tsx` |
| `src/sections/CertificationsSection.tsx` | Merged into `EducationCertsSection.tsx` |

---

## Phase 0: Branch + clean slate

### Task 0: Create feature branch

**Files:** none.

- [ ] **Step 1: Confirm working tree state**

Run: `git status`
Expected: shows existing in-progress modifications. Do NOT discard them — the redesign builds on top of where the user currently is.

- [ ] **Step 2: Create and switch to feature branch**

Run: `git checkout -b redesign/editorial-bento`
Expected: switched to a new branch carrying all current uncommitted work.

- [ ] **Step 3: Verify build passes before any changes**

Run: `npm run build`
Expected: completes successfully with no TypeScript errors.

If the build fails on the current state, stop and report — the user has pre-existing issues to resolve before redesign work can land cleanly.

---

## Phase 1: Foundation (tokens, primitives, data)

This phase introduces the new design system without rewiring `App.tsx`. After Phase 1, the codebase contains both the old terminal components and the new primitives. The site still renders the old terminal design — Phase 4 flips the switch.

### Task 1: Update `index.html` fonts and theme-color

**Files:**
- Modify: `index.html` (font link + theme-color meta)

- [ ] **Step 1: Replace the Google Fonts link**

In `index.html`, replace this block:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
/>
```

with:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600;700&display=swap"
/>
```

- [ ] **Step 2: Update `theme-color` meta to light default**

In `index.html`, replace:

```html
<meta name="theme-color" content="#08080a" />
```

with:

```html
<meta name="theme-color" content="#f5f1ea" />
```

(The `useTheme` hook in a later task will update this at runtime when the user toggles dark mode.)

- [ ] **Step 3: Run build**

Run: `npm run build`
Expected: completes successfully. No new TS errors expected.

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "chore(redesign): swap fonts (JetBrains Mono → Inter), set light theme-color"
```

---

### Task 2: Rewrite `src/index.css` with editorial-warm + dark tokens

**Files:**
- Modify (full rewrite): `src/index.css`

- [ ] **Step 1: Replace the entire contents of `src/index.css`**

Write the file with these contents:

```css
/* ============================================================
   Tokens
   ============================================================ */

:root {
  /* Type */
  --font-display: 'Instrument Serif', ui-serif, Georgia, serif;
  --font-body: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

  /* Spacing / radius */
  --radius-card: 18px;
  --radius-pill: 999px;
  --radius-button: 10px;
  --radius-canvas: 12px;
  --bento-gap: 14px;

  /* Motion */
  --ease-out: cubic-bezier(0.22, 1, 0.36, 1);
  --motion-fast: 180ms;
  --motion-default: 380ms;
  --motion-slow: 700ms;
}

/* Light theme (default) */
:root,
[data-theme='light'] {
  --bg-canvas: #f5f1ea;
  --mesh-1: rgba(220, 180, 140, 0.45);
  --mesh-2: rgba(180, 200, 220, 0.35);
  --mesh-3: rgba(200, 170, 220, 0.30);
  --dot-color: rgba(26, 24, 21, 0.05);

  --glass-fill: rgba(255, 250, 240, 0.55);
  --glass-border: rgba(255, 255, 255, 0.65);
  --glass-highlight: rgba(255, 255, 255, 0.70);
  --glass-warm-line: rgba(180, 150, 100, 0.08);
  --glass-shadow-1: rgba(80, 60, 30, 0.08);
  --glass-shadow-2: rgba(80, 60, 30, 0.04);
  --glass-gloss: rgba(255, 255, 255, 0.25);

  --ink: #1a1815;
  --ink-muted: #6b5d4a;
  --ink-meta: #8a7860;

  --chip-fill: rgba(255, 255, 255, 0.45);
  --chip-border: rgba(255, 255, 255, 0.60);
  --chip-text: #4a3f2f;

  --btn-primary-bg: #1a1815;
  --btn-primary-fg: #f5f1ea;
  --btn-secondary-bg: rgba(255, 255, 255, 0.50);
  --btn-secondary-border: rgba(26, 24, 21, 0.15);
}

[data-theme='dark'] {
  --bg-canvas: #16120e;
  --mesh-1: rgba(180, 130, 70, 0.20);
  --mesh-2: rgba(100, 110, 180, 0.22);
  --mesh-3: rgba(160, 110, 170, 0.20);
  --dot-color: rgba(244, 234, 216, 0.04);

  --glass-fill: rgba(40, 32, 24, 0.50);
  --glass-border: rgba(255, 230, 200, 0.10);
  --glass-highlight: rgba(255, 240, 210, 0.08);
  --glass-warm-line: rgba(255, 200, 140, 0.05);
  --glass-shadow-1: rgba(0, 0, 0, 0.45);
  --glass-shadow-2: rgba(0, 0, 0, 0.25);
  --glass-gloss: rgba(255, 240, 210, 0.05);

  --ink: #f4ead8;
  --ink-muted: #bfa888;
  --ink-meta: #8a7860;

  --chip-fill: rgba(255, 230, 200, 0.06);
  --chip-border: rgba(255, 230, 200, 0.12);
  --chip-text: #d9c9ab;

  --btn-primary-bg: #f4ead8;
  --btn-primary-fg: #16120e;
  --btn-secondary-bg: rgba(255, 230, 200, 0.06);
  --btn-secondary-border: rgba(255, 230, 200, 0.15);
}

/* ============================================================
   Reset / base
   ============================================================ */

*,
*::before,
*::after {
  box-sizing: border-box;
}

html,
body,
#root {
  margin: 0;
  padding: 0;
  min-height: 100%;
}

html {
  background: var(--bg-canvas);
  color: var(--ink);
  font-family: var(--font-body);
  font-size: 16px;
  line-height: 1.55;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}

body {
  position: relative;
  overflow-x: hidden;
}

a {
  color: inherit;
}

button {
  font-family: inherit;
  cursor: pointer;
}

/* ============================================================
   Background mesh (fixed under everything)
   ============================================================ */

.background-mesh {
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  background:
    radial-gradient(at 12% 18%, var(--mesh-1), transparent 55%),
    radial-gradient(at 88% 8%, var(--mesh-2), transparent 50%),
    radial-gradient(at 50% 95%, var(--mesh-3), transparent 55%),
    var(--bg-canvas);
}

.background-mesh::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image: radial-gradient(circle at 1px 1px, var(--dot-color) 1px, transparent 0);
  background-size: 18px 18px;
  opacity: 0.6;
}

/* ============================================================
   App shell + bento grid
   ============================================================ */

.app-shell {
  max-width: 1280px;
  margin: 0 auto;
  padding: 64px 28px 64px;
}

.bento {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-auto-rows: minmax(72px, auto);
  gap: var(--bento-gap);
}

.below-bento {
  margin-top: 56px;
  display: flex;
  flex-direction: column;
  gap: 28px;
}

/* ============================================================
   Glass card
   ============================================================ */

.glass-card {
  position: relative;
  background: var(--glass-fill);
  backdrop-filter: blur(22px) saturate(140%);
  -webkit-backdrop-filter: blur(22px) saturate(140%);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-card);
  padding: 22px;
  overflow: hidden;
  box-shadow:
    inset 0 1px 0 var(--glass-highlight),
    inset 0 -1px 0 var(--glass-warm-line),
    0 10px 30px var(--glass-shadow-1),
    0 2px 6px var(--glass-shadow-2);
  transition: transform var(--motion-fast) var(--ease-out),
              box-shadow var(--motion-fast) var(--ease-out);
}

.glass-card::after {
  content: '';
  position: absolute;
  inset: 0 0 50% 0;
  background: linear-gradient(to bottom, var(--glass-gloss), transparent);
  pointer-events: none;
}

.glass-card > * {
  position: relative;
  z-index: 1;
}

@media (hover: hover) {
  .glass-card.hover-lift:hover {
    transform: translateY(-2px);
    box-shadow:
      inset 0 1px 0 var(--glass-highlight),
      inset 0 -1px 0 var(--glass-warm-line),
      0 16px 40px var(--glass-shadow-1),
      0 4px 10px var(--glass-shadow-2);
  }
}

/* Card spans */
.span-sm { grid-column: span 2; grid-row: span 1; }
.span-md { grid-column: span 2; grid-row: span 2; }
.span-lg { grid-column: span 4; grid-row: span 1; }
.span-xl { grid-column: span 4; grid-row: span 2; }

/* ============================================================
   Typography helpers
   ============================================================ */

.display {
  font-family: var(--font-display);
  font-weight: 400;
  line-height: 1.05;
  letter-spacing: -0.005em;
  color: var(--ink);
}

.display-italic {
  font-family: var(--font-display);
  font-style: italic;
  font-weight: 400;
  color: var(--ink-muted);
}

.label {
  font-family: var(--font-body);
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--ink-meta);
  margin: 0 0 8px;
}

.body {
  font-family: var(--font-body);
  font-size: 13px;
  line-height: 1.55;
  color: var(--ink);
  margin: 0;
}

.body-muted {
  color: var(--ink-muted);
}

.italic-key {
  font-family: var(--font-display);
  font-style: italic;
  font-size: 11px;
  color: var(--ink-meta);
}

/* ============================================================
   Chips, buttons, pills
   ============================================================ */

.chip {
  display: inline-block;
  background: var(--chip-fill);
  border: 1px solid var(--chip-border);
  color: var(--chip-text);
  padding: 4px 10px;
  font-size: 11px;
  border-radius: var(--radius-pill);
  margin: 0 6px 6px 0;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 16px;
  font-size: 12.5px;
  font-weight: 500;
  border-radius: var(--radius-button);
  border: 1px solid transparent;
  text-decoration: none;
  transition: transform var(--motion-fast) var(--ease-out),
              box-shadow var(--motion-fast) var(--ease-out);
}

.btn-primary {
  background: var(--btn-primary-bg);
  color: var(--btn-primary-fg);
  box-shadow: 0 4px 12px var(--glass-shadow-1);
}

.btn-secondary {
  background: var(--btn-secondary-bg);
  color: var(--ink);
  border-color: var(--btn-secondary-border);
}

@media (hover: hover) {
  .btn:hover { transform: translateY(-1px); }
}

/* ============================================================
   Floating control cluster
   ============================================================ */

.floating-controls {
  position: fixed;
  top: 16px;
  right: 16px;
  z-index: 50;
  display: flex;
  gap: 8px;
}

.float-pill {
  display: flex;
  align-items: center;
  gap: 2px;
  padding: 4px;
  background: var(--glass-fill);
  border: 1px solid var(--glass-border);
  backdrop-filter: blur(20px) saturate(140%);
  -webkit-backdrop-filter: blur(20px) saturate(140%);
  border-radius: var(--radius-pill);
  box-shadow: 0 4px 14px var(--glass-shadow-1);
}

.float-seg {
  appearance: none;
  background: transparent;
  border: 0;
  padding: 4px 10px;
  font-size: 11px;
  font-weight: 500;
  color: var(--ink-muted);
  border-radius: var(--radius-pill);
  opacity: 0.7;
  transition: background var(--motion-fast) var(--ease-out),
              color var(--motion-fast) var(--ease-out),
              opacity var(--motion-fast) var(--ease-out);
}

.float-seg:hover { opacity: 1; }

.float-seg[aria-pressed='true'] {
  background: var(--btn-primary-bg);
  color: var(--btn-primary-fg);
  opacity: 1;
  box-shadow: 0 2px 6px var(--glass-shadow-1);
}

/* ============================================================
   Pulsing dot (Now card)
   ============================================================ */

.pulse-dot {
  display: inline-block;
  width: 6px;
  height: 6px;
  background: #4a8a5c;
  border-radius: 50%;
  margin-right: 8px;
  vertical-align: middle;
  box-shadow: 0 0 0 0 rgba(74, 138, 92, 0.6);
  animation: pulse 1.8s var(--ease-out) infinite;
}

@keyframes pulse {
  0%   { box-shadow: 0 0 0 0   rgba(74, 138, 92, 0.5); }
  70%  { box-shadow: 0 0 0 8px rgba(74, 138, 92, 0);   }
  100% { box-shadow: 0 0 0 0   rgba(74, 138, 92, 0);   }
}

/* ============================================================
   Hero card
   ============================================================ */

.hero-card .hero-name {
  font-size: 44px;
  margin: 6px 0 8px;
}

.hero-card .hero-tag {
  font-size: 15px;
  margin-bottom: 12px;
}

.hero-card .hero-summary {
  font-size: 13px;
  line-height: 1.65;
  color: var(--ink);
}

.hero-card .hero-ctas {
  display: flex;
  gap: 10px;
  margin-top: 18px;
  flex-wrap: wrap;
}

/* ============================================================
   Trust + Stack + Now small cards
   ============================================================ */

.small-card .small-display {
  font-size: 22px;
  line-height: 1.1;
  margin: 2px 0 6px;
}

.small-card .small-sub {
  font-size: 11.5px;
  line-height: 1.5;
  color: var(--ink-muted);
}

/* ============================================================
   Cleta video card
   ============================================================ */

.cleta-card {
  padding: 0;
  overflow: hidden;
  position: relative;
}

.cleta-card .yt-embed {
  display: block;
  width: 100%;
  height: 100%;
  min-height: 240px;
  position: relative;
  background: linear-gradient(135deg, #6e8acd 0%, #a78bcf 60%, #d49a8b 100%);
  border: 0;
  padding: 0;
  margin: 0;
  cursor: pointer;
  border-radius: var(--radius-card);
  overflow: hidden;
}

.cleta-card .yt-embed img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  opacity: 0.92;
}

.cleta-card .yt-play {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 64px;
  height: 64px;
  background: rgba(255, 255, 255, 0.95);
  color: #1a1815;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.30);
  padding-left: 4px;
}

.cleta-card .yt-embed-loaded {
  background: #000;
}

.cleta-card .yt-embed-loaded iframe {
  width: 100%;
  height: 100%;
  border: 0;
  display: block;
}

.cleta-meta {
  position: absolute;
  left: 22px;
  bottom: 22px;
  color: #fff;
  z-index: 2;
  text-shadow: 0 2px 12px rgba(0, 0, 0, 0.35);
  pointer-events: none;
}

.cleta-meta .cleta-title {
  font-family: var(--font-display);
  font-size: 26px;
  line-height: 1.1;
}

.cleta-meta .cleta-sub {
  font-size: 10.5px;
  text-transform: uppercase;
  letter-spacing: 0.10em;
  margin-top: 6px;
  opacity: 0.95;
}

/* ============================================================
   Project card (small)
   ============================================================ */

.project-card .project-name {
  font-family: var(--font-display);
  font-weight: 400;
  font-size: 22px;
  line-height: 1.1;
  margin: 6px 0 6px;
}

.project-card .project-stack {
  font-size: 11px;
  color: var(--ink-muted);
  margin: 0 0 10px;
}

.project-card .project-highlights {
  list-style: none;
  margin: 0 0 10px;
  padding: 0;
  font-size: 11.5px;
  color: var(--ink-muted);
  line-height: 1.5;
}

.project-card .project-highlights li {
  margin-bottom: 4px;
}

.project-links {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.project-link {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: var(--chip-fill);
  border: 1px solid var(--chip-border);
  color: var(--chip-text);
  padding: 4px 10px;
  font-size: 11px;
  border-radius: var(--radius-pill);
  text-decoration: none;
  transition: background var(--motion-fast) var(--ease-out);
}

.project-link:hover {
  background: var(--chip-border);
}

/* ============================================================
   Skills card
   ============================================================ */

.skills-card .skills-title {
  font-size: 24px;
  margin: 4px 0 14px;
}

.skills-card .skills-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px 22px;
}

.skills-card .skills-group .skills-group-label {
  margin-bottom: 6px;
}

/* ============================================================
   Below-bento sections
   ============================================================ */

.section-block {
  padding: 32px;
}

.section-block .section-title {
  font-family: var(--font-display);
  font-weight: 400;
  font-size: 28px;
  line-height: 1.05;
  margin: 0 0 22px;
}

/* Experience */
.experience-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.experience-item .exp-role {
  font-family: var(--font-display);
  font-weight: 400;
  font-size: 20px;
  line-height: 1.15;
  margin: 0 0 4px;
}

.experience-item .exp-meta {
  font-size: 11.5px;
  color: var(--ink-meta);
  margin: 0 0 12px;
}

.experience-item .exp-highlights {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 12.5px;
  line-height: 1.55;
  color: var(--ink-muted);
}

.experience-item .exp-highlights li::before {
  content: '·';
  margin-right: 8px;
  color: var(--ink-meta);
}

/* Education + certs */
.eduCerts-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 28px;
}

.eduCerts-grid .school-name {
  font-family: var(--font-display);
  font-weight: 400;
  font-size: 19px;
  margin: 0 0 4px;
}

.eduCerts-grid .school-degree,
.eduCerts-grid .school-meta {
  font-size: 12px;
  color: var(--ink-muted);
  margin: 0 0 4px;
}

.cert-list {
  list-style: none;
  margin: 0 0 16px;
  padding: 0;
  font-size: 12.5px;
  color: var(--ink-muted);
  line-height: 1.7;
}

.cert-list li::before {
  content: '·';
  margin-right: 8px;
  color: var(--ink-meta);
}

.lang-inline {
  font-size: 12px;
  color: var(--ink-muted);
}

.lang-inline .lang-key {
  font-family: var(--font-display);
  font-style: italic;
  color: var(--ink-meta);
  margin-right: 6px;
}

/* GitHub strip */
.github-strip-cards {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 12px;
}

.github-strip-card {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 14px 16px;
  background: var(--chip-fill);
  border: 1px solid var(--chip-border);
  border-radius: var(--radius-card);
  color: var(--ink);
  text-decoration: none;
  font-size: 12px;
}

.github-strip-card .gh-name {
  font-family: var(--font-display);
  font-weight: 400;
  font-size: 17px;
}

.github-strip-card .gh-desc {
  font-size: 11.5px;
  color: var(--ink-muted);
  line-height: 1.5;
}

.github-strip-card .gh-meta {
  display: flex;
  gap: 12px;
  font-size: 11px;
  color: var(--ink-meta);
}

.github-empty {
  font-size: 12px;
  color: var(--ink-muted);
}

/* Contact */
.contact-block .contact-email {
  font-family: var(--font-display);
  font-size: 22px;
  margin: 4px 0 14px;
}

.contact-block .contact-blurb {
  font-size: 13px;
  color: var(--ink-muted);
  line-height: 1.6;
  margin: 0 0 18px;
  max-width: 60ch;
}

.contact-block .contact-actions {
  display: flex;
  gap: 10px;
  margin-bottom: 18px;
  flex-wrap: wrap;
}

.contact-block .contact-social {
  display: flex;
  gap: 14px;
  font-size: 12px;
  flex-wrap: wrap;
}

.contact-block .contact-social a {
  color: var(--ink-muted);
  text-decoration: none;
  border-bottom: 1px solid var(--chip-border);
  padding-bottom: 1px;
}

.contact-block .contact-response {
  margin-top: 12px;
  font-size: 11.5px;
  color: var(--ink-meta);
}

/* ============================================================
   Responsive
   ============================================================ */

@media (max-width: 1099px) {
  .bento { grid-template-columns: repeat(4, 1fr); }
  .span-lg { grid-column: span 4; }
  .span-xl { grid-column: span 4; }
}

@media (max-width: 767px) {
  .app-shell { padding: 56px 16px; }
  .bento { grid-template-columns: repeat(2, 1fr); gap: 12px; }
  .span-sm { grid-column: span 1; }
  .span-md { grid-column: span 2; }
  .span-lg { grid-column: span 2; }
  .span-xl { grid-column: span 2; grid-row: span 2; }
  .hero-card .hero-name { font-size: 36px; }
  .skills-card .skills-grid,
  .eduCerts-grid { grid-template-columns: 1fr; gap: 18px; }
  .section-block { padding: 22px; }
}

/* ============================================================
   Reduced motion
   ============================================================ */

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
  }

  .glass-card.hover-lift:hover { transform: none; }
}
```

- [ ] **Step 2: Run build**

Run: `npm run build`
Expected: completes successfully. The site will look broken in dev right now because the old terminal CSS classes are gone — that's fine, we're rebuilding the whole UI in subsequent tasks.

- [ ] **Step 3: Commit**

```bash
git add src/index.css
git commit -m "feat(redesign): rewrite index.css with editorial-warm tokens + glass classes"
```

---

### Task 3: Update `src/data/profile.ts` — add `trustEarned` and `cvFiles`, remove `availability`

**Files:**
- Modify: `src/data/profile.ts`

- [ ] **Step 1: Replace the `availability` export with `cvFiles` and add `trustEarned`**

In `src/data/profile.ts`, find the existing `availability` export (top of the file, lines ~3–27) and replace it with these two exports:

```ts
export const cvFiles: Record<LanguageKey, string> = {
  en: '/cv.pdf',
  es: '/cv-es.pdf',
};

export const trustEarned: Record<
  LanguageKey,
  { label: string; display: string; sub: string }
> = {
  en: {
    label: 'Trust earned',
    display: "On Bantotal's newest project",
    sub: 'Picked by my supervisors despite being < 1 year in the company.',
  },
  es: {
    label: 'Confianza ganada',
    display: 'En el proyecto más nuevo de Bantotal',
    sub: 'Elegido por mis supervisores con menos de 1 año en la empresa.',
  },
};
```

Leave every other export (`heroContent`, `skills`, `experience`, `projects`, `education`, `certifications`, `contact`, and the `LanguageKey` type + `ProjectLink` interface) untouched.

- [ ] **Step 2: Run build**

Run: `npm run build`
Expected: build fails on every file that still imports `availability` (currently: `src/sections/HeroSection.tsx`, `src/components/StatusCard.tsx`, possibly `src/sections/ContactSection.tsx`, and any other consumer). This is **expected** — these files are being rewritten in later tasks.

To unblock the build right now, do **not** start fixing those files yet. Instead, temporarily restore a minimal `availability` shim so the build stays green until we replace each consumer. Append this to the end of `src/data/profile.ts`:

```ts
/** @deprecated Removed in the redesign. Temporary shim — delete in Task 21. */
export const availability: Record<
  LanguageKey,
  { open: boolean; label: string; location: string; timezone: string; cvFile: string }
> = {
  en: { open: true, label: '', location: '', timezone: '', cvFile: cvFiles.en },
  es: { open: true, label: '', location: '', timezone: '', cvFile: cvFiles.es },
};
```

- [ ] **Step 3: Run build again**

Run: `npm run build`
Expected: completes successfully.

- [ ] **Step 4: Commit**

```bash
git add src/data/profile.ts
git commit -m "feat(redesign): add trustEarned + cvFiles; keep availability as temp shim"
```

---

### Task 4: Add `src/hooks/useTheme.ts`

**Files:**
- Create: `src/hooks/useTheme.ts`

- [ ] **Step 1: Create the hook file**

Write `src/hooks/useTheme.ts`:

```ts
import { useCallback, useEffect, useState } from 'react';

export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'theme';
const THEME_COLORS: Record<Theme, string> = {
  light: '#f5f1ea',
  dark: '#16120e',
};

const readInitialTheme = (): Theme => {
  if (typeof window === 'undefined') return 'light';
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === 'light' || stored === 'dark') return stored;
  if (window.matchMedia?.('(prefers-color-scheme: dark)').matches) return 'dark';
  return 'light';
};

const applyTheme = (theme: Theme) => {
  if (typeof document === 'undefined') return;
  document.documentElement.dataset.theme = theme;
  const meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
  if (meta) meta.content = THEME_COLORS[theme];
};

export const useTheme = () => {
  const [theme, setThemeState] = useState<Theme>(readInitialTheme);

  useEffect(() => {
    applyTheme(theme);
    try {
      window.localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // ignore quota / private mode errors
    }
  }, [theme]);

  const setTheme = useCallback((next: Theme) => setThemeState(next), []);
  const toggleTheme = useCallback(
    () => setThemeState((prev) => (prev === 'light' ? 'dark' : 'light')),
    [],
  );

  return { theme, setTheme, toggleTheme };
};
```

- [ ] **Step 2: Run build**

Run: `npm run build`
Expected: completes successfully.

- [ ] **Step 3: Commit**

```bash
git add src/hooks/useTheme.ts
git commit -m "feat(redesign): add useTheme hook (localStorage + system preference)"
```

---

### Task 5: Add `src/components/BackgroundMesh.tsx`

**Files:**
- Create: `src/components/BackgroundMesh.tsx`

- [ ] **Step 1: Create the component**

Write `src/components/BackgroundMesh.tsx`:

```tsx
const BackgroundMesh = () => <div className="background-mesh" aria-hidden="true" />;

export default BackgroundMesh;
```

- [ ] **Step 2: Run build**

Run: `npm run build`
Expected: completes successfully.

- [ ] **Step 3: Commit**

```bash
git add src/components/BackgroundMesh.tsx
git commit -m "feat(redesign): add BackgroundMesh decorative layer"
```

---

### Task 6: Add `src/components/GlassCard.tsx`

**Files:**
- Create: `src/components/GlassCard.tsx`

- [ ] **Step 1: Create the component**

Write `src/components/GlassCard.tsx`:

```tsx
import type { ElementType, ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';

export type GlassCardSpan = 'sm' | 'md' | 'lg' | 'xl';

interface GlassCardProps {
  span?: GlassCardSpan;
  delay?: number;
  className?: string;
  id?: string;
  as?: ElementType;
  hoverLift?: boolean;
  children: ReactNode;
}

const spanClass: Record<GlassCardSpan, string> = {
  sm: 'span-sm',
  md: 'span-md',
  lg: 'span-lg',
  xl: 'span-xl',
};

const GlassCard = ({
  span = 'sm',
  delay = 0,
  className = '',
  id,
  as = 'section',
  hoverLift = true,
  children,
}: GlassCardProps) => {
  const prefersReduced = useReducedMotion();

  const variants = prefersReduced
    ? { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } }
    : { hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } };

  const classes = [
    'glass-card',
    spanClass[span],
    hoverLift ? 'hover-lift' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const MotionTag = motion(as);

  return (
    <MotionTag
      id={id}
      className={classes}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={variants}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </MotionTag>
  );
};

export default GlassCard;
```

- [ ] **Step 2: Run build**

Run: `npm run build`
Expected: completes successfully.

- [ ] **Step 3: Commit**

```bash
git add src/components/GlassCard.tsx
git commit -m "feat(redesign): add GlassCard primitive with span variants + reveal motion"
```

---

### Task 7: Add `src/components/FloatingControls.tsx`

**Files:**
- Create: `src/components/FloatingControls.tsx`

- [ ] **Step 1: Create the component**

Write `src/components/FloatingControls.tsx`:

```tsx
import type { LanguageKey } from '../data/profile';
import type { Theme } from '../hooks/useTheme';

interface FloatingControlsProps {
  language: LanguageKey;
  onLanguageChange: (next: LanguageKey) => void;
  theme: Theme;
  onThemeChange: (next: Theme) => void;
}

const FloatingControls = ({
  language,
  onLanguageChange,
  theme,
  onThemeChange,
}: FloatingControlsProps) => {
  return (
    <div className="floating-controls" aria-label="Site controls">
      <div className="float-pill" role="group" aria-label="Language">
        <button
          type="button"
          className="float-seg"
          aria-pressed={language === 'en'}
          onClick={() => onLanguageChange('en')}
        >
          EN
        </button>
        <button
          type="button"
          className="float-seg"
          aria-pressed={language === 'es'}
          onClick={() => onLanguageChange('es')}
        >
          ES
        </button>
      </div>
      <div className="float-pill" role="group" aria-label="Theme">
        <button
          type="button"
          className="float-seg"
          aria-pressed={theme === 'light'}
          aria-label="Light theme"
          onClick={() => onThemeChange('light')}
        >
          ☀
        </button>
        <button
          type="button"
          className="float-seg"
          aria-pressed={theme === 'dark'}
          aria-label="Dark theme"
          onClick={() => onThemeChange('dark')}
        >
          ☾
        </button>
      </div>
    </div>
  );
};

export default FloatingControls;
```

- [ ] **Step 2: Run build**

Run: `npm run build`
Expected: completes successfully.

- [ ] **Step 3: Commit**

```bash
git add src/components/FloatingControls.tsx
git commit -m "feat(redesign): add FloatingControls (language + theme glass pills)"
```

**Phase 1 checkpoint:** all foundation primitives are in place but not yet rendered by `App.tsx`. The site in `npm run dev` looks broken (old CSS classes are gone). That's expected — we ship the new shell in Phase 4.

---

## Phase 2: Bento card components

Each task here produces one card-shaped component. None are wired into `App.tsx` yet.

### Task 8: Add `src/components/TrustCard.tsx`

**Files:**
- Create: `src/components/TrustCard.tsx`

- [ ] **Step 1: Create the component**

Write `src/components/TrustCard.tsx`:

```tsx
import GlassCard from './GlassCard';
import { trustEarned, type LanguageKey } from '../data/profile';

interface TrustCardProps {
  language: LanguageKey;
  delay?: number;
}

const TrustCard = ({ language, delay = 0 }: TrustCardProps) => {
  const t = trustEarned[language];
  return (
    <GlassCard span="sm" delay={delay} className="small-card">
      <p className="label">{t.label}</p>
      <p className="display small-display">{t.display}</p>
      <p className="small-sub">{t.sub}</p>
    </GlassCard>
  );
};

export default TrustCard;
```

- [ ] **Step 2: Run build**

Run: `npm run build`
Expected: completes successfully.

- [ ] **Step 3: Commit**

```bash
git add src/components/TrustCard.tsx
git commit -m "feat(redesign): add TrustCard bento card"
```

---

### Task 9: Add `src/components/StackCard.tsx`

**Files:**
- Create: `src/components/StackCard.tsx`

- [ ] **Step 1: Create the component**

Write `src/components/StackCard.tsx`:

```tsx
import GlassCard from './GlassCard';
import { skills, type LanguageKey } from '../data/profile';

interface StackCardProps {
  language: LanguageKey;
  delay?: number;
}

const STACK_LABEL: Record<LanguageKey, string> = {
  en: 'Core stack',
  es: 'Stack principal',
};

const StackCard = ({ language, delay = 0 }: StackCardProps) => {
  const items = skills[language].primary.slice(0, 6);
  return (
    <GlassCard span="sm" delay={delay} className="small-card">
      <p className="label">{STACK_LABEL[language]}</p>
      <div>
        {items.map((item) => (
          <span key={item} className="chip">
            {item}
          </span>
        ))}
      </div>
    </GlassCard>
  );
};

export default StackCard;
```

- [ ] **Step 2: Run build**

Run: `npm run build`
Expected: completes successfully.

- [ ] **Step 3: Commit**

```bash
git add src/components/StackCard.tsx
git commit -m "feat(redesign): add StackCard bento card"
```

---

### Task 10: Add `src/components/NowCard.tsx`

**Files:**
- Create: `src/components/NowCard.tsx`

- [ ] **Step 1: Create the component**

Write `src/components/NowCard.tsx`:

```tsx
import GlassCard from './GlassCard';
import type { LanguageKey } from '../data/profile';

interface NowCardProps {
  language: LanguageKey;
  delay?: number;
}

const NOW_LABEL: Record<LanguageKey, string> = {
  en: 'Now',
  es: 'Ahora',
};

const NOW_SUMMARY: Record<LanguageKey, string> = {
  en: 'Software Dev Analyst @ Bantotal — optimizing core-banking services.',
  es: 'Analista de Desarrollo @ Bantotal — optimizando servicios de core bancario.',
};

const NowCard = ({ language, delay = 0 }: NowCardProps) => {
  return (
    <GlassCard span="sm" delay={delay} className="small-card">
      <p className="label">{NOW_LABEL[language]}</p>
      <p className="body">
        <span className="pulse-dot" aria-hidden="true" />
        {NOW_SUMMARY[language]}
      </p>
    </GlassCard>
  );
};

export default NowCard;
```

- [ ] **Step 2: Run build**

Run: `npm run build`
Expected: completes successfully.

- [ ] **Step 3: Commit**

```bash
git add src/components/NowCard.tsx
git commit -m "feat(redesign): add NowCard with pulsing dot"
```

---

### Task 11: Rewrite `src/sections/HeroSection.tsx`

**Files:**
- Modify (full rewrite): `src/sections/HeroSection.tsx`

- [ ] **Step 1: Replace the file contents**

Write `src/sections/HeroSection.tsx`:

```tsx
import GlassCard from '../components/GlassCard';
import { cvFiles, heroContent, type LanguageKey } from '../data/profile';

interface HeroSectionProps {
  language: LanguageKey;
}

const META: Record<LanguageKey, { meta: string; cv: string; email: string; tag: string }> = {
  en: {
    meta: 'Backend developer · Montevideo · UTC-3',
    cv: 'Download CV',
    email: 'Email me',
    tag: 'A backend engineer who measures things.',
  },
  es: {
    meta: 'Desarrollador backend · Montevideo · UTC-3',
    cv: 'Descargar CV',
    email: 'Escribime',
    tag: 'Un ingeniero backend que mide lo que hace.',
  },
};

const HeroSection = ({ language }: HeroSectionProps) => {
  const c = heroContent[language];
  const t = META[language];
  return (
    <GlassCard span="xl" delay={0} className="hero-card" hoverLift={false}>
      <p className="label">{t.meta}</p>
      <h1 className="display hero-name">{c.name}</h1>
      <p className="display-italic hero-tag">{t.tag}</p>
      <p className="body hero-summary">{c.summary}</p>
      <div className="hero-ctas">
        <a className="btn btn-primary" href={cvFiles[language]} download>
          {t.cv}
        </a>
        <a className="btn btn-secondary" href="#contact">
          {t.email}
        </a>
      </div>
    </GlassCard>
  );
};

export default HeroSection;
```

- [ ] **Step 2: Run build**

Run: `npm run build`
Expected: completes successfully.

- [ ] **Step 3: Commit**

```bash
git add src/sections/HeroSection.tsx
git commit -m "feat(redesign): rewrite HeroSection as a 4x2 glass card"
```

---

### Task 12: Rewrite `src/components/ProjectCard.tsx`

**Files:**
- Modify (full rewrite): `src/components/ProjectCard.tsx`

- [ ] **Step 1: Replace the file contents**

Write `src/components/ProjectCard.tsx`:

```tsx
import GlassCard from './GlassCard';
import ProjectLinks from './ProjectLinks';
import type { LanguageKey, ProjectLink } from '../data/profile';

interface Project {
  name: string;
  stack: string;
  highlights: string[];
  links?: ProjectLink;
}

interface ProjectCardProps {
  project: Project;
  language: LanguageKey;
  delay?: number;
}

const PROJECT_LABEL: Record<LanguageKey, string> = {
  en: 'Project',
  es: 'Proyecto',
};

const ProjectCard = ({ project, language, delay = 0 }: ProjectCardProps) => {
  return (
    <GlassCard span="sm" delay={delay} className="project-card">
      <p className="label">{PROJECT_LABEL[language]}</p>
      <h3 className="project-name">{project.name}</h3>
      <p className="project-stack">{project.stack}</p>
      <ul className="project-highlights">
        {project.highlights.slice(0, 2).map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      {project.links && (
        <ProjectLinks
          language={language}
          repo={project.links.repo}
          demo={project.links.demo}
          video={project.links.video}
        />
      )}
    </GlassCard>
  );
};

export default ProjectCard;
```

Note: the `featured` prop is gone — the Cleta card (formerly the "featured" one) gets its own dedicated component in Task 14. Small project cards show up to two highlights so they fit the `2×1` span.

- [ ] **Step 2: Run build**

Run: `npm run build`
Expected: completes successfully.

- [ ] **Step 3: Commit**

```bash
git add src/components/ProjectCard.tsx
git commit -m "feat(redesign): restyle ProjectCard for 2x1 glass span"
```

---

### Task 13: Restyle `src/components/ProjectLinks.tsx`

**Files:**
- Modify (full rewrite): `src/components/ProjectLinks.tsx`

- [ ] **Step 1: Replace the file contents**

Write `src/components/ProjectLinks.tsx`:

```tsx
import type { LanguageKey } from '../data/profile';

interface ProjectLinksProps {
  language: LanguageKey;
  repo?: string;
  demo?: string;
  video?: string;
}

const LABELS: Record<LanguageKey, { repo: string; demo: string; video: string }> = {
  en: { repo: 'Repo', demo: 'Live', video: 'Video' },
  es: { repo: 'Código', demo: 'Demo', video: 'Video' },
};

const ProjectLinks = ({ language, repo, demo, video }: ProjectLinksProps) => {
  const t = LABELS[language];
  if (!repo && !demo && !video) return null;

  return (
    <div className="project-links">
      {repo && (
        <a className="project-link" href={repo} target="_blank" rel="noreferrer">
          {t.repo}
        </a>
      )}
      {demo && (
        <a className="project-link" href={demo} target="_blank" rel="noreferrer">
          {t.demo} ↗
        </a>
      )}
      {video && (
        <a className="project-link" href={video} target="_blank" rel="noreferrer">
          {t.video} ▶
        </a>
      )}
    </div>
  );
};

export default ProjectLinks;
```

- [ ] **Step 2: Run build**

Run: `npm run build`
Expected: completes successfully.

- [ ] **Step 3: Commit**

```bash
git add src/components/ProjectLinks.tsx
git commit -m "refactor(redesign): simplify ProjectLinks (chip-style, glyph as suffix)"
```

---

### Task 14: Add Cleta card and rewrite `src/sections/ProjectsSection.tsx`

**Files:**
- Create: `src/components/CletaCard.tsx`
- Modify (full rewrite): `src/sections/ProjectsSection.tsx`

- [ ] **Step 1: Create `src/components/CletaCard.tsx`**

```tsx
import GlassCard from './GlassCard';
import YoutubeEmbed from './YoutubeEmbed';
import type { ProjectLink } from '../data/profile';

interface CletaCardProps {
  name: string;
  stack: string;
  links?: ProjectLink;
  delay?: number;
}

const CletaCard = ({ name, stack, links, delay = 0 }: CletaCardProps) => {
  const shortTitle = name.split('—')[0].trim();
  return (
    <GlassCard span="xl" delay={delay} className="cleta-card" hoverLift={false}>
      {links?.video && <YoutubeEmbed url={links.video} title={name} />}
      <div className="cleta-meta">
        <div className="cleta-title">{shortTitle}</div>
        <div className="cleta-sub">{stack}</div>
      </div>
    </GlassCard>
  );
};

export default CletaCard;
```

- [ ] **Step 2: Replace `src/sections/ProjectsSection.tsx`**

```tsx
import CletaCard from '../components/CletaCard';
import ProjectCard from '../components/ProjectCard';
import { projects, type LanguageKey } from '../data/profile';

interface ProjectsSectionProps {
  language: LanguageKey;
}

const ProjectsSection = ({ language }: ProjectsSectionProps) => {
  const items = projects[language];
  const [cleta, ...rest] = items;
  return (
    <>
      <CletaCard
        name={cleta.name}
        stack={cleta.stack}
        links={cleta.links}
        delay={0.1}
      />
      {rest.slice(0, 3).map((project, i) => (
        <ProjectCard
          key={project.name}
          project={project}
          language={language}
          delay={0.15 + i * 0.05}
        />
      ))}
    </>
  );
};

export default ProjectsSection;
```

- [ ] **Step 3: Run build**

Run: `npm run build`
Expected: completes successfully.

- [ ] **Step 4: Commit**

```bash
git add src/components/CletaCard.tsx src/sections/ProjectsSection.tsx
git commit -m "feat(redesign): add CletaCard + emit 4 project cards from ProjectsSection"
```

---

### Task 15: Rewrite `src/sections/SkillsSection.tsx`

**Files:**
- Modify (full rewrite): `src/sections/SkillsSection.tsx`

- [ ] **Step 1: Replace the file contents**

Write `src/sections/SkillsSection.tsx`:

```tsx
import GlassCard from '../components/GlassCard';
import { skills, type LanguageKey } from '../data/profile';

interface SkillsSectionProps {
  language: LanguageKey;
}

const TITLE: Record<LanguageKey, { label: string; title: string }> = {
  en: { label: 'Skills', title: 'What I reach for' },
  es: { label: 'Habilidades', title: 'Con lo que trabajo' },
};

const SkillsSection = ({ language }: SkillsSectionProps) => {
  const groups = skills[language].groups;
  const t = TITLE[language];
  return (
    <GlassCard span="xl" delay={0.05} className="skills-card">
      <p className="label">{t.label}</p>
      <p className="display skills-title">{t.title}</p>
      <div className="skills-grid">
        {groups.map((g) => (
          <div key={g.group} className="skills-group">
            <div className="italic-key skills-group-label">{g.group.toLowerCase()}</div>
            <div>
              {g.items.map((item) => (
                <span key={item} className="chip">
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
};

export default SkillsSection;
```

- [ ] **Step 2: Run build**

Run: `npm run build`
Expected: completes successfully.

- [ ] **Step 3: Commit**

```bash
git add src/sections/SkillsSection.tsx
git commit -m "feat(redesign): rewrite SkillsSection as a 4x2 glass card"
```

**Phase 2 checkpoint:** all bento card components exist. The next phase covers below-bento sections.

---

## Phase 3: Below-bento sections

### Task 16: Rewrite `src/sections/ExperienceSection.tsx`

**Files:**
- Modify (full rewrite): `src/sections/ExperienceSection.tsx`

- [ ] **Step 1: Replace the file contents**

Write `src/sections/ExperienceSection.tsx`:

```tsx
import GlassCard from '../components/GlassCard';
import { experience, type LanguageKey } from '../data/profile';

interface ExperienceSectionProps {
  language: LanguageKey;
}

const TITLE: Record<LanguageKey, string> = {
  en: 'Experience',
  es: 'Experiencia',
};

const ExperienceSection = ({ language }: ExperienceSectionProps) => {
  const items = experience[language];
  return (
    <GlassCard span="xl" className="section-block experience-block" hoverLift={false}>
      <h2 className="section-title">{TITLE[language]}</h2>
      <ul className="experience-list">
        {items.map((item) => (
          <li key={item.company + item.role} className="experience-item">
            <p className="exp-role">
              {item.company} · <span className="display-italic">{item.role}</span>
            </p>
            <p className="exp-meta">{item.duration}</p>
            <ul className="exp-highlights">
              {item.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </GlassCard>
  );
};

export default ExperienceSection;
```

Note: the section uses `GlassCard` with `span="xl"` purely for the surface treatment — when rendered inside the `.below-bento` flex container, `grid-column` rules don't apply. The `.section-block` class provides the inner padding.

- [ ] **Step 2: Run build**

Run: `npm run build`
Expected: completes successfully.

- [ ] **Step 3: Commit**

```bash
git add src/sections/ExperienceSection.tsx
git commit -m "feat(redesign): rewrite ExperienceSection as below-bento glass block"
```

---

### Task 17: Add `src/sections/EducationCertsSection.tsx`

**Files:**
- Create: `src/sections/EducationCertsSection.tsx`

- [ ] **Step 1: Create the merged section**

Write `src/sections/EducationCertsSection.tsx`:

```tsx
import GlassCard from '../components/GlassCard';
import { certifications, education, type LanguageKey } from '../data/profile';

interface EducationCertsSectionProps {
  language: LanguageKey;
}

const TITLE: Record<LanguageKey, string> = {
  en: 'Education & credentials',
  es: 'Educación y credenciales',
};

const EducationCertsSection = ({ language }: EducationCertsSectionProps) => {
  const ed = education[language];
  const c = certifications[language];
  return (
    <GlassCard span="xl" className="section-block" hoverLift={false}>
      <h2 className="section-title">{TITLE[language]}</h2>
      <div className="eduCerts-grid">
        <div>
          {ed.map((e) => (
            <div key={e.school}>
              <h3 className="school-name">{e.school}</h3>
              <p className="school-degree">{e.degree}</p>
              <p className="school-meta">{e.duration}</p>
            </div>
          ))}
        </div>
        <div>
          <p className="label">{c.certLabel}</p>
          <ul className="cert-list">
            {c.certs.map((cert) => (
              <li key={cert}>{cert}</li>
            ))}
          </ul>
          <p className="lang-inline">
            <span className="lang-key">{c.langLabel.toLowerCase()}</span>
            {c.languages.map((l, i) => (
              <span key={l.name}>
                {i > 0 && ' · '}
                {l.name} {l.level}
              </span>
            ))}
          </p>
        </div>
      </div>
    </GlassCard>
  );
};

export default EducationCertsSection;
```

- [ ] **Step 2: Run build**

Run: `npm run build`
Expected: completes successfully.

- [ ] **Step 3: Commit**

```bash
git add src/sections/EducationCertsSection.tsx
git commit -m "feat(redesign): add EducationCertsSection (Education + Certs + Languages merged)"
```

---

### Task 18: Restyle `src/components/GithubStrip.tsx`

**Files:**
- Modify (full rewrite): `src/components/GithubStrip.tsx`

- [ ] **Step 1: Replace the file contents**

Write `src/components/GithubStrip.tsx`:

```tsx
import GlassCard from './GlassCard';
import { useGithubProjects } from '../hooks/useGithubProjects';
import type { LanguageKey } from '../data/profile';

interface GithubStripProps {
  username: string;
  language: LanguageKey;
  excludeNames?: string[];
  limit?: number;
}

const LABELS: Record<LanguageKey, { header: string; loading: string; empty: string }> = {
  en: { header: 'More from GitHub', loading: 'fetching repos…', empty: 'no public repos' },
  es: { header: 'Más en GitHub', loading: 'cargando repos…', empty: 'sin repos públicos' },
};

const GithubStrip = ({ username, language, excludeNames = [], limit = 6 }: GithubStripProps) => {
  const { repos, loading, error } = useGithubProjects(username, { limit, excludeNames });
  const t = LABELS[language];

  if (error && repos.length === 0) return null;

  return (
    <GlassCard span="xl" className="section-block" hoverLift={false}>
      <h2 className="section-title">{t.header}</h2>
      {loading && repos.length === 0 ? (
        <p className="body body-muted">{t.loading}</p>
      ) : repos.length === 0 ? (
        <p className="github-empty">{t.empty}</p>
      ) : (
        <ul className="github-strip-cards">
          {repos.map((repo) => (
            <li key={repo.id}>
              <a
                className="github-strip-card"
                href={repo.html_url}
                target="_blank"
                rel="noreferrer"
              >
                <span className="gh-name">{repo.name}</span>
                {repo.description && <span className="gh-desc">{repo.description}</span>}
                <span className="gh-meta">
                  {repo.language && <span>{repo.language}</span>}
                  <span aria-label={`${repo.stargazers_count} stars`}>
                    ★ {repo.stargazers_count}
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </GlassCard>
  );
};

export default GithubStrip;
```

- [ ] **Step 2: Run build**

Run: `npm run build`
Expected: completes successfully.

- [ ] **Step 3: Commit**

```bash
git add src/components/GithubStrip.tsx
git commit -m "refactor(redesign): restyle GithubStrip as glass below-bento block"
```

---

### Task 19: Rewrite `src/sections/ContactSection.tsx`

**Files:**
- Modify (full rewrite): `src/sections/ContactSection.tsx`

- [ ] **Step 1: Replace the file contents**

Write `src/sections/ContactSection.tsx`:

```tsx
import { useState } from 'react';
import GlassCard from '../components/GlassCard';
import { contact, type LanguageKey } from '../data/profile';

interface ContactSectionProps {
  language: LanguageKey;
}

const TITLE: Record<LanguageKey, string> = {
  en: 'Get in touch',
  es: 'Conversemos',
};

const COPY_LABELS: Record<LanguageKey, { idle: string; copied: string }> = {
  en: { idle: 'Copy email', copied: 'Copied ✓' },
  es: { idle: 'Copiar correo', copied: 'Copiado ✓' },
};

const ContactSection = ({ language }: ContactSectionProps) => {
  const c = contact[language];
  const t = TITLE[language];
  const copy = COPY_LABELS[language];
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(c.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${c.email}`;
    }
  };

  return (
    <GlassCard span="xl" id="contact" className="section-block contact-block" hoverLift={false}>
      <h2 className="section-title">{t}</h2>
      <p className="display contact-email">{c.email}</p>
      <p className="contact-blurb">{c.blurb}</p>
      <div className="contact-actions">
        <button type="button" className="btn btn-primary" onClick={handleCopy}>
          {copied ? copy.copied : copy.idle}
        </button>
        <a className="btn btn-secondary" href={`mailto:${c.email}`}>
          {c.emailLabel}
        </a>
      </div>
      <div className="contact-social">
        {c.social.map((s) => (
          <a key={s.label} href={s.url} target="_blank" rel="noreferrer">
            {s.label}
          </a>
        ))}
      </div>
      <p className="contact-response">{c.responseTime}</p>
    </GlassCard>
  );
};

export default ContactSection;
```

- [ ] **Step 2: Run build**

Run: `npm run build`
Expected: completes successfully.

- [ ] **Step 3: Commit**

```bash
git add src/sections/ContactSection.tsx
git commit -m "feat(redesign): rewrite ContactSection as below-bento glass block"
```

**Phase 3 checkpoint:** all sections are restyled. Next phase wires them into `App.tsx`.

---

## Phase 4: App shell + cleanup

### Task 20: Rewrite `src/App.tsx`

**Files:**
- Modify (full rewrite): `src/App.tsx`

- [ ] **Step 1: Replace the file contents**

Write `src/App.tsx`:

```tsx
import { useState } from 'react';

import BackgroundMesh from './components/BackgroundMesh';
import FloatingControls from './components/FloatingControls';
import GithubStrip from './components/GithubStrip';
import NowCard from './components/NowCard';
import StackCard from './components/StackCard';
import TrustCard from './components/TrustCard';
import ContactSection from './sections/ContactSection';
import EducationCertsSection from './sections/EducationCertsSection';
import ExperienceSection from './sections/ExperienceSection';
import HeroSection from './sections/HeroSection';
import ProjectsSection from './sections/ProjectsSection';
import SkillsSection from './sections/SkillsSection';
import { useTheme } from './hooks/useTheme';
import type { LanguageKey } from './data/profile';

const GITHUB_USERNAME = 'Riloox';
const CURATED_REPO_NAMES = [
  'RilooxDB',
  'windows11debloater2024',
  'AFK-Timeskip-for-SMP-1.21',
  'personalWebpage',
];

const App = () => {
  const [language, setLanguage] = useState<LanguageKey>('en');
  const { theme, setTheme } = useTheme();

  return (
    <>
      <BackgroundMesh />
      <FloatingControls
        language={language}
        onLanguageChange={setLanguage}
        theme={theme}
        onThemeChange={setTheme}
      />
      <main className="app-shell">
        <section className="bento">
          <HeroSection language={language} />
          <TrustCard language={language} delay={0.05} />
          <StackCard language={language} delay={0.10} />
          <ProjectsSection language={language} />
          <NowCard language={language} delay={0.20} />
          <SkillsSection language={language} />
        </section>
        <div className="below-bento">
          <ExperienceSection language={language} />
          <EducationCertsSection language={language} />
          <GithubStrip
            username={GITHUB_USERNAME}
            language={language}
            excludeNames={CURATED_REPO_NAMES}
            limit={6}
          />
          <ContactSection language={language} />
        </div>
      </main>
    </>
  );
};

export default App;
```

Note on order in the bento: the JSX order is `Hero, Trust, Stack, [Cleta + 3 project cards], Now, Skills`. The `ProjectsSection` emits four cards as a fragment (`<CletaCard />` then three `<ProjectCard />`s), so visually the bento flows: Hero (4×2), Trust (2×1), Stack (2×1), Cleta (4×2), then 3 small project cards (2×1 each) interleaved with Now (2×1), then Skills (4×2). CSS grid auto-placement fills rows; the result matches the approved bento-v3 mockup.

- [ ] **Step 2: Run build**

Run: `npm run build`
Expected: completes successfully.

- [ ] **Step 3: Commit**

```bash
git add src/App.tsx
git commit -m "feat(redesign): rewrite App shell — bento grid + below-bento sections"
```

- [ ] **Step 4: Smoke test in dev**

Run: `npm run dev`
Open the printed URL in a browser. Verify:

- Background mesh + dot grid visible.
- Floating top-right controls render. Clicking `ES` switches all text. Clicking `☾` flips the theme; reloading the page persists the theme.
- Bento renders: Hero (large), Trust, Stack, Cleta (large with YouTube thumbnail — click to play), 3 small project cards, Now (with pulsing dot), Skills (large).
- Below the bento: Experience timeline, Education+Certs+Languages, GitHub strip (loads repos after ~1s), Contact with working "Copy email" button.
- "Email me" CTA in the hero scrolls to the Contact section.
- "Download CV" CTA downloads `cv.pdf` (EN) or `cv-es.pdf` (ES).

If any of these fail, stop and investigate before moving to Task 21.

---

### Task 21: Delete retired files and the `availability` shim

**Files:**
- Delete: `src/components/BentoCard.tsx`
- Delete: `src/components/StatusCard.tsx`
- Delete: `src/components/MetricCard.tsx`
- Delete: `src/sections/EducationSection.tsx`
- Delete: `src/sections/CertificationsSection.tsx`
- Modify: `src/data/profile.ts` (remove the `availability` shim added in Task 3)

- [ ] **Step 1: Verify no remaining imports of the doomed files**

Run these checks one at a time and confirm each returns no results:

```bash
git grep -n "from '.*BentoCard'"
git grep -n "from '.*StatusCard'"
git grep -n "from '.*MetricCard'"
git grep -n "from '.*EducationSection'"
git grep -n "from '.*CertificationsSection'"
```

(Replace `git grep` with `findstr /S /N` on PowerShell if `git grep` is not available: `findstr /S /N "BentoCard" src\\*.tsx src\\*.ts`.)

If any reference shows up, fix the importer before deleting.

- [ ] **Step 2: Delete the files**

```bash
git rm src/components/BentoCard.tsx
git rm src/components/StatusCard.tsx
git rm src/components/MetricCard.tsx
git rm src/sections/EducationSection.tsx
git rm src/sections/CertificationsSection.tsx
```

- [ ] **Step 3: Remove the `availability` shim from `profile.ts`**

In `src/data/profile.ts`, delete the entire `availability` export that was kept as a temporary shim in Task 3. The whole block looks like:

```ts
/** @deprecated Removed in the redesign. Temporary shim — delete in Task 21. */
export const availability: Record<
  LanguageKey,
  { open: boolean; label: string; location: string; timezone: string; cvFile: string }
> = {
  en: { open: true, label: '', location: '', timezone: '', cvFile: cvFiles.en },
  es: { open: true, label: '', location: '', timezone: '', cvFile: cvFiles.es },
};
```

Delete it. The file should now export only: `LanguageKey`, `cvFiles`, `trustEarned`, `heroContent`, `skills`, `experience`, `ProjectLink`, `projects`, `education`, `certifications`, `contact`.

- [ ] **Step 4: Run build**

Run: `npm run build`
Expected: completes successfully. If the build fails, a consumer of `availability` was missed — search for it (`git grep availability`) and update or remove that reference.

- [ ] **Step 5: Commit**

```bash
git add src/data/profile.ts
git commit -m "chore(redesign): delete retired terminal components + availability shim"
```

---

### Task 22: Final smoke test and polish pass

**Files:** none changed in this task unless polish is needed.

- [ ] **Step 1: Final dev smoke test**

Run: `npm run dev`

Walk through this checklist in the browser and tick each one mentally:

1. ☐ Page loads without console errors.
2. ☐ Background mesh + dot grid visible at all scroll positions.
3. ☐ Two floating glass pills visible top-right; both segmented buttons work (`EN/ES`, `☀/☾`).
4. ☐ Theme toggle: switching changes colors instantly, no flash; reload persists the choice; first-load on a new browser respects system preference.
5. ☐ Hero card occupies the top-left area, 4 columns wide, 2 rows tall.
6. ☐ Trust card and Stack card sit on the right of the Hero (2 cols each).
7. ☐ Cleta card occupies a 4×2 area with the YouTube thumbnail; clicking the play button loads the iframe and auto-plays.
8. ☐ Three small project cards visible (RilooxDB, Win11 Debloater, AFK Timeskip).
9. ☐ Now card shows a pulsing green dot.
10. ☐ Skills card occupies a 4×2 area with two columns of grouped chips.
11. ☐ Below the bento, in order: Experience block, Education & credentials block, More from GitHub block (live repos), Get in touch block.
12. ☐ "Copy email" button shows "Copied ✓" briefly when clicked.
13. ☐ Hero "Email me" CTA scrolls to the Contact section.
14. ☐ Hero "Download CV" CTA downloads the language-appropriate PDF (`/cv.pdf` for EN, `/cv-es.pdf` for ES).
15. ☐ Resize the window to ~1000px wide: bento collapses to 4 columns, large cards still span 4.
16. ☐ Resize to ~500px wide: bento collapses to 2 columns; Hero and large cards span 2; small project cards become single-column.
17. ☐ Hover over a small card — it lifts slightly (does NOT apply to Hero, Cleta, or below-bento blocks).
18. ☐ DevTools → Rendering → "Emulate CSS prefers-reduced-motion: reduce": reveal-on-scroll and hover-lift are disabled; pulsing dot stops.

- [ ] **Step 2: Production build smoke test**

Run: `npm run build && npm run preview`
Open the preview URL. Confirm the same checklist as Step 1 against the production bundle.

- [ ] **Step 3: Address any polish issues found**

Common likely fixes (do these only if needed, commit each separately):

- Tweak `min-height` on Cleta card if the thumbnail height looks wrong at mobile widths.
- Adjust bento card delays in `App.tsx` if the reveal stagger looks off.
- Adjust `--mesh-*` opacities in `src/index.css` if the dark theme mesh is too loud or too subtle.

If no fixes needed, this task ends here.

- [ ] **Step 4: Final verification commit (optional)**

If you made polish changes, commit them:

```bash
git commit -am "polish(redesign): <describe the tweak>"
```

If no polish was needed, no commit.

---

## Phase 5: Merge

### Task 23: Merge to main

**Files:** none.

- [ ] **Step 1: Confirm working tree is clean**

Run: `git status`
Expected: clean working tree, branch `redesign/editorial-bento` ahead of `main` by 20+ commits.

- [ ] **Step 2: Switch to main and merge**

Run:

```bash
git checkout main
git merge --no-ff redesign/editorial-bento -m "Merge redesign/editorial-bento: editorial-warm bento redesign"
```

Expected: clean fast-forward-style merge (no conflicts, since the redesign is the only branch that touched these files).

- [ ] **Step 3: Final build on main**

Run: `npm run build`
Expected: completes successfully.

- [ ] **Step 4: Push and deploy**

Ask the user before pushing or deploying — those are remote-affecting actions outside the scope of this plan.

---

## Self-review notes

The plan covers every requirement in `docs/superpowers/specs/2026-05-16-portfolio-redesign-design.md`:

- Visual system (Task 2 — index.css)
- `useTheme` hook (Task 4) — includes `localStorage`, `prefers-color-scheme`, and `theme-color` meta update
- `BackgroundMesh`, `GlassCard`, `FloatingControls` primitives (Tasks 5–7)
- Bento composition: Hero, Trust, Stack, Cleta, Now, 3 small projects, Skills (Tasks 8–15)
- Below-bento sections: Experience, Education+Certs, GitHub strip, Contact (Tasks 16–19)
- App shell wired up (Task 20)
- Retired files deleted (Task 21)
- Final smoke test against acceptance criteria (Task 22)
- Branch merge (Task 23)

Spec content additions (Trust card content, `cvFiles`) are added in Task 3. The `~20%` latency cut continues to render via the unchanged `heroContent.summary` and `experience[].highlights` from `profile.ts` — no separate stat card per the spec.

Removed in the redesign: `availability` (Task 3 + final removal Task 21), `BentoCard` / `StatusCard` / `MetricCard` (Task 21), old `EducationSection` + `CertificationsSection` (Task 21).

Type consistency check: `LanguageKey` is the existing type and is reused everywhere. `GlassCardSpan = 'sm' | 'md' | 'lg' | 'xl'` defined in Task 6 and consumed by Tasks 8–19. `Theme = 'light' | 'dark'` defined in Task 4 and consumed by Task 7 / Task 20. `cvFiles` and `trustEarned` defined in Task 3 and consumed in Tasks 8 and 11.

No placeholders (`TBD`, `TODO`, vague handwaving) in any task.
