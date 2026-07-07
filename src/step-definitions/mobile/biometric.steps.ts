import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../../worlds/CustomWorld';
import { LoginScreen } from '../../screens/mobile/LoginScreen';
import { BiometricScreen } from '../../screens/mobile/BiometricScreen';
import { HomeScreen } from '../../screens/mobile/HomeScreen';

Given('the patient account has biometric login enabled', async function (this: CustomWorld) {
  // Precondition: the test account is provisioned with biometric flag enabled at account level.
});

When('the biometric authentication prompt is shown', async function (this: CustomWorld) {
  this.loginScreen = new LoginScreen(this.driver);
  await this.loginScreen.waitForScreen();
  this.biometricScreen = new BiometricScreen(this.driver);
  await this.biometricScreen.waitForPrompt();
  expect(await this.biometricScreen.isPromptVisible()).toBe(true);
});

When('the test-mode biometric bypass is triggered', async function (this: CustomWorld) {
  await this.biometricScreen.applyTestBypass();
});

Then('the patient lands on the Home screen on mobile', async function (this: CustomWorld) {
  this.homeScreen = new HomeScreen(this.driver);
  await this.homeScreen.waitForScreen();
  expect(await this.homeScreen.isLoaded()).toBe(true);
});
