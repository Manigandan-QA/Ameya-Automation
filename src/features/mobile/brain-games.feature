@P1 @mobile
Feature: Brain Games

  Background:
    Given the patient is logged in on mobile

  Scenario: Patient views available brain games
    When the patient navigates to the Brain Games section on mobile
    Then a list of available brain games is displayed

  Scenario: Patient completes a brain game session
    Given the patient has started a brain game on mobile
    When the patient completes all rounds of the game
    Then a score summary screen is displayed
    And the session is recorded in the patient history
