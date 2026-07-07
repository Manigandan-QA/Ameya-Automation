import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../../worlds/CustomWorld';
import { LoginScreen } from '../../screens/mobile/LoginScreen';
import { HomeScreen } from '../../screens/mobile/HomeScreen';
import { Config } from '../../config/ConfigLoader';

// NOTE: Mobile login flow (OTP vs password) to be confirmed once
// the mobile app login screen is inspected. Steps are structured
// for OTP; update LoginScreen.login() signature when confirmed.

Given('the mobile app is launched', async function (this: CustomWorld) {
  this.loginScreen = new LoginScreen(this.driver);
  await this.loginScreen.waitForScreen();
});

Given('the patient is logged in on mobile', async function (this: CustomWorld) {
  this.loginScreen = new LoginScreen(this.driver);
  await this.loginScreen.waitForScreen();
  await this.loginScreen.login(Config.test.userEmail);
  this.homeScreen = new HomeScreen(this.driver);
  await this.homeScreen.waitForScreen();
});

When('the patient enters valid credentials on the mobile login screen', async function (this: CustomWorld) {
  await this.loginScreen.login(Config.test.userEmail);
});

When('the patient enters invalid credentials on the mobile login screen', async function (this: CustomWorld) {
  await this.loginScreen.login('notregistered-99999@ameyatest.com');
});

Then('the Home screen is displayed on mobile', async function (this: CustomWorld) {
  this.homeScreen = new HomeScreen(this.driver);
  await this.homeScreen.waitForScreen();
  expect(await this.homeScreen.isLoaded()).toBe(true);
});

Then('a login error message is shown on mobile', async function (this: CustomWorld) {
  const error = await this.loginScreen.getErrorMessage();
  expect(error.length).toBeGreaterThan(0);
});
