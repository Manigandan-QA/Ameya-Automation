import type { Browser } from 'webdriverio';
import { BaseScreen } from './BaseScreen';

export class NotificationScreen extends BaseScreen {
  private readonly sel = {
    notificationTray:    '~notification-tray',
    notificationItem:    '~notification-item',
    offlineIndicator:    '~offline-indicator',
    syncConfirmation:    '~sync-confirmation-banner',
  };

  constructor(driver: Browser) {
    super(driver);
  }

  async openNotificationTray(): Promise<void> {
    // Pull down from top of screen to reveal notification shade (Android)
    const { width, height } = await this.driver.getWindowSize();
    await this.driver.touchPerform([
      { action: 'press',   options: { x: width / 2, y: 0 } },
      { action: 'moveTo',  options: { x: width / 2, y: height / 2 } },
      { action: 'release', options: {} },
    ]);
  }

  async isNotificationVisible(partialText: string): Promise<boolean> {
    try {
      const items = await this.driver.$$(this.sel.notificationItem);
      for (const item of items) {
        const text = await item.getText();
        if (text.includes(partialText)) return true;
      }
      return false;
    } catch {
      return false;
    }
  }

  async tapNotification(partialText: string): Promise<void> {
    const items = await this.driver.$$(this.sel.notificationItem);
    for (const item of items) {
      const text = await item.getText();
      if (text.includes(partialText)) {
        await item.click();
        return;
      }
    }
    throw new Error(`Notification containing "${partialText}" not found`);
  }

  async isOfflineIndicatorVisible(): Promise<boolean> {
    return this.isDisplayed(this.sel.offlineIndicator);
  }

  async isSyncConfirmationVisible(): Promise<boolean> {
    return this.isDisplayed(this.sel.syncConfirmation);
  }
}
