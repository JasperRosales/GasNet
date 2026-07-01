export default function ReportDataPresentation({
  reportData,
}) {
  return (
    <>
      <h2>Report Data Presentation</h2>

      <table border="1">
        <thead>
          <tr>
            <th>Branch</th>
            <th>Total Sales</th>
            <th>Transactions</th>
          </tr>
        </thead>

        <tbody>
          {reportData.map((report) => (
            <tr key={report.branch}>
              <td>{report.branch}</td>
              <td>{report.totalSales}</td>
              <td>{report.transactions}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}