import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../../worlds/CustomWorld';
import { Timeouts } from '../../constants/Timeouts';

const TEST_MESSAGE = 'Automated test message — please disregard';

When('composes and sends a message to the care team', async function (this: CustomWorld) {
  if (this.page) {
    await this.page.getByTestId('compose-message-btn').click();
    await this.page.getByTestId('message-body-input').fill(TEST_MESSAGE);
    await this.page.getByTestId('send-message-btn').click();
  } else {
    await (await this.driver.$('~compose-message-btn')).click();
    await (await this.driver.$('~message-body-input')).setValue(TEST_MESSAGE);
    await (await this.driver.$('~send-message-btn')).click();
  }
});

Then('the sent message appears in the conversation thread', async function (this: CustomWorld) {
  if (this.page) {
    await expect(
      this.page.getByTestId('message-thread')
    ).toContainText(TEST_MESSAGE, { timeout: Timeouts.PAGE_LOAD });
  } else {
    const thread = await this.driver.$('~message-thread');
    const text = await thread.getText();
    expect(text).toContain(TEST_MESSAGE);
  }
});

Given("a message has been sent to the patient's inbox", async function (this: CustomWorld) {
  // Precondition: a seed message is pre-loaded for the test account — no UI action needed.
});

Then('the unread message is visible', async function (this: CustomWorld) {
  if (this.page) {
    await expect(
      this.page.getByTestId('unread-message-badge')
    ).toBeVisible({ timeout: Timeouts.ELEMENT });
  } else {
    expect(await (await this.driver.$('~unread-message-badge')).isDisplayed()).toBe(true);
  }
});

Then('marking the message as read decrements the unread count', async function (this: CustomWorld) {
  if (this.page) {
    const before = Number(await this.page.getByTestId('unread-count').textContent());
    await this.page.getByTestId('unread-message-badge').first().click();
    const after = Number(await this.page.getByTestId('unread-count').textContent());
    expect(after).toBeLessThan(before);
  }
});
