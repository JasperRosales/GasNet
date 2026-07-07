export default function BranchComparisonReport({ branchComparisonReport }) {
  const rows = Array.isArray(branchComparisonReport) ? branchComparisonReport : []

  return (
    <section aria-label="Branch Comparison Report">
      <h3>Branch Comparison Report</h3>
      {rows.length === 0 ? (
        <p>No branch comparison data available.</p>
      ) : (
        <ol>
          {rows.map((branch) => (
            <li key={`${branch.rank}-${branch.name}`}>
              #{branch.rank} {branch.name} - Sales: {branch.monthlySales} | Achievement: {branch.achievement}%
            </li>
          ))}
        </ol>
      )}
    </section>
  )
}
