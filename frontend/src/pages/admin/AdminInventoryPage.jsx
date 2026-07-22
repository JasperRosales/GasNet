import { useState, useEffect } from 'react'

const BRANCHES = [
  { branch_id: 1, branch_name: 'Bayan' },
  { branch_id: 2, branch_name: 'Gulod' },
  { branch_id: 3, branch_name: 'Cuenca' },
  { branch_id: 4, branch_name: 'Caloocan' },
  { branch_id: 5, branch_name: 'Agoncillo' },
  { branch_id: 6, branch_name: 'Sta. Teresita' }
]

export default function AdminInventoryPage() {
  const [selectedBranch, setSelectedBranch] = useState(1)
  const [inventory, setInventory] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchInventory()
  }, [selectedBranch])

  async function fetchInventory() {
    setLoading(true)
    try {
      const res = await fetch(`/api/admin/inventory/branch/${selectedBranch}`)
      setInventory(await res.json())
    } catch (err) {
      console.error('Failed to fetch inventory:', err)
    } finally {
      setLoading(false)
    }
  }

  async function updateStock(stockId, field, value) {
    try {
      await fetch(`/api/admin/inventory/${stockId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ [field]: value })
      })
      fetchInventory()
    } catch (err) {
      console.error('Failed to update stock:', err)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Inventory Management</h1>
          <p className="text-sm text-slate-500 mt-1">Manage stock levels across branches</p>
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

      <div className="bg-white rounded-xl border border-brand-100/60">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-brand-100/40">
                <th className="text-left py-3 px-5 text-xs font-medium text-slate-500 uppercase">Product</th>
                <th className="text-right py-3 px-5 text-xs font-medium text-slate-500 uppercase">Weight</th>
                <th className="text-right py-3 px-5 text-xs font-medium text-slate-500 uppercase">Stock</th>
                <th className="text-right py-3 px-5 text-xs font-medium text-slate-500 uppercase">Reorder Level</th>
                <th className="text-center py-3 px-5 text-xs font-medium text-slate-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody>
              {inventory.map(item => (
                <tr key={item.stock_id} className="border-b border-brand-50 last:border-0 hover:bg-brand-50/30">
                  <td className="py-3 px-5 font-medium text-slate-900">{item.product_name}</td>
                  <td className="py-3 px-5 text-right text-slate-600">{item.weight_kg} kg</td>
                  <td className="py-3 px-5 text-right">
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => updateStock(item.stock_id, 'quantity', Number(e.target.value))}
                      className="w-20 text-right px-2 py-1 border border-slate-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                  </td>
                  <td className="py-3 px-5 text-right">
                    <input
                      type="number"
                      value={item.reorder_level}
                      onChange={(e) => updateStock(item.stock_id, 'reorder_level', Number(e.target.value))}
                      className="w-20 text-right px-2 py-1 border border-slate-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                  </td>
                  <td className="py-3 px-5 text-center">
                    <span className={`inline-block px-2.5 py-0.5 rounded text-xs font-medium ${
                      item.quantity <= item.reorder_level
                        ? 'bg-red-50 text-red-700 border border-red-200'
                        : 'bg-brand-50 text-brand-700 border border-brand-200'
                    }`}>
                      {item.quantity <= item.reorder_level ? 'Low Stock' : 'In Stock'}
                    </span>
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
