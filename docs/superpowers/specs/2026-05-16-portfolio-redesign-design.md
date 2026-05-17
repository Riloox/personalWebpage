1dw# Portfolio Redesign — Editorial-Warm Bento (Framer Aesthetic)

**Date:** 2026-05-16
**Status:** Approved, ready for implementation planning
**Author:** Federico Prunell (with Claude)

## Goal

Replace the current terminal-themed portfolio at `riloox.site` with a redesign that:

- Looks more professional to non-engineer recruiters (the current terminal aesthetic reads as gimmicky).
- Feels fresh and current (the user is visually tired of the terminal look).
- Is easier to scan than the current dense bento (less monospace, more whitespace and hierarchy).
- Keeps the bento grid pattern but executes it in a 2024–2025 Framer-style aesthetic: glassmorphic cards, soft neumorphic shadows, editorial typography, kinetic micro-animations.

Content, bilingual support, and the underlying React + Vite architecture are preserved. This is primarily a visual rewrite with a small handful of content additions and removals.

## Scope

### In scope

- Full rewrite of `src/index.css` (terminal theme out, editorial-warm theme in).
- Replacement of the terminal-chrome `BentoCard` with a glass-surface primitive.
- Bento grid restructured (6-column desktop) with a defined card composition.
- Long-form sections (Experience, Education + Certifications, GitHub strip, Contact) restyled and moved below the bento.
- New floating top-right control cluster (`EN`/`ES` and `☀`/`☾`).
- Light + dark theme support with manual toggle (`localStorage` persistence, initial read of `prefers-color-scheme`).
- Reveal-on-scroll motion via existing `motion/react`; hover-lift on cards; pulsing "Now" dot.
- Updated `index.html` font links and `theme-color` meta.

### Out of scope

- Content rewrites beyond the Trust card content addition (Hero copy, Experience bullets, Project descriptions all kept as-is from `profile.ts`).
- Adding a blog, a new route, or any new top-level page.
- Any backend, API, or analytics changes.
- New external dependencies.
- Reviving the "Open to work" badge.

## Design choices (approved)

| Decision | Value |
|---|---|
| Visual direction | Editorial / warm, Framer-bento aesthetic |
| Display font | Instrument Serif (already loaded) |
| Body / UI font | Inter (`400;500;600;700`) — replaces JetBrains Mono |
| Primary background | `#f5f1ea` warm paper (light) / `#16120e` warm near-black (dark) |
| Card surface | Glassmorphism (frosted, blurred) + soft neumorphic shadows |
| Layout shell | Bento grid (6-col desktop) followed by full-width long-form sections |
| Navigation | None. Two floating glass pills top-right: language and theme |
| Bilingual | EN / ES toggle preserved (drives `language` state in `App.tsx`) |
| Dark mode | Manual light/dark toggle, persisted in `localStorage`, initial from `prefers-color-scheme` |
| GitHub strip | Kept, restyled, labeled "More from GitHub" |
| YouTube embed | Kept on the Cleta card (click-to-load thumbnail → `youtube-nocookie` iframe) |
| "Open to work" badge | Removed |
| Status card | Removed (controls move to `FloatingControls`) |
| Metric card | Removed (the `~20%` win folds into Hero body copy and Experience bullets) |
| Trust card | New (replaces the standalone latency stat card) |

## Visual system

### Colors

**Light (default):**

- `--bg-canvas`: `#f5f1ea`
- Background mesh: three radial gradients overlaid on the canvas:
  - Top-left: `radial-gradient(at 12% 18%, rgba(220, 180, 140, 0.45), transparent 55%)` (amber)
  - Top-right: `radial-gradient(at 88% 8%, rgba(180, 200, 220, 0.35), transparent 50%)` (cool blue)
  - Bottom-center: `radial-gradient(at 50% 95%, rgba(200, 170, 220, 0.30), transparent 55%)` (lavender)
- Dot grid overlay: `radial-gradient(circle at 1px 1px, rgba(26,24,21,0.05) 1px, transparent 0)` at `18px` intervals, `0.6` opacity.
- `--glass-fill`: `rgba(255, 250, 240, 0.55)`
- `--glass-border`: `rgba(255, 255, 255, 0.65)`
- `--ink`: `#1a1815` (primary text + primary button bg)
- `--ink-muted`: `#6b5d4a` (secondary text)
- `--ink-meta`: `#8a7860` (labels, italic keys)
- `--chip-fill`: `rgba(255, 255, 255, 0.45)`
- `--chip-text`: `#4a3f2f`

**Dark:**

- `--bg-canvas`: `#16120e`
- Background mesh: same three positions, darker richer tones (deep amber, indigo, plum) at 20–30% opacity over the dark base.
- Dot grid overlay: `rgba(244, 234, 216, 0.04)` (lighter dots on dark).
- `--glass-fill`: `rgba(40, 32, 24, 0.5)`
- `--glass-border`: `rgba(255, 230, 200, 0.10)`
- `--ink`: `#f4ead8`
- `--ink-muted`: `#bfa888`
- `--ink-meta`: `#8a7860`
- `--chip-fill`: `rgba(255, 230, 200, 0.06)`
- `--chip-text`: `#d9c9ab`

Theme is toggled via `[data-theme="dark"]` on `<html>`. All color references in the CSS are via custom properties.

### Typography

- Display (Instrument Serif): hero name `44px / 1.0`; card title `22–28px / 1.05`; italic tag `14px italic`.
- Body (Inter): `12.5–13px / 1.55`.
- Label (Inter, uppercase): `10px`, `letter-spacing: 0.12em`.
- Italic-key (Instrument Serif italic): `11px`, used for small editorial keys like `stack`, `replies`.

### Spacing & radius

- Card padding: `18–28px` (smaller cards at the low end; hero / large cards at the high end).
- Card radius: `18px`.
- Pills + chips: `999px`.
- Buttons: `10px`.
- Canvas frame radius: `12px`.
- Bento gap: `14px`.

### Shadow & glass treatment

Each glass card composites four shadows:

- Inset top highlight: `inset 0 1px 0 rgba(255, 255, 255, 0.7)`
- Inset bottom warm line: `inset 0 -1px 0 rgba(180, 150, 100, 0.08)`
- Outer warm shadow: `0 10px 30px rgba(80, 60, 30, 0.08)`
- Soft secondary: `0 2px 6px rgba(80, 60, 30, 0.04)`

Each card has an `::after` pseudo-element with a `linear-gradient(to bottom, rgba(255,255,255,0.25), transparent)` covering the top 50% — the glossy glass top.

Backdrop: `backdrop-filter: blur(22px) saturate(140%)` on the card; `blur(20px) saturate(140%)` on the floating pills.

### Motion

- Easing: `cubic-bezier(0.22, 1, 0.36, 1)`.
- Durations: fast `180ms`, default `380ms`, slow `700ms`.
- Reveal-on-scroll: cards translate up `12px` and fade `0 → 1`, staggered ~`80ms` per card in a row, fires once via `motion/react`'s `whileInView` with `viewport={{ once: true, margin: '-60px' }}`.
- Hover lift on cards: `translateY(-2px)` + stronger shadow, `180ms`.
- Pulsing dot on the Now card: existing `pulse` keyframe at `1.8s` infinite.
- `@media (prefers-reduced-motion: reduce)`: all transforms collapse to opacity-only; durations cut to 0.

## Page architecture

### Single source of truth

`src/data/profile.ts` continues to hold all bilingual content. The redesign adds one new export and removes one:

- **Add** `trustEarned: Record<LanguageKey, { label: string; display: string; sub: string }>` — used by the Trust card.
- **Remove** `availability` — no longer rendered.

All other exports (`heroContent`, `skills`, `experience`, `projects`, `education`, `certifications`, `contact`) keep their current shape and content.

### App shell

```
<html data-theme="light|dark">
  <body>
    <div id="root">
      <BackgroundMesh />              {/* fixed-position layer */}
      <FloatingControls />            {/* fixed top-right */}
      <main className="app-shell">
        <section className="bento">   {/* 6-col grid */}
          <HeroCard ... />
          <TrustCard ... />
          <StackCard ... />
          <CletaCard ... />            {/* contains YoutubeEmbed */}
          <NowCard ... />
          <ProjectCard ... />          {/* RilooxDB */}
          <ProjectCard ... />          {/* Win11 Debloater */}
          <ProjectCard ... />          {/* AFK Timeskip */}
          <SkillsCard ... />
        </section>
        <ExperienceSection ... />
        <EducationCertsSection ... />
        <GithubStrip ... />
        <ContactSection ... />
      </main>
    </div>
  </body>
</html>
```

`App.tsx` owns two pieces of state: `language` (`'en' | 'es'`) and `theme` (`'light' | 'dark'`). Both are passed to `FloatingControls` for toggling, and `language` is threaded through to every card and section.

### Bento composition (6-col desktop)

| Card | Span | Source |
|---|---|---|
| Hero | 4×2 | `heroContent[language]` |
| Trust earned | 2×1 | `trustEarned[language]` (new) |
| Core stack | 2×1 | `skills[language].primary` (first 6 items) |
| Cleta video | 4×2 | `projects[language][0]` + `<YoutubeEmbed>` |
| Now | 2×1 | `experience[language][0]` (current role) + pulsing dot |
| RilooxDB | 2×1 | `projects[language][1]` |
| Win11 Debloater | 2×1 | `projects[language][2]` |
| AFK Timeskip | 2×1 | `projects[language][3]` |
| Skills | 4×2 | `skills[language].groups` (2-column inner grid) |

Bento total: 9 cards across a 6-column grid.

### Responsive collapse

- Desktop (`≥1100px`): 6-column grid as specified.
- Tablet (`768–1099px`): 4-column grid. Spans collapse: Hero `4×2`, Cleta `4×2`, Skills `4×2`; all other 2-span cards stay at `2×1`. Layout reflows naturally.
- Mobile (`<768px`): 2-column grid. All cards become `2×1` (full-width-of-grid) except the small project cards which stay `1×1` and pair up. The Hero is always full-width-and-tall.

### Below-bento sections

1. **Experience** — full-width glass block, two roles (Bantotal + Karelia) presented timeline-style with their existing highlight bullets from `profile.ts`. Section title: `Experience` in Instrument Serif.
2. **Education + Certifications + Languages** — full-width glass block, two-column layout on desktop. Left: UTEC + duration. Right: 4 certifications listed, with EN/ES levels inline at the bottom of the right column. Section title: `Education & credentials`.
3. **More from GitHub** — full-width glass block wrapping the existing `<GithubStrip>` (logic unchanged: `useGithubProjects` hook, `excludeNames` matches curated repo names, `limit={6}`). Section title: `More from GitHub`. Renders nothing on hook error / empty.
4. **Contact** — full-width glass block with the contact blurb, email + copy button, social links (GitHub / LinkedIn / HackerRank), response-time line. The hero's "Email me" CTA scrolls to this section's anchor. Section title: `Get in touch`.

## Component breakdown

### New components

#### `src/components/GlassCard.tsx`

Glass surface primitive. Props:

- `span?: 'sm' | 'md' | 'lg' | 'xl'` — maps to grid spans (sm=`2×1`, md=`2×2`, lg=`4×1`, xl=`4×2`).
- `delay?: number` — reveal-on-scroll delay in seconds.
- `className?: string`
- `as?: keyof JSX.IntrinsicElements` — defaults to `'section'`.
- `id?: string` — used for scroll anchors.
- `children: ReactNode`

Internally: `motion.<as>` with `initial="hidden"`, `whileInView="visible"`, `viewport={{ once: true, margin: '-60px' }}`, the standard `cubic-bezier(0.22, 1, 0.36, 1)` ease. Respects `useReducedMotion`. Renders the glass shell (CSS class `glass-card`) — no terminal chrome.

#### `src/components/FloatingControls.tsx`

Fixed-position top-right cluster (`position: fixed; top: 16px; right: 16px`). Two segmented glass pills:

- Language: `EN | ES`. Receives `language` + `onLanguageChange` from `App.tsx`.
- Theme: `☀ | ☾`. Receives `theme` + `onThemeChange` from `App.tsx`.

Both pills are accessible (each segment is a `<button>` with `aria-pressed`). Keyboard-navigable.

#### `src/components/BackgroundMesh.tsx`

Renders a single `<div className="background-mesh" aria-hidden="true">` fixed behind everything (`z-index: -1`). All visuals (gradients, dot grid) come from CSS that reads `--mesh-*` custom properties so they swap with theme.

#### `src/components/TrustCard.tsx`

Small card (`span="sm"`). Reads `trustEarned[language]`. Renders the label, the Instrument Serif display line, and the sub-copy.

#### `src/components/StackCard.tsx`

Small card (`span="sm"`). Reads `skills[language].primary` (slice to 6 items). Renders the label and a chip cloud.

#### `src/components/NowCard.tsx`

Small card (`span="sm"`). Reads `experience[language][0]` (current role). Renders the label, a pulsing green dot, and one-line current-role summary.

#### `src/hooks/useTheme.ts`

Returns `{ theme, setTheme, toggleTheme }`. On mount: reads `localStorage.getItem('theme')`; falls back to `window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'`. On change: writes `localStorage` and sets `document.documentElement.dataset.theme`. Also updates `<meta name="theme-color">` content to match the active theme's canvas color.

### Retained components (restyled, logic unchanged)

- `src/hooks/useGithubProjects.ts` — no change.
- `src/components/YoutubeEmbed.tsx` — logic unchanged; restyled to fit the Cleta card (rounded corners on the inner iframe to match `18px` card radius).
- `src/components/ProjectLinks.tsx` — pill row restyled as chip-style pills consistent with the new design system.
- `src/components/Reveal.tsx` — kept, used by below-bento sections; consistent with `GlassCard`'s motion settings.
- `src/components/ProjectCard.tsx` — restyled as the content shell for the three small project cards in the bento. Wraps content in a `<GlassCard span="sm">`.
- `src/components/GithubStrip.tsx` — restyled, internals unchanged; cards rendered inside become `GlassCard span="sm"` instances.

### Retired components (deleted)

- `src/components/BentoCard.tsx` — replaced by `GlassCard`.
- `src/components/StatusCard.tsx` — controls move to `FloatingControls`; "open to work" badge dropped.
- `src/components/MetricCard.tsx` — content folds into Hero body copy.

### Sections (signature + JSX rewrites; data flow unchanged)

- `src/sections/HeroSection.tsx` — emits the 4×2 Hero card content (label, display name, italic tag line, body summary, two CTAs). The "Download CV" button uses `cvFiles[language]` (a new small export in `profile.ts` that replaces the `cvFile` field of the removed `availability` export).
- `src/sections/SkillsSection.tsx` — emits the 4×2 Skills card content (display title + 2-column groups).
- `src/sections/ProjectsSection.tsx` — emits the Cleta 4×2 card + three small `2×1` project cards. The component is now a fragment that contributes multiple cards to the bento.
- `src/sections/ExperienceSection.tsx` — full-width below-bento block, timeline-style.
- `src/sections/EducationSection.tsx` + `src/sections/CertificationsSection.tsx` — merged into a single `EducationCertsSection.tsx` (full-width, two-column). The separate `LanguagesCard` export goes away; languages render inline at the bottom of the right column.
- `src/sections/ContactSection.tsx` — full-width below-bento block. Drops `CtaBar` dependency.

## File-level migration

### Files to delete

- `src/components/BentoCard.tsx`
- `src/components/StatusCard.tsx`
- `src/components/MetricCard.tsx`
- `src/sections/EducationSection.tsx` *(content merged into `EducationCertsSection.tsx`)*
- `src/sections/CertificationsSection.tsx` *(content merged into `EducationCertsSection.tsx`)*

### Files to add

- `src/components/GlassCard.tsx`
- `src/components/FloatingControls.tsx`
- `src/components/BackgroundMesh.tsx`
- `src/components/TrustCard.tsx`
- `src/components/StackCard.tsx`
- `src/components/NowCard.tsx`
- `src/hooks/useTheme.ts`
- `src/sections/EducationCertsSection.tsx`

### Files to rewrite

- `src/App.tsx` — full rewrite (shell + state, no more `CtaBar`, no more bento-card-with-filename pattern)
- `src/index.css` — full rewrite (terminal theme out, editorial-warm + dark theme tokens in)
- `index.html` — font link swap (drop `JetBrains Mono`, add `Inter`); `theme-color` meta becomes runtime-controlled via `useTheme`
- `src/sections/HeroSection.tsx` — new JSX, same data
- `src/sections/SkillsSection.tsx` — new JSX, same data
- `src/sections/ProjectsSection.tsx` — split into multiple bento cards
- `src/sections/ExperienceSection.tsx` — new JSX, same data
- `src/sections/ContactSection.tsx` — new JSX, same data
- `src/components/GithubStrip.tsx` — restyled, uses `GlassCard`
- `src/components/ProjectCard.tsx` — restyled, uses `GlassCard`
- `src/components/ProjectLinks.tsx` — restyled
- `src/data/profile.ts` — remove `availability`; add `trustEarned`; add small `cvFiles` export

## Content changes

### Add: Trust card content

```ts
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

### Remove: `availability` export

The "Open to work" badge is dropped. The `cvFile` field moves into a smaller standalone export so the Hero's CTA can still pick the right PDF per language:

```ts
export const cvFiles: Record<LanguageKey, string> = {
  en: '/cv.pdf',
  es: '/cv-es.pdf',
};
```

### Preserved: everything else

Hero summary, Experience bullets (including the `~20%` p95 latency cut, which still appears in both Hero body copy and the Bantotal experience bullets), Project descriptions, Education line, Certifications, Languages levels, Contact blurb and social links — all unchanged.

## Build & deployment

- `npm run build` (the only existing gate: `tsc --noEmit && vite build`) must pass after the redesign.
- `VITE_BASE_PATH=/` is still required for custom-domain deploys (`riloox.site`) — no change to deploy commands.
- No new public assets required. Existing `public/cv.pdf`, `public/cv-es.pdf`, `public/og-image.png`, `public/favicon.svg` are reused as-is.

## Acceptance criteria

1. **Visual fidelity**: rendered site matches the approved bento-v3 mockup (`http://localhost:54056` during brainstorm). Glass cards have the documented shadow stack, gradient mesh, dot grid, Instrument Serif + Inter typography, asymmetric 6-col bento grid.
2. **Bilingual**: language pill in the floating control cluster swaps all content (Hero, Trust, Stack, Cleta meta, Now, Projects, Skills, Experience, Education+Certs, Contact). EN ↔ ES round-trip works without page reload.
3. **Theme**: theme pill toggles between light and dark; preference persisted in `localStorage`; initial value respects `prefers-color-scheme`; `<meta name="theme-color">` updates per theme.
4. **Motion**: cards reveal-on-scroll with stagger; hover-lift works on pointer devices; the Now card's pulse animates; `prefers-reduced-motion: reduce` disables transforms.
5. **Bento composition**: all 9 specified cards present in the documented spans on desktop; collapses cleanly to tablet (4-col) and mobile (2-col).
6. **Below-bento sections**: Experience, Education + Certifications, GitHub strip, Contact all render as full-width glass blocks with section titles.
7. **GitHub strip**: live-fetches the user's repos, excludes the four curated repo names, renders up to 6, and renders nothing on error/empty.
8. **YouTube embed**: Cleta card shows the thumbnail by default; clicking loads the `youtube-nocookie.com` iframe.
9. **CTAs**: "Download CV" downloads the language-correct PDF; "Email me" scrolls to the Contact section's email button.
10. **Build**: `npm run build` passes with no TypeScript errors and no Vite warnings about missing imports.
11. **Retired files**: `BentoCard.tsx`, `StatusCard.tsx`, `MetricCard.tsx`, separate `EducationSection.tsx` and `CertificationsSection.tsx` are deleted; no stale references remain.

## Out-of-scope follow-ups (parking lot, do not implement now)

- Asymmetric blob/illustration in the Hero card.
- Per-project case-study pages.
- Blog or notes section.
- Analytics integration.
- Updated `public/og-image.png` matching the new aesthetic.
