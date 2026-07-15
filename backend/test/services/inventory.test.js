//3-2
import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../../src/app.js";

describe("POST /api/inventory/sync", () => {
  it("should synchronize inventory successfully", async () => {
    // Arrange
    const endpoint = "/api/inventory/sync";

    // Act
    const response = await request(app)
      .post(endpoint)
      .expect(200);

    // Assert
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe(
      "Inventory synchronized successfully."
    );
    expect(response.body).toHaveProperty("data");
  });
});