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

The current local version is stronger than the Wix baseline structurally, but it
has several UI problems that should be fixed before launch:

- The hero headline is too large on desktop and mobile. It competes with the
  decorative dashboard visuals and causes the message to feel cropped instead
  of intentional.
- The first hero message drifted away from the existing SMPL positioning. The
  Wix site clearly says to simplify processes, reduce costs and eliminate
  repetitive work through intelligent automation. The new hero should keep that
  sharper business promise.
- The decorative cards in the hero are too dominant. They should support the
  message, not overlap it or become the first thing the eye has to decode.
- The first logo implementation used a temporary geometric mark and the provided
  AVIF contained a gray rectangle. The refactor now uses a CSS logo block so the
  logo background is always the required navy `#0B1628`.
- The header feels visually heavy because the light translucent surface clashes
  with the dark hero. It should feel calmer, more intentional and consistent
  with the rest of the component system.
- Component styling is close, but not fully consistent. Cards, pills, buttons
  and proof blocks use similar materials, but spacing and hierarchy should be
  standardized so the site feels designed as one system.
- Mobile composition needs priority. The hero visual should be reduced or hidden
  on small screens so the main promise, CTA and proof points are readable
  without horizontal clipping.
- Proof is still too generic. The site needs real testimonials, client logos and
  measurable outcomes as soon as partners approve them.
- The blog/advice section is currently only a content preview. It should become
  either a real blog or a clearly labeled coming-soon resource section.
- The Cal.com integration needs the final production links and event names.

## Hero Direction

The hero should reuse the current SMPL content and make it sharper:

- Eyebrow: `Simplify your operations`
- Main headline: `Eliminate your administrative debt.`
- Supporting copy: `We remove the manual. You keep the momentum.`
- Primary CTA: `Meet an SMPL expert`
- Secondary CTA: `View use cases`

The desktop hero should have a clear two-layer composition: strong text on the
left, restrained operational dashboard visual on the right. On mobile, the
dashboard visual should be minimized or hidden so the business promise stays
dominant.

## UI System

Use a component system that feels technical, calm and practical rather than
hype-driven:

- Header: compact glass surface, official SMPL logo, short nav, strong booking
  link.
- Buttons: one primary gradient action and one secondary dark/translucent
  action. Use the same radius, padding and hover/press treatment everywhere.
- Cards: consistent radius, shadow and padding across services, case studies,
  testimonials, blog cards and team cards.
- Pills: use for audience labels, services, technologies and metadata only.
- Case studies: always follow `Problem -> SMPL solution -> Result`.
- Proof blocks: replace placeholder proof with testimonials, approved client
  names and real operational numbers.
- Booking block: use one calm dark section with direct Cal.com embed plus email
  fallback.

## Content Hierarchy

Recommended order for the landing page:

1. Hero with the Wix-aligned promise and direct CTA.
2. How We Work: map the debt, build the system, hand it off clean.
3. Three-step offer: business process automation, AI integration/data analysis,
   custom digital tools.
4. Before/after section explaining administrative debt.
5. Case studies using the current Wix service-page examples.
6. Testimonials and client logos once approved.
7. Process: discover, map, build, adopt.
8. About/founder credibility.
9. Advice/blog preview.
10. FAQ and booking CTA.

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

## Next Improvements

- Replace the hero decorative cards with a cleaner, reusable `WorkflowPreview`
  visual component.
- Add a real testimonial component with quote, name, organization and result.
- Add client-logo slots only after permission is confirmed.
- Turn the advice previews into real article pages or remove links until the
  content exists.
- Confirm Cal.com event URLs and replace placeholder slugs if needed.
- Add French content strategy: either fully bilingual `/en` and `/fr`, or an
  English-first site with a French version planned.
- Add accessibility checks for color contrast, keyboard navigation and mobile
  menu behavior.
