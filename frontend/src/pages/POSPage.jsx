import { useState, useEffect } from 'react'
import ProductGrid from '../components/pos/ProductGrid'
import Cart from '../components/pos/Cart'
import CustomerForm from '../components/pos/CustomerForm'
import Receipt from '../components/pos/Receipt'

export default function POSPage({ user }) {
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState([])
  const [customerInfo, setCustomerInfo] = useState({
    guest_name: '',
    guest_phone: '',
    delivery_address: ''
  })
  const [transactionType, setTransactionType] = useState('Instore')
  const [receipt, setReceipt] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const res = await fetch(`/api/products/prices/${user.branch_id}`)
        if (!cancelled) setProducts(await res.json())
      } catch (err) {
        console.error('Failed to fetch products:', err)
      }
    })()
    return () => { cancelled = true }
  }, [user.branch_id])

  function addToCart(product) {
    setCart(prev => {
      const existing = prev.find(item => item.product_id === product.product_id)
      if (existing) {
        return prev.map(item =>
          item.product_id === product.product_id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  function updateQuantity(productId, quantity) {
    if (quantity <= 0) {
      setCart(prev => prev.filter(item => item.product_id !== productId))
    } else {
      setCart(prev =>
        prev.map(item =>
          item.product_id === productId ? { ...item, quantity } : item
        )
      )
    }
  }

  function removeFromCart(productId) {
    setCart(prev => prev.filter(item => item.product_id !== productId))
  }

  function clearCart() {
    setCart([])
    setCustomerInfo({ guest_name: '', guest_phone: '', delivery_address: '' })
  }

  async function fetchProducts() {
    try {
      const res = await fetch(`/api/products/prices/${user.branch_id}`)
      setProducts(await res.json())
    } catch (err) {
      console.error('Failed to fetch products:', err)
    }
  }

  async function handleCheckout() {
    if (!customerInfo.guest_name.trim()) {
      alert('Please enter customer name')
      return
    }
    if (cart.length === 0) {
      alert('Cart is empty')
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          branch_id: user.branch_id,
          staff_id: user.staff_id,
          guest_name: customerInfo.guest_name,
          guest_phone: customerInfo.guest_phone,
          delivery_address: customerInfo.delivery_address,
          transaction_type: transactionType,
          items: cart.map(item => ({
            product_id: item.product_id,
            quantity: item.quantity
          }))
        })
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || 'Transaction failed')
      }

      const data = await res.json()
      setReceipt(data)
      clearCart()
      fetchProducts()
    } catch (err) {
      alert(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (receipt) {
    return (
      <div className="space-y-6">
        <Receipt transaction={receipt} onClose={() => setReceipt(null)} />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Point of Sale</h1>
          <p className="text-sm text-slate-500 mt-1">Branch: {user.branch?.branch_name || 'Unknown'}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <ProductGrid products={products} onAddToCart={addToCart} />

          <div className="bg-white rounded-xl border border-brand-100/60 p-5">
            <h2 className="text-sm font-semibold text-slate-900 mb-3">Transaction Type</h2>
            <div className="flex gap-3">
              <button
                onClick={() => setTransactionType('Instore')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  transactionType === 'Instore'
                    ? 'bg-brand-600 text-white'
                    : 'bg-brand-50 text-brand-700 hover:bg-brand-100'
                }`}
              >
                Instore
              </button>
              <button
                onClick={() => setTransactionType('Commercial')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  transactionType === 'Commercial'
                    ? 'bg-brand-600 text-white'
                    : 'bg-brand-50 text-brand-700 hover:bg-brand-100'
                }`}
              >
                Commercial
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <Cart
            items={cart}
            onUpdateQuantity={updateQuantity}
            onRemove={removeFromCart}
            onClear={clearCart}
          />

          <CustomerForm
            value={customerInfo}
            onChange={setCustomerInfo}
          />

          <button
            onClick={handleCheckout}
            disabled={loading || cart.length === 0 || !customerInfo.guest_name.trim()}
            className="w-full py-3 bg-brand-600 text-white rounded-xl font-semibold text-sm hover:bg-brand-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? 'Processing...' : 'Complete Sale'}
          </button>
        </div>
      </div>
    </div>
  )
}
