export default function TargetProgressIndicator({ progressData }) {
  if (!progressData || progressData.length === 0) {
    return <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl p-4 text-center text-sm">No progress data available</div>
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'achieved': return '✓'
      case 'on-track': return '→'
      case 'needs-attention': return '!'
      default: return '-'
    }
  }

  const statusStyles = {
    achieved: { bg: 'bg-emerald-50', border: 'border-emerald-200', bar: 'from-emerald-400 to-emerald-600', badge: 'bg-emerald-100 text-emerald-800' },
    'on-track': { bg: 'bg-blue-50', border: 'border-blue-200', bar: 'from-blue-400 to-blue-600', badge: 'bg-blue-100 text-blue-800' },
    'needs-attention': { bg: 'bg-amber-50', border: 'border-amber-200', bar: 'from-amber-400 to-amber-600', badge: 'bg-amber-100 text-amber-800' },
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-6 shadow-sm" data-testid="target-progress-indicator">
      <div className="mb-6 pb-4 border-b border-slate-100">
        <h3 className="text-lg font-semibold text-slate-900 mb-1">Target Progress Overview</h3>
        <p className="text-sm text-slate-500">Branch Performance Status</p>
      </div>
      <div className="space-y-4">
        {progressData.map((item, index) => {
          const s = statusStyles[item.status] || statusStyles['on-track']
          return (
            <div key={`${item.name}-${index}`} className={`flex flex-col md:flex-row gap-5 p-4 rounded-xl border transition-all duration-200 hover:shadow-sm ${s.bg} ${s.border}`} data-testid={`progress-item-${index}`}>
              <div className="flex-1 min-w-0 space-y-2">
                <div className="text-[15px] font-semibold text-slate-900">{item.name}</div>
                <div className="flex flex-wrap gap-3 text-xs text-slate-500">
                  <span>Sales: ₱{(item.sales / 1000).toFixed(0)}K</span>
                  <span>Target: ₱{(item.target / 1000).toFixed(0)}K</span>
                  <span className={`font-medium ${item.gap < 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                    {item.gap < 0 ? 'Surplus' : 'Gap'}: ₱{Math.abs(item.gap).toLocaleString()}
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-2 md:w-72">
                <div className="h-3 bg-slate-200/80 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${s.bar} transition-all duration-500`}
                    style={{ width: `${Math.min(item.progress, 100)}%` }}
                  />
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-slate-900">{item.progress}%</span>
                  <span className={`px-2 py-0.5 rounded-md text-xs font-medium ${s.badge}`}>
                    {getStatusIcon(item.status)} {item.status.replace('-', ' ')}
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
