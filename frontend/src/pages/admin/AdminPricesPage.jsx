import { useState, useEffect } from 'react'

const BRANCHES = [
  { branch_id: 1, branch_name: 'Bayan' },
  { branch_id: 2, branch_name: 'Gulod' },
  { branch_id: 3, branch_name: 'Cuenca' },
  { branch_id: 4, branch_name: 'Caloocan' },
  { branch_id: 5, branch_name: 'Agoncillo' },
  { branch_id: 6, branch_name: 'Sta. Teresita' }
]

export default function AdminPricesPage() {
  const [selectedBranch, setSelectedBranch] = useState(1)
  const [prices, setPrices] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPrices()
  }, [selectedBranch])

  async function fetchPrices() {
    setLoading(true)
    try {
      const res = await fetch(`/api/admin/prices/branch/${selectedBranch}`)
      setPrices(await res.json())
    } catch (err) {
      console.error('Failed to fetch prices:', err)
    } finally {
      setLoading(false)
    }
  }

  async function updatePrice(productId, newPrice) {
    try {
      await fetch('/api/admin/prices', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          branch_id: selectedBranch,
          product_id: productId,
          price: newPrice
        })
      })
      fetchPrices()
    } catch (err) {
      console.error('Failed to update price:', err)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Price Management</h1>
          <p className="text-sm text-slate-500 mt-1">Set product prices per branch</p>
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
                <th className="text-right py-3 px-5 text-xs font-medium text-slate-500 uppercase">Price (₱)</th>
                <th className="text-center py-3 px-5 text-xs font-medium text-slate-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {prices.map(price => (
                <tr key={`${price.branch_id}-${price.product_id}`} className="border-b border-brand-50 last:border-0 hover:bg-brand-50/30">
                  <td className="py-3 px-5 font-medium text-slate-900">{price.product_name}</td>
                  <td className="py-3 px-5 text-right text-slate-600">{price.weight_kg} kg</td>
                  <td className="py-3 px-5 text-right">
                    <input
                      type="number"
                      value={price.price}
                      onChange={(e) => updatePrice(price.product_id, Number(e.target.value))}
                      className="w-24 text-right px-2 py-1 border border-slate-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                  </td>
                  <td className="py-3 px-5 text-center">
                    <button
                      onClick={() => updatePrice(price.product_id, price.price)}
                      className="text-xs text-brand-600 hover:text-brand-800 font-medium"
                    >
                      Save
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
