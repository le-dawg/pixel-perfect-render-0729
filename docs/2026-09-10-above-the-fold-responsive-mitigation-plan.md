# Above-the-Fold Responsive Mitigation Plan

> **For agentic workers:** Use the discovered `impeccable` skill as the design guide for execution, specifically its `adapt`, `layout`, and `shape` playbooks. Steps use checkbox syntax for tracking.

**Goal:** Make the hero feel intentionally composed on narrow viewports by fixing the uneven right edge, normalizing the proof and portrait rail widths, and giving the three primary actions a coherent shared rhythm.

**Architecture:** Keep the current Astro component split and solve this as a structural hero refinement rather than a redesign. Use one shared narrow-screen layout thesis across `Hero`, `Portrait`, and `ContactLinks`, then validate with browser screenshots at targeted breakpoints.

**Tech Stack:** Astro 7, `.astro` components, global CSS in `src/styles/global.css`, browser responsive inspection, screenshot evidence in `docs/reviews/`

## Global Constraints

- Scope is above the fold only: hero copy, proof rail, portrait, and CTA cluster.
- Do not change below-the-fold sections as part of this pass.
- Preserve the current desktop composition unless a narrow-screen fix requires a harmless shared token.
- Prefer structural CSS changes over copy edits.
- Validation must include browser-based inspection and saved screenshots.
- Treat current code as the source of truth; existing screenshots in `docs/reviews/` may be stale and should be replaced with fresh hero evidence during execution.

## File Map

- Modify: `src/components/Hero.astro`
- Modify: `src/components/ContactLinks.astro`
- Modify: `src/components/Portrait.astro`
- Modify: `src/styles/global.css`
- Create: `docs/reviews/2026-09-10-hero-mobile-before.png`
- Create: `docs/reviews/2026-09-10-hero-mobile-after.png`
- Create: `docs/reviews/2026-09-10-hero-tablet-after.png`
- Create: `docs/reviews/2026-09-10-hero-desktop-after.png`

## Structural Thesis

- On narrow screens, the hero should stop behaving like a collapsed desktop grid and instead read as one deliberate vertical composition.
- The copy stack, proof card, and portrait should share one visual column width so both edges feel intentional.
- The CTA cluster should read as one family: same height, same alignment logic, and predictable wrapping behavior.
- The proof card and portrait should feel like one credibility rail, not two unrelated boxes with drifting widths.

### Task 1: Normalize the Hero’s Narrow-Screen Structure

**Files:**
- Modify: `src/components/Hero.astro`
- Modify: `src/components/Portrait.astro`
- Modify: `src/styles/global.css`

**Produces:**
- A single mobile-first hero flow with shared inline sizing for copy and rail content.
- A clear breakpoint strategy for desktop-to-single-column reflow.

- [ ] Inspect the current hero at `320x568`, `360x800`, `390x844`, `430x932`, `768x1024`, and `1280x900` and note three things for each width: where the copy column ends, where the proof card ends, and where the portrait ends.
- [ ] In `src/styles/global.css`, replace the current narrow-screen behavior that simply drops `.hero` to one column with a more explicit mobile structure:
  - give the hero stack a shared max inline size token for narrow screens;
  - make `.hero-copy` and `.hero-rail` both stretch to that same inline size;
  - remove the separate portrait-only width rule that makes the image narrower than the proof card;
  - ensure the rail no longer uses a different width cap from the copy when the grid collapses.
- [ ] In `src/components/Hero.astro`, add a minimal wrapper only if the CSS needs a stable inner grouping for proof-plus-portrait alignment. Do not reorder content semantically.
- [ ] In `src/components/Portrait.astro`, keep the existing figure structure unless one wrapper class is needed to inherit the new rail width behavior.
- [ ] Re-check the same six widths and confirm that the hero reads as one composed column on phone widths and still returns to the existing two-column layout on desktop.

### Task 2: Unify Rail Width Rhythm and CTA Sizing

**Files:**
- Modify: `src/components/ContactLinks.astro`
- Modify: `src/styles/global.css`

**Produces:**
- Proof card and portrait that feel like one rail.
- CTA group with consistent button heights, padding, and wrap behavior.

- [ ] In `src/styles/global.css`, introduce one reusable width rule for the narrow-screen credibility rail and apply it to both the proof card and portrait image block.
- [ ] Remove the mobile-only portrait width cap that makes the image feel detached from the proof card unless testing shows it is required for cropping quality. If it must remain capped, apply the same cap to the proof card so both edges still align.
- [ ] Rework `.contact-links` so the hero actions follow one deliberate rule instead of ad hoc flex wrapping:
  - use a layout that can become a one-column stack on the smallest widths and a balanced multi-column row on wider phones;
  - keep all three actions on the same height;
  - give the first two actions comparable visual weight;
  - keep the tertiary disabled action in the same family, but visually quieter rather than physically smaller.
- [ ] Keep touch targets at or above `44px` and confirm the disabled tertiary action still looks intentionally inactive rather than broken.
- [ ] Verify that button wrapping no longer creates a ragged right edge or an accidental “odd one out” control at common phone widths.

### Task 3: Browser Validation and Screenshot Evidence

**Files:**
- Modify: `docs/reviews/` evidence set only

**Produces:**
- Fresh screenshot proof that the responsive mitigation works.
- A pass/fail checklist tied to the actual above-the-fold problem.

- [ ] Start the local Astro site and inspect the home page in a real browser, not only static reasoning from code.
- [ ] Capture a fresh “before” screenshot of the hero at `390x844` and save it as `docs/reviews/2026-09-10-hero-mobile-before.png`.
- [ ] After implementation, capture “after” screenshots at:
  - `390x844` as `docs/reviews/2026-09-10-hero-mobile-after.png`
  - `768x1024` as `docs/reviews/2026-09-10-hero-tablet-after.png`
  - `1280x900` as `docs/reviews/2026-09-10-hero-desktop-after.png`
- [ ] During browser inspection, explicitly verify:
  - the hero copy, proof card, and portrait share an intentional right edge on phone widths;
  - the proof card and portrait read as one rail with matching width logic;
  - the three hero actions have equal height and feel like one system;
  - there is no horizontal overflow at `320px`;
  - the H1 and supporting paragraphs keep a stable measure without awkward clipping or giant dead space.
- [ ] Repeat the mobile check once in landscape or at a short viewport height to ensure the above-the-fold stack still feels ordered when vertical space is tight.
- [ ] Run `npm run build` after the CSS and markup changes and confirm the production build still passes before closing the task.

## Done Criteria

- Narrow-screen hero composition feels intentionally single-column rather than like a collapsed desktop grid.
- Right-edge alignment is consistent across hero copy, proof card, and portrait at phone widths.
- Proof and portrait widths feel related and stable.
- CTA buttons feel organic, equalized, and deliberate.
- Fresh browser screenshots exist in `docs/reviews/` and support the claimed improvement.
