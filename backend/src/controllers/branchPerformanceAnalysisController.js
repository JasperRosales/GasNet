import mockBranchSalesData from '../data/mockBranchSalesData.js'
import {
  analyzeBranchSalesData,
  calculateTargetProgressResults,
  generateBranchComparisonResults
} from '../services/branchPerformanceAnalysisService.js'

export function getBranchPerformanceAnalysis(req, res) {
  const branchSalesAnalysis = analyzeBranchSalesData(mockBranchSalesData)
  const branchComparisonReport = generateBranchComparisonResults(mockBranchSalesData)
  const targetProgressAnalysisReport = calculateTargetProgressResults(mockBranchSalesData)

  res.json({
    branchSalesAnalysis,
    branchComparisonReport,
    targetProgressAnalysisReport
  })
}
