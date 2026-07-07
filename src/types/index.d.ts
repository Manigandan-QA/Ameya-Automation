/// <reference types="node" />

declare namespace NodeJS {
  interface ProcessEnv {
    EXEC_MODE?: 'local' | 'browserstack';
    TEST_ENV?: 'local' | 'qa' | 'staging';

    WEB_BASE_URL?: string;
    TEST_USER_EMAIL?: string;

    // IMAP / OTP
    IMAP_HOST?: string;
    IMAP_PORT?: string;
    IMAP_USER?: string;
    IMAP_PASSWORD?: string;
    IMAP_OTP_FROM?: string;
    IMAP_OTP_TIMEOUT_MS?: string;

    // BrowserStack
    BROWSERSTACK_USERNAME?: string;
    BROWSERSTACK_ACCESS_KEY?: string;
    BROWSERSTACK_APP_URL?: string;

    // Local Appium
    LOCAL_PLATFORM?: 'iOS' | 'Android';
    LOCAL_APP_PATH?: string;
    LOCAL_APPIUM_HOST?: string;
    LOCAL_APPIUM_PORT?: string;

    CI?: string;
    BUILD_NUMBER?: string;
    DEBUG?: string;
    BS_DEVICE_INDEX?: string;
  }
}
