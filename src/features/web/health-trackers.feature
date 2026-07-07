@P0 @web
Feature: Health Trackers

  Background:
    Given the patient is logged in
    And the patient navigates to the Health Trackers section

  Scenario: Patient logs a health metric
    When the patient enters a blood pressure reading
    And saves the health tracker entry
    Then the health tracker history shows the new reading

  Scenario: Health tracker trend chart is displayed
    Given the patient has existing health tracker entries
    Then a trend chart is visible in the health trackers section
