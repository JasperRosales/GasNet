import { useState, useEffect, useCallback } from 'react'

const BRANCHES = [
  { branch_id: 1, branch_name: 'Bayan' },
  { branch_id: 2, branch_name: 'Gulod' },
  { branch_id: 3, branch_name: 'Cuenca' },
  { branch_id: 4, branch_name: 'Caloocan' },
  { branch_id: 5, branch_name: 'Agoncillo' },
  { branch_id: 6, branch_name: 'Sta. Teresita' }
]

export default function InventoryPage() {
  const [selectedBranch, setSelectedBranch] = useState(1)
  const [inventory, setInventory] = useState([])
  const [alerts, setAlerts] = useState([])

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const [invRes, alertRes] = await Promise.all([
          fetch(`/api/inventory/${selectedBranch}`),
          fetch(`/api/inventory/alerts/${selectedBranch}`)
        ])
        if (!cancelled) {
          setInventory(await invRes.json())
          setAlerts(await alertRes.json())
        }
      } catch (err) {
        console.error('Failed to fetch inventory:', err)
      }
    })()
    return () => { cancelled = true }
  }, [selectedBranch])

  const refreshData = useCallback(async () => {
    try {
      const [invRes, alertRes] = await Promise.all([
        fetch(`/api/inventory/${selectedBranch}`),
        fetch(`/api/inventory/alerts/${selectedBranch}`)
      ])
      setInventory(await invRes.json())
      setAlerts(await alertRes.json())
    } catch (err) {
      console.error('Failed to refresh inventory:', err)
    }
  }, [selectedBranch])

  async function updateStock(stockId, newQuantity) {
    try {
      await fetch(`/api/inventory/${stockId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity: newQuantity })
      })
      refreshData()
    } catch (err) {
      console.error('Failed to update stock:', err)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Inventory</h1>
          <p className="text-sm text-slate-500 mt-1">Monitor stock levels and inventory updates</p>
        </div>
        <div className="flex items-center gap-3">
          <label className="text-sm font-medium text-slate-600">Branch:</label>
          <select
            value={selectedBranch}
            onChange={(e) => setSelectedBranch(Number(e.target.value))}
            className="px-3 py-2 border border-brand-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
          >
            {BRANCHES.map(b => (
              <option key={b.branch_id} value={b.branch_id}>{b.branch_name}</option>
            ))}
          </select>
        </div>
      </div>

      {alerts.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.27 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <h3 className="text-sm font-semibold text-red-800">Low Stock Alerts</h3>
          </div>
          <div className="space-y-1">
            {alerts.map(alert => (
              <div key={alert.stock_id} className="text-sm text-red-700">
                {alert.product_name} — {alert.quantity} remaining (reorder at {alert.reorder_level})
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <SummaryCard label="Total Products" value={inventory.length} color="brand" />
        <SummaryCard label="Low Stock Items" value={alerts.length} color="danger" />
        <SummaryCard label="In Stock" value={inventory.length - alerts.length} color="accent" />
      </div>

      <div className="bg-white rounded-xl border border-brand-100/60">
        <div className="px-5 py-4 border-b border-brand-100/40">
          <h2 className="text-sm font-semibold text-slate-900">Product Inventory</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-brand-100/40">
                <th className="text-left py-3 px-5 text-xs font-medium text-slate-500 uppercase">Product</th>
                <th className="text-right py-3 px-5 text-xs font-medium text-slate-500 uppercase">Weight</th>
                <th className="text-right py-3 px-5 text-xs font-medium text-slate-500 uppercase">Stock</th>
                <th className="text-right py-3 px-5 text-xs font-medium text-slate-500 uppercase">Min. Stock</th>
                <th className="text-right py-3 px-5 text-xs font-medium text-slate-500 uppercase">Price</th>
                <th className="text-center py-3 px-5 text-xs font-medium text-slate-500 uppercase">Status</th>
                <th className="text-center py-3 px-5 text-xs font-medium text-slate-500 uppercase">Action</th>
              </tr>
            </thead>
            <tbody>
              {inventory.map((item) => (
                <tr key={item.stock_id} className="border-b border-brand-50 last:border-0 hover:bg-brand-50/30 transition-colors">
                  <td className="py-3 px-5 font-medium text-slate-900">{item.product_name}</td>
                  <td className="py-3 px-5 text-right text-slate-500">{item.weight_kg} kg</td>
                  <td className="py-3 px-5 text-right">
                    <span className={`font-semibold ${item.quantity <= item.reorder_level ? 'text-red-600' : 'text-slate-900'}`}>
                      {item.quantity}
                    </span>
                  </td>
                  <td className="py-3 px-5 text-right text-slate-500">{item.reorder_level}</td>
                  <td className="py-3 px-5 text-right text-slate-700">₱{item.price?.toLocaleString() || 'N/A'}</td>
                  <td className="py-3 px-5 text-center">
                    <StatusBadge isLow={item.quantity <= item.reorder_level} />
                  </td>
                  <td className="py-3 px-5 text-center">
                    <button
                      onClick={() => {
                        const newQty = prompt(`Update stock for ${item.product_name}:`, item.quantity)
                        if (newQty !== null && !isNaN(Number(newQty))) {
                          updateStock(item.stock_id, Number(newQty))
                        }
                      }}
                      className="text-xs text-brand-600 hover:text-brand-800 font-medium"
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function SummaryCard({ label, value, color }) {
  const styles = {
    brand: { bg: 'bg-brand-50', text: 'text-brand-700', border: 'border-brand-100/60' },
    danger: { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-100' },
    accent: { bg: 'bg-brand-100', text: 'text-brand-700', border: 'border-brand-200' },
  }
  const s = styles[color]

  return (
    <div className={`${s.bg} rounded-xl p-5 border ${s.border}`}>
      <div className="text-sm font-medium text-slate-600 mb-1">{label}</div>
      <div className={`text-2xl font-bold ${s.text}`}>{value}</div>
    </div>
  )
}

function StatusBadge({ isLow }) {
  return (
    <span className={`inline-block px-2.5 py-0.5 rounded text-xs font-medium ${
      isLow
        ? 'bg-red-50 text-red-700 border border-red-200'
        : 'bg-brand-50 text-brand-700 border border-brand-200'
    }`}>
      {isLow ? 'Low Stock' : 'In Stock'}
    </span>
  )
}
