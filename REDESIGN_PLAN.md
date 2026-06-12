# Design Refresh Plan — from template to signature

> How to use: tell Claude Code "Implement Phase N of REDESIGN_PLAN.md".
> Invoke the **frontend-design** skill for every visual phase (it exists specifically to avoid
> generic AI aesthetics), and the **run** / **verify** skill to screenshot-check each phase in a
> real browser before moving to the next. Run `npm run test` after every structural edit.

## Diagnosis (why the current site reads as generic)

- One typeface (Inter) at stock SaaS sizes/weights — the single biggest "template" signal (styles.css:52, 103-124).
- The same eyebrow → h2 → paragraph header repeated identically 9 times (styles.css:342-350, 450-456).
- One card rule shared by 7 different components — services, cases, FAQ, team all look identical (styles.css:402-415).
- Every collection is `repeat(N, 1fr)` with the same 14px gap; every section is `5rem` padding on two alternating navy fills. The page is a metronome.
- Cards have no hover states; all transitions are the same 180ms fade. No motion identity below the hero.
- Glass pill header + centered glow-blob hero — the canonical 2024 template combo. Design.md actually specifies a text-left / dashboard-right hero that was never built (Design.md:69-72).
- The circuit canvas is the only distinctive element on the site — and nothing else references it.

## Design thesis

**The circuit board is the brand.** Extend the hero canvas motif — nodes, traces, blueprint
precision — into one coherent language: technical typography, hairline engineering surfaces,
calm scroll motion. Minimal, navy, engineered. Keep all colors as the existing `:root` variables.
The copy is good; do not rewrite it.

## Phase 1 — Typography (biggest lever) — ✅ DONE (June 2026)

Implemented three-tier system, all self-hosted woff2 with the existing subset + preload +
vercel.json cache pattern. Note: the plan originally named Space Grotesk, but the
frontend-design skill flags it as an over-converged AI-generation choice, so the implemented
picks are more distinctive while staying technical:

1. **Display — Archivo** (OFL, variable): h1–h3, logo mark, brand wordmark. Used *expanded*
   (font-stretch 108–122%) for an industrial, engineered voice. Instanced with fonttools to
   wght 450-800 / wdth 100-125% → 58KB latin + 56KB latin-ext (lazy via unicode-range).
2. **Body — Inter kept** (already self-hosted, zero risk).
3. **Mono — Fragment Mono** (OFL, 400): eyebrows, section indexes (`01 · AUTOMATION`), process
   numbers, case-study tag pills, nav links (uppercase), footer nav + meta. 25KB latin
   (Latin-1 accents included for future FR). `font-variant-numeric: tabular-nums` on labels.

Exposed as `--font-display`, `--font-body`, `--font-mono` in `:root`. New-visitor payload
~83KB (Archivo latin + Fragment Mono). All three preloaded on every page.
Bug fixed en route: the hero grid used an auto-sized track, so `.hero-inner`'s percentage
width overflowed the viewport on mobile — now `grid-template-columns: minmax(0, 1fr)`.

## Phase 2 — Blueprint surface system (kill the uniform cards) — ✅ DONE (June 2026)

- Alternating background bands replaced with a single navy-deep ground + **1px hairline
  `border-top` on every `.section`**; the former navy-mid sections (services/process/advice)
  carry a barely-visible **dot grid** (1px radial-gradient dots, 22px spacing, 5% white) instead.
  The `--card-bg` flip mechanism was removed — all cards are navy-mid on navy-deep.
- **Numbered section index**: `main` carries a CSS counter; every section eyebrow renders as
  `/ 01 — WHAT SMPL DOES` (mono, number in white-dim, label in cyan). Hero and legal pages excluded.
- Card differentiation: **registration ticks** (9px crosshairs) on opposite corners of service
  cards; **2px blue trace edge + glowing circuit node** on case studies (echoes the hero canvas);
  **borderless editorial** treatment for team, values, and FAQ (hairline top rules, no boxes);
  FAQ summaries got mono cyan `+`/`−` markers, native triangle removed.
- **SVG grain overlay** (`feTurbulence` data URI, opacity .04, fixed, pointer-events none,
  z-index 90) on all four pages — static, reduced-motion safe.
- Team initials squares removed from markup; founders are now name (display face) + mono
  uppercase credential over a hairline rule.

## Phase 3 — Layout rhythm (kill the metronome) — ✅ DONE (June 2026)

- **Hero**: build the Design.md two-column composition — text left, restrained "operational
  dashboard" visual right built from the existing circuit motif (e.g. a terminal-style panel with
  mono labels and live-looking nodes). Hidden on mobile. Keep the canvas; keep copy verbatim.
- **Services**: asymmetric grid — flagship card spans 2 columns with a small visual, the other
  two compact. No more 3 equal cells.
- **Process**: sticky stacking cards (`position: sticky; top: 6rem`) so the 4 steps pin and
  slide over each other, with oversized ghost mono numerals (8-10rem, ~8% opacity) behind each.
- **One full-bleed rhythm breaker**: a band escaping `--max` (`margin-inline: calc(50% - 50vw)`)
  — e.g. a mono capabilities marquee (CSS-only, paused on hover, static under reduced-motion).
  Useful while client logos await permission.
- **Case studies**: keep Problem → Solution → Result, restructure as editorial rows with a clear
  reading order (the current floating three-text-block layout has no flow).

## Phase 4 — Motion & interaction (one calm language) — ✅ DONE (June 2026)

All gated behind `prefers-reduced-motion` and `@supports`; no libraries; don't compete with the hero canvas.

- **Scroll-driven reveals** with native CSS `animation-timeline: view()` (~10 lines; Firefox
  gracefully gets static content).
- **Cursor spotlight on cards**: one `mousemove` handler writing `--mx/--my`, read by a
  radial-gradient in card `::after` (~15 lines JS).
- **Buttons**: sharper radius, mono-influenced label, real hover (trace-line sweep or arrow
  shift) + `:active` press; drop the generic `scale(0.96)`.
- **Nav**: optional text-scramble on hover for mono nav links (restrained, ~400ms, decode
  left-to-right) — the one "signature" flourish.
- `@view-transition { navigation: auto; }` on all pages for free cross-fades to legal pages.

## Phase 5 — Document it — ✅ DONE (June 2026; see Design.md "Design System v2" + updated CLAUDE.md)

- Update **Design.md**: new type system (faces, scale, usage rules), surface system (hairlines,
  dot grid, grain, corner ticks), motion language (what animates, what never does), layout
  exceptions per section. Design.md stays the source of truth.
- Update **CLAUDE.md** architecture notes (fonts, new JS responsibilities).
- Add new font files to the existing `vercel.json` cache rule scope (`/assets/fonts/`).

## Hard constraints — do not break

- `data-*` JS hooks: `data-header`, `data-nav`, `data-nav-toggle`, `data-year`, `data-circuit-bg`.
  The canvas dies if it's not inside an element with class `hero` (script.js:47-48). `body.nav-open`
  and `.scrolled` class names are load-bearing.
- `npm run test` requires the literal anchors `id="services" id="work" id="about" id="blog"
  id="book" id="faq"` (double-quoted) and all existing files.
- Navy palette variables only — no purple, no gray logo backgrounds (Design.md). Logo mark always
  sits on `#0B1628`.
- Copy unchanged; placeholders (Cal.com slugs, testimonials, logos, blog) stay as-is.
- No dependencies, no build step. `prefers-reduced-motion` respected everywhere. Internal links
  extensionless; update vercel.json redirects if any anchor/page is renamed.
