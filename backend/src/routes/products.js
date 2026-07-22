import { Router } from 'express'
import { queryAll, queryOne } from '../config/database.js'

const router = Router()

router.get('/products', (req, res) => {
  const products = queryAll('SELECT * FROM products WHERE active = 1')
  res.json(products)
})

router.get('/products/:id', (req, res) => {
  const product = queryOne('SELECT * FROM products WHERE product_id = ?', [Number(req.params.id)])
  if (!product) {
    return res.status(404).json({ error: 'Product not found' })
  }
  res.json(product)
})

router.get('/products/prices/:branchId', (req, res) => {
  const prices = queryAll(`
    SELECT p.product_id, p.product_name, p.weight_kg, bpp.price
    FROM products p
    JOIN branch_product_prices bpp ON p.product_id = bpp.product_id
    WHERE bpp.branch_id = ? AND p.active = 1
  `, [Number(req.params.branchId)])
  res.json(prices)
})

export default router
