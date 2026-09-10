# Evidence map

Stable startup prefix, in order (relative to this file):

1. [Original handoff capsule](../../../docs/superpowers/specs/2026-09-09-codex-handoff-capsule.md)
2. [PRODUCT.md](../../../PRODUCT.md)
3. [Updated design and tech spec](../../../docs/superpowers/specs/2026-09-06-0xdawg-design-tech-spec.md)
4. [Recovered OpenWork extract](../../../codex-rehydration-pack/openwork-extracts/0xdawg-newsite-transcript-clean.md)

Then load the latest session delta; do not concatenate the entire archive into the startup context.

Deep reference pointers:

- [Reference board](../../../codex-rehydration-pack/REFERENCE_BOARD.md)
- [Design hypotheses](../../../codex-rehydration-pack/CURRENT_HYPOTHESES.md)
- [Sophos assessment](../../../codex-rehydration-pack/research_design_system_mapping/sophos-alpha-assessment.md)
- [Raw OpenWork snapshot](../../../codex-rehydration-pack/openwork-extracts/0xdawg-newsite-session-snapshot.json)
- Canonical timeline source: `/Users/thedawgctor/Downloads/CV_EN.pdf`, Work Experience, page 1. The original PDF is not copied into public assets.
- Portrait source: `https://github.com/le-dawg.png`, public profile linked by the workshop prompts, retrieved 2026-09-09. Local copy lives under `public/images/`.

Review artifacts:

- `reviews/desktop-initial.png`: initial desktop, before image sizing fix.
- `reviews/mobile-initial.png`: initial narrow-window diagnosis, actually 500px; not a true phone capture.
- `reviews/desktop-final.png`, `reviews/desktop-hero.png`: final desktop.
- `reviews/mobile-final.png`, `reviews/mobile-hero.png`: final true 390px mobile emulation.
- `reviews/mcp-review.jsonl`: non-lossy local tool requests and results, including initial tool failures and later verified corrections.
- `reviews/FIRST-REVIEW.md`: concise interpretation and limitations.

Model handoff requirement remains `gpt-6-astra` primary, with user-specified `gpt-5.6-high` as the strongest allowed fallback; do not silently choose a lower model. The build did not invoke another model or delegate implementation.
