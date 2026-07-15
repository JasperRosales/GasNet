//3-2
import { describe, it, expect, vi, beforeEach } from "vitest";
import { syncInventory } from "../../src/services/inventoryService.js";
import * as internet from "../../src/services/internet.js";
import { clearLocal } from "../../src/services/localStorage.js";

describe("Inventory Service", () => {
  beforeEach(() => {
    clearLocal();
    vi.restoreAllMocks();
  });

  it("should save inventory locally when there is no internet connection", () => {
    // Arrange
    vi.spyOn(internet, "isOnline").mockReturnValue(false);

    // Act
    const result = syncInventory();

    // Assert
    expect(result.success).toBe(false);
    expect(result.message).toBe("No internet. Inventory saved locally.");
    expect(result.data.length).toBeGreaterThan(0);
  });

  it("should synchronize inventory updates and update stock records when online", () => {
    // Arrange
    vi.spyOn(internet, "isOnline").mockReturnValue(true);

    // Act
    const result = syncInventory();

    // Assert
    expect(result.success).toBe(true);
    expect(result.message).toBe("Inventory synchronized successfully.");
    expect(result.data.length).toBeGreaterThan(0);
    expect(result.data.every(item => item.status === "Updated")).toBe(true);
  });
});