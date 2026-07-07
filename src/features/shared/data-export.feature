@P2 @web
Feature: Reports and Data Exports

  Background:
    Given the patient is logged in

  Scenario: Patient exports a health summary as PDF
    When the patient navigates to the Reports section
    And requests a health summary PDF report
    Then a PDF file is generated and available for download

  Scenario: Patient exports health tracker data as CSV
    When the patient navigates to the Reports section
    And exports health tracker data as CSV
    Then a CSV file is downloaded with valid health records
