import { branchPerformanceData, getBranchComparison, getTargetProgressData, getBranchSummary } from '../../../data/branchData'
import BranchPerformanceCard from './BranchPerformanceCard'
import BranchComparison from './BranchComparison'
import TargetProgressIndicator from './TargetProgressIndicator'

export default function BranchPerformanceDashboard() {
  const comparisonData = getBranchComparison()
  const progressData = getTargetProgressData()
  const summary = getBranchSummary()

  return (
    <div className="w-full p-6 bg-slate-50 min-h-screen" data-testid="branch-performance-dashboard">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Branch Performance Dashboard</h1>
        <p className="text-base text-slate-500">Real-time branch sales and target tracking</p>
      </header>

      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8" data-testid="dashboard-summary">
        <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-sm hover:shadow-md transition-shadow">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Branches</span>
          <span className="text-2xl font-bold text-slate-900 mt-2 block">{summary.totalBranches}</span>
        </div>
        <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-sm hover:shadow-md transition-shadow">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Sales</span>
          <span className="text-2xl font-bold text-slate-900 mt-2 block">₱{(summary.totalSales / 1000000).toFixed(1)}M</span>
        </div>
        <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-sm hover:shadow-md transition-shadow">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Average Progress</span>
          <span className="text-2xl font-bold text-slate-900 mt-2 block">{summary.averageProgress}%</span>
        </div>
        <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-sm hover:shadow-md transition-shadow">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Achieving Target</span>
          <span className="text-2xl font-bold text-slate-900 mt-2 block">{summary.achievingTarget}</span>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-slate-900 mb-5">Branch Performance Cards</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5" data-testid="performance-cards-grid">
          {branchPerformanceData.map(branch => (
            <BranchPerformanceCard key={branch.id} branch={branch} />
          ))}
        </div>
      </section>

      <section className="mb-8">
        <BranchComparison comparisonData={comparisonData} />
      </section>

      <section>
        <TargetProgressIndicator progressData={progressData} />
      </section>
    </div>
  )
}
