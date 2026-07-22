export default function CustomerForm({ value, onChange }) {
  function update(field, val) {
    onChange(prev => ({ ...prev, [field]: val }))
  }

  return (
    <div className="bg-white rounded-xl border border-brand-100/60 p-5">
      <h2 className="text-sm font-semibold text-slate-900 mb-4">Customer Information</h2>
      <div className="space-y-3">
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">Name *</label>
          <input
            type="text"
            value={value.guest_name}
            onChange={(e) => update('guest_name', e.target.value)}
            placeholder="Customer name"
            className="w-full px-3 py-2 border border-brand-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">Phone</label>
          <input
            type="tel"
            value={value.guest_phone}
            onChange={(e) => update('guest_phone', e.target.value)}
            placeholder="Contact number"
            className="w-full px-3 py-2 border border-brand-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">Delivery Address</label>
          <input
            type="text"
            value={value.delivery_address}
            onChange={(e) => update('delivery_address', e.target.value)}
            placeholder="Leave blank for instore pickup"
            className="w-full px-3 py-2 border border-brand-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>
      </div>
    </div>
  )
}
