@P0 @web
Feature: Nutrition Tracker

  Background:
    Given the patient is logged in
    And the patient navigates to the Nutrition Tracker section

  Scenario: Patient logs a meal
    When the patient adds a breakfast entry
    And saves the nutrition log entry
    Then the meal appears in today's nutrition summary

  Scenario: Daily calorie total is displayed after logging a meal
    Given the patient has logged at least one meal today
    Then the daily calorie total is visible in the nutrition summary
