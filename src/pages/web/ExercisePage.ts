import { Page, Locator } from 'playwright';
import { BasePage } from './BasePage';

export class ExercisePage extends BasePage {
  private readonly exerciseList: Locator;
  private readonly exerciseCards: Locator;
  private readonly startExerciseButton: Locator;
  private readonly exercisePlayer: Locator;
  private readonly progressBar: Locator;
  private readonly completionMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.exerciseList = page.getByTestId('exercise-list');
    this.exerciseCards = page.getByTestId('exercise-card');
    this.startExerciseButton = page.getByTestId('start-exercise-btn');
    this.exercisePlayer = page.getByTestId('exercise-player');
    this.progressBar = page.getByTestId('exercise-progress-bar');
    this.completionMessage = page.getByTestId('exercise-completion-msg');
  }

  async isLoaded(): Promise<boolean> {
    return this.isVisible(this.exerciseList);
  }

  async getExerciseCount(): Promise<number> {
    return this.exerciseCards.count();
  }

  async startFirstExercise(): Promise<void> {
    await this.startExerciseButton.first().click();
  }

  async isPlayerVisible(): Promise<boolean> {
    return this.isVisible(this.exercisePlayer);
  }

  async isProgressBarVisible(): Promise<boolean> {
    return this.isVisible(this.progressBar);
  }

  async isCompletionVisible(): Promise<boolean> {
    return this.isVisible(this.completionMessage);
  }
}
