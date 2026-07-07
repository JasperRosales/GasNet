import request from 'supertest'
import { describe, it, expect } from 'vitest'
import app from '../src/index.js'

describe('GET /api/branch-performance-analysis', () => {
  it('returns branch analysis, comparison, and target progress reports', async () => {
    const res = await request(app).get('/api/branch-performance-analysis').expect(200)

    expect(res.body).toHaveProperty('branchSalesAnalysis')
    expect(res.body).toHaveProperty('branchComparisonReport')
    expect(res.body).toHaveProperty('targetProgressAnalysisReport')

    expect(Array.isArray(res.body.branchSalesAnalysis)).toBe(true)
    expect(Array.isArray(res.body.branchComparisonReport)).toBe(true)
    expect(Array.isArray(res.body.targetProgressAnalysisReport)).toBe(true)
  })

  it('returns comparison report sorted by monthly sales and valid ranks', async () => {
    const res = await request(app).get('/api/branch-performance-analysis').expect(200)
    const comparison = res.body.branchComparisonReport

    expect(comparison.length).toBeGreaterThan(0)
    for (let i = 0; i < comparison.length - 1; i += 1) {
      expect(comparison[i].monthlySales).toBeGreaterThanOrEqual(comparison[i + 1].monthlySales)
    }

    comparison.forEach((row, index) => {
      expect(row.rank).toBe(index + 1)
    })
  })

  it('returns target progress rows with valid status values', async () => {
    const res = await request(app).get('/api/branch-performance-analysis').expect(200)
    const allowed = new Set(['achieved', 'on-track', 'needs-attention'])

    res.body.targetProgressAnalysisReport.forEach((row) => {
      expect(typeof row.progress).toBe('number')
      expect(typeof row.gap).toBe('number')
      expect(allowed.has(row.status)).toBe(true)
    })
  })
})
