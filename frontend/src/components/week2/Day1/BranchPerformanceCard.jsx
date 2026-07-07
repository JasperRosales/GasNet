import '../../../styles/branchPerformanceCard.css'

export default function BranchPerformanceCard({ branch }) {
  if (!branch) {
    return <div className="branch-performance-card error">No branch data available</div>
  }

  return (
    <div className="branch-performance-card" data-testid={`branch-card-${branch.id}`}>
      <div className="card-header">
        <h3>{branch.name}</h3>
        <span className="location">{branch.location}</span>
      </div>
      <div className="card-body">
        <div className="performance-metric">
          <span className="label">Monthly Sales</span>
          <span className="value">₱{(branch.monthlySales / 1000).toFixed(0)}K</span>
        </div>
        <div className="performance-metric">
          <span className="label">Weekly Sales</span>
          <span className="value">₱{(branch.weeklySales / 1000).toFixed(0)}K</span>
        </div>
        <div className="performance-metric">
          <span className="label">Growth Rate</span>
          <span className={`value growth-${branch.growth > 5 ? 'high' : 'normal'}`}>+{branch.growth}%</span>
        </div>
        <div className="performance-metric">
          <span className="label">Target Progress</span>
          <span className="value progress-bar">
            <div className="bar-container">
              <div className="bar-fill" style={{width: `${Math.min(branch.targetProgress, 100)}%`}}></div>
            </div>
            <span className="progress-text">{branch.targetProgress}%</span>
          </span>
        </div>
      </div>
    </div>
  )
}
