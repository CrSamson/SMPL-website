# SMPL Website Design Direction

## Business Objective

The website should act as a polished vitrine for SMPL Innovations: a credible,
conversion-focused sales surface for SMEs, NPOs and service organizations that
need practical automation, AI integration and custom digital tools.

Primary business goals:

- Convert qualified visitors into discovery calls with SMPL.
- Make the offer immediately understandable: simplify operations and eliminate
  administrative debt.
- Build trust through practical use cases, founder credibility, testimonials and
  eventually client logos.
- Move the brand away from a generic Wix presence into a sharper Vercel-hosted
  consulting/product studio experience.
- Preserve the existing logo, color direction and core content from
  `smplinnovations.com`.

## Current UI Audit

Resolved in the typography/content refactor (June 2026):

- Typography now follows one system: self-hosted Inter variable font, h1 capped
  at 64px with per-level line-heights, h2 always smaller than h1 on every
  breakpoint, and card titles that no longer compete with section headings.
- The hero supporting copy was restored to the Wix value proposition: connect
  isolated software with intelligent applications without replacing current
  systems.
- One card language: flat navy surfaces that flip between `#0B1628` and
  `#0F1F3D` depending on the section band, with the blue top-accent reserved
  for numbered process steps. Radii and colors are tokenized.
- Service cards lead with benefits from the Wix site (end double data entry,
  instant dashboards, custom-made lightweight tools) instead of category
  labels.
- The "Who is SMPL for?" audience section and the four values (Simplicity,
  Efficiency, Transparency, Adaptation) were restored from the Wix content.
- Case-study results use the stronger original Wix claims (zero double data
  entry, perfect traceability, drastic reduction in discrepancies).
- The duplicated "How we work"/"How it works" sections were merged into one
  four-step process (Discover, Map, Build, Adopt).
- The invented blog previews were replaced by the real Wix advice offer: a
  process-assessment CTA section (the `#blog` anchor is kept for the
  `/conseils` redirect and the test script).
- Focus-visible outlines exist for links, buttons and FAQ summaries.

Resolved in the design-system v2 redesign (June 2026, see `REDESIGN_PLAN.md`):

- Typography moved to a three-tier system: Archivo (variable, used expanded)
  for display, Inter for body, Fragment Mono for the technical label layer.
- The alternating section bands were replaced by a blueprint surface system:
  one navy-deep ground, hairline dividers, dot-grid textures, film grain and a
  numbered mono section index.
- The uniform card grid was differentiated by role (ticked offer cards, traced
  case rows, borderless editorial team/values/FAQ) and the layout gained the
  two-column hero, a services bento, a sticky process deck and a capabilities
  marquee.
- A calm motion language was added: scroll-driven reveals, cursor spotlight,
  trace-line button hovers, a nav decode effect and cross-document view
  transitions — all reduced-motion gated.

Still open before launch:

- Proof is still too generic. The site needs real testimonials, client logos
  and measurable outcomes as soon as partners approve them.
- The FAQ answers were written for the refactor and must be validated by the
  team (the Wix FAQ page was empty).
- The Cal.com integration needs the final production links and event names.

## Hero Direction

The hero should reuse the current SMPL content and make it sharper:

- Eyebrow: `Simplify your operations`
- Main headline: `Eliminate your administrative debt.`
- Supporting copy: `We transform your cumbersome workflows and connect your
  isolated software with intelligent applications — without having to replace
  your current systems.` (the Wix value proposition; the shorter tagline
  `We remove the manual. You keep the momentum.` moved to the booking section)
- Primary CTA: `Meet an SMPL expert`
- Secondary CTA: `View use cases`

The desktop hero should have a clear two-layer composition: strong text on the
left, restrained operational dashboard visual on the right. On mobile, the
dashboard visual should be minimized or hidden so the business promise stays
dominant.

This composition is built: `.hero-panel` is an aria-hidden mono "ops overview"
panel (workflow rows with statuses, plus a before/after admin-hours meter)
rendered only above 980px, over the shared circuit canvas.

## UI System

Use a component system that feels technical, calm and practical rather than
hype-driven:

- Header: compact glass surface, official SMPL logo, short nav, strong booking
  link.
- Buttons: one solid primary and one ghost secondary, both with mono uppercase
  labels, sharp radius, a cyan trace-line hover and a 1px press. Use the same
  radius, padding and hover/press treatment everywhere.
- Cards: one shared radius and navy-mid surface, differentiated by role —
  registration ticks on offer cards, a blue trace edge with circuit node on
  case studies, borderless hairline-ruled editorial blocks for team, values
  and FAQ.
- Pills: use for audience labels, services, technologies and metadata only.
- Case studies: always follow `Problem -> SMPL solution -> Result`.
- Proof blocks: replace placeholder proof with testimonials, approved client
  names and real operational numbers.
- Booking block: use one calm dark section with direct Cal.com embed plus email
  fallback.

## Content Hierarchy

Current order for the landing page:

1. Hero with the Wix-aligned promise and direct CTA.
2. Services under "Reclaim your team's time": end double data entry,
   instant dashboards, custom-made lightweight tools.
3. Before/after section explaining administrative debt.
4. "Who is SMPL for?": field operations, community organizations, corporate
   administration (restored from the Wix homepage).
5. Case studies using the Wix service-page examples and their original results.
6. Process: discover, map, build, adopt (single section; the former
   "How we work" steps were merged into it).
7. About: founders, enterprise automation credibility, and the four values.
8. Advice: process-assessment CTA (replaces the blog preview; keeps the
   `#blog` anchor).
9. FAQ (answers pending team validation).
10. Booking CTA with Cal.com embed.

Testimonials and client logos get a dedicated section between the case studies
and the process once partners approve them.

## Visual Direction

Use the strict navy technical palette from the refactor:

- `#0B1628` for the deepest background and logo block.
- `#0F1F3D` for cards and surfaces.
- `#162848` for hover states and border-adjacent depth.
- `#2563EB` for primary CTAs and active states.
- `#3B82F6` and `#06B6D4` for restrained data/circuit accents.

Avoid gray logo backgrounds, purple gradients and overloaded hero widgets. The
brand should feel:

- Practical, not flashy.
- Technical, but accessible to non-technical operators.
- Boutique and local to Montreal.
- Trustworthy enough for NPOs and SMEs handling sensitive operational data.

The current nav uses a CSS logo block so the mark always sits on `#0B1628`,
matching the desired navy-background logo direction even if the provided AVIF
asset contains a gray rectangle.

## Design System v2 (June 2026)

The v2 redesign (`REDESIGN_PLAN.md`) extends the hero circuit-canvas motif into
the whole site — "the circuit board is the brand." Everything below is
implemented in `styles.css`/`script.js` with no dependencies and no build step.

### Typography

- `--font-display`: Archivo (OFL, variable, instanced to wght 450-800 and
  wdth 100-125%). Used expanded — h1 at 118%, h2 at 114%, h3 at 110%, logo at
  122% — for an industrial, engineered voice. h1-h3, logo mark and brand
  wordmark only.
- `--font-body`: Inter (variable). All body copy and general UI text.
- `--font-mono`: Fragment Mono (OFL, 400 only). The technical annotation
  layer: eyebrows, section numbers, nav links, tags, statuses, footer meta and
  button labels.
- All faces are self-hosted woff2 in `assets/fonts/` with latin/latin-ext
  unicode-range subsets (French accents covered for the future FR version),
  preloaded on every page and cached immutable via `vercel.json`. Do not add
  hosted-font requests.

### Surfaces (blueprint language)

- Single `--navy-deep` page ground. Sections are separated by 1px
  `--white-faint` hairlines, never by background swaps. Services, process and
  advice carry a 22px dot grid at 5% white. A fixed SVG `feTurbulence` grain
  overlay sits on every page at 4% opacity.
- Section eyebrows are auto-numbered (`/ 01 — …`) by a CSS counter on `main`;
  renumbering happens automatically when sections move.
- Card roles: offer cards get corner registration ticks; case rows get a 2px
  `--blue-accent` trace edge with a glowing node; team/values/FAQ are
  borderless hairline-ruled editorial lists; the booking block stays a single
  calm bordered panel.

### Layout structures

- Hero: text left, `.hero-panel` ops-overview visual right (aria-hidden,
  hidden at ≤980px).
- Services: 3-column bento; the flagship automation card spans 2×2 and ends in
  a Form → CRM → Accounting trace diagram.
- Process: sticky stacking deck — cards pin at staggered offsets below the
  header — with oversized ghost mono numerals at 5% opacity.
- A full-bleed mono capabilities marquee separates the case studies from the
  process section (stand-in for the future client-logo strip).
- Case studies: editorial rows — tag band, then title | Problem | Result
  columns with mono labels; mobile stacks them in DOM order.

### Motion language

The hero canvas is the only motion set-piece; everything else is calm and
tactile:

- Scroll reveals: `animation-timeline: view()` inside `@supports` and
  `prefers-reduced-motion: no-preference`. Firefox simply shows content.
- Cursor spotlight: `script.js` writes `--mx`/`--my` on pointermove; cards
  paint a 300px blue radial glow on hover. Fine-pointer devices only.
- Buttons: a cyan trace line sweeps the base on hover; press is a 1px
  translate, never a scale.
- Nav links decode (text scramble) on hover — Fragment Mono is monospaced so
  layout never shifts; skipped for touch and reduced-motion users.
- `@view-transition { navigation: auto }` cross-fades to the legal pages; the
  header persists via `view-transition-name: site-header`.
- Hard rule: every animation is gated behind `prefers-reduced-motion` (the
  marquee and live-dot pulse included) and nothing animates layout properties.

## Next Improvements

- Add a real testimonial component with quote, name, organization and result.
- Add client-logo slots only after permission is confirmed.
- Validate the FAQ answers with the team and expand the list.
- Confirm Cal.com event URLs and replace placeholder slugs if needed.
- Add French content strategy: either fully bilingual `/en` and `/fr`, or an
  English-first site with a French version planned.
- Add accessibility checks for color contrast, keyboard navigation and mobile
  menu behavior.
