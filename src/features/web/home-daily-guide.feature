@P0 @web
Feature: Home Screen and Daily Guide

  Background:
    Given the patient is logged in

  @smoke
  Scenario: Daily guide is visible on the Home screen
    Then the daily guide section is visible
    And the guide contains today's recommended activities

  Scenario: Patient navigates to exercise from the daily guide
    When the patient clicks the exercise recommendation in the daily guide
    Then the exercise module page is displayed
