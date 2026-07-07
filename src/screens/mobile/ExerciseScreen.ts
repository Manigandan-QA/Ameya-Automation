import type { Browser } from 'webdriverio';
import { BaseScreen } from './BaseScreen';

export class ExerciseScreen extends BaseScreen {
  private readonly sel = {
    exerciseList: '~exercise-list',
    startButton: '~start-exercise-btn',
    exerciseTitle: '~exercise-title',
    exercisePlayer: '~exercise-player',
    progressBar: '~exercise-progress-bar',
    completionMessage: '~exercise-completion-msg',
  };

  constructor(driver: Browser) {
    super(driver);
  }

  async waitForScreen(): Promise<void> {
    await this.waitForElement(this.sel.exerciseList, 10000);
  }

  async isLoaded(): Promise<boolean> {
    return this.isDisplayed(this.sel.exerciseList);
  }

  async startFirstExercise(): Promise<void> {
    await this.tap(this.sel.startButton);
  }

  async getExerciseTitle(): Promise<string> {
    return this.getText(this.sel.exerciseTitle);
  }

  async isPlayerVisible(): Promise<boolean> {
    return this.isDisplayed(this.sel.exercisePlayer);
  }

  async isCompletionVisible(): Promise<boolean> {
    return this.isDisplayed(this.sel.completionMessage);
  }
}
