import express from 'express'
import { getDatabase, closeDatabase } from './config/database.js'
import { seedDatabase } from './config/seed.js'
import authRouter from './routes/auth.js'
import adminRouter from './routes/admin.js'
import productsRouter from './routes/products.js'
import inventoryRouter from './routes/inventory.js'
import transactionsRouter from './routes/transactions.js'
import analyticsRouter from './routes/analytics.js'

const app = express()
app.use(express.json())

async function startServer() {
  await getDatabase()
  seedDatabase()

  app.use('/api', authRouter)
  app.use('/api', adminRouter)
  app.use('/api', productsRouter)
  app.use('/api', inventoryRouter)
  app.use('/api', transactionsRouter)
  app.use('/api', analyticsRouter)

  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() })
  })

  if (process.env.NODE_ENV !== 'test') {
    const port = process.env.PORT || 3001
    app.listen(port, () => console.log(`Server listening on ${port}`))
  }
}

startServer().catch(console.error)

process.on('SIGINT', () => {
  closeDatabase()
  process.exit(0)
})

process.on('SIGTERM', () => {
  closeDatabase()
  process.exit(0)
})

export default app
