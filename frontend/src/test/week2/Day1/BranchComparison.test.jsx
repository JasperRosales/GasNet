import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import BranchComparison from '../../../components/week2/Day1/BranchComparison'

describe('BranchComparison', () => {
  const mockComparisonData = [
    {
      name: 'Sta. Teresita Branch',
      sales: 208000,
      target: 200000,
      achievement: 104
    },
    {
      name: 'Bayan Branch',
      sales: 180000,
      target: 200000,
      achievement: 90
    },
    {
      name: 'Marikina Branch',
      sales: 192000,
      target: 200000,
      achievement: 96
    }
  ]

  it('should be displaying branch comparison results accurately', () => {
    render(<BranchComparison comparisonData={mockComparisonData} />)
    
    expect(screen.getByText('Branch Comparison')).toBeInTheDocument()
    expect(screen.getByText('Sales Performance vs Target')).toBeInTheDocument()
  })

  it('should display all branches in comparison', () => {
    render(<BranchComparison comparisonData={mockComparisonData} />)
    
    expect(screen.getByText('Sta. Teresita Branch')).toBeInTheDocument()
    expect(screen.getByText('Bayan Branch')).toBeInTheDocument()
    expect(screen.getByText('Marikina Branch')).toBeInTheDocument()
  })

  it('should display monthly sales correctly', () => {
    render(<BranchComparison comparisonData={mockComparisonData} />)
    
    expect(screen.getByText(/208/)).toBeInTheDocument()
    expect(screen.getByText(/180/)).toBeInTheDocument()
    expect(screen.getByText(/192/)).toBeInTheDocument()
  })

  it('should display target values correctly', () => {
    render(<BranchComparison comparisonData={mockComparisonData} />)
    
    const targets = screen.getAllByText(/200/)
    expect(targets.length).toBeGreaterThan(0)
  })

  it('should display achievement percentages correctly', () => {
    render(<BranchComparison comparisonData={mockComparisonData} />)
    
    expect(screen.getByText('104%')).toBeInTheDocument()
    expect(screen.getByText('90%')).toBeInTheDocument()
    expect(screen.getByText('96%')).toBeInTheDocument()
  })

  it('should render correct number of rows', () => {
    render(<BranchComparison comparisonData={mockComparisonData} />)
    
    const rows = screen.getAllByTestId(/comparison-row-/)
    expect(rows).toHaveLength(3)
  })

  it('should display rank numbers correctly', () => {
    render(<BranchComparison comparisonData={mockComparisonData} />)
    
    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
    expect(screen.getByText('3')).toBeInTheDocument()
  })

  it('should have correct testid for comparison section', () => {
    render(<BranchComparison comparisonData={mockComparisonData} />)
    
    const comparison = screen.getByTestId('branch-comparison')
    expect(comparison).toBeInTheDocument()
  })

  it('should handle empty comparison data', () => {
    render(<BranchComparison comparisonData={[]} />)
    
    expect(screen.getByText('No comparison data available')).toBeInTheDocument()
  })

  it('should handle null comparison data', () => {
    render(<BranchComparison comparisonData={null} />)
    
    expect(screen.getByText('No comparison data available')).toBeInTheDocument()
  })

  it('should display table headers', () => {
    render(<BranchComparison comparisonData={mockComparisonData} />)
    
    expect(screen.getByText('Rank')).toBeInTheDocument()
    expect(screen.getByText('Branch Name')).toBeInTheDocument()
    expect(screen.getByText('Monthly Sales')).toBeInTheDocument()
    expect(screen.getByText('Target')).toBeInTheDocument()
    expect(screen.getByText('Achievement %')).toBeInTheDocument()
  })
})
