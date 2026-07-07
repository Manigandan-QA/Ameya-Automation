import path from 'path';
import fs from 'fs';

const REPORT_DIRS = [
  'reports/cucumber-html',
  'reports/screenshots',
  'reports/html',
  'reports/allure-results',
  'reports/browserstack',
];

export class CucumberReporter {
  static ensureReportDirs(): void {
    for (const dir of REPORT_DIRS) {
      fs.mkdirSync(path.resolve(process.cwd(), dir), { recursive: true });
    }
  }

  static generateHtmlReport(platform: 'web' | 'mobile'): void {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const reporter = require('multiple-cucumber-html-reporter');
    reporter.generate({
      jsonDir: path.resolve(process.cwd(), 'reports/cucumber-html'),
      reportPath: path.resolve(process.cwd(), `reports/html/${platform}`),
      metadata: {
        browser: {
          name: platform === 'web' ? 'chrome' : 'native-app',
          version: 'latest',
        },
        platform: {
          name: platform === 'web' ? 'Windows' : 'Android/iOS',
          version: 'latest',
        },
      },
      customData: {
        title: 'Ameya Patient Portal — Test Execution Report',
        data: [
          { label: 'Project',     value: 'Ameya Patient Portal' },
          { label: 'Platform',    value: platform.toUpperCase() },
          { label: 'Execution',   value: process.env.EXEC_MODE  ?? 'local' },
          { label: 'Environment', value: process.env.TEST_ENV   ?? 'staging' },
          { label: 'Build',       value: process.env.BUILD_NUMBER ?? 'local-run' },
        ],
      },
    });
  }
}
