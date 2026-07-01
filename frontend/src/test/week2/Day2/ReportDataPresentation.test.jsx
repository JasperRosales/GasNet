import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ReportDataPresentation from "../../../components/week2/Day2/ReportDataPresentation";

describe("ReportDataPresentation Component", () => {
  it("should display the report data presentation title", () => {
    // Arrange
    const reportData = [
      {
        branch: "Balayan",
        totalSales: "98,500",
        transactions: 120,
      },
      {
        branch: "Calatagan",
        totalSales: "85,000",
        transactions: 102,
      },
      {
        branch: "Cuenca",
        totalSales: "74,300",
        transactions: 89,
      },
    ];

    // Act
    render(
      <ReportDataPresentation
        reportData={reportData}
      />
    );

    // Assert
    expect(screen.getByText("Report Data Presentation")).toBeInTheDocument();
  });

  it("should display branch names correctly", () => {
    // Arrange
    const reportData = [
      {
        branch: "Balayan",
        totalSales: "98,500",
        transactions: 120,
      },
      {
        branch: "Calatagan",
        totalSales: "85,000",
        transactions: 102,
      },
      {
        branch: "Cuenca",
        totalSales: "74,300",
        transactions: 89,
      },
    ];

    // Act
    render(
      <ReportDataPresentation
        reportData={reportData}
      />
    );

    // Assert
    expect(screen.getByText("Balayan")).toBeInTheDocument();
    expect(screen.getByText("Calatagan")).toBeInTheDocument();
    expect(screen.getByText("Cuenca")).toBeInTheDocument();
  });

  it("should display report data correctly", () => {
    // Arrange
    const reportData = [
      {
        branch: "Balayan",
        totalSales: "98,500",
        transactions: 120,
      },
      {
        branch: "Calatagan",
        totalSales: "85,000",
        transactions: 102,
      },
      {
        branch: "Cuenca",
        totalSales: "74,300",
        transactions: 89,
      },
    ];

    // Act
    render(
      <ReportDataPresentation
        reportData={reportData}
      />
    );

    // Assert
    expect(screen.getByText("98,500")).toBeInTheDocument();
    expect(screen.getByText("85,000")).toBeInTheDocument();
    expect(screen.getByText("74,300")).toBeInTheDocument();

    expect(screen.getByText("120")).toBeInTheDocument();
    expect(screen.getByText("102")).toBeInTheDocument();
    expect(screen.getByText("89")).toBeInTheDocument();
  });
});