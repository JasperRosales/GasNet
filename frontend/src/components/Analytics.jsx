import MetricCard from './MetricCard'
import Alerts from './Alerts'

export default function Analytics() {
  return (
    <main className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-slate-900">Overview</h1>
        <p className="text-sm text-slate-500 mt-1">Latest metrics and alerts</p>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title="Daily Sales" value="₱12,430" delta="+4.2%" />
        <MetricCard title="Active Branches" value="6" delta="" />
        <MetricCard title="Open Deliveries" value="3" delta="-1" />
        <MetricCard title="Stock Alerts" value="2" delta="" />
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-white rounded-xl border border-brand-100/60 p-5">
          <h3 className="text-sm font-semibold text-slate-900 mb-4">Recent Activity</h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-brand-500 mt-1.5 shrink-0" />
              <div className="text-sm text-slate-700">Sale recorded at Bayan — ₱2,500</div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-brand-400 mt-1.5 shrink-0" />
              <div className="text-sm text-slate-700">Delivery marked delivered — Caloocan</div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-sand mt-1.5 shrink-0" />
              <div className="text-sm text-slate-700">Price updated — Sta. Teresita</div>
            </li>
          </ul>
        </div>
        <div>
          <Alerts />
        </div>
      </section>
    </main>
  )
}
