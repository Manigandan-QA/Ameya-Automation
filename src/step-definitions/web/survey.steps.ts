import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../../worlds/CustomWorld';
import { SurveyPage } from '../../pages/web/SurveyPage';
import { Timeouts } from '../../constants/Timeouts';

Given('a survey is available', async function (this: CustomWorld) {
  this.surveyPage = new SurveyPage(this.page);
  await expect(this.page.getByTestId('survey-title')).toBeVisible({ timeout: Timeouts.ELEMENT });
});

When('the patient answers all survey questions with the first option', async function (this: CustomWorld) {
  this.surveyPage = this.surveyPage ?? new SurveyPage(this.page);
  await this.surveyPage.answerAllQuestionsWithFirstOption();
});

When('submits the survey', async function (this: CustomWorld) {
  await this.surveyPage.submitSurvey();
});

Then('a survey completion confirmation is displayed', async function (this: CustomWorld) {
  expect(await this.surveyPage.isCompletionVisible()).toBe(true);
});

When('the patient selects the first option and navigates away', async function (this: CustomWorld) {
  this.surveyPage = this.surveyPage ?? new SurveyPage(this.page);
  await this.surveyPage.selectOption('survey-option-0');
  await this.page.getByTestId('nav-home').click();
  await this.page.waitForLoadState('networkidle');
});

When('the patient returns to the Surveys section', async function (this: CustomWorld) {
  await this.page.getByTestId('nav-surveys').click();
  await this.page.waitForLoadState('networkidle');
  this.surveyPage = new SurveyPage(this.page);
});

Then('the previously selected answer is still shown', async function (this: CustomWorld) {
  expect(await this.surveyPage.isFirstOptionSelected()).toBe(true);
});
