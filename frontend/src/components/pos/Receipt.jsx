export default function Receipt({ transaction, onClose }) {
  function handlePrint() {
    window.print()
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white rounded-xl border border-brand-100/60 p-6 print:border-0 print:rounded-none">
        <div className="text-center mb-6">
          <h1 className="text-xl font-bold text-slate-900">CJG LPG Trading</h1>
          <p className="text-sm text-slate-500 mt-1">GasNet POS Receipt</p>
        </div>

        <div className="space-y-2 text-sm border-t border-b border-brand-100/40 py-4">
          <div className="flex justify-between">
            <span className="text-slate-500">Tracking No.</span>
            <span className="font-mono font-medium text-slate-900">{transaction.tracking_no}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Date</span>
            <span className="text-slate-900">{transaction.transaction_date}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Type</span>
            <span className="text-slate-900">{transaction.transaction_type}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Customer</span>
            <span className="text-slate-900">{transaction.guest_name}</span>
          </div>
          {transaction.guest_phone && (
            <div className="flex justify-between">
              <span className="text-slate-500">Phone</span>
              <span className="text-slate-900">{transaction.guest_phone}</span>
            </div>
          )}
          {transaction.delivery_address && (
            <div className="flex justify-between">
              <span className="text-slate-500">Delivery</span>
              <span className="text-slate-900 text-right max-w-[60%]">{transaction.delivery_address}</span>
            </div>
          )}
        </div>

        {transaction.items && (
          <div className="py-4 border-b border-brand-100/40">
            <h3 className="text-xs font-medium text-slate-500 uppercase mb-3">Items</h3>
            <div className="space-y-2">
              {transaction.items.map((item, i) => (
                <div key={i} className="flex justify-between text-sm">
                  <span className="text-slate-700">{item.product_name || `Product ${item.product_id}`} x{item.quantity}</span>
                  <span className="font-medium text-slate-900">₱{item.lineTotal.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="py-4">
          <div className="flex justify-between">
            <span className="text-base font-semibold text-slate-900">Total</span>
            <span className="text-lg font-bold text-brand-700">₱{transaction.total.toLocaleString()}</span>
          </div>
        </div>

        <div className="text-center text-xs text-slate-400 mt-4">
          Thank you for your purchase!
        </div>
      </div>

      <div className="flex gap-3 mt-4 print:hidden">
        <button
          onClick={handlePrint}
          className="flex-1 py-2.5 bg-brand-600 text-white rounded-xl text-sm font-semibold hover:bg-brand-700 transition-colors"
        >
          Print Receipt
        </button>
        <button
          onClick={onClose}
          className="flex-1 py-2.5 bg-brand-50 text-brand-700 rounded-xl text-sm font-semibold hover:bg-brand-100 transition-colors"
        >
          New Sale
        </button>
      </div>
    </div>
  )
}
