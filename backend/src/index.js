import express from 'express'
import syncRouter from './routes/syncStatus.js'
import salesAnalyticsRouter from './routes/salesAnalytics.js'
import branchPerformanceAnalysisRouter from './routes/branchPerformanceAnalysis.js'
import supabaseTablesRouter from './routes/supabaseTables.js'

const app = express()
app.use(express.json())
app.use('/api', syncRouter)
app.use('/api', salesAnalyticsRouter)
app.use('/api', branchPerformanceAnalysisRouter)
app.use('/api', supabaseTablesRouter)

if (process.env.NODE_ENV !== 'test') {
  const port = process.env.PORT || 3001
  app.listen(port, () => console.log(`Server listening on ${port}`))
}

export default app
