import type { Browser } from 'webdriverio';

export abstract class BaseScreen {
  constructor(protected driver: Browser) {}

  protected async waitForElement(selector: string, timeout = 10000): Promise<void> {
    const el = await this.driver.$(selector);
    await el.waitForDisplayed({ timeout });
  }

  protected async tap(selector: string): Promise<void> {
    const el = await this.driver.$(selector);
    await el.click();
  }

  protected async setValue(selector: string, value: string): Promise<void> {
    const el = await this.driver.$(selector);
    await el.setValue(value);
  }

  protected async getText(selector: string): Promise<string> {
    const el = await this.driver.$(selector);
    return el.getText();
  }

  protected async isDisplayed(selector: string): Promise<boolean> {
    try {
      const el = await this.driver.$(selector);
      return el.isDisplayed();
    } catch {
      return false;
    }
  }

  async takeScreenshot(): Promise<string> {
    return this.driver.takeScreenshot();
  }
}
