import { Router } from 'express'
import { queryAll, queryOne, runStatement, saveDatabase } from '../config/database.js'
import crypto from 'crypto'

const router = Router()

router.post('/transactions', (req, res) => {
  const {
    branch_id,
    staff_id,
    guest_name,
    guest_phone,
    delivery_address,
    transaction_type,
    items
  } = req.body

  if (!branch_id || !staff_id || !guest_name || !items || items.length === 0) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  const idempotency_key = crypto.randomUUID()
  const tracking_no = `TRK-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`

  let subtotal = 0
  const productPrices = []
  for (const item of items) {
    const priceRecord = queryOne(
      'SELECT price FROM branch_product_prices WHERE branch_id = ? AND product_id = ?',
      [branch_id, item.product_id]
    )
    if (!priceRecord) {
      return res.status(400).json({ error: `Product ${item.product_id} not available at this branch` })
    }
    const lineTotal = priceRecord.price * item.quantity
    subtotal += lineTotal
    productPrices.push({ ...item, price: priceRecord.price, lineTotal })
  }

  const total = subtotal

  const existing = queryOne(
    'SELECT sales_id FROM sales_transactions WHERE branch_id = ? AND idempotency_key = ?',
    [branch_id, idempotency_key]
  )
  if (existing) {
    return res.status(409).json({ error: 'Transaction already exists (idempotent)' })
  }

  const result = runStatement(`
    INSERT INTO sales_transactions (
      idempotency_key, tracking_no, guest_name, guest_phone,
      delivery_address, branch_id, staff_id, transaction_type,
      subtotal, total
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `, [
    idempotency_key, tracking_no, guest_name, guest_phone || null,
    delivery_address || null, branch_id, staff_id, transaction_type || 'Instore',
    subtotal, total
  ])

  const transaction = queryOne('SELECT * FROM sales_transactions WHERE sales_id = ?', [result.lastInsertRowid])

  for (const item of productPrices) {
    runStatement('UPDATE branch_stock SET quantity = quantity - ? WHERE branch_id = ? AND product_id = ?',
      [item.quantity, branch_id, item.product_id])
  }

  if (delivery_address) {
    runStatement('INSERT INTO deliveries (sales_id, status) VALUES (?, ?)',
      [transaction.sales_id, 'Pending'])
  }

  res.status(201).json({
    ...transaction,
    items: productPrices
  })
})

router.get('/transactions/:id', (req, res) => {
  const transaction = queryOne('SELECT * FROM sales_transactions WHERE sales_id = ?', [Number(req.params.id)])
  if (!transaction) {
    return res.status(404).json({ error: 'Transaction not found' })
  }
  res.json(transaction)
})

router.get('/transactions/branch/:branchId', (req, res) => {
  const transactions = queryAll(`
    SELECT st.*, s.username as staff_name
    FROM sales_transactions st
    JOIN staff s ON st.staff_id = s.staff_id
    WHERE st.branch_id = ?
    ORDER BY st.sales_id DESC
    LIMIT 50
  `, [Number(req.params.branchId)])
  res.json(transactions)
})

export default router
