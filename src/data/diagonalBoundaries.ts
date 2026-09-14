export const boundaryOrder = [
  'heroToProof',
  'proofToMethod',
  'methodToTimeline',
  'timelineToFit',
  'fitToContact',
] as const;

export const diagonalBoundaries = {
  topBoundaryDirection: 'positive',
  angleAbsDeg: 5,
  boundaryOrder,
  boundaries: {
    heroToProof: {
      enabled: true,
      directionRelationToPrevious: 'same',
      fromToken: 'canvas',
      toToken: 'surface',
      desktopDepthPx: 160,
      tabletDepthPx: 112,
      mobileDepthPx: 72,
      overscanXPx: 140,
      overlapPx: 2,
    },
    proofToMethod: {
      enabled: true,
      directionRelationToPrevious: 'flip',
      fromToken: 'surface',
      toToken: 'method-bg',
      desktopDepthPx: 128,
      tabletDepthPx: 96,
      mobileDepthPx: 64,
      overscanXPx: 120,
      overlapPx: 2,
    },
    methodToTimeline: {
      enabled: true,
      directionRelationToPrevious: 'same',
      fromToken: 'method-bg',
      toToken: 'canvas',
      desktopDepthPx: 112,
      tabletDepthPx: 88,
      mobileDepthPx: 56,
      overscanXPx: 110,
      overlapPx: 2,
    },
    timelineToFit: {
      enabled: true,
      directionRelationToPrevious: 'flip',
      fromToken: 'canvas',
      toToken: 'surface',
      desktopDepthPx: 128,
      tabletDepthPx: 96,
      mobileDepthPx: 64,
      overscanXPx: 120,
      overlapPx: 2,
    },
    fitToContact: {
      enabled: true,
      directionRelationToPrevious: 'flip',
      fromToken: 'surface',
      toToken: 'pastel',
      desktopDepthPx: 144,
      tabletDepthPx: 104,
      mobileDepthPx: 68,
      overscanXPx: 130,
      overlapPx: 2,
    },
    contactToFooter: {
      enabled: false,
      fromToken: 'pastel',
      toToken: 'canvas',
      desktopDepthPx: 0,
      tabletDepthPx: 0,
      mobileDepthPx: 0,
      overscanXPx: 0,
      overlapPx: 0,
    },
  },
} as const;

export type OrderedBoundaryKey = (typeof boundaryOrder)[number];
export type BoundaryKey = keyof typeof diagonalBoundaries.boundaries;
export type BoundaryToken = 'canvas' | 'surface' | 'method-bg' | 'pastel';

export type BoundaryBaseConfig = {
  enabled: boolean;
  directionRelationToPrevious: 'same' | 'flip';
  fromToken: BoundaryToken;
  toToken: BoundaryToken;
  desktopDepthPx: number;
  tabletDepthPx: number;
  mobileDepthPx: number;
  overscanXPx: number;
  overlapPx: number;
};

export type ResolvedBoundaryConfig = BoundaryBaseConfig & {
  angleDeg: number;
};
