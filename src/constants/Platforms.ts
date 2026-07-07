export const Platforms = {
  IOS:     'iOS',
  ANDROID: 'Android',
  WEB:     'web',
  MOBILE:  'mobile',
} as const;

export type Platform = typeof Platforms[keyof typeof Platforms];
