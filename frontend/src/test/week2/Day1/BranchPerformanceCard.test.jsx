import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import BranchPerformanceCard from '../../../components/week2/Day1/BranchPerformanceCard'

describe('BranchPerformanceCard', () => {
  const mockBranch = {
    id: 'branch-001',
    name: 'Bayan Branch',
    location: 'Bayan',
    weeklySales: 45000,
    monthlySales: 180000,
    target: 200000,
    targetProgress: 90,
    growth: 5.2
  }

  it('should be displaying branch performance data correctly', () => {
    render(<BranchPerformanceCard branch={mockBranch} />)
    
    expect(screen.getByText('Bayan Branch')).toBeInTheDocument()
    expect(screen.getByText('Bayan')).toBeInTheDocument()
  })

  it('should display monthly sales correctly', () => {
    render(<BranchPerformanceCard branch={mockBranch} />)
    
    expect(screen.getByText(/180/)).toBeInTheDocument()
  })

  it('should display weekly sales correctly', () => {
    render(<BranchPerformanceCard branch={mockBranch} />)
    
    expect(screen.getByText(/45/)).toBeInTheDocument()
  })

  it('should display growth rate correctly', () => {
    render(<BranchPerformanceCard branch={mockBranch} />)
    
    expect(screen.getByText('+5.2%')).toBeInTheDocument()
  })

  it('should display target progress correctly', () => {
    render(<BranchPerformanceCard branch={mockBranch} />)
    
    expect(screen.getByText('90%')).toBeInTheDocument()
  })

  it('should have correct testid attribute', () => {
    render(<BranchPerformanceCard branch={mockBranch} />)
    
    const card = screen.getByTestId('branch-card-branch-001')
    expect(card).toBeInTheDocument()
  })

  it('should handle null branch data', () => {
    render(<BranchPerformanceCard branch={null} />)
    
    expect(screen.getByText('No branch data available')).toBeInTheDocument()
  })

  it('should render performance metrics labels', () => {
    render(<BranchPerformanceCard branch={mockBranch} />)
    
    expect(screen.getByText('Monthly Sales')).toBeInTheDocument()
    expect(screen.getByText('Weekly Sales')).toBeInTheDocument()
    expect(screen.getByText('Growth Rate')).toBeInTheDocument()
    expect(screen.getByText('Target Progress')).toBeInTheDocument()
  })
})
