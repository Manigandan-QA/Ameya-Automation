import type { Browser } from 'webdriverio';
import { BaseScreen } from './BaseScreen';

export class HomeScreen extends BaseScreen {
  private readonly sel = {
    dailyGuide: '~home-daily-guide',
    welcomeMessage: '~home-welcome-message',
    exerciseTab: '~tab-exercise',
    surveyTab: '~tab-surveys',
    brainGamesTab: '~tab-brain-games',
    messagingTab: '~tab-messaging',
    profileIcon: '~profile-icon',
  };

  constructor(driver: Browser) {
    super(driver);
  }

  async waitForScreen(): Promise<void> {
    await this.waitForElement(this.sel.dailyGuide, 15000);
  }

  async isLoaded(): Promise<boolean> {
    return this.isDisplayed(this.sel.dailyGuide);
  }

  async getWelcomeText(): Promise<string> {
    return this.getText(this.sel.welcomeMessage);
  }

  async tapExerciseTab(): Promise<void> {
    await this.tap(this.sel.exerciseTab);
  }

  async tapSurveysTab(): Promise<void> {
    await this.tap(this.sel.surveyTab);
  }

  async tapBrainGamesTab(): Promise<void> {
    await this.tap(this.sel.brainGamesTab);
  }

  async tapMessaging(): Promise<void> {
    await this.tap(this.sel.messagingTab);
  }

  async tapProfile(): Promise<void> {
    await this.tap(this.sel.profileIcon);
  }
}
