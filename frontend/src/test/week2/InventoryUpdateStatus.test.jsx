import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import InventoryUpdateStatus from "../../components/week2/InventoryUpdateStatus";

describe("InventoryUpdateStatus Component", () => {
  it("should display the inventory update status title", () => {
    
    // Arrange
    const products = [
      { product: "LPG 11kg", status: "Updated" },
      { product: "LPG 22kg", status: "Pending" },
      { product: "Regulator", status: "Failed" },
    ];

    render(<InventoryUpdateStatus products={products} />);

    // Act
    
    // Assert
    expect(screen.getByText("Inventory Update Status")).toBeInTheDocument();
  });

  it("should display product names correctly", () => {
    // Arrange
    const products = [
      { product: "LPG 11kg", status: "Updated" },
      { product: "LPG 22kg", status: "Pending" },
      { product: "Regulator", status: "Failed" },
    ];

    render(<InventoryUpdateStatus products={products} />);

    // Act

    // Assert
    expect(screen.getByText("LPG 11kg")).toBeInTheDocument();
    expect(screen.getByText("LPG 22kg")).toBeInTheDocument();
    expect(screen.getByText("Regulator")).toBeInTheDocument();
  });

  it("should display inventory update statuses correctly", () => {
    // Arrange
    const products = [
      { product: "LPG 11kg", status: "Updated" },
      { product: "LPG 22kg", status: "Pending" },
      { product: "Regulator", status: "Failed" },
    ];

    render(<InventoryUpdateStatus products={products} />);
    // Act

    // Assert
    expect(screen.getByText("Updated")).toBeInTheDocument();
    expect(screen.getByText("Pending")).toBeInTheDocument();
    expect(screen.getByText("Failed")).toBeInTheDocument();
  });
});