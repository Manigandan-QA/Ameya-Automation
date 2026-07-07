export const Tags = {
  P0:     '@P0',
  P1:     '@P1',
  P2:     '@P2',
  SMOKE:  '@smoke',
  WEB:    '@web',
  MOBILE: '@mobile',
  FLAKY:  '@flaky',
} as const;

export type Tag = typeof Tags[keyof typeof Tags];
