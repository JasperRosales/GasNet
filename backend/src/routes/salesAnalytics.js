import express from 'express'
import { getSalesAnalytics } from '../controllers/salesAnalyticsController.js'

const router = express.Router()

router.get('/sales-analytics', getSalesAnalytics)

export default router
