@P1 @web
Feature: Accessibility — WCAG Compliance

  Background:
    Given the patient portal login page is open

  Scenario: Login form supports keyboard-only navigation
    When the patient uses Tab to navigate the login form
    Then all interactive elements receive focus in logical order

  Scenario: All images on the login page have alt text
    Then all images on the page have non-empty alt attributes
