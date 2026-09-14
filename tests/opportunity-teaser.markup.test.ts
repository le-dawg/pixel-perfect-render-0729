import { describe, expect, test } from 'vitest';
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const testDir = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(testDir, '..');
const componentPath = resolve(projectRoot, 'src/components/OpportunityTeaser.astro');
const sourceStylesPath = resolve(projectRoot, 'src/styles/global.css');

describe('opportunity teaser markup', () => {
  test('home page includes the floating teaser shell', () => {
    const html = readFileSync(componentPath, 'utf8');

    expect(html).toContain('data-opportunity-teaser');
    expect(html).toContain('data-opportunity-trigger');
    expect(html).toContain('Available soon');
  });

  test('teaser markup includes the voice-agent description copy', () => {
    const html = readFileSync(componentPath, 'utf8');

    expect(html).toContain('Do you prefer sharing your thoughts via voice? A locally processing voice agent (on your device, yes!) is coming to this page soon! Stay tuned for GDPR-safe agentic assessments.');
  });

  test('teaser markup includes three personas and a southern blank-zone hook', () => {
    const html = readFileSync(componentPath, 'utf8');

    expect(html.match(/data-opportunity-persona/g)?.length).toBe(3);
    expect(html).toContain('data-opportunity-south-gap');
  });

  test('teaser styles keep the widget fixed to the viewport', () => {
    const css = readFileSync(sourceStylesPath, 'utf8');

    expect(css).toMatch(/\.opportunity-teaser\s*\{[^}]*position:\s*fixed;/s);
    expect(css).toMatch(/\.opportunity-teaser\s*\{[^}]*right:\s*clamp\(/s);
    expect(css).toMatch(/\.opportunity-teaser\s*\{[^}]*bottom:\s*clamp\(/s);
  });

  test('southern gap layer is disabled instead of removed', () => {
    const css = readFileSync(sourceStylesPath, 'utf8');

    expect(css).toMatch(/\.opportunity-teaser-south-gap\s*\{[^}]*display:\s*none;/s);
  });

  test('description copy is hidden by default and only shown in the open state', () => {
    const css = readFileSync(sourceStylesPath, 'utf8');

    expect(css).toMatch(/\.opportunity-teaser-description\s*\{[^}]*display:\s*none;/s);
    expect(css).toMatch(/body\.opportunity-teaser-open\s+\.opportunity-teaser-description\s*\{[^}]*display:\s*block;/s);
  });
});
