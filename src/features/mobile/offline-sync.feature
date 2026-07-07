@P2 @mobile
Feature: Offline Mode and Data Sync

  Background:
    Given the patient is logged in on mobile

  Scenario: App shows cached content when offline
    Given the patient has viewed the Home screen at least once
    When the device network connection is disabled
    Then the app displays previously cached content
    And an offline indicator is visible on screen

  Scenario: Offline data syncs when connection is restored
    Given the patient has logged health data while offline
    When the device network connection is restored
    Then the offline data is synced to the server
    And a sync confirmation is displayed on screen
