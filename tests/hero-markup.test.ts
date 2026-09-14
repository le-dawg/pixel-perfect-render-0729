import { describe, expect, test } from 'vitest';
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const testDir = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(testDir, '..');
const heroComponentPath = resolve(projectRoot, 'src/components/Hero.astro');

describe('hero component markup', () => {
  test('contains #hero-title with hero-rotator and data-lines', () => {
    const html = readFileSync(heroComponentPath, 'utf8');

    expect(html).toContain('id="hero-title"');
    expect(html).toContain('class="hero-rotator"');
    expect(html).toContain('class="hero-rotator-line"');
    expect(html).toContain("We have AI access now, but the tools aren't making us faster");
    expect(html).toContain('data-lines=');
  });

  test('contains .hero-copy-flow with updated subline, support, and closing lines', () => {
    const html = readFileSync(heroComponentPath, 'utf8');

    expect(html).toContain('class="hero-copy-flow"');
    expect(html).toContain('class="hero-subline"');
    expect(html).toContain('AI is an amplifier of your processes: better process leads to much better and faster AI ROI.');
    expect(html).toContain('class="hero-support"');
    expect(html).toContain('across departments');
    expect(html).toContain('across jurisdictions');
    expect(html).toContain('class="hero-closing"');
    expect(html).toContain('If you are drowning in an ocean of opportunity, a hero is what you need.');
  });

  test('imports and executes the rotator client script', () => {
    const html = readFileSync(heroComponentPath, 'utf8');
    expect(html).toContain('../scripts/hero-rotator');
  });
});
