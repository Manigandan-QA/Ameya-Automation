@P0 @mobile
Feature: Mobile Patient Login and Authentication

  Background:
    Given the mobile app is launched

  @smoke
  Scenario: Successful login on mobile
    When the patient enters valid credentials on the mobile login screen
    Then the Home screen is displayed on mobile

  Scenario: Invalid credentials show an error on mobile
    When the patient enters invalid credentials on the mobile login screen
    Then a login error message is shown on mobile
