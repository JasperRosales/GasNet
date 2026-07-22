import { useState, useEffect } from 'react'

export default function AnalyticsPage() {
  const [activeTab, setActiveTab] = useState('sales')
  const [salesSummary, setSalesSummary] = useState(null)
  const [branchComparison, setBranchComparison] = useState([])
  const [dailySales, setDailySales] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const [summary, branches, daily] = await Promise.all([
          fetch('/api/analytics/sales-summary').then(r => r.json()),
          fetch('/api/analytics/branch-comparison').then(r => r.json()),
          fetch('/api/analytics/daily-sales').then(r => r.json())
        ])
        if (!cancelled) {
          setSalesSummary(summary)
          setBranchComparison(branches)
          setDailySales(daily)
        }
      } catch (err) {
        console.error('Failed to fetch analytics:', err)
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => { cancelled = true }
  }, [])

  const tabs = [
    { id: 'sales', label: 'Sales Analytics' },
    { id: 'branches', label: 'Branch Performance' },
    { id: 'trends', label: 'Daily Trends' }
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Analytics</h1>
        <p className="text-sm text-slate-500 mt-1">Business insights and performance metrics</p>
      </div>

      <div className="flex gap-1 bg-brand-50 p-1 rounded-lg w-fit">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-white text-brand-700 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-12 text-slate-400">Loading analytics...</div>
      ) : (
        <>
          {activeTab === 'sales' && (
            <SalesAnalytics summary={salesSummary} />
          )}
          {activeTab === 'branches' && (
            <BranchPerformance data={branchComparison} />
          )}
          {activeTab === 'trends' && (
            <DailyTrends data={dailySales} />
          )}
        </>
      )}
    </div>
  )
}

function SalesAnalytics({ summary }) {
  if (!summary) return <div className="text-slate-400 text-center py-8">No data available</div>

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <MetricCard
          title="Today"
          transactions={summary.today.transactions}
          revenue={summary.today.revenue}
        />
        <MetricCard
          title="This Week"
          transactions={summary.thisWeek.transactions}
          revenue={summary.thisWeek.revenue}
        />
        <MetricCard
          title="This Month"
          transactions={summary.thisMonth.transactions}
          revenue={summary.thisMonth.revenue}
        />
      </div>

      <div className="bg-white rounded-xl border border-brand-100/60 p-5">
        <h3 className="text-sm font-semibold text-slate-900 mb-4">Sales Summary</h3>
        <div className="text-center py-8 text-slate-500 text-sm">
          {summary.today.transactions === 0 && summary.thisWeek.transactions === 0
            ? 'No sales recorded yet. Start selling from the POS page!'
            : `Total revenue this month: ₱${summary.thisMonth.revenue.toLocaleString()}`
          }
        </div>
      </div>
    </div>
  )
}

function BranchPerformance({ data }) {
  if (!data || data.length === 0) return <div className="text-slate-400 text-center py-8">No branch data available</div>

  const maxSales = Math.max(...data.map(b => b.total_sales), 1)

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-brand-100/60 p-5">
        <h3 className="text-sm font-semibold text-slate-900 mb-4">Branch Sales Comparison</h3>
        <div className="space-y-4">
          {data.map(branch => (
            <div key={branch.branch_id} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-700">{branch.branch_name}</span>
                <span className="text-sm font-semibold text-slate-900">₱{branch.total_sales.toLocaleString()}</span>
              </div>
              <div className="h-2 bg-brand-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-brand-500 rounded-full transition-all"
                  style={{ width: `${(branch.total_sales / maxSales) * 100}%` }}
                />
              </div>
              <div className="text-xs text-slate-400">{branch.transaction_count} transactions</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function DailyTrends({ data }) {
  if (!data || data.length === 0) return <div className="text-slate-400 text-center py-8">No daily sales data available</div>

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-brand-100/60 p-5">
        <h3 className="text-sm font-semibold text-slate-900 mb-4">Daily Sales (Last 30 Days)</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-brand-100/40">
                <th className="text-left py-3 px-4 text-xs font-medium text-slate-500 uppercase">Date</th>
                <th className="text-right py-3 px-4 text-xs font-medium text-slate-500 uppercase">Transactions</th>
                <th className="text-right py-3 px-4 text-xs font-medium text-slate-500 uppercase">Revenue</th>
              </tr>
            </thead>
            <tbody>
              {data.map(day => (
                <tr key={day.date} className="border-b border-brand-50 last:border-0">
                  <td className="py-3 px-4 text-slate-700">{day.date}</td>
                  <td className="py-3 px-4 text-right text-slate-700">{day.transactions}</td>
                  <td className="py-3 px-4 text-right font-medium text-slate-900">₱{day.revenue.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function MetricCard({ title, transactions, revenue }) {
  return (
    <div className="bg-white rounded-xl border border-brand-100/60 p-5">
      <div className="text-sm font-medium text-slate-500 mb-3">{title}</div>
      <div className="space-y-1">
        <div className="text-2xl font-bold text-slate-900">₱{revenue.toLocaleString()}</div>
        <div className="text-xs text-slate-400">{transactions} transactions</div>
      </div>
    </div>
  )
}
