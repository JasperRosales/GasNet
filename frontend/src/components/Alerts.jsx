export default function Alerts() {
  return (
    <div className="bg-white rounded-xl border border-brand-100/60 p-5">
      <h3 className="text-sm font-semibold text-slate-900 mb-3">Alerts</h3>
      <ul className="space-y-2">
        <li className="text-sm px-3 py-2.5 rounded-lg bg-red-50 text-red-800 border border-red-200">
          Delivery delayed — Gulod
        </li>
        <li className="text-sm px-3 py-2.5 rounded-lg bg-amber-50 text-amber-800 border border-amber-200">
          Low stock — Cuenca
        </li>
        <li className="text-sm px-3 py-2.5 rounded-lg bg-brand-50 text-brand-800 border border-brand-200">
          New price published — Bayan
        </li>
      </ul>
    </div>
  )
}
