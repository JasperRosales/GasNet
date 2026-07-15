//week3-day1
import { describe, test, expect } from "vitest";
import synchronizeTransaction from "../../src/services/TransactionSynchronizationService.js";

describe("TransactionSynchronizationService", () => {
  test("should synchronize transaction successfully", () => {
    // Arrange
    const transaction = {
      transactionId: "TRX-001",
      product: "LPG 11kg",
      quantity: 2,
    };

    // Act
    const result = synchronizeTransaction(transaction);

    // Assert
    expect(result.sent.success).toBe(true);
    expect(result.records).toHaveLength(2);
    expect(result.validated).toBe(true);
  });
});