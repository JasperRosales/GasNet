import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, afterEach } from "vitest";
import SalesAnalyticsProcessingInterface from "../../../components/week3/Day1/SalesAnalyticsProcessingInterface";
import * as api from "../../../services/api";

describe("SalesAnalyticsProcessingInterface", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should be generating weekly sales analytics successfully", async () => {
    vi.spyOn(api, "fetchSalesAnalyticsReports").mockResolvedValue({
      weekly: {
        scope: "weekly",
        label: "2026-06-30 to 2026-07-06",
        totalSales: 17600,
        transactionCount: 1,
        averageSale: 17600
      },
      monthly: {
        scope: "monthly",
        label: "July 2026",
        totalSales: 50700,
        transactionCount: 4,
        averageSale: 12675
      },
      annual: {
        scope: "annual",
        label: "2026",
        totalSales: 87200,
        transactionCount: 7,
        averageSale: 12457.14
      }
    });

    render(<SalesAnalyticsProcessingInterface />);
    await waitFor(() => expect(screen.queryByRole("status")).toBeNull());
    expect(screen.getByText("Weekly Analytics Report")).toBeInTheDocument();
    expect(screen.getByText("weekly")).toBeInTheDocument();
  });

  it("should be generating monthly sales analytics successfully", async () => {
    vi.spyOn(api, "fetchSalesAnalyticsReports").mockResolvedValue({
      weekly: {
        scope: "weekly",
        label: "2026-06-30 to 2026-07-06",
        totalSales: 17600,
        transactionCount: 1,
        averageSale: 17600
      },
      monthly: {
        scope: "monthly",
        label: "July 2026",
        totalSales: 50700,
        transactionCount: 4,
        averageSale: 12675
      },
      annual: {
        scope: "annual",
        label: "2026",
        totalSales: 87200,
        transactionCount: 7,
        averageSale: 12457.14
      }
    });

    render(<SalesAnalyticsProcessingInterface />);
    await waitFor(() => expect(screen.queryByRole("status")).toBeNull());
    expect(screen.getByText("Monthly Analytics Report")).toBeInTheDocument();
    expect(screen.getByText("July 2026")).toBeInTheDocument();
  });

  it("should be generating annual sales analytics successfully", async () => {
    vi.spyOn(api, "fetchSalesAnalyticsReports").mockResolvedValue({
      weekly: {
        scope: "weekly",
        label: "2026-06-30 to 2026-07-06",
        totalSales: 17600,
        transactionCount: 1,
        averageSale: 17600
      },
      monthly: {
        scope: "monthly",
        label: "July 2026",
        totalSales: 50700,
        transactionCount: 4,
        averageSale: 12675
      },
      annual: {
        scope: "annual",
        label: "2026",
        totalSales: 87200,
        transactionCount: 7,
        averageSale: 12457.14
      }
    });

    render(<SalesAnalyticsProcessingInterface />);
    await waitFor(() => expect(screen.queryByRole("status")).toBeNull());
    expect(screen.getByText("Annual Analytics Report")).toBeInTheDocument();
    expect(screen.getByText("2026")).toBeInTheDocument();
  });

  it("should show error when sales analytics request fails", async () => {
    vi.spyOn(api, "fetchSalesAnalyticsReports").mockRejectedValue(new Error("request failed"));

    render(<SalesAnalyticsProcessingInterface />);
    await waitFor(() => expect(screen.queryByRole("status")).toBeNull());
    expect(screen.getByRole("alert")).toHaveTextContent("Unable to load sales analytics reports.");
  });

  it("should show error when analytics payload is null", async () => {
    vi.spyOn(api, "fetchSalesAnalyticsReports").mockResolvedValue(null);

    render(<SalesAnalyticsProcessingInterface />);
    await waitFor(() => expect(screen.queryByRole("status")).toBeNull());
    expect(screen.getByRole("alert")).toHaveTextContent("Unable to load sales analytics reports.");
  });

  it("should show error when analytics payload is missing a required report", async () => {
    vi.spyOn(api, "fetchSalesAnalyticsReports").mockResolvedValue({
      weekly: {
        scope: "weekly",
        label: "2026-06-30 to 2026-07-06",
        totalSales: 17600,
        transactionCount: 1,
        averageSale: 17600
      },
      monthly: {
        scope: "monthly",
        label: "July 2026",
        totalSales: 50700,
        transactionCount: 4,
        averageSale: 12675
      }
    });

    render(<SalesAnalyticsProcessingInterface />);
    await waitFor(() => expect(screen.queryByRole("status")).toBeNull());
    expect(screen.getByRole("alert")).toHaveTextContent("Unable to load sales analytics reports.");
  });
});
