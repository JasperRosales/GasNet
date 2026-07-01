import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import StockLevelChanges from "../../../components/week2/Day1/StockLevelChanges";

describe("StockLevelChanges Component", () => {
  it("should display the stock level changes title", () => {
    // Arrange
    const stockItems = [
      {
        product: "LPG 11kg",
        previousStock: 50,
        currentStock: 45,
        stockChange: -5,
      },
      {
        product: "LPG 22kg",
        previousStock: 20,
        currentStock: 25,
        stockChange: 5,
      },
      {
        product: "Regulator",
        previousStock: 15,
        currentStock: 15,
        stockChange: 0,
      },
    ];

    render(<StockLevelChanges stockItems={stockItems} />);

    // Act

    // Assert
    expect(screen.getByText("Stock Level Changes")).toBeInTheDocument();
  });

  it("should display previous and current stock values correctly", () => {
    // Arrange
    const stockItems = [
      {
        product: "LPG 11kg",
        previousStock: 50,
        currentStock: 45,
        stockChange: -5,
      },
      {
        product: "LPG 22kg",
        previousStock: 20,
        currentStock: 25,
        stockChange: 5,
      },
      {
        product: "Regulator",
        previousStock: 15,
        currentStock: 15,
        stockChange: 0,
      },
    ];

    render(<StockLevelChanges stockItems={stockItems} />);

    // Act
    

    // Assert
    expect(screen.getByText("50")).toBeInTheDocument();
    expect(screen.getByText("45")).toBeInTheDocument();
    expect(screen.getByText("20")).toBeInTheDocument();
    expect(screen.getByText("25")).toBeInTheDocument();
    expect(screen.getAllByText("15").length).toBeGreaterThan(0);
  });

  it("should display stock change values accurately", () => {
    // Arrange
    const stockItems = [
      {
        product: "LPG 11kg",
        previousStock: 50,
        currentStock: 45,
        stockChange: -5,
      },
      {
        product: "LPG 22kg",
        previousStock: 20,
        currentStock: 25,
        stockChange: 5,
      },
      {
        product: "Regulator",
        previousStock: 15,
        currentStock: 15,
        stockChange: 0,
      },
    ];

    render(<StockLevelChanges stockItems={stockItems} />);

    // Act

    // Assert
    expect(screen.getByText("-5")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
    expect(screen.getByText("0")).toBeInTheDocument();
  });
});