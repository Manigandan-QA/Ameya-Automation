import { Given, When } from '@cucumber/cucumber';
import { CustomWorld } from '../../worlds/CustomWorld';
import { LoginScreen } from '../../screens/mobile/LoginScreen';
import { NavigationPage } from '../../pages/web/NavigationPage';
import { Config } from '../../config/ConfigLoader';
import { Timeouts } from '../../constants/Timeouts';

// Runs under both web and mobile profiles.
Given('the patient is authenticated', async function (this: CustomWorld) {
  if (this.page) {
    await this.page.goto(Config.web.baseUrl);
    await this.page.waitForLoadState('networkidle');
    if (this.page.url().includes('/login')) {
      throw new Error('Session expired. Run: node scripts/save-session.js');
    }
  } else {
    const loginScreen = new LoginScreen(this.driver);
    await loginScreen.waitForScreen();
    await loginScreen.login(Config.test.userEmail);
  }
});

// Top navigation — Home | Resources | Me
When('the patient navigates to the Home screen', async function (this: CustomWorld) {
  this.navPage = new NavigationPage(this.page);
  await this.navPage.goToHome();
});

When('the patient navigates to Resources', async function (this: CustomWorld) {
  this.navPage = this.navPage ?? new NavigationPage(this.page);
  await this.navPage.goToResources();
});

When('the patient navigates to their profile', async function (this: CustomWorld) {
  this.navPage = this.navPage ?? new NavigationPage(this.page);
  await this.navPage.goToMe();
});

When('the patient opens the Messaging section', async function (this: CustomWorld) {
  if (this.page) {
    // Messaging is accessed via the home screen content — click messaging card if present
    await this.page.getByRole('link', { name: /message|chat/i }).first().click();
    await this.page.waitForLoadState('networkidle');
  } else {
    await this.homeScreen.tapMessaging();
  }
});
