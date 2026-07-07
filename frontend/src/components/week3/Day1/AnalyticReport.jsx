export default function AnalyticReport({ title, report }) {
  const safeReport = report ?? {};

  return (
    <article aria-label={title}>
      <h3>{title}</h3>
      <p><strong>Scope:</strong> {safeReport.scope ?? "N/A"}</p>
      <p><strong>Period:</strong> {safeReport.label ?? "N/A"}</p>
      <p><strong>Total Sales:</strong> {safeReport.totalSales ?? 0}</p>
      <p><strong>Transactions:</strong> {safeReport.transactionCount ?? 0}</p>
      <p><strong>Average Sale:</strong> {safeReport.averageSale ?? 0}</p>
    </article>
  );
}
