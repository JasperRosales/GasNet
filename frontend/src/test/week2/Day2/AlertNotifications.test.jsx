import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import AlertNotifications from "../../../components/week2/Day2/AlertNotifications";

describe("AlertNotifications Component", () => {
  it("should display the alert notifications title", () => {
    // Arrange
    const alertNotifications = [
      {
        message: "Low LPG Stock",
        level: "Warning",
      },
      {
        message: "Branch Synchronization Successful",
        level: "Success",
      },
      {
        message: "Offline Branch Device",
        level: "Critical",
      },
    ];

    // Act
    render(
      <AlertNotifications
        alertNotifications={alertNotifications}
      />
    );

    // Assert
    expect(screen.getByText("Alert Notifications")).toBeInTheDocument();
  });

  it("should display alert messages correctly", () => {
    // Arrange
    const alertNotifications = [
      {
        message: "Low LPG Stock",
        level: "Warning",
      },
      {
        message: "Branch Synchronization Successful",
        level: "Success",
      },
      {
        message: "Offline Branch Device",
        level: "Critical",
      },
    ];

    // Act
    render(
      <AlertNotifications
        alertNotifications={alertNotifications}
      />
    );

    // Assert
    expect(screen.getByText("Low LPG Stock")).toBeInTheDocument();
    expect(screen.getByText("Branch Synchronization Successful")).toBeInTheDocument();
    expect(screen.getByText("Offline Branch Device")).toBeInTheDocument();
  });

  it("should display alert levels correctly", () => {
    // Arrange
    const alertNotifications = [
      {
        message: "Low LPG Stock",
        level: "Warning",
      },
      {
        message: "Branch Synchronization Successful",
        level: "Success",
      },
      {
        message: "Offline Branch Device",
        level: "Critical",
      },
    ];

    // Act
    render(
      <AlertNotifications
        alertNotifications={alertNotifications}
      />
    );

    // Assert
    expect(screen.getByText("Warning")).toBeInTheDocument();
    expect(screen.getByText("Success")).toBeInTheDocument();
    expect(screen.getByText("Critical")).toBeInTheDocument();
  });
});