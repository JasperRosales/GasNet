import { Router } from 'express'
import { queryOne, queryAll, runStatement } from '../config/database.js'

const router = Router()

router.get('/admin/products', (req, res) => {
  const products = queryAll('SELECT * FROM products ORDER BY product_id')
  res.json(products)
})

router.post('/admin/products', (req, res) => {
  const { product_name, weight_kg, active } = req.body

  if (!product_name || !weight_kg) {
    return res.status(400).json({ error: 'Product name and weight are required' })
  }

  const existing = queryOne('SELECT product_id FROM products WHERE product_name = ?', [product_name])
  if (existing) {
    return res.status(409).json({ error: 'Product already exists' })
  }

  const result = runStatement(
    'INSERT INTO products (product_name, weight_kg, active) VALUES (?, ?, ?)',
    [product_name, weight_kg, active !== undefined ? active : 1]
  )

  res.status(201).json({
    product_id: result.lastInsertRowid,
    product_name,
    weight_kg,
    active: active !== undefined ? active : 1
  })
})

router.put('/admin/products/:id', (req, res) => {
  const { product_name, weight_kg, active } = req.body
  const productId = Number(req.params.id)

  const existing = queryOne('SELECT product_id FROM products WHERE product_id = ?', [productId])
  if (!existing) {
    return res.status(404).json({ error: 'Product not found' })
  }

  runStatement(
    'UPDATE products SET product_name = ?, weight_kg = ?, active = ? WHERE product_id = ?',
    [product_name, weight_kg, active, productId]
  )

  res.json({ product_id: productId, product_name, weight_kg, active })
})

router.delete('/admin/products/:id', (req, res) => {
  const productId = Number(req.params.id)

  const existing = queryOne('SELECT product_id FROM products WHERE product_id = ?', [productId])
  if (!existing) {
    return res.status(404).json({ error: 'Product not found' })
  }

  runStatement('DELETE FROM products WHERE product_id = ?', [productId])

  res.json({ message: 'Product deleted' })
})

router.get('/admin/inventory', (req, res) => {
  const inventory = queryAll(`
    SELECT bs.stock_id, bs.quantity, bs.reorder_level, bs.branch_id,
           p.product_id, p.product_name, p.weight_kg,
           b.branch_name,
           bpp.price
    FROM branch_stock bs
    JOIN products p ON bs.product_id = p.product_id
    JOIN branches b ON bs.branch_id = b.branch_id
    LEFT JOIN branch_product_prices bpp ON bs.branch_id = bpp.branch_id AND bs.product_id = bpp.product_id
    ORDER BY b.branch_name, p.product_name
  `)
  res.json(inventory)
})

router.get('/admin/inventory/branch/:branchId', (req, res) => {
  const inventory = queryAll(`
    SELECT bs.stock_id, bs.quantity, bs.reorder_level,
           p.product_id, p.product_name, p.weight_kg,
           bpp.price
    FROM branch_stock bs
    JOIN products p ON bs.product_id = p.product_id
    LEFT JOIN branch_product_prices bpp ON bs.branch_id = bpp.branch_id AND bs.product_id = bpp.product_id
    WHERE bs.branch_id = ?
    ORDER BY p.product_name
  `, [Number(req.params.branchId)])
  res.json(inventory)
})

router.put('/admin/inventory/:stockId', (req, res) => {
  const { quantity, reorder_level } = req.body
  const stockId = Number(req.params.stockId)

  const existing = queryOne('SELECT stock_id FROM branch_stock WHERE stock_id = ?', [stockId])
  if (!existing) {
    return res.status(404).json({ error: 'Stock record not found' })
  }

  if (quantity !== undefined && reorder_level !== undefined) {
    runStatement('UPDATE branch_stock SET quantity = ?, reorder_level = ? WHERE stock_id = ?',
      [quantity, reorder_level, stockId])
  } else if (quantity !== undefined) {
    runStatement('UPDATE branch_stock SET quantity = ? WHERE stock_id = ?', [quantity, stockId])
  } else if (reorder_level !== undefined) {
    runStatement('UPDATE branch_stock SET reorder_level = ? WHERE stock_id = ?', [reorder_level, stockId])
  }

  const updated = queryOne('SELECT * FROM branch_stock WHERE stock_id = ?', [stockId])
  res.json(updated)
})

router.post('/admin/inventory', (req, res) => {
  const { branch_id, product_id, quantity, reorder_level } = req.body

  if (!branch_id || !product_id) {
    return res.status(400).json({ error: 'Branch and product are required' })
  }

  const existing = queryOne(
    'SELECT stock_id FROM branch_stock WHERE branch_id = ? AND product_id = ?',
    [branch_id, product_id]
  )
  if (existing) {
    return res.status(409).json({ error: 'Stock record already exists for this branch and product' })
  }

  const result = runStatement(
    'INSERT INTO branch_stock (branch_id, product_id, quantity, reorder_level) VALUES (?, ?, ?, ?)',
    [branch_id, product_id, quantity || 0, reorder_level || 10]
  )

  res.status(201).json({
    stock_id: result.lastInsertRowid,
    branch_id,
    product_id,
    quantity: quantity || 0,
    reorder_level: reorder_level || 10
  })
})

router.get('/admin/prices/branch/:branchId', (req, res) => {
  const prices = queryAll(`
    SELECT bpp.*, p.product_name, p.weight_kg
    FROM branch_product_prices bpp
    JOIN products p ON bpp.product_id = p.product_id
    WHERE bpp.branch_id = ?
    ORDER BY p.product_name
  `, [Number(req.params.branchId)])
  res.json(prices)
})

router.put('/admin/prices', (req, res) => {
  const { branch_id, product_id, price } = req.body

  if (!branch_id || !product_id || price === undefined) {
    return res.status(400).json({ error: 'Branch, product, and price are required' })
  }

  const existing = queryOne(
    'SELECT * FROM branch_product_prices WHERE branch_id = ? AND product_id = ?',
    [branch_id, product_id]
  )

  if (existing) {
    runStatement(
      'UPDATE branch_product_prices SET price = ?, updated_at = CURRENT_TIMESTAMP WHERE branch_id = ? AND product_id = ?',
      [price, branch_id, product_id]
    )
  } else {
    runStatement(
      'INSERT INTO branch_product_prices (branch_id, product_id, price) VALUES (?, ?, ?)',
      [branch_id, product_id, price]
    )
  }

  res.json({ branch_id, product_id, price })
})

router.get('/admin/transactions', (req, res) => {
  const transactions = queryAll(`
    SELECT st.*, s.username as staff_name, b.branch_name
    FROM sales_transactions st
    JOIN staff s ON st.staff_id = s.staff_id
    JOIN branches b ON st.branch_id = b.branch_id
    ORDER BY st.sales_id DESC
    LIMIT 100
  `)
  res.json(transactions)
})

router.get('/admin/transactions/branch/:branchId', (req, res) => {
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
