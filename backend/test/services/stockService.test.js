//3-2
import { describe, it, expect } from "vitest";
import updateStock from "../../src/services/stockService.js";

describe("Stock Service", () => {
  it("should update stock records correctly", () => {
    // Arrange
    const inventory = [
      {
        id: 1,
        product: "LPG 11kg",
        stock: 20,
      },
      {
        id: 2,
        product: "LPG 22kg",
        stock: 15,
      },
    ];

    // Act
    const result = updateStock(inventory);

    // Assert
    expect(result).toHaveLength(2);

    expect(result[0]).toMatchObject({
      id: 1,
      product: "LPG 11kg",
      stock: 20,
      status: "Updated",
    });

    expect(result[1]).toMatchObject({
      id: 2,
      product: "LPG 22kg",
      stock: 15,
      status: "Updated",
    });

    expect(result[0].lastUpdated).toBeDefined();
    expect(result[1].lastUpdated).toBeDefined();

    expect(typeof result[0].lastUpdated).toBe("string");
    expect(typeof result[1].lastUpdated).toBe("string");
  });
});