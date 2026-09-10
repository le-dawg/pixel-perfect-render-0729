# 0xdawg.com · Astro pass 01

First local implementation and browser review, 2026-09-09. Built from an empty folder. Workshop sources remain unchanged.

## Run

```sh
npm ci
ASTRO_TELEMETRY_DISABLED=1 npm run dev -- --port 4321
ASTRO_TELEMETRY_DISABLED=1 npm run build
```

Open http://localhost:4321. This installed Astro version starts a background dev server; use `npx astro dev status`, `npx astro dev logs`, and `npx astro dev stop` to manage it.

Netlify: use this folder as the base directory, `npm run build`, publish `dist`. This prototype is not deployed. Remove the preview `noindex, nofollow` meta tag only when approving public launch.

## Edit

- `src/pages/index.astro`: composition, navigation, metadata and language disclosure.
- `src/components/`: independent hero, portrait, proof strip, timeline, collaboration and contact modules.
- `src/data/site.ts`: email draft, public identity and booking URL. An empty booking URL intentionally uses an email request to arrange a call.
- `src/data/timeline.ts`: CV-sourced facts and chronological selected engagements.
- `src/styles/global.css`: tokens, layout and responsive styles.
- `public/images/dawid-golebiewski.jpg`: provisional public GitHub avatar, fetched from the profile linked in the workshop. Replace with an approved professional portrait.

## Local presentation overrides

- `hero-kicker`
- `hero-proof-label`
- `proof-label`
- `method-label`

These markers are intentionally **kept in the code but hidden in CSS** via `display: none` in `src/styles/global.css`.

Reason: the project currently keeps the structural hooks in markup for future experimentation, but the visible UI should not show these labels in the current presentation.

## Continue

Load the stable source documents listed in [the evidence map](docs/EVIDENCE-MAP.md), then [the latest session delta](docs/SESSION-DELTA-2026-09-09.md). Keep subsequent deltas separate instead of rewriting the workshop history.

See [first review](docs/reviews/FIRST-REVIEW.md), [desktop screenshot](docs/reviews/desktop-final.png), and [390px mobile screenshot](docs/reviews/mobile-final.png).

The local browser bridge in `scripts/browser-review.mjs` uses installed MCP/SDK paths on this machine. It launches Chrome with `--isolated`, registers this project as its output root, and accepts JSON MCP tool requests on stdin. It is review tooling, not a site dependency. Both headed and headless reviews were performed with fresh profiles; no personal Chrome instance was attached.
