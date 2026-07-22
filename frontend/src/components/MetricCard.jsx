export default function MetricCard({ title = 'No Data', value = '0', delta = null }) {
  return (
    <div className="bg-white rounded-xl border border-brand-100/60 p-5">
      <div className="text-sm font-medium text-slate-500 mb-1">{title}</div>
      <div className="text-2xl font-bold text-slate-900">{value}</div>
      {delta != null && delta !== '' && (
        <div className={`text-xs font-medium mt-2 ${
          delta.startsWith('+') ? 'text-brand-600' :
          delta.startsWith('-') ? 'text-red-600' :
          'text-slate-500'
        }`}>
          {delta}
        </div>
      )}
    </div>
  )
}
