import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import TargetProgressIndicator from '../../../components/week2/Day1/TargetProgressIndicator'

describe('TargetProgressIndicator', () => {
  const mockProgressData = [
    {
      name: 'Bayan Branch',
      progress: 90,
      sales: 180000,
      target: 200000,
      gap: 20000,
      status: 'on-track'
    },
    {
      name: 'Sta. Teresita Branch',
      progress: 104,
      sales: 208000,
      target: 200000,
      gap: -8000,
      status: 'achieved'
    },
    {
      name: 'Antipolo Branch',
      progress: 70,
      sales: 140000,
      target: 200000,
      gap: 60000,
      status: 'needs-attention'
    }
  ]

  it('should be displaying target progress indicators properly', () => {
    render(<TargetProgressIndicator progressData={mockProgressData} />)
    
    expect(screen.getByText('Target Progress Overview')).toBeInTheDocument()
    expect(screen.getByText('Branch Performance Status')).toBeInTheDocument()
  })

  it('should display all branches in progress list', () => {
    render(<TargetProgressIndicator progressData={mockProgressData} />)
    
    expect(screen.getByText('Bayan Branch')).toBeInTheDocument()
    expect(screen.getByText('Sta. Teresita Branch')).toBeInTheDocument()
    expect(screen.getByText('Antipolo Branch')).toBeInTheDocument()
  })

  it('should display progress percentages correctly', () => {
    render(<TargetProgressIndicator progressData={mockProgressData} />)
    
    const percentages = screen.getAllByText(/\d+%/)
    expect(percentages.length).toBeGreaterThanOrEqual(3)
  })

  it('should display sales values correctly', () => {
    render(<TargetProgressIndicator progressData={mockProgressData} />)
    
    expect(screen.getByText(/Sales: ₱180K/)).toBeInTheDocument()
    expect(screen.getByText(/Sales: ₱208K/)).toBeInTheDocument()
    expect(screen.getByText(/Sales: ₱140K/)).toBeInTheDocument()
  })

  it('should display target values correctly', () => {
    render(<TargetProgressIndicator progressData={mockProgressData} />)
    
    const targets = screen.getAllByText(/Target: ₱200K/)
    expect(targets.length).toBe(3)
  })

  it('should display gap/deficit correctly', () => {
    render(<TargetProgressIndicator progressData={mockProgressData} />)
    
    expect(screen.getByText(/Gap: ₱20,000/)).toBeInTheDocument()
    expect(screen.getByText(/Surplus: ₱8,000/)).toBeInTheDocument()
    expect(screen.getByText(/Gap: ₱60,000/)).toBeInTheDocument()
  })

  it('should display status badges correctly', () => {
    render(<TargetProgressIndicator progressData={mockProgressData} />)
    
    expect(screen.getByText(/on track/)).toBeInTheDocument()
    expect(screen.getByText(/achieved/)).toBeInTheDocument()
    expect(screen.getByText(/needs attention/)).toBeInTheDocument()
  })

  it('should render correct number of progress items', () => {
    render(<TargetProgressIndicator progressData={mockProgressData} />)
    
    const items = screen.getAllByTestId(/progress-item-/)
    expect(items).toHaveLength(3)
  })

  it('should have correct testid for progress indicator', () => {
    render(<TargetProgressIndicator progressData={mockProgressData} />)
    
    const indicator = screen.getByTestId('target-progress-indicator')
    expect(indicator).toBeInTheDocument()
  })

  it('should handle empty progress data', () => {
    render(<TargetProgressIndicator progressData={[]} />)
    
    expect(screen.getByText('No progress data available')).toBeInTheDocument()
  })

  it('should handle null progress data', () => {
    render(<TargetProgressIndicator progressData={null} />)
    
    expect(screen.getByText('No progress data available')).toBeInTheDocument()
  })

  it('should display different status icons for different statuses', () => {
    render(<TargetProgressIndicator progressData={mockProgressData} />)
    
    // Check for status indicators in the document
    const statusElements = screen.getAllByText(/→|✓|!/)
    expect(statusElements.length).toBeGreaterThan(0)
  })
})
