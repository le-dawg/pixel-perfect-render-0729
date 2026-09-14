import { describe, expect, it } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';

describe('astro architecture guard', () => {
  it('keeps Astro page and section components as the implementation surface', () => {
    expect(existsSync(new URL('../src/pages/index.astro', import.meta.url))).toBe(true);
    expect(existsSync(new URL('../src/components/Hero.astro', import.meta.url))).toBe(true);
    expect(existsSync(new URL('../src/components/ProofStrip.astro', import.meta.url))).toBe(true);
    expect(existsSync(new URL('../src/components/HowIWork.astro', import.meta.url))).toBe(true);
    expect(existsSync(new URL('../src/components/Timeline.astro', import.meta.url))).toBe(true);
    expect(existsSync(new URL('../src/components/WhoIWorkBestWith.astro', import.meta.url))).toBe(true);
    expect(existsSync(new URL('../src/components/ContactBand.astro', import.meta.url))).toBe(true);
  });

  it('keeps the wrapped Astro section structure for method, timeline, and fit', () => {
    const method = readFileSync(new URL('../src/components/HowIWork.astro', import.meta.url), 'utf8');
    const timeline = readFileSync(new URL('../src/components/Timeline.astro', import.meta.url), 'utf8');
    const fit = readFileSync(new URL('../src/components/WhoIWorkBestWith.astro', import.meta.url), 'utf8');

    expect(method).toContain('<section class="method wrap"');
    expect(timeline).toContain('<section id="experience" class="experience wrap"');
    expect(fit).toContain('<section class="fit wrap"');
  });
});
