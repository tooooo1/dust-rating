export type FallbackSizeType = keyof typeof fallbackSize;

export const fallbackSize = {
  CARD: 'CARD',
  FULL: 'FULL',
} as const;
