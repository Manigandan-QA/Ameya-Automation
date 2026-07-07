import type { Browser } from 'webdriverio';
import { BaseScreen } from './BaseScreen';

export class BiometricScreen extends BaseScreen {
  private readonly sel = {
    prompt:  '~biometric-prompt',
    bypass:  '~biometric-bypass-btn',  // only present in test/debug builds
    cancel:  '~biometric-cancel-btn',
  };

  constructor(driver: Browser) {
    super(driver);
  }

  async waitForPrompt(timeout = 10000): Promise<void> {
    await this.waitForElement(this.sel.prompt, timeout);
  }

  async isPromptVisible(): Promise<boolean> {
    return this.isDisplayed(this.sel.prompt);
  }

  // Only available in debug/test builds — triggers the mock biometric success path.
  // Production builds never expose this element.
  async applyTestBypass(): Promise<void> {
    await this.tap(this.sel.bypass);
  }

  async cancelBiometric(): Promise<void> {
    await this.tap(this.sel.cancel);
  }
}
