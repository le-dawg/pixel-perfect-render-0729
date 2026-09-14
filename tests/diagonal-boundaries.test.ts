import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { diagonalBoundaries } from '../src/data/diagonalBoundaries';
import { getBoundaryConfig, boundaryStyleVars } from '../src/lib/diagonalBoundaries';

describe('diagonal boundary config', () => {
  it('derives alternating signs from the target first boundary', () => {
    expect(diagonalBoundaries.topBoundaryDirection).toBe('positive');
    expect(diagonalBoundaries.angleAbsDeg).toBe(5);

    const resolved = diagonalBoundaries.boundaryOrder.map((boundary) => getBoundaryConfig(boundary)!);
    expect(resolved.map((item) => item.angleDeg)).toEqual([5, -5, -5, 5, -5]);
  });

  it('returns null for disabled boundaries and css vars for enabled ones', () => {
    const enabled = getBoundaryConfig('heroToProof');
    const disabled = getBoundaryConfig('contactToFooter');

    expect(enabled?.enabled).toBe(true);
    expect(disabled?.enabled).toBe(false);
    expect(boundaryStyleVars(enabled!)).toMatchObject({
      '--seam-angle': '5deg',
      '--seam-from': 'var(--canvas)',
      '--seam-to': 'var(--surface)',
    });
  });

  it('enables exactly the five required boundaries and keeps contact to footer flat', () => {
    expect(Object.keys(diagonalBoundaries.boundaries)).toEqual([
      'heroToProof',
      'proofToMethod',
      'methodToTimeline',
      'timelineToFit',
      'fitToContact',
      'contactToFooter',
    ]);

    const footer = getBoundaryConfig('contactToFooter');
    expect(footer?.enabled).toBe(false);
    expect(footer?.angleDeg).toBe(0);
  });

  it('renders boundaries through a dedicated component with config-driven vars', () => {
    const component = readFileSync(
      new URL('../src/components/DiagonalBoundary.astro', import.meta.url),
      'utf8',
    );

    expect(component).toContain('export interface Props');
    expect(component).toContain('boundary: BoundaryKey');
    expect(component).toContain('getBoundaryConfig(boundary)');
    expect(component).toContain('boundaryStyleVars(config)');
  });

  it('places diagonal boundaries between section components in the homepage', () => {
    const page = readFileSync(
      new URL('../src/pages/index.astro', import.meta.url),
      'utf8',
    );

    expect(page).toContain("import DiagonalBoundary from '../components/DiagonalBoundary.astro'");
    expect(page).toContain('<main id="main"><Hero /><DiagonalBoundary boundary="heroToProof" />');
    expect(page).toContain('<Hero /><DiagonalBoundary boundary="heroToProof" />');
    expect(page).toContain('<ProofStrip /><DiagonalBoundary boundary="proofToMethod" />');
    expect(page).toContain('<HowIWork /><DiagonalBoundary boundary="methodToTimeline" />');
    expect(page).toContain('<Timeline /><DiagonalBoundary boundary="timelineToFit" />');
    expect(page).toContain('<WhoIWorkBestWith /><DiagonalBoundary boundary="fitToContact" />');
    expect(page).toContain('<WhoIWorkBestWith /><DiagonalBoundary boundary="fitToContact" /><ContactBand /></main>');
    expect(page).not.toContain('<header class="site-header wrap"><DiagonalBoundary');
  });

  it('defines dedicated CSS for seam planes and responsive depth variables', () => {
    const css = readFileSync(
      new URL('../src/styles/global.css', import.meta.url),
      'utf8',
    );

    expect(css).toContain('.diagonal-boundary');
    expect(css).toContain('.diagonal-boundary__plane');
    expect(css).toContain('transform: skewY(var(--seam-angle))');
    expect(css).toContain('--seam-depth: var(--seam-depth-desktop)');
    expect(css).toContain('background: var(--seam-from);');
    expect(css).toContain('background: var(--seam-to);');
    expect(css).toContain("top: calc(var(--seam-depth) * 0.5);");
    expect(css).toContain('transform-origin: center top;');
    expect(css).toContain(".diagonal-boundary[data-boundary='heroToProof']");
    expect(css).toContain('mask-image: linear-gradient(#000 0% 74%, #0000 100%);');
    expect(css).toContain("@media (max-width: 1100px)");
    expect(css).toContain("@media (max-width: 760px)");
  });
});
