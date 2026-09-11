# Homepage Copy Refresh Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refresh the homepage copy so it more directly sells Dawid's expertise against stalled enterprise AI initiatives, while preserving the site's current operator tone and structure.

**Architecture:** Keep the current Astro component structure and update copy in-place inside the homepage sections that already exist. Make only minimal style changes required to support the expanded pain-point list and the added why-me block.

**Tech Stack:** Astro 7, `.astro` components, plain CSS, npm build pipeline

## Global Constraints

- Preserve the homepage structure and current design direction; this is a copy-first pass, not a layout redesign.
- Use the approved hero thesis exactly: `AI access on its own does not improve business capacity.`
- Use the approved second-line hero direction exactly: `If your organization is seeing more output than value, I help fix the operating problems behind that gap.`
- Use the approved pain-point section headline exactly: `The six failure points that stall AI integrations in corporates`.
- Use the six approved pain-point card concepts and body copy from `content-backlog.md`.
- Add the approved why-me paragraph near `Diagnosis, scope, delivery.`.
- Keep language grounded in technical project management, systems engineering, and design-thinking vocabulary; avoid generic consultancy hype.
- Minimal CSS updates are allowed only if needed to keep the page readable after the copy changes.
- Validation must include `npm run build` and a browser smoke check against the local page copy.

---

## File map

- **Modify:** `src/components/Hero.astro` — hero headline, subline, support paragraph
- **Modify:** `src/components/ProofStrip.astro` — section headline, section support text, expand from 3 to 6 failure-point cards
- **Modify:** `src/components/HowIWork.astro` — add the why-me block beneath or beside the intro copy without changing the section thesis
- **Modify:** `src/pages/index.astro` — update page description / OG description only if needed to stay aligned with the new hero positioning
- **Modify:** `src/styles/global.css` — minimal adjustments for the six-card proof grid and why-me block spacing/typography
- **Reference only:** `content-backlog.md` — approved copy direction and deferred notes

## Agent task brief

Use this as the implementation prompt for the executing agent:

> Update the Astro homepage copy to better sell Dawid's expertise in stalled enterprise AI initiatives. Use `content-backlog.md` as source of truth for the hero thesis, the six failure points, the why-me block, and the tone constraints. Keep the site structure intact, make only minimal CSS changes, and validate by running the build and checking the rendered homepage copy in the browser. The outcome is successful only if the new copy is live in the local page, reads coherently in the existing layout, and preserves the site's grounded operator voice.

## Acceptance criteria

- The hero now states that AI access on its own does not improve business capacity.
- The hero explicitly frames the problem as more output than value.
- The supporting hero copy sounds closer to technical PM / systems engineering / design-thinking language than generic AI marketing copy.
- The proof/pain section now presents six failure points instead of three.
- The pain-point section headline matches the approved wording.
- A why-me block using the approved paragraph appears in the `Diagnosis, scope, delivery.` section.
- The homepage still builds successfully.
- The rendered page remains readable without obvious overflow, broken spacing, or malformed hierarchy.

### Task 1: Refresh hero copy and supporting metadata

**Files:**
- Modify: `src/components/Hero.astro`
- Modify: `src/pages/index.astro`
- Reference: `content-backlog.md`

**Interfaces:**
- Consumes: approved hero copy and support direction from `content-backlog.md`
- Produces: updated hero copy and aligned metadata descriptions for later browser verification

- [ ] **Step 1: Read the approved content source before editing**

Read: `content-backlog.md`

Expected: You can point to the exact approved hero headline, second line, and support paragraph direction before touching code.

- [ ] **Step 2: Update the hero copy in `src/components/Hero.astro`**

Replace the current hero copy block with this structure:

```astro
<p class="hero-kicker">Enterprise AI, data, and workflow delivery</p>
<h1 id="hero-title">AI access on its own does not improve business capacity.</h1>
<p class="hero-subline">If your organization is seeing more output than value, I help fix the operating problems behind that gap.</p>
<p class="hero-support">I help enterprise teams turn fragmented AI, data, and knowledge work into fit-for-purpose delivery systems with clear problem framing, system boundaries, writable context, and evidence-led feedback loops so outputs can be validated, operationalized, and improved without constant rework.</p>
```

- [ ] **Step 3: Align homepage metadata in `src/pages/index.astro`**

Update the page description strings so they reflect the new positioning:

```ts
const pageDescription = 'Dawid Golebiewski helps enterprise teams fix the operating problems that keep AI access from turning into business capacity, trusted delivery, and measurable value.';
```

Update the OG description content to match the new framing:

```astro
<meta property="og:description" content="Fix the operating problems that keep AI access from turning into trusted delivery, business capacity, and measurable value." />
```

- [ ] **Step 4: Run the build to verify copy-only edits compile**

Run: `npm run build`

Expected: build completes successfully and outputs Astro build artifacts with no template errors.

- [ ] **Step 5: Commit the hero refresh**

```bash
git add src/components/Hero.astro src/pages/index.astro
git commit -m "feat: refresh homepage hero positioning"
```

### Task 2: Expand the pain-point section from three cards to six

**Files:**
- Modify: `src/components/ProofStrip.astro`
- Modify: `src/styles/global.css`
- Reference: `content-backlog.md`

**Interfaces:**
- Consumes: approved failure-point headline and six-card copy from `content-backlog.md`
- Produces: six-card pain section and any required grid adjustments for browser verification

- [ ] **Step 1: Replace the section heading and support copy**

In `src/components/ProofStrip.astro`, replace the current heading block with:

```astro
<div class="proof-lead">
  <p class="proof-label">Where initiatives stall</p>
  <h2 id="proof-heading">The six failure points that stall AI integrations in corporates</h2>
  <p>AI access rarely fails on tooling alone. Value usually stalls at the operating layer: expectations, workflow design, leadership distance from the work, weak shared context, rising cleanup load, and cost pressure before the system is ready to convert model capacity into trusted delivery.</p>
</div>
```

- [ ] **Step 2: Expand the pressure list to six approved cards**

Replace the current three-card `<ol class="pressure-list">` with:

```astro
<ol class="pressure-list">
  <li class="pressure-card">
    <span>01</span>
    <div>
      <h3>Tool access without operating expectations</h3>
      <p>Teams get access to models and copilots, but no shared standard for what useful AI work should actually produce.</p>
    </div>
  </li>
  <li class="pressure-card">
    <span>02</span>
    <div>
      <h3>Pre-AI workflows absorb the gains</h3>
      <p>New model capacity gets buried under old approvals, handoffs, reporting loops, and delivery structure.</p>
    </div>
  </li>
  <li class="pressure-card">
    <span>03</span>
    <div>
      <h3>Leadership is too far from the work</h3>
      <p>AI direction weakens when decision-makers are not close enough to the tools to understand real capability, limits, and tradeoffs.</p>
    </div>
  </li>
  <li class="pressure-card">
    <span>04</span>
    <div>
      <h3>Shared context is too thin</h3>
      <p>People and agents cannot do trusted work when the systems, documents, and decisions that matter are only partially accessible.</p>
    </div>
  </li>
  <li class="pressure-card">
    <span>05</span>
    <div>
      <h3>Output rises while ownership drops</h3>
      <p>Teams generate more documents, summaries, and drafts, but too much of it adds cleanup, ambiguity, and review load instead of progress.</p>
    </div>
  </li>
  <li class="pressure-card">
    <span>06</span>
    <div>
      <h3>Cost gets blamed before the operating model</h3>
      <p>AI spend gets questioned before expectations, process design, context access, and quality controls are fixed.</p>
    </div>
  </li>
</ol>
```

- [ ] **Step 3: Adjust the pressure grid only as much as needed**

In `src/styles/global.css`, keep the section visual language but allow the proof cards to wrap cleanly as six items. Update the grid like this:

```css
.pressure-list {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 24px;
}

@media (max-width: 1100px) {
  .pressure-list {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
```

If a matching responsive block already exists later in the file, update that block instead of duplicating logic.

- [ ] **Step 4: Run the build to verify the section compiles**

Run: `npm run build`

Expected: build completes successfully with the six-card section included.

- [ ] **Step 5: Commit the pain-point section update**

```bash
git add src/components/ProofStrip.astro src/styles/global.css
git commit -m "feat: expand homepage AI failure points"
```

### Task 3: Add the why-me block to the diagnosis/scope/delivery section

**Files:**
- Modify: `src/components/HowIWork.astro`
- Modify: `src/styles/global.css`
- Reference: `content-backlog.md`

**Interfaces:**
- Consumes: approved why-me paragraph from `content-backlog.md`
- Produces: visible expertise bridge between the section intro and the process steps

- [ ] **Step 1: Insert the why-me block into `src/components/HowIWork.astro`**

Add a dedicated paragraph block after the existing intro paragraph and before the ordered list:

```astro
  <div class="method-why-me">
    <p>I’ve worked in environments where delivery had to survive real operating constraints: robotics deployments, research-heavy evidence pipelines, and enterprise AI programs with actual stakeholders, budgets, and execution pressure. That is why I focus less on AI theater and more on making initiatives executable, trustworthy, and operationally clear.</p>
  </div>
```

Full intro section target:

```astro
<div class="method-intro">
  <p class="method-label">How I work</p>
  <h2 id="method-title">Diagnosis, scope, delivery.</h2>
  <p>I do best when the team already knows the work matters, but tool access, process design, and delivery expectations have drifted apart. The job is to reduce ambiguity fast enough that execution becomes possible again.</p>
  <div class="method-why-me">
    <p>I’ve worked in environments where delivery had to survive real operating constraints: robotics deployments, research-heavy evidence pipelines, and enterprise AI programs with actual stakeholders, budgets, and execution pressure. That is why I focus less on AI theater and more on making initiatives executable, trustworthy, and operationally clear.</p>
  </div>
</div>
```

- [ ] **Step 2: Add minimal styling for the new why-me block**

In `src/styles/global.css`, add a focused style block near the existing `.method-intro` rules:

```css
.method-why-me {
  margin-top: 22px;
  padding-top: 18px;
  border-top: 1px solid var(--line);
}

.method-why-me p {
  margin: 0;
  max-width: 48ch;
  font-size: 15px;
  line-height: 1.7;
  color: var(--muted);
}
```

- [ ] **Step 3: Run the build and verify the block reads cleanly**

Run: `npm run build`

Expected: build completes successfully and no CSS syntax issues are introduced.

- [ ] **Step 4: Smoke-check the rendered page in the browser**

Run the local dev server if needed, then inspect `http://localhost:4321/`.

Verify:
- the hero copy matches the approved text
- the proof section shows six cards
- the new why-me block appears under `Diagnosis, scope, delivery.`
- no visible overflow or hierarchy break is introduced by the longer copy

- [ ] **Step 5: Commit the why-me addition and final polish**

```bash
git add src/components/HowIWork.astro src/styles/global.css
git commit -m "feat: add homepage why-me credibility block"
```

### Task 4: Final verification pass

**Files:**
- Modify: none unless a small copy-fit fix is required
- Test: homepage build and local browser review

**Interfaces:**
- Consumes: all prior tasks completed
- Produces: final verified homepage refresh ready for review

- [ ] **Step 1: Run the full build one more time**

Run: `npm run build`

Expected: PASS

- [ ] **Step 2: Verify the implemented copy against `content-backlog.md`**

Check each of these manually:
- hero thesis line matches
- hero second line matches
- support paragraph reflects the approved systems-engineering / technical-PM tone
- six pain-point cards match the backlog wording
- why-me paragraph matches the approved text

Expected: all approved copy changes are present with no drift.

- [ ] **Step 3: Capture review notes for anything left intentionally deferred**

Document in the PR or review summary:
- the `I solve this by` section remains deferred and is intentionally left in `content-backlog.md`
- any wording not implemented exactly due to fit constraints must be called out explicitly

- [ ] **Step 4: Commit any final fit-only adjustments**

```bash
git add src/components/Hero.astro src/components/ProofStrip.astro src/components/HowIWork.astro src/pages/index.astro src/styles/global.css
git commit -m "chore: finalize homepage copy refresh"
```
