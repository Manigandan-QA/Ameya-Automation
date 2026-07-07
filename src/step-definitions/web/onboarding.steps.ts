import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../../worlds/CustomWorld';
import { Config } from '../../config/ConfigLoader';
import { TestDataBuilder } from '../../utils/TestDataBuilder';
import { Timeouts } from '../../constants/Timeouts';

Given('a new patient registration is started', async function (this: CustomWorld) {
  await this.page.goto(`${Config.web.baseUrl}/register`);
  await this.page.waitForLoadState('networkidle');
});

When('the patient completes the profile setup form', async function (this: CustomWorld) {
  const data = TestDataBuilder.buildPatient();
  await this.page.getByTestId('profile-first-name').fill(data.firstName);
  await this.page.getByTestId('profile-last-name').fill(data.lastName);
  await this.page.getByTestId('profile-dob').fill(data.dateOfBirth);
  await this.page.getByTestId('profile-phone').fill(data.phone);
});

When('submits the onboarding form', async function (this: CustomWorld) {
  await this.page.getByTestId('onboarding-submit-btn').click();
});

Then('the patient is directed to the Home screen', async function (this: CustomWorld) {
  await expect(this.page.getByTestId('home-daily-guide')).toBeVisible({ timeout: Timeouts.PAGE_LOAD });
});

Then('the profile display name is shown correctly', async function (this: CustomWorld) {
  await this.page.getByTestId('profile-avatar').click();
  await expect(this.page.getByTestId('profile-display-name')).toBeVisible({ timeout: Timeouts.ELEMENT });
});
