import { describe, it, expect } from 'vitest'
import {
  analyzeBranchSalesData,
  calculateTargetProgressResults,
  generateBranchComparisonResults
} from '../src/services/branchPerformanceAnalysisService.js'

const branchSalesData = [
  { id: 'b1', name: 'North Branch', monthlySales: 120000, target: 150000 },
  { id: 'b2', name: 'South Branch', monthlySales: 180000, target: 160000 },
  { id: 'b3', name: 'East Branch', monthlySales: 90000, target: 140000 }
]

describe('Branch Performance Analysis Service', () => {
  it('should be analyzing branch sales data correctly', () => {
    const result = analyzeBranchSalesData(branchSalesData)
    expect(result).toHaveLength(3)
    expect(result[0]).toMatchObject({
      id: 'b1',
      name: 'North Branch',
      monthlySales: 120000,
      target: 150000,
      targetProgress: 80
    })
  })

  it('should be generating branch comparison results accurately', () => {
    const result = generateBranchComparisonResults(branchSalesData)
    expect(result).toHaveLength(3)
    expect(result[0]).toMatchObject({
      rank: 1,
      name: 'South Branch',
      monthlySales: 180000
    })
    expect(result[0].monthlySales).toBeGreaterThanOrEqual(result[1].monthlySales)
    expect(result[1].monthlySales).toBeGreaterThanOrEqual(result[2].monthlySales)
  })

  it('should be calculating target progress correctly', () => {
    const result = calculateTargetProgressResults(branchSalesData)
    expect(result).toHaveLength(3)
    expect(result[0]).toMatchObject({
      name: 'North Branch',
      monthlySales: 120000,
      target: 150000,
      progress: 80,
      gap: 30000,
      status: 'on-track'
    })
    expect(result[1].status).toBe('achieved')
    expect(result[2].status).toBe('needs-attention')
  })

  it('returns empty arrays for null branch sales data', () => {
    expect(analyzeBranchSalesData(null)).toEqual([])
    expect(generateBranchComparisonResults(null)).toEqual([])
    expect(calculateTargetProgressResults(null)).toEqual([])
  })

  it('filters out malformed branch items', () => {
    const malformed = [
      ...branchSalesData,
      { id: 'bad-1', name: 'Broken Branch', monthlySales: '1000', target: 1000 },
      { id: 'bad-2', name: 'No Target Branch', monthlySales: 1000, target: 0 }
    ]

    const result = analyzeBranchSalesData(malformed)
    expect(result).toHaveLength(3)
    expect(result.find((item) => item.id === 'bad-1')).toBeUndefined()
    expect(result.find((item) => item.id === 'bad-2')).toBeUndefined()
  })

  it('assigns exact boundary statuses for target progress', () => {
    const boundaryInput = [
      { id: 'p1', name: 'Exactly Achieved', monthlySales: 100000, target: 100000 },
      { id: 'p2', name: 'Exactly On Track', monthlySales: 80000, target: 100000 },
      { id: 'p3', name: 'Below On Track', monthlySales: 79900, target: 100000 }
    ]

    const result = calculateTargetProgressResults(boundaryInput)
    expect(result[0].status).toBe('achieved')
    expect(result[1].status).toBe('on-track')
    expect(result[2].status).toBe('needs-attention')
  })

  it('creates sequential ranks in comparison results', () => {
    const result = generateBranchComparisonResults(branchSalesData)
    expect(result[0].rank).toBe(1)
    expect(result[1].rank).toBe(2)
    expect(result[2].rank).toBe(3)
  })
})
