import { Before, After, BeforeAll, AfterAll, Status, setDefaultTimeout } from '@cucumber/cucumber';
import { CucumberReporter } from '../reporters/CucumberReporter';
import { logger } from '../utils/Logger';
import { Timeouts } from '../constants/Timeouts';

setDefaultTimeout(Timeouts.STEP);

BeforeAll(function () {
  CucumberReporter.ensureReportDirs();
  logger.info('=== Test suite starting ===');
  logger.info(`Execution mode : ${process.env.EXEC_MODE ?? 'local'}`);
  logger.info(`Environment    : ${process.env.TEST_ENV  ?? 'staging'}`);
});

AfterAll(function () {
  logger.info('=== Test suite complete ===');
});

Before(function (scenario) {
  logger.info(`▶  ${scenario.pickle.name}`);
});

After(function (scenario) {
  const s = scenario.result?.status;
  if (s === Status.FAILED)  logger.error(`✗ FAILED  : ${scenario.pickle.name}`);
  else if (s === Status.PASSED) logger.info(`✓ PASSED  : ${scenario.pickle.name}`);
  else                          logger.warn(`⚠ ${s}    : ${scenario.pickle.name}`);
});
