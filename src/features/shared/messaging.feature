@P1 @web @mobile
Feature: Secure Messaging

  Background:
    Given the patient is authenticated

  Scenario: Patient sends a message to the care team
    When the patient opens the Messaging section
    And composes and sends a message to the care team
    Then the sent message appears in the conversation thread

  Scenario: Patient reads an incoming message
    Given a message has been sent to the patient's inbox
    When the patient opens the Messaging section
    Then the unread message is visible
    And marking the message as read decrements the unread count
