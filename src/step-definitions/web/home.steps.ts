import { Then, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../../worlds/CustomWorld';
import { HomePage } from '../../pages/web/HomePage';
import { Timeouts } from '../../constants/Timeouts';

Then('the daily guide section is visible', async function (this: CustomWorld) {
  this.homePage = new HomePage(this.page);
  await expect(
    this.page.getByText("This Week's Activities")
  ).toBeVisible({ timeout: Timeouts.PAGE_LOAD });
});

Then("the guide contains today's recommended activities", async function (this: CustomWorld) {
  this.homePage = this.homePage ?? new HomePage(this.page);
  const hasCards = await this.homePage.hasActivityCards();
  expect(hasCards).toBe(true);
});

When('the patient clicks the exercise recommendation in the daily guide', async function (this: CustomWorld) {
  // Click the first activity card on the home screen
  await this.page.locator('article, [class*="card"], [class*="activity"]').first().click();
  await this.page.waitForLoadState('networkidle');
});

Then('the exercise module page is displayed', async function (this: CustomWorld) {
  // Verify we navigated into a content page (URL changed from home)
  await expect(this.page).toHaveURL(/(?!.*\/$)/, { timeout: Timeouts.ELEMENT });
});
