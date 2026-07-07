import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../../worlds/CustomWorld';
import { Timeouts } from '../../constants/Timeouts';

When('requests a health summary PDF report', async function (this: CustomWorld) {
  await this.page.getByTestId('export-pdf-btn').click();
});

Then('a PDF file is generated and available for download', async function (this: CustomWorld) {
  await expect(
    this.page.getByTestId('download-pdf-link')
  ).toBeVisible({ timeout: Timeouts.PAGE_LOAD });
});

When('exports health tracker data as CSV', async function (this: CustomWorld) {
  await this.page.getByTestId('export-csv-btn').click();
});

Then('a CSV file is downloaded with valid health records', async function (this: CustomWorld) {
  await expect(
    this.page.getByTestId('export-success-banner')
  ).toBeVisible({ timeout: Timeouts.PAGE_LOAD });
});
