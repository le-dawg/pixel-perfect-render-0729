import {
  boundaryOrder,
  diagonalBoundaries,
  type BoundaryKey,
  type OrderedBoundaryKey,
  type ResolvedBoundaryConfig,
} from '../data/diagonalBoundaries';

const topDirectionSign = diagonalBoundaries.topBoundaryDirection === 'positive' ? 1 : -1;

function resolveDirectionSign(boundary: OrderedBoundaryKey): number {
  let sign = topDirectionSign;

  for (const currentBoundary of boundaryOrder) {
    const config = diagonalBoundaries.boundaries[currentBoundary];

    if (currentBoundary !== boundary && config.directionRelationToPrevious === 'flip') {
      sign *= -1;
      continue;
    }

    if (currentBoundary === boundary) {
      if (currentBoundary !== boundaryOrder[0] && config.directionRelationToPrevious === 'flip') {
        sign *= -1;
      }

      return sign;
    }
  }

  return sign;
}

export function getBoundaryConfig(boundary: BoundaryKey): ResolvedBoundaryConfig | null {
  const config = diagonalBoundaries.boundaries[boundary];

  if (!config) {
    return null;
  }

  if (boundary === 'contactToFooter') {
    return {
      ...config,
      angleDeg: 0,
    };
  }

  const orderIndex = boundaryOrder.indexOf(boundary as OrderedBoundaryKey);
  const directionSign = resolveDirectionSign(boundary as OrderedBoundaryKey);

  return {
    ...config,
    angleDeg: diagonalBoundaries.angleAbsDeg * directionSign,
  };
}

export function boundaryStyleVars(boundary: ResolvedBoundaryConfig): Record<string, string> {
  return {
    '--seam-angle': `${boundary.angleDeg}deg`,
    '--seam-from': `var(--${boundary.fromToken})`,
    '--seam-to': `var(--${boundary.toToken})`,
    '--seam-depth-desktop': `${boundary.desktopDepthPx}px`,
    '--seam-depth-tablet': `${boundary.tabletDepthPx}px`,
    '--seam-depth-mobile': `${boundary.mobileDepthPx}px`,
    '--seam-overscan': `${boundary.overscanXPx}px`,
    '--seam-overlap': `${boundary.overlapPx}px`,
  };
}
