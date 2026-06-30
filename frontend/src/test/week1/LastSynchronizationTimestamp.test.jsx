import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";

import LastSynchronizationTimestamp from "../../components/week1/LastSynchronizationTimestamp";

describe("LastSynchronizationTimestamp Component", () => {
  it("should display the latest synchronization timestamp", () => {
    
    // Arrange
    const lastSynced = "June 23, 2026 11:30 AM";

    render(
      <LastSynchronizationTimestamp lastSynced={lastSynced}/>
    );

    // Act
    

    // Assert
    expect(screen.getByText("Last Synchronization Timestamp")).toBeInTheDocument();
    expect(screen.getByText("June 23, 2026 11:30 AM")).toBeInTheDocument();
  });
});