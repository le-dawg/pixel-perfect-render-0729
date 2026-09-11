import {
  diagonalBoundaries,
  type BoundaryConfig,
  type BoundaryKey,
} from '../data/diagonalBoundaries';

export function getBoundaryConfig(boundary: BoundaryKey): BoundaryConfig | null {
  const config = diagonalBoundaries.boundaries[boundary];
  return config ?? null;
}

export function boundaryStyleVars(boundary: BoundaryConfig): Record<string, string> {
  return {
    '--seam-angle': `${boundary.angleDeg}deg`,
    '--seam-color-token': boundary.colorToken,
    '--seam-depth-desktop': `${boundary.desktopDepthPx}px`,
    '--seam-depth-tablet': `${boundary.tabletDepthPx}px`,
    '--seam-depth-mobile': `${boundary.mobileDepthPx}px`,
    '--seam-overscan': `${boundary.overscanXPx}px`,
    '--seam-overlap': `${boundary.overlapPx}px`,
  };
}
