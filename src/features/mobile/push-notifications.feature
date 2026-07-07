@P1 @mobile
Feature: Push Notifications

  Background:
    Given the patient is logged in on mobile

  Scenario: Patient receives a daily reminder notification
    When a daily reminder push notification is triggered for the patient
    Then the notification appears in the device notification tray
    And tapping the notification opens the relevant screen in the app
