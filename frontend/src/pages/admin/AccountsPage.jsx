import { useState, useEffect } from 'react'

export default function AccountsPage() {
  const [accounts, setAccounts] = useState([])
  const [branches, setBranches] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingAccount, setEditingAccount] = useState(null)
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: 'Staff',
    branch_id: ''
  })

  useEffect(() => {
    fetchAccounts()
    fetchBranches()
  }, [])

  async function fetchAccounts() {
    try {
      const res = await fetch('/api/auth/staff')
      setAccounts(await res.json())
    } catch (err) {
      console.error('Failed to fetch accounts:', err)
    } finally {
      setLoading(false)
    }
  }

  async function fetchBranches() {
    try {
      const res = await fetch('/api/products')
      const products = await res.json()
      const branchRes = await fetch('/api/analytics/branch-comparison')
      setBranches(await branchRes.json())
    } catch (err) {
      console.error('Failed to fetch branches:', err)
    }
  }

  function openCreate() {
    setEditingAccount(null)
    setFormData({ username: '', password: '', role: 'Staff', branch_id: '' })
    setShowModal(true)
  }

  function openEdit(account) {
    setEditingAccount(account)
    setFormData({
      username: account.username,
      password: '',
      role: account.role,
      branch_id: account.branch_id || ''
    })
    setShowModal(true)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      if (editingAccount) {
        const body = { ...formData }
        if (!body.password) delete body.password
        await fetch(`/api/auth/staff/${editingAccount.staff_id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body)
        })
      } else {
        await fetch('/api/auth/staff', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        })
      }
      setShowModal(false)
      fetchAccounts()
    } catch (err) {
      alert(err.message)
    }
  }

  async function handleDelete(account) {
    if (!confirm(`Delete account "${account.username}"?`)) return
    try {
      await fetch(`/api/auth/staff/${account.staff_id}`, { method: 'DELETE' })
      fetchAccounts()
    } catch (err) {
      alert(err.message)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Accounts</h1>
          <p className="text-sm text-slate-500 mt-1">Manage POS and staff accounts</p>
        </div>
        <button
          onClick={openCreate}
          className="px-4 py-2 bg-brand-600 text-white rounded-lg text-sm font-medium hover:bg-brand-700 transition-colors"
        >
          + Add Account
        </button>
      </div>

      <div className="bg-white rounded-xl border border-brand-100/60">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-brand-100/40">
                <th className="text-left py-3 px-5 text-xs font-medium text-slate-500 uppercase">Username</th>
                <th className="text-left py-3 px-5 text-xs font-medium text-slate-500 uppercase">Role</th>
                <th className="text-left py-3 px-5 text-xs font-medium text-slate-500 uppercase">Branch</th>
                <th className="text-center py-3 px-5 text-xs font-medium text-slate-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {accounts.map(account => (
                <tr key={account.staff_id} className="border-b border-brand-50 last:border-0 hover:bg-brand-50/30">
                  <td className="py-3 px-5 font-medium text-slate-900">{account.username}</td>
                  <td className="py-3 px-5">
                    <span className={`inline-block px-2.5 py-0.5 rounded text-xs font-medium ${
                      account.role === 'Admin'
                        ? 'bg-slate-100 text-slate-700 border border-slate-200'
                        : 'bg-brand-50 text-brand-700 border border-brand-200'
                    }`}>
                      {account.role}
                    </span>
                  </td>
                  <td className="py-3 px-5 text-slate-600">{account.branch_name || '—'}</td>
                  <td className="py-3 px-5 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => openEdit(account)}
                        className="text-xs text-brand-600 hover:text-brand-800 font-medium"
                      >
                        Edit
                      </button>
                      {account.role !== 'Admin' && (
                        <button
                          onClick={() => handleDelete(account)}
                          className="text-xs text-red-500 hover:text-red-700 font-medium"
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4 p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">
              {editingAccount ? 'Edit Account' : 'Create Account'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Username</label>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  {editingAccount ? 'Password (leave blank to keep)' : 'Password'}
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                  required={!editingAccount}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Role</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                >
                  <option value="Staff">Staff</option>
                  <option value="Manager">Manager</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
              {formData.role !== 'Admin' && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Branch</label>
                  <select
                    value={formData.branch_id}
                    onChange={(e) => setFormData({ ...formData, branch_id: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                    required
                  >
                    <option value="">Select branch</option>
                    {branches.map(b => (
                      <option key={b.branch_id} value={b.branch_id}>{b.branch_name}</option>
                    ))}
                  </select>
                </div>
              )}
              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 bg-brand-600 text-white rounded-lg text-sm font-medium hover:bg-brand-700 transition-colors"
                >
                  {editingAccount ? 'Save Changes' : 'Create Account'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
