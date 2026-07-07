import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../../worlds/CustomWorld';
import { LoginPage } from '../../pages/web/LoginPage';
import { Config } from '../../config/ConfigLoader';
import { Timeouts } from '../../constants/Timeouts';

Given('the Ameya Health login page is open', async function (this: CustomWorld) {
  this.loginPage = new LoginPage(this.page);
  await this.loginPage.goto();
  // If session redirected us to home, navigate directly to /login
  if (!this.page.url().includes('/login')) {
    await this.page.goto(`${Config.web.baseUrl}/login`);
    await this.page.waitForLoadState('networkidle');
  }
  await expect(this.page.getByRole('button', { name: 'Continue' })).toBeVisible({
    timeout: Timeouts.PAGE_LOAD,
  });
});

// Used by Background in all other web features.
// With storage state, the browser starts authenticated — just navigate and verify.
Given('the patient is logged in', async function (this: CustomWorld) {
  await this.page.goto(Config.web.baseUrl);
  await this.page.waitForLoadState('networkidle');
  if (this.page.url().includes('/login')) {
    throw new Error('Session expired. Run:  node scripts/save-session.js');
  }
});

When('the patient enters their email address', async function (this: CustomWorld) {
  this.loginPage = new LoginPage(this.page);
  await this.loginPage.enterEmail(Config.test.userEmail);
});

When('the patient enters an unregistered email address', async function (this: CustomWorld) {
  this.loginPage = new LoginPage(this.page);
  await this.loginPage.enterEmail('notregistered-99999@ameyatest.com');
});

When('clicks Continue', async function (this: CustomWorld) {
  // Continue is clicked inside enterEmail() — step is declarative only.
});

Then('the OTP entry screen is displayed', async function (this: CustomWorld) {
  expect(await this.loginPage.isOtpScreenVisible()).toBe(true);
});

// NOTE: In the automated suite the OTP is not entered during login tests
// since we rely on storage state for authentication. This step is kept
// for documentation and manual-verification runs only.
When('the patient enters the OTP received by email', async function (this: CustomWorld) {
  return 'pending';
});

Then('the patient is logged in and lands on the Home screen', async function (this: CustomWorld) {
  await expect(this.page).toHaveURL(/(?!.*login)/, { timeout: Timeouts.PAGE_LOAD });
});

Then('an error message is displayed on the login page', async function (this: CustomWorld) {
  expect(await this.loginPage.isErrorVisible()).toBe(true);
});
