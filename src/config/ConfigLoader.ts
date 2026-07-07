import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

type ExecMode = 'local' | 'browserstack';
type Platform = 'iOS' | 'Android';

interface EnvConfig {
  baseUrl: string;
  apiBaseUrl?: string;
}

function loadEnvConfig(): EnvConfig {
  const env = process.env.TEST_ENV ?? 'staging';
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  return require(path.resolve(__dirname, `env/${env}.json`)) as EnvConfig;
}

export const Config = {
  execMode: (process.env.EXEC_MODE ?? 'local') as ExecMode,

  env: loadEnvConfig(),

  browserstack: {
    username: process.env.BROWSERSTACK_USERNAME ?? '',
    accessKey: process.env.BROWSERSTACK_ACCESS_KEY ?? '',
    appUrl: process.env.BROWSERSTACK_APP_URL ?? '',
  },

  web: {
    baseUrl: process.env.WEB_BASE_URL ?? 'https://app.ameyahealth.com',
    headless: process.env.CI === 'true',
  },

  mobile: {
    localPlatform: (process.env.LOCAL_PLATFORM ?? 'Android') as Platform,
    localAppPath: process.env.LOCAL_APP_PATH ?? './builds/ameya-patient-portal.apk',
    appiumHost: process.env.LOCAL_APPIUM_HOST ?? 'localhost',
    appiumPort: parseInt(process.env.LOCAL_APPIUM_PORT ?? '4723', 10),
  },

  test: {
    userEmail: process.env.TEST_USER_EMAIL ?? '',
  },

  imap: {
    host: process.env.IMAP_HOST ?? 'imap.gmail.com',
    port: parseInt(process.env.IMAP_PORT ?? '993', 10),
    user: process.env.IMAP_USER ?? '',
    password: process.env.IMAP_PASSWORD ?? '',
    otpFrom: process.env.IMAP_OTP_FROM ?? 'noreply@ameyahealth.com',
    otpTimeoutMs: parseInt(process.env.IMAP_OTP_TIMEOUT_MS ?? '30000', 10),
  },
};
