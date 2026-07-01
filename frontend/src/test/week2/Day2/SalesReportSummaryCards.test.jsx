import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import SalesReportSummaryCards from "../../../components/week2/Day2/SalesReportSummaryCards";

describe("SalesReportSummaryCards Component", () => {
  it("should display the sales report summary title", () => {
    // Arrange
    const reportSummaries = [
      {
        title: "Weekly Sales",
        amount: "98,500",
      },
      {
        title: "Monthly Sales",
        amount: "420,000",
      },
      {
        title: "Annual Sales",
        amount: "5,240,000",
      },
    ];

    // Act
    render(
      <SalesReportSummaryCards
        reportSummaries={reportSummaries}
      />
    );

    // Assert
    expect(screen.getByText("Sales Report Summary")).toBeInTheDocument();
  });

  it("should display report titles correctly", () => {
    // Arrange
    const reportSummaries = [
      {
        title: "Weekly Sales",
        amount: "98,500",
      },
      {
        title: "Monthly Sales",
        amount: "420,000",
      },
      {
        title: "Annual Sales",
        amount: "5,240,000",
      },
    ];

    // Act
    render(
      <SalesReportSummaryCards
        reportSummaries={reportSummaries}
      />
    );

    // Assert
    expect(screen.getByText("Weekly Sales")).toBeInTheDocument();
    expect(screen.getByText("Monthly Sales")).toBeInTheDocument();
    expect(screen.getByText("Annual Sales")).toBeInTheDocument();
  });

  it("should display report amounts correctly", () => {
    // Arrange
    const reportSummaries = [
      {
        title: "Weekly Sales",
        amount: "98,500",
      },
      {
        title: "Monthly Sales",
        amount: "420,000",
      },
      {
        title: "Annual Sales",
        amount: "5,240,000",
      },
    ];

    // Act
    render(
      <SalesReportSummaryCards
        reportSummaries={reportSummaries}
      />
    );

    // Assert
    expect(screen.getByText("98,500")).toBeInTheDocument();
    expect(screen.getByText("420,000")).toBeInTheDocument();
    expect(screen.getByText("5,240,000")).toBeInTheDocument();
  });
});