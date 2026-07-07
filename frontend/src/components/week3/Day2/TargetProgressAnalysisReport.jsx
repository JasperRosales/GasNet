export default function TargetProgressAnalysisReport({ targetProgressAnalysisReport }) {
  const rows = Array.isArray(targetProgressAnalysisReport) ? targetProgressAnalysisReport : []

  return (
    <section aria-label="Target Progress Analysis Report">
      <h3>Target Progress Analysis Report</h3>
      {rows.length === 0 ? (
        <p>No target progress analysis data available.</p>
      ) : (
        <ul>
          {rows.map((branch) => (
            <li key={branch.name}>
              {branch.name} - Progress: {branch.progress}% | Gap: {branch.gap} | Status: {branch.status}
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
