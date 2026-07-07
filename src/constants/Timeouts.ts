export const Timeouts = {
  STEP:        60_000,   // Cucumber step default
  EXPECT:      30_000,   // Playwright expect polling
  PAGE_LOAD:   15_000,   // waitForLoadState / post-login screen
  ELEMENT:     10_000,   // element visibility / presence
  APPIUM_BOOT: 30_000,   // app launch on device
  NETWORK:      5_000,   // fast in-page API calls
} as const;

export type Timeout = typeof Timeouts[keyof typeof Timeouts];
