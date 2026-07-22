import { Router } from 'express'
import { queryAll, queryOne, runStatement } from '../config/database.js'

const router = Router()

router.get('/inventory/:branchId', (req, res) => {
  const inventory = queryAll(`
    SELECT bs.stock_id, bs.quantity, bs.reorder_level,
           p.product_id, p.product_name, p.weight_kg,
           bpp.price
    FROM branch_stock bs
    JOIN products p ON bs.product_id = p.product_id
    LEFT JOIN branch_product_prices bpp ON bs.branch_id = bpp.branch_id AND bs.product_id = bpp.product_id
    WHERE bs.branch_id = ?
  `, [Number(req.params.branchId)])
  res.json(inventory)
})

router.get('/inventory/alerts/:branchId', (req, res) => {
  const alerts = queryAll(`
    SELECT bs.stock_id, bs.quantity, bs.reorder_level,
           p.product_id, p.product_name, p.weight_kg
    FROM branch_stock bs
    JOIN products p ON bs.product_id = p.product_id
    WHERE bs.branch_id = ? AND bs.quantity <= bs.reorder_level
  `, [Number(req.params.branchId)])
  res.json(alerts)
})

router.put('/inventory/:stockId', (req, res) => {
  const { quantity } = req.body
  if (quantity === undefined || quantity < 0) {
    return res.status(400).json({ error: 'Valid quantity is required' })
  }
  const result = runStatement('UPDATE branch_stock SET quantity = ? WHERE stock_id = ?', [quantity, Number(req.params.stockId)])
  if (result.changes === 0) {
    return res.status(404).json({ error: 'Stock record not found' })
  }
  const updated = queryOne('SELECT * FROM branch_stock WHERE stock_id = ?', [Number(req.params.stockId)])
  res.json(updated)
})

export default router
