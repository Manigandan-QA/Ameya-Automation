@P0 @mobile
Feature: Biometric Authentication

  Background:
    Given the mobile app is launched
    And the patient account has biometric login enabled

  Scenario: Patient authenticates via biometric bypass in test builds
    When the biometric authentication prompt is shown
    And the test-mode biometric bypass is triggered
    Then the patient lands on the Home screen on mobile
