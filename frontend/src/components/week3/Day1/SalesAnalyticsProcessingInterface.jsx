import { useEffect, useState } from "react";
import { fetchSalesAnalyticsReports } from "../../../services/api";
import AnalyticReport from "./AnalyticReport";

function hasValidReports(data) {
  return Boolean(
    data &&
    typeof data === "object" &&
    data.weekly &&
    data.monthly &&
    data.annual
  );
}

export default function SalesAnalyticsProcessingInterface() {
  const [reports, setReports] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    let mounted = true;
    fetchSalesAnalyticsReports()
      .then((data) => {
        if (mounted) {
          if (!hasValidReports(data)) {
            setStatus("error");
            return;
          }
          setReports(data);
          setStatus("success");
        }
      })
      .catch(() => {
        if (mounted) {
          setStatus("error");
        }
      });

    return () => {
      mounted = false;
    };
  }, []);

  if (status === "loading") {
    return <p role="status">Loading sales analytics reports...</p>;
  }

  if (status === "error") {
    return <p role="alert">Unable to load sales analytics reports.</p>;
  }

  return (
    <section aria-label="sales-analytics-processing-service">
      <h2>Sales Analytics Processing Service</h2>
      <AnalyticReport title="Weekly Analytics Report" report={reports.weekly} />
      <AnalyticReport title="Monthly Analytics Report" report={reports.monthly} />
      <AnalyticReport title="Annual Analytics Report" report={reports.annual} />
    </section>
  );
}
