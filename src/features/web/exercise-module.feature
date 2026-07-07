@P0 @web
Feature: Weekly Activities

  Background:
    Given the patient is logged in

  @smoke
  Scenario: Home screen loads with weekly activities after login
    Then the weekly activities section is visible
    And the guide contains today's recommended activities
    And at least one activity card is displayed

  Scenario: Patient can open an activity
    When the patient clicks the first activity card
    Then the activity detail page is displayed
