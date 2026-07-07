const reporter = require('multiple-cucumber-html-reporter');
const path = require('path');
const fs = require('fs');

const reportDir = path.join(__dirname, '..', 'reports', 'html');
fs.mkdirSync(reportDir, { recursive: true });

reporter.generate({
  jsonDir: path.join(__dirname, '..', 'reports', 'cucumber-html'),
  reportPath: reportDir,
  metadata: {
    browser: { name: 'chrome', version: 'latest' },
    platform: { name: 'Windows', version: '11' },
  },
  customData: {
    title: 'Ameya Patient Portal — Test Execution Report',
    data: [
      { label: 'Project',     value: 'Ameya Patient Portal' },
      { label: 'Execution',   value: process.env.EXEC_MODE  ?? 'local' },
      { label: 'Environment', value: process.env.TEST_ENV   ?? 'staging' },
      { label: 'Build',       value: process.env.BUILD_NUMBER ?? 'local-run' },
    ],
  },
});

console.log('HTML report generated → reports/html/index.html');
