import { Page, Locator } from 'playwright';
import { BasePage } from './BasePage';
import { Timeouts } from '../../constants/Timeouts';

// Locators verified against the live app at https://app.ameyahealth.com/login
export class LoginPage extends BasePage {
  // Step 1 — email entry screen
  private readonly emailInput:      Locator;
  private readonly continueButton:  Locator;

  // Step 2 — OTP screen
  private readonly otpScreenHeader: Locator;

  constructor(page: Page) {
    super(page);
    this.emailInput      = page.getByPlaceholder('Enter your email address');
    this.continueButton  = page.getByRole('button', { name: 'Continue' });
    this.otpScreenHeader = page.getByRole('heading', { name: 'Verify your email' });
  }

  async goto(): Promise<void> {
    await this.navigateTo('/login');
  }

  // Step 1: fill email and click Continue
  async enterEmail(email: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.continueButton.click();
  }

  // Step 2: wait for OTP screen, then type all 6 digits.
  // The first digit box auto-focuses when the screen loads,
  // so keyboard.type() fills all 6 boxes in sequence.
  async enterOtp(otp: string): Promise<void> {
    await this.otpScreenHeader.waitFor({ state: 'visible', timeout: Timeouts.PAGE_LOAD });
    await this.page.keyboard.type(otp, { delay: 150 });
    await this.continueButton.click();
  }

  // Full login in one call — caller provides the OTP string
  async loginWithOtp(email: string, otp: string): Promise<void> {
    await this.enterEmail(email);
    await this.enterOtp(otp);
  }

  async isOtpScreenVisible(): Promise<boolean> {
    return this.otpScreenHeader.isVisible();
  }

  async isErrorVisible(): Promise<boolean> {
    return this.page.getByText(/couldn't find|invalid|error/i).isVisible();
  }

  async getPageMessage(): Promise<string | null> {
    return this.page.locator('p').first().textContent();
  }
}
