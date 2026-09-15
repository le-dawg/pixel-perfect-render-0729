import { describe, expect, test } from 'vitest';
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const testDir = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(testDir, '..');
const componentPath = resolve(projectRoot, 'src/components/MentalModelBar.astro');
const pagePath = resolve(projectRoot, 'src/pages/index.astro');

const component = readFileSync(componentPath, 'utf8');
const page = readFileSync(pagePath, 'utf8');

describe('mental model bar markup', () => {
  test('starts hidden and exposes the required panel copy and placeholders', () => {
    expect(component).toContain('data-mental-model-trigger');
    expect(component).toContain('hidden');
    expect(component).toContain('aria-hidden="true"');
    expect(component).toContain('If you read nothing else: read this');
    expect(component).toContain("AI is fueled by hype. The hype is warranted, but hasty decisions can lead to costly mistakes. I've seen that.");
    expect(component).toContain('Download it as a PDF here');
    expect(component).toContain('href="#"');
    expect(component).toContain('Mental model visual — placeholder');
    expect(component).toContain('Visual 1');
    expect(component).toContain('Visual 2');
    expect(component).toContain('initMentalModelBar');
  });

  test('homepage inserts MentalModelBar between the hero boundary and proof strip', () => {
    expect(page).toContain("import MentalModelBar from '../components/MentalModelBar.astro';");
    expect(page).toContain('<main id="main"><Hero /><DiagonalBoundary boundary="heroToProof" /><MentalModelBar /><ProofStrip />');
  });
});
