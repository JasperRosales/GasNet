import { useState, useEffect } from 'react'

export default function AdminTransactionsPage() {
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTransactions()
  }, [])

  async function fetchTransactions() {
    try {
      const res = await fetch('/api/admin/transactions')
      setTransactions(await res.json())
    } catch (err) {
      console.error('Failed to fetch transactions:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Transactions</h1>
        <p className="text-sm text-slate-500 mt-1">View all sales transactions across branches</p>
      </div>

      <div className="bg-white rounded-xl border border-brand-100/60">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-brand-100/40">
                <th className="text-left py-3 px-5 text-xs font-medium text-slate-500 uppercase">ID</th>
                <th className="text-left py-3 px-5 text-xs font-medium text-slate-500 uppercase">Date</th>
                <th className="text-left py-3 px-5 text-xs font-medium text-slate-500 uppercase">Branch</th>
                <th className="text-left py-3 px-5 text-xs font-medium text-slate-500 uppercase">Staff</th>
                <th className="text-left py-3 px-5 text-xs font-medium text-slate-500 uppercase">Customer</th>
                <th className="text-left py-3 px-5 text-xs font-medium text-slate-500 uppercase">Type</th>
                <th className="text-right py-3 px-5 text-xs font-medium text-slate-500 uppercase">Total</th>
              </tr>
            </thead>
            <tbody>
              {transactions.length === 0 ? (
                <tr>
                  <td colSpan="7" className="py-8 text-center text-slate-400">
                    No transactions yet
                  </td>
                </tr>
              ) : (
                transactions.map(tx => (
                  <tr key={tx.sales_id} className="border-b border-brand-50 last:border-0 hover:bg-brand-50/30">
                    <td className="py-3 px-5 font-mono text-xs text-slate-500">{tx.sales_id}</td>
                    <td className="py-3 px-5 text-slate-700">{tx.transaction_date}</td>
                    <td className="py-3 px-5 font-medium text-slate-900">{tx.branch_name}</td>
                    <td className="py-3 px-5 text-slate-600">{tx.staff_name}</td>
                    <td className="py-3 px-5 text-slate-700">{tx.guest_name}</td>
                    <td className="py-3 px-5">
                      <span className={`inline-block px-2.5 py-0.5 rounded text-xs font-medium ${
                        tx.transaction_type === 'Commercial'
                          ? 'bg-brand-50 text-brand-700 border border-brand-200'
                          : 'bg-slate-100 text-slate-600 border border-slate-200'
                      }`}>
                        {tx.transaction_type}
                      </span>
                    </td>
                    <td className="py-3 px-5 text-right font-semibold text-slate-900">₱{tx.total.toLocaleString()}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
