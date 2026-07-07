@P0 @web
Feature: Patient Onboarding and Profile Setup

  Scenario: New patient completes onboarding
    Given a new patient registration is started
    When the patient completes the profile setup form
    And submits the onboarding form
    Then the patient is directed to the Home screen
    And the profile display name is shown correctly
