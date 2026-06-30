import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";

import ConnectionStatus from "../../components/week1/ConnectionStatus";

describe("ConnectionStatus Component", () => {
  it("should display connection status accurately", () => {
    
    // Arrange
    const connectionStatus = "Connected";

    render(
      <ConnectionStatus
        connectionStatus={connectionStatus}
      />
    );

    // Act
    

    // Assert
    expect(screen.getByText("Connection Status")).toBeInTheDocument();
    expect(screen.getByText("Connected")).toBeInTheDocument();
  });
});