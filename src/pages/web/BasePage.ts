import { Page, Locator } from 'playwright';
import { Config } from '../../config/ConfigLoader';

export abstract class BasePage {
  constructor(protected page: Page) {}

  protected async navigateTo(path: string): Promise<void> {
    await this.page.goto(`${Config.web.baseUrl}${path}`);
    await this.page.waitForLoadState('networkidle');
  }

  protected async isVisible(locator: Locator): Promise<boolean> {
    return locator.isVisible();
  }

  async takeScreenshot(name: string): Promise<Buffer> {
    return this.page.screenshot({
      fullPage: true,
      path: `reports/screenshots/${name}-${Date.now()}.png`,
    });
  }
}
