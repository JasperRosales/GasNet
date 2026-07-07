import express from 'express'
import { getBranchPerformanceAnalysis } from '../controllers/branchPerformanceAnalysisController.js'

const router = express.Router()

router.get('/branch-performance-analysis', getBranchPerformanceAnalysis)

export default router
