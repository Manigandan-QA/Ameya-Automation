import { World, IWorldOptions, setWorldConstructor } from '@cucumber/cucumber';
import type { Browser as PlaywrightBrowser, BrowserContext, Page } from 'playwright';
import type { Browser as WdioBrowser } from 'webdriverio';
import type { LoginPage }       from '../pages/web/LoginPage';
import type { HomePage }        from '../pages/web/HomePage';
import type { ExercisePage }    from '../pages/web/ExercisePage';
import type { SurveyPage }      from '../pages/web/SurveyPage';
import type { TrackerPage }     from '../pages/web/TrackerPage';
import type { NavigationPage }  from '../pages/web/NavigationPage';
import type { LoginScreen }     from '../screens/mobile/LoginScreen';
import type { HomeScreen }      from '../screens/mobile/HomeScreen';
import type { ExerciseScreen }  from '../screens/mobile/ExerciseScreen';
import type { BiometricScreen } from '../screens/mobile/BiometricScreen';
import type { NotificationScreen } from '../screens/mobile/NotificationScreen';

export class CustomWorld extends World {
  // --- Playwright (web) ---
  browser!:  PlaywrightBrowser;
  context!:  BrowserContext;
  page!:     Page;

  // Web page objects — assigned inside step definitions
  loginPage!:     LoginPage;
  homePage!:      HomePage;
  exercisePage!:  ExercisePage;
  surveyPage!:    SurveyPage;
  trackerPage!:   TrackerPage;
  navPage!:       NavigationPage;

  // --- WebdriverIO / Appium (mobile) ---
  driver!: WdioBrowser;

  // Mobile screen objects — assigned inside step definitions
  loginScreen!:        LoginScreen;
  homeScreen!:         HomeScreen;
  exerciseScreen!:     ExerciseScreen;
  biometricScreen!:    BiometricScreen;
  notificationScreen!: NotificationScreen;

  constructor(options: IWorldOptions) {
    super(options);
  }
}

setWorldConstructor(CustomWorld);
