import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../../worlds/CustomWorld';
import { Timeouts } from '../../constants/Timeouts';

Then('the weekly activities section is visible', async function (this: CustomWorld) {
  await expect(
    this.page.getByText("This Week's Activities")
  ).toBeVisible({ timeout: Timeouts.PAGE_LOAD });
});

Then('at least one activity card is displayed', async function (this: CustomWorld) {
  // Nav has 3 links (Home/Resources/Me); any beyond that are activity cards
  const total = await this.page.getByRole('link').count();
  expect(total).toBeGreaterThan(3);
});

When('the patient clicks the first activity card', async function (this: CustomWorld) {
  // Click the first clickable activity card on the home screen
  await this.page.locator('a[href], article, [class*="card"]').first().click();
  await this.page.waitForLoadState('networkidle');
});

Then('the activity detail page is displayed', async function (this: CustomWorld) {
  await expect(this.page).not.toHaveURL(new RegExp(`^${this.page.url()}$`));
});
