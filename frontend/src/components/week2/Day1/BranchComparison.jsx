export default function BranchComparison({ comparisonData }) {
  if (!comparisonData || comparisonData.length === 0) {
    return <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl p-4 text-center text-sm">No comparison data available</div>
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-6 shadow-sm" data-testid="branch-comparison">
      <div className="mb-6 pb-4 border-b border-slate-100">
        <h3 className="text-lg font-semibold text-slate-900 mb-1">Branch Comparison</h3>
        <p className="text-sm text-slate-500">Sales Performance vs Target</p>
      </div>
      <div className="overflow-x-auto">
        <div className="grid grid-cols-[50px_1fr_120px_120px_140px] gap-4 items-center py-2.5 px-4 bg-slate-50 rounded-lg border border-slate-100 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
          <div>Rank</div>
          <div>Branch Name</div>
          <div>Monthly Sales</div>
          <div>Target</div>
          <div>Achievement %</div>
        </div>
        <div className="space-y-1">
          {comparisonData.map((branch, index) => (
            <div key={`${branch.name}-${index}`} className="grid grid-cols-[50px_1fr_120px_120px_140px] gap-4 items-center py-3 px-4 rounded-lg hover:bg-slate-50/80 transition-colors text-sm" data-testid={`comparison-row-${index}`}>
              <div className="font-semibold text-slate-900">{index + 1}</div>
              <div className="font-medium text-slate-900">{branch.name}</div>
              <div className="text-slate-700">₱{(branch.sales / 1000).toFixed(0)}K</div>
              <div className="text-slate-500">₱{(branch.target / 1000).toFixed(0)}K</div>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-6 bg-slate-100 rounded overflow-hidden">
                  <div
                    className={`h-full rounded transition-all duration-500 ${
                      branch.achievement >= 100 ? 'bg-gradient-to-r from-emerald-400 to-emerald-600' :
                      branch.achievement >= 80 ? 'bg-gradient-to-r from-blue-400 to-blue-600' :
                      'bg-gradient-to-r from-amber-400 to-amber-600'
                    }`}
                    style={{ width: `${Math.min(branch.achievement, 100)}%` }}
                  />
                </div>
                <span className="text-xs font-semibold text-slate-900 min-w-[40px] text-right">{branch.achievement}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
