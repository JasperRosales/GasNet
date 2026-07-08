//week3-day1
import { describe, test, expect } from "vitest";
import sendTransactionData from "../../src/services/TransactionDataSender.js";

describe("TransactionDataSender", () => {
  test("should send transaction data successfully", () => {
    // Arrange
    const transaction = {
      transactionId: "TRX-001",
      product: "LPG 11kg",
      quantity: 2,
    };

    // Act
    const result = sendTransactionData(transaction);

    // Assert
    expect(result.success).toBe(true);
    expect(result.message).toBe("Transaction data sent successfully.");
    expect(result.transaction).toEqual(transaction);
  });
});