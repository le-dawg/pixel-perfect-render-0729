import { describe, expect, test } from 'vitest';
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const testDir = dirname(fileURLToPath(import.meta.url));
const globalCssPath = resolve(testDir, '../src/styles/global.css');

describe('hero styling and animations', () => {
  test('includes hero rotator and keyframe animations', () => {
    const css = readFileSync(globalCssPath, 'utf8');

    expect(css).toContain('.hero-rotator');
    expect(css).toContain('.hero-rotator-line');
    expect(css).toContain('@keyframes hero-line-out');
    expect(css).toContain('@keyframes hero-line-in');
  });

  test('includes hero-copy-flow container and text-align rules', () => {
    const css = readFileSync(globalCssPath, 'utf8');

    expect(css).toContain('.hero-copy-flow');
    expect(css).toContain('.hero-closing');
    expect(css).toMatch(/\.hero-subline\s*\{[^}]*text-align:\s*justify/);
    expect(css).toMatch(/\.hero-support\s*\{[^}]*text-align:\s*justify/);
  });

  test('respects prefers-reduced-motion for rotator animations', () => {
    const css = readFileSync(globalCssPath, 'utf8');

    expect(css).toMatch(/@media\s*\(\s*prefers-reduced-motion:\s*reduce\s*\)\s*\{[\s\S]*?\.hero-rotator-line/);
  });
});
