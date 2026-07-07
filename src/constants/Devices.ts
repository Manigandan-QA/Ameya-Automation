export const Devices = {
  IPHONE_15:     'iPhone 15',
  IPHONE_14:     'iPhone 14',
  IPAD_PRO:      'iPad Pro 12.9 2022',
  GALAXY_S24:    'Samsung Galaxy S24',
  GALAXY_TAB_S9: 'Samsung Galaxy Tab S9',
} as const;

export type Device = typeof Devices[keyof typeof Devices];
