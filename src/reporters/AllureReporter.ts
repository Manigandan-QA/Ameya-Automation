import path from 'path';
import fs from 'fs';
import { execSync } from 'child_process';

export class AllureReporter {
  static ensureResultsDir(): void {
    fs.mkdirSync(path.resolve(process.cwd(), 'reports/allure-results'), { recursive: true });
  }

  static generateReport(): void {
    execSync('allure generate reports/allure-results -o reports/allure-report --clean', {
      stdio: 'inherit',
    });
  }

  static openReport(): void {
    execSync('allure open reports/allure-report', { stdio: 'inherit' });
  }
}
