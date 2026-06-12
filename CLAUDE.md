# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A static, hand-written marketing site (vitrine) for SMPL Innovations — a Montreal automation/AI consulting studio. No framework, no build step, no bundler. Three source files do all the work: `index.html`, `styles.css`, `script.js`. It deploys to Vercel as plain static files.

## Commands

```bash
npm run test    # validates required files exist + checks index.html contains all section anchors
npm run build   # no-op; just prints a ready message (site is already static)
```

`npm run test` is the only real check. It is an inline Node script in `package.json` that fails if any required file (`index.html`, `styles.css`, `script.js`, `vercel.json`, the three legal pages, `Design.md`, logo assets) is missing, or if `index.html` drops any of the anchor targets `#services #work #about #blog #book #faq`. Run it after structural edits — renaming a section `id` or deleting a file will break it.

There is no dev server. Preview by opening `index.html` directly, or run any static server (e.g. `npx serve`) from the repo root. Note `vercel.json` uses `cleanUrls: true`, so locally `privacy.html` is reachable at `/privacy.html` but in production it's `/privacy` — keep internal links extensionless to match the legal-page redirects.

## Architecture

- **`index.html`** — the entire one-page site. Sections in DOM order: hero (text + aria-hidden ops panel) → services (bento grid) → debt → audience → work (case studies) → capabilities marquee → process (sticky deck) → about → advice (`#blog`) → faq → booking. Three standalone legal pages (`privacy.html`, `cookies.html`, `legal.html`) share the same CSS. JS hooks are wired through `data-*` attributes (`data-header`, `data-nav`, `data-nav-toggle`, `data-year`, `data-circuit-bg`), not classes or IDs — preserve these when editing markup.

- **`styles.css`** — single stylesheet, no preprocessor. The design system lives in `:root` CSS custom properties: a strict navy palette (`--navy-deep #0b1628`, `--navy-mid`, `--navy-light`, `--blue-accent #2563eb`, `--cyan-accent`), radii (`--radius-lg/md/sm`), `--max` container width, and three type tokens — `--font-display` (Archivo, used expanded via `font-stretch`), `--font-body` (Inter), `--font-mono` (Fragment Mono) — all self-hosted woff2 in `assets/fonts/`. **Use these variables rather than hardcoding colors or font stacks.** The blueprint surface/motion system (hairline section dividers, dot grids, grain overlay, CSS-counter section numbering, scroll-driven reveals, cursor spotlight) is documented in `Design.md` under "Design System v2".

- **`script.js`** — vanilla JS, no dependencies. Four responsibilities: (1) mobile nav toggle + scrolled-header state + current-year stamp, (2) `createCircuitBackground()`, a `<canvas>` animation in the hero that draws a grid of nodes with pulses, connecting lines, and pointer-reactive displacement (honors `prefers-reduced-motion`, throttles to 30fps), (3) a cursor-spotlight handler that writes `--mx`/`--my` custom properties on cards (fine-pointer devices only), and (4) a text-scramble hover effect on the nav links (skipped for touch and reduced-motion users).

- **`vercel.json`** — `cleanUrls` + `trailingSlash: false`, long-cache headers for fonts, and a redirect table mapping old Wix routes (e.g. `/services`, `/conseils`, `/mentions-legales`) to the new anchors/pages. When you rename a section anchor or legal page, update the matching redirect here.

## Design intent

`Design.md` is the source of truth for brand direction and content decisions — read it before changing copy, layout hierarchy, or visuals. Key constraints it encodes: navy technical palette only (no purple gradients, no gray logo backgrounds), restrained hero visuals that don't overpower the message, a role-differentiated card system with one shared button language, and case studies that follow `Problem → SMPL solution → Result`. `REDESIGN_PLAN.md` records the phased v2 redesign (typography → blueprint surfaces → layout rhythm → motion → docs; all phases complete as of June 2026).

## Known placeholders (per README + Design.md)

These are intentionally unfinished and should not be treated as final: Cal.com booking links (`cal.com/smplinnovations/intro` and `/discovery`), proof/testimonial cards (awaiting client approval), client logos (need permission), and the blog section (currently a preview, not real articles). The site is English-first; a bilingual EN/FR strategy is noted as a future decision.
