import '../../../styles/branchComparison.css'

export default function BranchComparison({ comparisonData }) {
  if (!comparisonData || comparisonData.length === 0) {
    return <div className="branch-comparison error">No comparison data available</div>
  }

  return (
    <div className="branch-comparison" data-testid="branch-comparison">
      <div className="comparison-header">
        <h3>Branch Comparison</h3>
        <p className="subtitle">Sales Performance vs Target</p>
      </div>
      <div className="comparison-table">
        <div className="table-header">
          <div className="column rank">Rank</div>
          <div className="column name">Branch Name</div>
          <div className="column sales">Monthly Sales</div>
          <div className="column target">Target</div>
          <div className="column achievement">Achievement %</div>
        </div>
        <div className="table-body">
          {comparisonData.map((branch, index) => (
            <div key={`${branch.name}-${index}`} className="table-row" data-testid={`comparison-row-${index}`}>
              <div className="column rank">{index + 1}</div>
              <div className="column name">{branch.name}</div>
              <div className="column sales">₱{(branch.sales / 1000).toFixed(0)}K</div>
              <div className="column target">₱{(branch.target / 1000).toFixed(0)}K</div>
              <div className="column achievement">
                <div className="achievement-display">
                  <div className={`achievement-bar ${branch.achievement >= 100 ? 'exceeded' : branch.achievement >= 80 ? 'on-track' : 'below'}`}
                       style={{width: `${Math.min(branch.achievement, 100)}%`}}>
                  </div>
                  <span className="achievement-text">{branch.achievement}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
