import { describe, it, expect } from 'vitest'
import { branchPerformanceData, getBranchComparison, getTargetProgressData, getBranchSummary } from '../../../data/branchData'

describe('Branch Data Utilities', () => {
  describe('branchPerformanceData', () => {
    it('should contain 6 branches', () => {
      expect(branchPerformanceData).toHaveLength(6)
    })

    it('should have all required fields for each branch', () => {
      branchPerformanceData.forEach(branch => {
        expect(branch).toHaveProperty('id')
        expect(branch).toHaveProperty('name')
        expect(branch).toHaveProperty('location')
        expect(branch).toHaveProperty('weeklySales')
        expect(branch).toHaveProperty('monthlySales')
        expect(branch).toHaveProperty('target')
        expect(branch).toHaveProperty('targetProgress')
        expect(branch).toHaveProperty('growth')
      })
    })
  })

  describe('getBranchComparison', () => {
    it('should return comparison data sorted by monthly sales', () => {
      const comparison = getBranchComparison()
      
      for (let i = 0; i < comparison.length - 1; i++) {
        expect(comparison[i].sales).toBeGreaterThanOrEqual(comparison[i + 1].sales)
      }
    })

    it('should calculate achievement percentage correctly', () => {
      const comparison = getBranchComparison()
      
      comparison.forEach(branch => {
        const expected = parseFloat(((branch.sales / branch.target) * 100).toFixed(1))
        expect(branch.achievement).toBe(expected)
      })
    })

    it('should contain correct number of branches', () => {
      const comparison = getBranchComparison()
      expect(comparison).toHaveLength(6)
    })

    it('should have all required fields', () => {
      const comparison = getBranchComparison()
      
      comparison.forEach(branch => {
        expect(branch).toHaveProperty('name')
        expect(branch).toHaveProperty('sales')
        expect(branch).toHaveProperty('target')
        expect(branch).toHaveProperty('achievement')
      })
    })
  })

  describe('getTargetProgressData', () => {
    it('should return progress data for all branches', () => {
      const progress = getTargetProgressData()
      expect(progress).toHaveLength(6)
    })

    it('should calculate gap correctly', () => {
      const progress = getTargetProgressData()
      
      progress.forEach(item => {
        const expectedGap = item.target - item.sales
        expect(item.gap).toBe(expectedGap)
      })
    })

    it('should set correct status for achieved branches', () => {
      const progress = getTargetProgressData()
      const achieved = progress.filter(p => p.progress >= 100)
      
      achieved.forEach(item => {
        expect(item.status).toBe('achieved')
      })
    })

    it('should set correct status for on-track branches', () => {
      const progress = getTargetProgressData()
      const onTrack = progress.filter(p => p.progress >= 80 && p.progress < 100)
      
      onTrack.forEach(item => {
        expect(item.status).toBe('on-track')
      })
    })

    it('should set correct status for needs-attention branches', () => {
      const progress = getTargetProgressData()
      const needsAttention = progress.filter(p => p.progress < 80)
      
      needsAttention.forEach(item => {
        expect(item.status).toBe('needs-attention')
      })
    })

    it('should have all required fields', () => {
      const progress = getTargetProgressData()
      
      progress.forEach(item => {
        expect(item).toHaveProperty('name')
        expect(item).toHaveProperty('progress')
        expect(item).toHaveProperty('sales')
        expect(item).toHaveProperty('target')
        expect(item).toHaveProperty('gap')
        expect(item).toHaveProperty('status')
      })
    })
  })

  describe('getBranchSummary', () => {
    it('should have correct total branches count', () => {
      const summary = getBranchSummary()
      expect(summary.totalBranches).toBe(6)
    })

    it('should calculate total sales correctly', () => {
      const summary = getBranchSummary()
      const expected = branchPerformanceData.reduce((sum, b) => sum + b.monthlySales, 0)
      expect(summary.totalSales).toBe(expected)
    })

    it('should calculate total target correctly', () => {
      const summary = getBranchSummary()
      const expected = branchPerformanceData.reduce((sum, b) => sum + b.target, 0)
      expect(summary.totalTarget).toBe(expected)
    })

    it('should calculate average progress correctly', () => {
      const summary = getBranchSummary()
      const expected = parseFloat(((summary.totalSales / summary.totalTarget) * 100).toFixed(1))
      expect(summary.averageProgress).toBe(expected)
    })

    it('should identify top performing branch', () => {
      const summary = getBranchSummary()
      const expected = branchPerformanceData.reduce((max, b) => b.monthlySales > max.monthlySales ? b : max)
      expect(summary.topBranch).toEqual(expected)
    })

    it('should identify lowest performing branch', () => {
      const summary = getBranchSummary()
      const expected = branchPerformanceData.reduce((min, b) => b.monthlySales < min.monthlySales ? b : min)
      expect(summary.lowPerformer).toEqual(expected)
    })

    it('should count branches achieving target', () => {
      const summary = getBranchSummary()
      const expected = branchPerformanceData.filter(b => b.targetProgress >= 100).length
      expect(summary.achievingTarget).toBe(expected)
    })

    it('should have all required fields', () => {
      const summary = getBranchSummary()
      
      expect(summary).toHaveProperty('totalBranches')
      expect(summary).toHaveProperty('totalSales')
      expect(summary).toHaveProperty('totalTarget')
      expect(summary).toHaveProperty('averageProgress')
      expect(summary).toHaveProperty('topBranch')
      expect(summary).toHaveProperty('lowPerformer')
      expect(summary).toHaveProperty('achievingTarget')
    })
  })
})
