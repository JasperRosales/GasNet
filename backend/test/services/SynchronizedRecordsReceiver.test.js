//week-day1
import { describe, test, expect } from "vitest";
import receiveSynchronizedRecords from "../../src/services/SynchronizedRecordsReceiver.js";

describe("receiveSynchronizedRecords", () => {
  test("should receive synchronized records correctly", () => {
    // Act
    const records = receiveSynchronizedRecords();

    // Assert
    expect(records).toHaveLength(2);
    expect(records[0].status).toBe("Synchronized");
    expect(records[1].status).toBe("Synchronized");
  });
});