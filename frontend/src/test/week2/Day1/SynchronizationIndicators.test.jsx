import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import SynchronizationIndicators from "../../../components/week2/Day1/SynchronizationIndicators";

describe("SynchronizationIndicators Component", () => {
  it("should display the synchronization indicators title", () => {
    // Arrange
    const syncData = {
      syncStatus: "Synced",
      deviceConnection: "Online",
      lastSynced: "June 23, 2026 11:30 AM",
    };

    render(<SynchronizationIndicators syncData={syncData} />);

    // Act
  

    // Assert
    expect(screen.getByText("Synchronization Indicators")).toBeInTheDocument();
  });

  it("should display overall sync status and device connection correctly", () => {
    // Arrange
    const syncData = {
      syncStatus: "Synced",
      deviceConnection: "Online",
      lastSynced: "June 23, 2026 11:30 AM",
    };

    render(<SynchronizationIndicators syncData={syncData} />);

    // Act
    
    // Assert
    expect(screen.getByText("Synced")).toBeInTheDocument();
    expect(screen.getByText("Online")).toBeInTheDocument();
  });

  it("should display the last synced timestamp correctly", () => {
    // Arrange
    const syncData = {
      syncStatus: "Synced",
      deviceConnection: "Online",
      lastSynced: "June 23, 2026 11:30 AM",
    };

    render(<SynchronizationIndicators syncData={syncData} />);

    // Act

    // Assert
    expect(screen.getByText("June 23, 2026 11:30 AM")).toBeInTheDocument();
  });
});