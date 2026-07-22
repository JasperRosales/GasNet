export default function Cart({ items, onUpdateQuantity, onRemove, onClear }) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div className="bg-white rounded-xl border border-brand-100/60 p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-slate-900">Cart</h2>
        {items.length > 0 && (
          <button
            onClick={onClear}
            className="text-xs text-slate-400 hover:text-red-500 transition-colors"
          >
            Clear all
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="text-center py-8 text-slate-400 text-sm">
          No items in cart
        </div>
      ) : (
        <div className="space-y-3">
          {items.map(item => (
            <div
              key={item.product_id}
              className="flex items-center gap-3 p-3 rounded-lg bg-brand-50/50 border border-brand-100/40"
            >
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-slate-900 truncate">{item.product_name}</div>
                <div className="text-xs text-slate-500">₱{item.price.toLocaleString()} each</div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onUpdateQuantity(item.product_id, item.quantity - 1)}
                  className="w-7 h-7 rounded-md bg-white border border-brand-200 text-brand-600 hover:bg-brand-50 flex items-center justify-center text-sm font-bold"
                >
                  −
                </button>
                <span className="w-8 text-center text-sm font-semibold text-slate-900">{item.quantity}</span>
                <button
                  onClick={() => onUpdateQuantity(item.product_id, item.quantity + 1)}
                  className="w-7 h-7 rounded-md bg-white border border-brand-200 text-brand-600 hover:bg-brand-50 flex items-center justify-center text-sm font-bold"
                >
                  +
                </button>
              </div>

              <div className="text-sm font-semibold text-slate-900 w-20 text-right">
                ₱{(item.price * item.quantity).toLocaleString()}
              </div>

              <button
                onClick={() => onRemove(item.product_id)}
                className="text-slate-300 hover:text-red-500 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}

          <div className="pt-3 border-t border-brand-100/40">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-600">Total</span>
              <span className="text-lg font-bold text-brand-700">₱{total.toLocaleString()}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
