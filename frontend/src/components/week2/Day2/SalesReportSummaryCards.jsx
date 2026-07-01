export default function SalesReportSummaryCards({
  reportSummaries,
}) {
  return (
    <>
      <h2>Sales Report Summary</h2>

      <table border="1">
        <thead>
          <tr>
            <th>Report</th>
            <th>Total Sales</th>
          </tr>
        </thead>

        <tbody>
          {reportSummaries.map((report) => (
            <tr key={report.title}>
              <td>{report.title}</td>
              <td>{report.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}