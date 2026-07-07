import { branchPerformanceData, getBranchComparison, getTargetProgressData, getBranchSummary } from '../../../data/branchData'
import BranchPerformanceCard from './BranchPerformanceCard'
import BranchComparison from './BranchComparison'
import TargetProgressIndicator from './TargetProgressIndicator'
import '../../../styles/branchPerformanceDashboard.css'

export default function BranchPerformanceDashboard() {
  const comparisonData = getBranchComparison()
  const progressData = getTargetProgressData()
  const summary = getBranchSummary()

  return (
    <div className="branch-performance-dashboard" data-testid="branch-performance-dashboard">
      <header className="dashboard-header">
        <h1>Branch Performance Dashboard</h1>
        <p className="subtitle">Real-time branch sales and target tracking</p>
      </header>

      <section className="dashboard-summary" data-testid="dashboard-summary">
        <div className="summary-card">
          <span className="summary-label">Total Branches</span>
          <span className="summary-value">{summary.totalBranches}</span>
        </div>
        <div className="summary-card">
          <span className="summary-label">Total Sales</span>
          <span className="summary-value">₱{(summary.totalSales / 1000000).toFixed(1)}M</span>
        </div>
        <div className="summary-card">
          <span className="summary-label">Average Progress</span>
          <span className="summary-value">{summary.averageProgress}%</span>
        </div>
        <div className="summary-card">
          <span className="summary-label">Achieving Target</span>
          <span className="summary-value">{summary.achievingTarget}</span>
        </div>
      </section>

      <section className="performance-cards-section">
        <h2>Branch Performance Cards</h2>
        <div className="performance-cards-grid" data-testid="performance-cards-grid">
          {branchPerformanceData.map(branch => (
            <BranchPerformanceCard key={branch.id} branch={branch} />
          ))}
        </div>
      </section>

      <section className="branch-comparison-section">
        <BranchComparison comparisonData={comparisonData} />
      </section>

      <section className="target-progress-section">
        <TargetProgressIndicator progressData={progressData} />
      </section>
    </div>
  )
}
