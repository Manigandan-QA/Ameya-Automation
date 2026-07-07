import type { Browser } from 'webdriverio';
import { BaseScreen } from './BaseScreen';

export class LoginScreen extends BaseScreen {
  private readonly sel = {
    emailInput: '~login-email',
    passwordInput: '~login-password',
    signInButton: '~sign-in-button',
    errorMessage: '~login-error-message',
    forgotPasswordLink: '~forgot-password-link',
    biometricPrompt: '~biometric-prompt',
    biometricBypass: '~biometric-bypass-btn',
  };

  constructor(driver: Browser) {
    super(driver);
  }

  async waitForScreen(): Promise<void> {
    await this.waitForElement(this.sel.emailInput);
  }

  // Mobile login flow (OTP or password) to be confirmed on first mobile run.
  // Providing only email for now — extend with OTP step once screen is inspected.
  async login(email: string): Promise<void> {
    await this.setValue(this.sel.emailInput, email);
    await this.tap(this.sel.signInButton);
  }

  async getErrorMessage(): Promise<string> {
    return this.getText(this.sel.errorMessage);
  }

  async isBiometricPromptVisible(): Promise<boolean> {
    return this.isDisplayed(this.sel.biometricPrompt);
  }

  async applyBiometricBypass(): Promise<void> {
    await this.tap(this.sel.biometricBypass);
  }

  async tapForgotPassword(): Promise<void> {
    await this.tap(this.sel.forgotPasswordLink);
  }
}
