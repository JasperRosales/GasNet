import '@testing-library/jest-dom'
import { render, screen, waitFor, within } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import BranchPerformanceAnalysisInterface from '../../../components/week3/Day2/BranchPerformanceAnalysisInterface'
import * as api from '../../../services/api'

const payload = {
  branchSalesAnalysis: [
    { id: 'b1', name: 'North Branch', monthlySales: 120000, target: 150000, targetProgress: 80 },
    { id: 'b2', name: 'South Branch', monthlySales: 180000, target: 160000, targetProgress: 112.5 }
  ],
  branchComparisonReport: [
    { rank: 1, name: 'South Branch', monthlySales: 180000, target: 160000, achievement: 112.5 },
    { rank: 2, name: 'North Branch', monthlySales: 120000, target: 150000, achievement: 80 }
  ],
  targetProgressAnalysisReport: [
    { name: 'North Branch', monthlySales: 120000, target: 150000, progress: 80, gap: 30000, status: 'on-track' },
    { name: 'South Branch', monthlySales: 180000, target: 160000, progress: 112.5, gap: -20000, status: 'achieved' }
  ]
}

describe('BranchPerformanceAnalysisInterface', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should be analyzing branch sales data correctly', async () => {
    vi.spyOn(api, 'fetchBranchPerformanceAnalysis').mockResolvedValue(payload)

    render(<BranchPerformanceAnalysisInterface />)
    await waitFor(() => expect(screen.queryByRole('status')).toBeNull())

    const salesSection = screen.getByLabelText('Branch Sales Analysis Report')
    expect(screen.getByText('Branch Sales Analysis Report')).toBeInTheDocument()
    expect(within(salesSection).getByText(/North Branch - Sales: 120000/)).toBeInTheDocument()
    expect(within(salesSection).getByText(/South Branch - Sales: 180000/)).toBeInTheDocument()
  })

  it('should be generating branch comparison results accurately', async () => {
    vi.spyOn(api, 'fetchBranchPerformanceAnalysis').mockResolvedValue(payload)

    render(<BranchPerformanceAnalysisInterface />)
    await waitFor(() => expect(screen.queryByRole('status')).toBeNull())

    expect(screen.getByText('Branch Comparison Report')).toBeInTheDocument()
    expect(screen.getByText(/#1 South Branch - Sales: 180000/)).toBeInTheDocument()
    expect(screen.getByText(/#2 North Branch - Sales: 120000/)).toBeInTheDocument()
  })

  it('should be calculating target progress correctly', async () => {
    vi.spyOn(api, 'fetchBranchPerformanceAnalysis').mockResolvedValue(payload)

    render(<BranchPerformanceAnalysisInterface />)
    await waitFor(() => expect(screen.queryByRole('status')).toBeNull())

    expect(screen.getByText('Target Progress Analysis Report')).toBeInTheDocument()
    expect(screen.getByText(/North Branch - Progress: 80%/)).toBeInTheDocument()
    expect(screen.getByText(/South Branch - Progress: 112.5%/)).toBeInTheDocument()
  })

  it('shows error state when request fails', async () => {
    vi.spyOn(api, 'fetchBranchPerformanceAnalysis').mockRejectedValue(new Error('request failed'))

    render(<BranchPerformanceAnalysisInterface />)
    await waitFor(() => expect(screen.queryByRole('status')).toBeNull())

    expect(screen.getByRole('alert')).toHaveTextContent('Unable to load branch performance analysis.')
  })

  it('shows error state when payload is null', async () => {
    vi.spyOn(api, 'fetchBranchPerformanceAnalysis').mockResolvedValue(null)

    render(<BranchPerformanceAnalysisInterface />)
    await waitFor(() => expect(screen.queryByRole('status')).toBeNull())

    expect(screen.getByRole('alert')).toHaveTextContent('Unable to load branch performance analysis.')
  })

  it('shows error state when payload is missing report keys', async () => {
    vi.spyOn(api, 'fetchBranchPerformanceAnalysis').mockResolvedValue({
      branchSalesAnalysis: [],
      branchComparisonReport: []
    })

    render(<BranchPerformanceAnalysisInterface />)
    await waitFor(() => expect(screen.queryByRole('status')).toBeNull())

    expect(screen.getByRole('alert')).toHaveTextContent('Unable to load branch performance analysis.')
  })

  it('shows loading state before data arrives', () => {
    vi.spyOn(api, 'fetchBranchPerformanceAnalysis').mockReturnValue(new Promise(() => {}))

    render(<BranchPerformanceAnalysisInterface />)

    expect(screen.getByRole('status')).toHaveTextContent('Loading branch performance analysis...')
  })

  it('renders empty-state reports when payload contains empty arrays', async () => {
    vi.spyOn(api, 'fetchBranchPerformanceAnalysis').mockResolvedValue({
      branchSalesAnalysis: [],
      branchComparisonReport: [],
      targetProgressAnalysisReport: []
    })

    render(<BranchPerformanceAnalysisInterface />)
    await waitFor(() => expect(screen.queryByRole('status')).toBeNull())

    expect(screen.queryByRole('alert')).toBeNull()
    expect(screen.getByText('No branch sales analysis data available.')).toBeInTheDocument()
    expect(screen.getByText('No branch comparison data available.')).toBeInTheDocument()
    expect(screen.getByText('No target progress analysis data available.')).toBeInTheDocument()
  })
})
