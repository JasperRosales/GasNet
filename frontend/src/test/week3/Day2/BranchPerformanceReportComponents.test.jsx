import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import BranchSalesAnalysisReport from '../../../components/week3/Day2/BranchSalesAnalysisReport'
import BranchComparisonReport from '../../../components/week3/Day2/BranchComparisonReport'
import TargetProgressAnalysisReport from '../../../components/week3/Day2/TargetProgressAnalysisReport'

describe('Branch performance report components', () => {
  it('renders fallback when branch sales analysis is null', () => {
    render(<BranchSalesAnalysisReport branchSalesAnalysis={null} />)
    expect(screen.getByText('No branch sales analysis data available.')).toBeInTheDocument()
  })

  it('renders fallback when branch comparison report is null', () => {
    render(<BranchComparisonReport branchComparisonReport={null} />)
    expect(screen.getByText('No branch comparison data available.')).toBeInTheDocument()
  })

  it('renders fallback when target progress analysis report is null', () => {
    render(<TargetProgressAnalysisReport targetProgressAnalysisReport={null} />)
    expect(screen.getByText('No target progress analysis data available.')).toBeInTheDocument()
  })
})
