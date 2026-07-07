@P0 @web
Feature: Video Playback

  Background:
    Given the patient is logged in

  Scenario: Patient plays an educational video
    When the patient opens an article with a video
    Then the video player is loaded
    And the patient can start video playback

  Scenario: Video pause retains playback position
    When the patient opens an article with a video
    And the patient plays and then pauses the video
    Then the video is in a paused state
    And the playback progress is retained
