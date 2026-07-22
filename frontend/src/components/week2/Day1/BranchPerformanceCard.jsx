export default function BranchPerformanceCard({ branch }) {
  if (!branch) {
    return <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl p-4 text-center text-sm">No branch data available</div>
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200" data-testid={`branch-card-${branch.id}`}>
      <div className="mb-5 pb-3 border-b border-slate-100">
        <h3 className="text-lg font-semibold text-slate-900">{branch.name}</h3>
        <span className="text-sm text-slate-500 mt-0.5 block">{branch.location}</span>
      </div>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-sm text-slate-500 font-medium">Monthly Sales</span>
          <span className="text-base font-semibold text-slate-900">₱{(branch.monthlySales / 1000).toFixed(0)}K</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-slate-500 font-medium">Weekly Sales</span>
          <span className="text-base font-semibold text-slate-900">₱{(branch.weeklySales / 1000).toFixed(0)}K</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-slate-500 font-medium">Growth Rate</span>
          <span className={`text-base font-semibold ${branch.growth > 5 ? 'text-emerald-600' : 'text-slate-900'}`}>+{branch.growth}%</span>
        </div>
        <div className="space-y-2">
          <span className="text-sm text-slate-500 font-medium">Target Progress</span>
          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-blue-400 to-blue-600 transition-all duration-500"
              style={{ width: `${Math.min(branch.targetProgress, 100)}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-slate-500">
            <span>{branch.targetProgress}%</span>
            <span>100%</span>
          </div>
        </div>
      </div>
    </div>
  )
}
