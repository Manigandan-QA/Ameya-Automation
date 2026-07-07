import { remote, Browser } from 'webdriverio';
import { Config } from '../config/ConfigLoader';
import bsMobileCaps from '../config/devices/browserstack-mobile.json';

const DEVICE_INDEX = parseInt(process.env.BS_DEVICE_INDEX ?? '0', 10);

export class MobileDriverFactory {
  static async create(): Promise<Browser> {
    if (Config.execMode === 'browserstack') {
      return this.createBrowserStackSession();
    }
    return this.createLocalSession();
  }

  private static async createBrowserStackSession(): Promise<Browser> {
    const caps = bsMobileCaps[DEVICE_INDEX];
    return remote({
      hostname: 'hub.browserstack.com',
      port: 443,
      protocol: 'https' as const,
      path: '/wd/hub',
      capabilities: {
        'bstack:options': {
          userName: Config.browserstack.username,
          accessKey: Config.browserstack.accessKey,
          deviceName: caps.deviceName,
          osVersion: caps.osVersion,
          appiumVersion: '2.0.0',
          networkLogs: true,
          consoleLogs: 'info',
          build: caps.build.replace('${BUILD_NUMBER}', process.env.BUILD_NUMBER ?? 'local'),
        },
        'appium:app': Config.browserstack.appUrl,
        platformName: caps.platformName,
        'appium:newCommandTimeout': 90,
      },
    });
  }

  private static async createLocalSession(): Promise<Browser> {
    const isIOS = Config.mobile.localPlatform === 'iOS';
    return remote({
      hostname: Config.mobile.appiumHost,
      port: Config.mobile.appiumPort,
      capabilities: {
        platformName: Config.mobile.localPlatform,
        'appium:automationName': isIOS ? 'XCUITest' : 'UiAutomator2',
        'appium:app': Config.mobile.localAppPath,
        'appium:newCommandTimeout': 90,
      },
    });
  }
}
