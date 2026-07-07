import { describe, it, expect } from 'vitest'
import {
  generateAnnualSalesAnalytics,
  generateMonthlySalesAnalytics,
  generateWeeklySalesAnalytics
} from '../src/services/salesAnalyticsService.js'

const records = [
  { id: 'a', amount: 1000, createdAt: '2026-07-01T00:00:00.000Z' },
  { id: 'b', amount: 2000, createdAt: '2026-07-03T00:00:00.000Z' },
  { id: 'c', amount: 3000, createdAt: '2026-07-06T00:00:00.000Z' },
  { id: 'd', amount: 4000, createdAt: '2026-03-10T00:00:00.000Z' }
]

describe('Sales Analytics Processing Service', () => {
  it('should be generating weekly sales analytics successfully', () => {
    const result = generateWeeklySalesAnalytics(records)
    expect(result.scope).toBe('weekly')
    expect(result.totalSales).toBe(3000)
    expect(result.transactionCount).toBe(1)
    expect(result.averageSale).toBe(3000)
  })

  it('should be generating monthly sales analytics successfully', () => {
    const result = generateMonthlySalesAnalytics(records)
    expect(result.scope).toBe('monthly')
    expect(result.totalSales).toBe(6000)
    expect(result.transactionCount).toBe(3)
    expect(result.averageSale).toBe(2000)
  })

  it('should be generating annual sales analytics successfully', () => {
    const result = generateAnnualSalesAnalytics(records)
    expect(result.scope).toBe('annual')
    expect(result.totalSales).toBe(10000)
    expect(result.transactionCount).toBe(4)
    expect(result.averageSale).toBe(2500)
  })

  it('returns zeroed weekly analytics when records are null', () => {
    const result = generateWeeklySalesAnalytics(null)
    expect(result).toEqual({
      scope: 'weekly',
      label: 'N/A',
      totalSales: 0,
      transactionCount: 0,
      averageSale: 0
    })
  })

  it('returns zeroed monthly analytics when records are undefined', () => {
    const result = generateMonthlySalesAnalytics(undefined)
    expect(result).toEqual({
      scope: 'monthly',
      label: 'N/A',
      totalSales: 0,
      transactionCount: 0,
      averageSale: 0
    })
  })

  it('returns zeroed annual analytics when records are empty', () => {
    const result = generateAnnualSalesAnalytics([])
    expect(result).toEqual({
      scope: 'annual',
      label: 'N/A',
      totalSales: 0,
      transactionCount: 0,
      averageSale: 0
    })
  })
})
