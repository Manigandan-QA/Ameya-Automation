@P0 @web
Feature: Health Surveys

  Background:
    Given the patient is logged in
    And the patient navigates to the Surveys section

  Scenario: Patient completes a survey
    Given a survey is available
    When the patient answers all survey questions with the first option
    And submits the survey
    Then a survey completion confirmation is displayed

  Scenario: Survey progress is retained after navigating away
    Given a survey is available
    When the patient selects the first option and navigates away
    And the patient returns to the Surveys section
    Then the previously selected answer is still shown
