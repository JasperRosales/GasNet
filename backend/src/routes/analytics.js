import { Router } from 'express'
import { queryAll, queryOne } from '../config/database.js'

const router = Router()

router.get('/analytics/sales-summary', (req, res) => {
  const today = queryOne(`
    SELECT COUNT(*) as count, COALESCE(SUM(total), 0) as total
    FROM sales_transactions
    WHERE transaction_date = CURRENT_DATE
  `)

  const thisWeek = queryOne(`
    SELECT COUNT(*) as count, COALESCE(SUM(total), 0) as total
    FROM sales_transactions
    WHERE transaction_date >= date('now', '-7 days')
  `)

  const thisMonth = queryOne(`
    SELECT COUNT(*) as count, COALESCE(SUM(total), 0) as total
    FROM sales_transactions
    WHERE transaction_date >= date('now', 'start of month')
  `)

  res.json({
    today: { transactions: today.count, revenue: today.total },
    thisWeek: { transactions: thisWeek.count, revenue: thisWeek.total },
    thisMonth: { transactions: thisMonth.count, revenue: thisMonth.total }
  })
})

router.get('/analytics/branch-comparison', (req, res) => {
  const branchSales = queryAll(`
    SELECT b.branch_id, b.branch_name,
           COUNT(st.sales_id) as transaction_count,
           COALESCE(SUM(st.total), 0) as total_sales
    FROM branches b
    LEFT JOIN sales_transactions st ON b.branch_id = st.branch_id
      AND st.transaction_date >= date('now', 'start of month')
    GROUP BY b.branch_id, b.branch_name
    ORDER BY total_sales DESC
  `)

  res.json(branchSales)
})

router.get('/analytics/daily-sales', (req, res) => {
  const dailySales = queryAll(`
    SELECT transaction_date as date,
           COUNT(*) as transactions,
           SUM(total) as revenue
    FROM sales_transactions
    WHERE transaction_date >= date('now', '-30 days')
    GROUP BY transaction_date
    ORDER BY transaction_date DESC
  `)

  res.json(dailySales)
})

router.get('/analytics/top-products', (req, res) => {
  const topProducts = queryAll(`
    SELECT p.product_name, p.weight_kg,
           SUM(bs.quantity) as total_stock
    FROM products p
    JOIN branch_stock bs ON p.product_id = bs.product_id
    GROUP BY p.product_id
    ORDER BY total_stock DESC
  `)

  res.json(topProducts)
})

export default router
