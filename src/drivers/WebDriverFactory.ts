import { chromium, Browser, BrowserContext } from 'playwright';
import fs from 'fs';
import path from 'path';
import { Config } from '../config/ConfigLoader';
import bsWebCaps from '../config/devices/browserstack-web.json';

export interface WebDriverSession {
  browser: Browser;
  context: BrowserContext;
}

const SESSION_PATH = path.resolve(process.cwd(), 'src/test-data/auth/session.json');

export class WebDriverFactory {
  static async create(): Promise<WebDriverSession> {
    if (Config.execMode === 'browserstack') {
      return this.createBrowserStackSession();
    }
    return this.createLocalSession();
  }

  private static async createBrowserStackSession(): Promise<WebDriverSession> {
    const caps = {
      ...bsWebCaps,
      build: bsWebCaps.build.replace('${BUILD_NUMBER}', process.env.BUILD_NUMBER ?? 'local'),
      'browserstack.username': Config.browserstack.username,
      'browserstack.accessKey': Config.browserstack.accessKey,
    };
    const wsEndpoint = `wss://cdp.browserstack.com/playwright?caps=${encodeURIComponent(JSON.stringify(caps))}`;
    const browser = await chromium.connect(wsEndpoint);
    const context = await browser.newContext({ storageState: this.getStorageState() });
    return { browser, context };
  }

  private static async createLocalSession(): Promise<WebDriverSession> {
    const browser = await chromium.launch({ headless: Config.web.headless });
    const context = await browser.newContext({
      viewport: { width: 1280, height: 800 },
      storageState: this.getStorageState(),
    });
    return { browser, context };
  }

  // Returns the saved session path if it exists, undefined otherwise.
  // When undefined, the browser starts with a fresh (logged-out) context.
  private static getStorageState(): string | undefined {
    if (fs.existsSync(SESSION_PATH)) {
      return SESSION_PATH;
    }
    return undefined;
  }
}
