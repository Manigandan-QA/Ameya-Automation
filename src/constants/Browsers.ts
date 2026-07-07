export const Browsers = {
  CHROMIUM: 'chromium',
  FIREFOX:  'firefox',
  WEBKIT:   'webkit',
  CHROME:   'chrome',
  SAFARI:   'safari',
  EDGE:     'edge',
} as const;

export type Browser = typeof Browsers[keyof typeof Browsers];
