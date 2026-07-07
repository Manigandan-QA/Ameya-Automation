import { Page, Locator } from 'playwright';
import { BasePage } from './BasePage';

export class TrackerPage extends BasePage {
  private readonly systolicInput: Locator;
  private readonly diastolicInput: Locator;
  private readonly saveEntryButton: Locator;
  private readonly trackerHistory: Locator;
  private readonly trendChart: Locator;

  constructor(page: Page) {
    super(page);
    this.systolicInput  = page.getByTestId('bp-systolic-input');
    this.diastolicInput = page.getByTestId('bp-diastolic-input');
    this.saveEntryButton = page.getByTestId('tracker-save-btn');
    this.trackerHistory  = page.getByTestId('tracker-history-list');
    this.trendChart      = page.getByTestId('tracker-trend-chart');
  }

  async isLoaded(): Promise<boolean> {
    return this.isVisible(this.trackerHistory);
  }

  async enterBloodPressureReading(systolic: string, diastolic: string): Promise<void> {
    await this.systolicInput.fill(systolic);
    await this.diastolicInput.fill(diastolic);
  }

  async saveEntry(): Promise<void> {
    await this.saveEntryButton.click();
  }

  async isEntryInHistory(systolic: string): Promise<boolean> {
    return this.page.getByTestId('tracker-history-list').getByText(systolic).isVisible();
  }

  async isTrendChartVisible(): Promise<boolean> {
    return this.isVisible(this.trendChart);
  }
}
