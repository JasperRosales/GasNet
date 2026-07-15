//3-2
import { describe, it, expect } from "vitest";
import { isOnline, setOnline } from "../../src/services/internet.js";

describe("Internet Service", () => {
  it("should return true when internet is available", () => {
    // Arrange
    setOnline(true);

    // Act
    const result = isOnline();

    // Assert
    expect(result).toBe(true);
  });

  it("should return false when internet is unavailable", () => {
    // Arrange
    setOnline(false);

    // Act
    const result = isOnline();

    // Assert
    expect(result).toBe(false);
  });
});