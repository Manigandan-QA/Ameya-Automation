@P0 @web
Feature: Patient Login — OTP Authentication

  Background:
    Given the Ameya Health login page is open

  Scenario: Successful login via OTP
    When the patient enters their email address
    And clicks Continue
    Then the OTP entry screen is displayed
    When the patient enters the OTP received by email
    Then the patient is logged in and lands on the Home screen

  Scenario: Login with an unregistered email
    When the patient enters an unregistered email address
    And clicks Continue
    Then an error message is displayed on the login page
