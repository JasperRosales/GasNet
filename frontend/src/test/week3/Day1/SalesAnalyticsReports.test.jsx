import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import AnalyticReport from "../../../components/week3/Day1/AnalyticReport";

const weekly = {
  scope: "weekly",
  label: "2026-06-30 to 2026-07-06",
  totalSales: 17600,
  transactionCount: 1,
  averageSale: 17600
};

const monthly = {
  scope: "monthly",
  label: "July 2026",
  totalSales: 50700,
  transactionCount: 4,
  averageSale: 12675
};

const annual = {
  scope: "annual",
  label: "2026",
  totalSales: 87200,
  transactionCount: 7,
  averageSale: 12457.14
};

describe("Sales analytics report components", () => {
  it("renders weekly report component", () => {
    render(<AnalyticReport title="Weekly Analytics Report" report={weekly} />);
    expect(screen.getByText("Weekly Analytics Report")).toBeInTheDocument();
    expect(screen.getByText("2026-06-30 to 2026-07-06")).toBeInTheDocument();
  });

  it("renders monthly report component", () => {
    render(<AnalyticReport title="Monthly Analytics Report" report={monthly} />);
    expect(screen.getByText("Monthly Analytics Report")).toBeInTheDocument();
    expect(screen.getByText("July 2026")).toBeInTheDocument();
  });

  it("renders annual report component", () => {
    render(<AnalyticReport title="Annual Analytics Report" report={annual} />);
    expect(screen.getByText("Annual Analytics Report")).toBeInTheDocument();
    expect(screen.getByText("2026")).toBeInTheDocument();
  });

  it("renders fallback values when report is null", () => {
    render(<AnalyticReport title="Weekly Analytics Report" report={null} />);
    expect(screen.getByText("Weekly Analytics Report")).toBeInTheDocument();
    expect(screen.getAllByText("N/A").length).toBeGreaterThanOrEqual(2);
    expect(screen.getAllByText("0").length).toBeGreaterThanOrEqual(3);
  });
});
