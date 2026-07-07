import { Page, Locator } from 'playwright';
import { BasePage } from './BasePage';

export class SurveyPage extends BasePage {
  private readonly surveyTitle: Locator;
  private readonly questionText: Locator;
  private readonly nextButton: Locator;
  private readonly submitButton: Locator;
  private readonly completionBanner: Locator;

  constructor(page: Page) {
    super(page);
    this.surveyTitle = page.getByTestId('survey-title');
    this.questionText = page.getByTestId('survey-question');
    this.nextButton = page.getByTestId('survey-next-btn');
    this.submitButton = page.getByTestId('survey-submit-btn');
    this.completionBanner = page.getByTestId('survey-completion-banner');
  }

  async isLoaded(): Promise<boolean> {
    return this.isVisible(this.surveyTitle);
  }

  async selectOption(optionTestId: string): Promise<void> {
    await this.page.getByTestId(optionTestId).click();
  }

  async clickNext(): Promise<void> {
    await this.nextButton.click();
  }

  async submitSurvey(): Promise<void> {
    await this.submitButton.click();
  }

  async answerAllQuestionsWithFirstOption(): Promise<void> {
    let hasNext = await this.isVisible(this.nextButton);
    while (true) {
      await this.selectOption('survey-option-0');
      hasNext = await this.isVisible(this.nextButton);
      if (!hasNext) break;
      await this.clickNext();
    }
  }

  async isCompletionVisible(): Promise<boolean> {
    return this.isVisible(this.completionBanner);
  }

  async isFirstOptionSelected(): Promise<boolean> {
    const attr = await this.page.getByTestId('survey-option-0').getAttribute('data-selected');
    return attr === 'true';
  }
}
