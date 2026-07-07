import { Before, After, Status } from '@cucumber/cucumber';
import { MobileDriverFactory } from '../drivers/MobileDriverFactory';
import { CustomWorld } from '../worlds/CustomWorld';
import { logger } from '../utils/Logger';

Before({ tags: '@mobile' }, async function (this: CustomWorld) {
  this.driver = await MobileDriverFactory.create();
  logger.info('Appium session started');
});

After({ tags: '@mobile' }, async function (this: CustomWorld, scenario) {
  if (scenario.result?.status === Status.FAILED && this.driver) {
    try {
      const screenshot = await this.driver.takeScreenshot();
      this.attach(Buffer.from(screenshot, 'base64'), 'image/png');
      logger.error(`Screenshot attached — ${scenario.pickle.name}`);
    } catch (e) {
      logger.warn('Could not capture failure screenshot', e);
    }
  }
  await this.driver?.deleteSession();
  logger.info('Appium session closed');
});
