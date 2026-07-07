import mockSalesRecords from '../data/mockSalesRecords.js'
import {
  generateAnnualSalesAnalytics,
  generateMonthlySalesAnalytics,
  generateWeeklySalesAnalytics
} from '../services/salesAnalyticsService.js'

export function getSalesAnalytics(req, res) {
  const weekly = generateWeeklySalesAnalytics(mockSalesRecords)
  const monthly = generateMonthlySalesAnalytics(mockSalesRecords)
  const annual = generateAnnualSalesAnalytics(mockSalesRecords)

  res.json({
    weekly,
    monthly,
    annual
  })
}
