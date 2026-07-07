@P0 @web
Feature: Weekly Activities

  Background:
    Given the patient is logged in

  @smoke
  Scenario: This Week's Activities are visible on the Home screen
    Then the weekly activities section is visible
    And at least one activity card is displayed

  Scenario: Patient can open an activity
    When the patient clicks the first activity card
    Then the activity detail page is displayed
