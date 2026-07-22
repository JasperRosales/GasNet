import { useEffect, useState } from 'react'
import { fetchSalesAnalyticsReports, fetchBranchPerformanceAnalysis } from '../services/api'

export default function HomePage() {
  const [salesData, setSalesData] = useState(null)
  const [branchData, setBranchData] = useState(null)

  useEffect(() => {
    Promise.all([
      fetchSalesAnalyticsReports().catch(() => null),
      fetchBranchPerformanceAnalysis().catch(() => null),
    ]).then(([sales, branch]) => {
      setSalesData(sales)
      setBranchData(branch)
    })
  }, [])

  const totalSales = salesData?.monthly?.totalSales ?? 0
  const totalTransactions = salesData?.monthly?.transactionCount ?? 0
  const branchCount = branchData?.branchSalesAnalysis?.length ?? 0
  const avgProgress = branchData?.targetProgressAnalysisReport
    ? Math.round(branchData.targetProgressAnalysisReport.reduce((s, b) => s + b.progress, 0) / branchData.targetProgressAnalysisReport.length)
    : 0

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-sm text-slate-500 mt-1">Overview of your business metrics</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Monthly Sales"
          value={`₱${totalSales.toLocaleString()}`}
          icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
          color="brand"
        />
        <MetricCard
          title="Transactions"
          value={totalTransactions.toLocaleString()}
          icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>}
          color="accent"
        />
        <MetricCard
          title="Active Branches"
          value={branchCount}
          icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72" /></svg>}
          color="muted"
        />
        <MetricCard
          title="Avg. Target Progress"
          value={`${avgProgress}%`}
          icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" /></svg>}
          color="warm"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-white rounded-xl border border-brand-100/60 p-5">
          <h2 className="text-sm font-semibold text-slate-900 mb-4">Recent Activity</h2>
          <div className="space-y-3">
            <ActivityItem color="brand" text="Sale recorded at Bayan Branch — ₱2,500" time="2 min ago" />
            <ActivityItem color="accent" text="Delivery marked delivered — Caloocan" time="15 min ago" />
            <ActivityItem color="sand" text="Price updated — Sta. Teresita" time="1 hr ago" />
            <ActivityItem color="brand" text="Sale recorded at Marikina — ₱4,200" time="2 hr ago" />
            <ActivityItem color="danger" text="Low stock alert — Cuenca" time="3 hr ago" />
          </div>
        </div>

        <div className="bg-white rounded-xl border border-brand-100/60 p-5">
          <h2 className="text-sm font-semibold text-slate-900 mb-4">Alerts</h2>
          <div className="space-y-2.5">
            <AlertItem level="critical" text="Delivery delayed — Gulod" />
            <AlertItem level="warning" text="Low stock — Cuenca" />
            <AlertItem level="info" text="New price published — Bayan" />
          </div>
        </div>
      </div>

      {branchData?.branchComparisonReport && (
        <div className="bg-white rounded-xl border border-brand-100/60 p-5">
          <h2 className="text-sm font-semibold text-slate-900 mb-4">Top Branches by Sales</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {branchData.branchComparisonReport.slice(0, 3).map((branch) => (
              <div key={branch.rank} className="flex items-center gap-3 p-3.5 rounded-lg bg-brand-50/50 border border-brand-100/40 hover:border-brand-200/60 transition-colors">
                <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-brand-600 text-white font-bold text-sm">
                  {branch.rank}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-slate-900 truncate">{branch.name}</div>
                  <div className="text-xs text-slate-500">₱{branch.monthlySales.toLocaleString()}</div>
                </div>
                <div className="text-xs font-semibold text-brand-700 bg-brand-100 px-2.5 py-1 rounded-md">
                  {branch.achievement}%
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function MetricCard({ title, value, icon, color }) {
  const colors = {
    brand: { bg: 'bg-brand-50', text: 'text-brand-600', border: 'border-brand-100' },
    accent: { bg: 'bg-brand-100', text: 'text-brand-700', border: 'border-brand-200' },
    muted: { bg: 'bg-slate-100', text: 'text-slate-600', border: 'border-slate-200' },
    warm: { bg: 'bg-sand/40', text: 'text-brand-700', border: 'border-sand/60' },
  }
  const c = colors[color]

  return (
    <div className={`bg-white rounded-xl border ${c.border} p-5`}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-slate-500">{title}</span>
        <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${c.bg} ${c.text}`}>
          {icon}
        </div>
      </div>
      <div className="text-2xl font-bold text-slate-900">{value}</div>
    </div>
  )
}

function ActivityItem({ color, text, time }) {
  const dotColors = {
    brand: 'bg-brand-500',
    accent: 'bg-brand-400',
    sand: 'bg-sand',
    danger: 'bg-red-400',
  }

  return (
    <div className="flex items-start gap-3">
      <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${dotColors[color]}`} />
      <div className="flex-1 min-w-0">
        <div className="text-sm text-slate-700">{text}</div>
        <div className="text-xs text-slate-400 mt-0.5">{time}</div>
      </div>
    </div>
  )
}

function AlertItem({ level, text }) {
  const styles = {
    critical: 'bg-red-50 text-red-800 border-red-200',
    warning: 'bg-amber-50 text-amber-800 border-amber-200',
    info: 'bg-brand-50 text-brand-800 border-brand-200',
  }

  return (
    <div className={`text-sm px-3 py-2 rounded-lg border ${styles[level]}`}>
      {text}
    </div>
  )
}
