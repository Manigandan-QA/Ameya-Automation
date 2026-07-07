/**
 * Run this script ONCE to log in manually and save the session.
 * After saving, all test runs reuse the session automatically.
 *
 * Usage: node scripts/save-session.js
 */

const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const SESSION_PATH = path.join(__dirname, '..', 'src', 'test-data', 'auth', 'session.json');
const LOGIN_URL    = 'https://app.ameyahealth.com/login';

(async () => {
  fs.mkdirSync(path.dirname(SESSION_PATH), { recursive: true });

  const browser = await chromium.launch({ headless: false, slowMo: 300 });
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page    = await context.newPage();

  console.log('\n──────────────────────────────────────────────');
  console.log('  Ameya Health — Session Setup');
  console.log('──────────────────────────────────────────────');
  console.log('  1. A browser window will open at the login page.');
  console.log('  2. Enter your email → click Continue.');
  console.log('  3. Check your inbox, enter the OTP.');
  console.log('  4. Once you land on the Home screen, this');
  console.log('     script will save the session automatically.');
  console.log('──────────────────────────────────────────────\n');

  await page.goto(LOGIN_URL);

  // Wait until the user completes login and URL moves away from /login
  console.log('Waiting for you to log in...');
  await page.waitForURL(
    (url) => !url.toString().includes('/login'),
    { timeout: 120_000 }
  );

  // Save session (cookies + localStorage)
  await context.storageState({ path: SESSION_PATH });

  console.log('\n✓ Session saved →', SESSION_PATH);
  console.log('✓ Run tests now — login will be skipped automatically.\n');

  await browser.close();
})();
