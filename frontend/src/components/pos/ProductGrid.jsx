export default function ProductGrid({ products, onAddToCart }) {
  const tankIcons = {
    2.7: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
    11: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
      </svg>
    ),
    22: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
      </svg>
    ),
    50: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    )
  }

  return (
    <div className="bg-white rounded-xl border border-brand-100/60 p-5">
      <h2 className="text-sm font-semibold text-slate-900 mb-4">Products</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {products.map(product => (
          <button
            key={product.product_id}
            onClick={() => onAddToCart(product)}
            className="p-4 rounded-xl border border-brand-100/60 hover:border-brand-300 hover:bg-brand-50/50 transition-all text-left group"
          >
            <div className="w-14 h-14 rounded-lg bg-brand-50 flex items-center justify-center text-brand-600 mb-3 group-hover:bg-brand-100 transition-colors">
              {tankIcons[product.weight_kg] || tankIcons[11]}
            </div>
            <div className="font-semibold text-slate-900 text-sm">{product.product_name}</div>
            <div className="text-lg font-bold text-brand-700 mt-1">₱{product.price.toLocaleString()}</div>
            <div className="text-xs text-slate-400 mt-1">Click to add</div>
          </button>
        ))}
      </div>
    </div>
  )
}
