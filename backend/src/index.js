import express from 'express'
import syncRouter from './routes/syncStatus.js'
import salesAnalyticsRouter from './routes/salesAnalytics.js'

const app = express()
app.use(express.json())
app.use('/api', syncRouter)
app.use('/api', salesAnalyticsRouter)

if (process.env.NODE_ENV !== 'test') {
  const port = process.env.PORT || 3001
  app.listen(port, () => console.log(`Server listening on ${port}`))
}

export default app
