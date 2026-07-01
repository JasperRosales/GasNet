import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";

import SynchronizationStatusIndicator from "../../../components/week1/Day1/SynchronizationStatusIndicator";

describe("SynchronizationStatusIndicator Component", () => {
  it("should display synchronization status correctly", () => {
    
    // Arrange
    const syncStatus = "Synchronized";

    render(
      <SynchronizationStatusIndicator
        syncStatus={syncStatus}
      />
    );

    // Act
    
    // Assert
    expect(screen.getByText("Synchronization Status")).toBeInTheDocument();
    expect(screen.getByText("Synchronized")).toBeInTheDocument();
  });
});