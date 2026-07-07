import { Before, After, Status } from '@cucumber/cucumber';
import { WebDriverFactory } from '../drivers/WebDriverFactory';
import { CustomWorld } from '../worlds/CustomWorld';
import { logger } from '../utils/Logger';

Before({ tags: '@web' }, async function (this: CustomWorld) {
  const { browser, context } = await WebDriverFactory.create();
  this.browser = browser;
  this.context = context;
  this.page    = await context.newPage();

  this.page.on('requestfailed', (req) => {
    logger.warn(`Network failure: ${req.url()} [${req.failure()?.errorText}]`);
  });

  this.page.on('console', (msg) => {
    if (msg.type() === 'error') logger.debug(`Console error: ${msg.text()}`);
  });
});

After({ tags: '@web' }, async function (this: CustomWorld, scenario) {
  if (scenario.result?.status === Status.FAILED && this.page) {
    const screenshot = await this.page.screenshot({ fullPage: true });
    this.attach(screenshot, 'image/png');
    logger.error(`Screenshot attached — ${scenario.pickle.name}`);
  }
  await this.context?.close();
  await this.browser?.close();
});
