import { Page, Locator } from 'playwright';
import { BasePage } from './BasePage';

// Navigation verified against the live app — top bar has: Home | Resources | Me
export class NavigationPage extends BasePage {
  private readonly navHome:      Locator;
  private readonly navResources: Locator;
  private readonly navMe:        Locator;

  constructor(page: Page) {
    super(page);
    this.navHome      = page.getByRole('link', { name: 'Home' });
    this.navResources = page.getByRole('link', { name: 'Resources' });
    this.navMe        = page.getByRole('link', { name: 'Me' });
  }

  async goToHome():      Promise<void> { await this.navHome.click();      await this.page.waitForLoadState('networkidle'); }
  async goToResources(): Promise<void> { await this.navResources.click(); await this.page.waitForLoadState('networkidle'); }
  async goToMe():        Promise<void> { await this.navMe.click();        await this.page.waitForLoadState('networkidle'); }

  async areAllNavItemsVisible(): Promise<boolean> {
    return (
      await this.isVisible(this.navHome) &&
      await this.isVisible(this.navResources) &&
      await this.isVisible(this.navMe)
    );
  }
}
