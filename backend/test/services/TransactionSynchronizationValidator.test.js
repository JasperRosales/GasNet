//week3-day1
import { describe, test, expect } from "vitest";
import validateSynchronizedRecords from "../../src/services/TransactionSynchronizationValidator.js";

describe("TransactionSynchronizationValidator", () => {
  test("should validate synchronized transactions accurately", () => {
    // Arrange
    const records = [
      {
        transactionId: "TRX-001",
        product: "LPG 11kg",
        quantity: 2,
        status: "Synchronized",
      },
      {
        transactionId: "TRX-002",
        product: "LPG 22kg",
        quantity: 1,
        status: "Synchronized",
      },
    ];

    // Act
    const result = validateSynchronizedRecords(records);

    // Assert
    expect(result).toBe(true);
  });
});