@P1 @web
Feature: Responsive Web Layout

  Scenario Outline: Portal renders correctly at <device> viewport
    Given the browser viewport is set to <width> by <height>
    When the patient portal login page is open
    Then all primary navigation elements are visible
    And the layout adapts to the viewport width

    Examples:
      | device         | width | height |
      | Desktop HD     | 1920  | 1080   |
      | Laptop         | 1280  | 800    |
      | iPad Landscape | 1024  | 768    |
      | iPad Portrait  | 768   | 1024   |
      | Mobile         | 375   | 812    |
