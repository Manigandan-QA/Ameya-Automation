import { Page, Locator } from 'playwright';
import { BasePage } from './BasePage';

// Locators verified against the live Prehab4Me home screen.
export class HomePage extends BasePage {
  private readonly weeklyActivitiesHeading: Locator;
  private readonly programBanner:           Locator;
  private readonly weekIndicator:           Locator;

  constructor(page: Page) {
    super(page);
    this.weeklyActivitiesHeading = page.getByText("This Week's Activities");
    this.programBanner           = page.getByText('Your program has');
    this.weekIndicator           = page.getByText(/Week \d+ \/ \d+/);
  }

  async isLoaded(): Promise<boolean> {
    return this.isVisible(this.weeklyActivitiesHeading);
  }

  async isWeeklyActivitiesVisible(): Promise<boolean> {
    return this.isVisible(this.weeklyActivitiesHeading);
  }

  async hasActivityCards(): Promise<boolean> {
    // Nav bar has 3 links (Home/Resources/Me); any beyond that are activity cards
    const total = await this.page.getByRole('link').count();
    return total > 3;
  }

  async getWeekText(): Promise<string | null> {
    return this.weekIndicator.textContent();
  }

  async isProgramBannerVisible(): Promise<boolean> {
    return this.isVisible(this.programBanner);
  }
}
