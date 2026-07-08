export default function BranchSalesAnalysisReport({ branchSalesAnalysis }) {
  const rows = Array.isArray(branchSalesAnalysis) ? branchSalesAnalysis : []

  return (
    <section aria-label="Branch Sales Analysis Report">
      <h3>Branch Sales Analysis Report</h3>
      {rows.length === 0 ? (
        <p>No branch sales analysis data available.</p>
      ) : (
        <ul>
          {rows.map((branch) => (
            <li key={branch.id}>
              {branch.name} - Sales: {branch.monthlySales} | Target: {branch.target} | Progress: {branch.targetProgress}%
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
