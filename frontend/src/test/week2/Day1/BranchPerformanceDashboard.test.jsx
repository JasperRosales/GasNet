import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import BranchPerformanceDashboard from '../../../components/week2/Day1/BranchPerformanceDashboard'

describe('BranchPerformanceDashboard', () => {
  it('should render the dashboard with correct title', () => {
    render(<BranchPerformanceDashboard />)
    
    expect(screen.getByText('Branch Performance Dashboard')).toBeInTheDocument()
    expect(screen.getByText('Real-time branch sales and target tracking')).toBeInTheDocument()
  })

  it('should display dashboard summary with correct labels', () => {
    render(<BranchPerformanceDashboard />)
    
    expect(screen.getByText('Total Branches')).toBeInTheDocument()
    expect(screen.getByText('Total Sales')).toBeInTheDocument()
    expect(screen.getByText('Average Progress')).toBeInTheDocument()
    expect(screen.getByText('Achieving Target')).toBeInTheDocument()
  })

  it('should display summary values correctly', () => {
    render(<BranchPerformanceDashboard />)
    
    // The number 6 should appear for total branches count
    const elements = screen.getAllByText('6')
    expect(elements.length).toBeGreaterThan(0)
  })

  it('should display performance cards section', () => {
    render(<BranchPerformanceDashboard />)
    
    expect(screen.getByText('Branch Performance Cards')).toBeInTheDocument()
  })

  it('should render all branch performance cards', () => {
    render(<BranchPerformanceDashboard />)
    
    // Check that branches appear in the document (may appear multiple times)
    expect(screen.getAllByText('Bayan Branch').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Caloocan Branch').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Sta. Teresita Branch').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Antipolo Branch').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Marikina Branch').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Pasig Branch').length).toBeGreaterThan(0)
  })

  it('should display branch comparison section', () => {
    render(<BranchPerformanceDashboard />)
    
    expect(screen.getByText('Branch Comparison')).toBeInTheDocument()
  })

  it('should display target progress indicator section', () => {
    render(<BranchPerformanceDashboard />)
    
    expect(screen.getByText('Target Progress Overview')).toBeInTheDocument()
  })

  it('should have correct testid for main dashboard', () => {
    render(<BranchPerformanceDashboard />)
    
    const dashboard = screen.getByTestId('branch-performance-dashboard')
    expect(dashboard).toBeInTheDocument()
  })

  it('should have correct testid for dashboard summary', () => {
    render(<BranchPerformanceDashboard />)
    
    const summary = screen.getByTestId('dashboard-summary')
    expect(summary).toBeInTheDocument()
  })

  it('should have correct testid for performance cards grid', () => {
    render(<BranchPerformanceDashboard />)
    
    const grid = screen.getByTestId('performance-cards-grid')
    expect(grid).toBeInTheDocument()
  })

  it('should display branch comparison table with correct headers', () => {
    render(<BranchPerformanceDashboard />)
    
    // These appear multiple times, so we check for their existence
    expect(screen.getAllByText('Rank').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Branch Name').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Monthly Sales').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Target').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Achievement %').length).toBeGreaterThan(0)
  })

  it('should display progress indicator with branch status', () => {
    render(<BranchPerformanceDashboard />)
    
    expect(screen.getByText('Branch Performance Status')).toBeInTheDocument()
  })

  it('should display all performance data correctly', () => {
    render(<BranchPerformanceDashboard />)
    
    // Verify that branch performance cards are displayed with data
    const elements = screen.getAllByText(/₱|M|K/)
    expect(elements.length).toBeGreaterThan(0)
  })

  it('should render components that check branch performance data', () => {
    render(<BranchPerformanceDashboard />)
    
    // Check if multiple key performance metrics are visible
    expect(screen.getAllByText('Monthly Sales').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Weekly Sales').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Growth Rate').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Target Progress').length).toBeGreaterThan(0)
  })
})
