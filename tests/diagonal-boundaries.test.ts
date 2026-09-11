import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { diagonalBoundaries } from '../src/data/diagonalBoundaries';
import { getBoundaryConfig, boundaryStyleVars } from '../src/lib/diagonalBoundaries';

describe('diagonal boundary config', () => {
  it('keeps a fixed 5 degree system with alternating signs', () => {
    expect(diagonalBoundaries.boundaries.heroToProof.angleDeg).toBe(-5);
    expect(diagonalBoundaries.boundaries.proofToMethod.angleDeg).toBe(5);
    expect(diagonalBoundaries.boundaries.methodToTimeline.angleDeg).toBe(-5);
    expect(diagonalBoundaries.boundaries.timelineToFit.angleDeg).toBe(5);
    expect(diagonalBoundaries.boundaries.fitToContact.angleDeg).toBe(-5);
    expect(diagonalBoundaries.boundaries.contactToFooter.angleDeg).toBe(0);
  });

  it('returns null for disabled boundaries and css vars for enabled ones', () => {
    const enabled = getBoundaryConfig('heroToProof');
    const disabled = getBoundaryConfig('contactToFooter');

    expect(enabled?.enabled).toBe(true);
    expect(disabled?.enabled).toBe(false);
    expect(boundaryStyleVars(enabled!)).toMatchObject({
      '--seam-angle': '-5deg',
      '--seam-color-token': 'surface',
    });
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
});
