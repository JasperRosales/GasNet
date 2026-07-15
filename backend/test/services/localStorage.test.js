//3-2
import { describe, it, expect, beforeEach } from "vitest";

import {
  saveLocal,
  getLocal,
  clearLocal,
} from "../../src/services/localStorage.js";

describe("Local Storage Service", () => {
  beforeEach(() => {
    clearLocal();
  });

  it("should save inventory updates to the local queue", () => {
    // Arrange
    const updates = [
      { id: 1, product: "LPG 11kg", quantity: 2 },
      { id: 2, product: "LPG 22kg", quantity: 1 },
    ];

    // Act
    const result = saveLocal(updates);

    // Assert
    expect(result).toHaveLength(2);
    expect(result).toEqual(updates);
  });

  it("should retrieve all locally stored inventory updates", () => {
    // Arrange
    const updates = [
      { id: 1, product: "LPG 11kg", quantity: 2 },
    ];

    saveLocal(updates);

    // Act
    const result = getLocal();

    // Assert
    expect(result).toEqual(updates);
    expect(result).toHaveLength(1);
  });

  it("should clear the local queue after synchronization", () => {
    // Arrange
    saveLocal([
      { id: 1, product: "LPG 11kg", quantity: 2 },
    ]);

    // Act
    clearLocal();

    // Assert
    expect(getLocal()).toEqual([]);
    expect(getLocal()).toHaveLength(0);
  });
});