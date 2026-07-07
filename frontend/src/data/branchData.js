// Mock data for branch performance
export const branchPerformanceData = [
  {
    id: 'branch-001',
    name: 'Bayan Branch',
    location: 'Bayan',
    weeklySales: 45000,
    monthlySales: 180000,
    target: 200000,
    targetProgress: 90,
    growth: 5.2
  },
  {
    id: 'branch-002',
    name: 'Caloocan Branch',
    location: 'Caloocan',
    weeklySales: 38000,
    monthlySales: 152000,
    target: 200000,
    targetProgress: 76,
    growth: 3.8
  },
  {
    id: 'branch-003',
    name: 'Sta. Teresita Branch',
    location: 'Sta. Teresita',
    weeklySales: 52000,
    monthlySales: 208000,
    target: 200000,
    targetProgress: 104,
    growth: 8.5
  },
  {
    id: 'branch-004',
    name: 'Antipolo Branch',
    location: 'Antipolo',
    weeklySales: 35000,
    monthlySales: 140000,
    target: 200000,
    targetProgress: 70,
    growth: 2.1
  },
  {
    id: 'branch-005',
    name: 'Marikina Branch',
    location: 'Marikina',
    weeklySales: 48000,
    monthlySales: 192000,
    target: 200000,
    targetProgress: 96,
    growth: 6.3
  },
  {
    id: 'branch-006',
    name: 'Pasig Branch',
    location: 'Pasig',
    weeklySales: 41000,
    monthlySales: 164000,
    target: 200000,
    targetProgress: 82,
    growth: 4.5
  }
]

// Get branch comparison data sorted by sales
export function getBranchComparison() {
  return branchPerformanceData
    .sort((a, b) => b.monthlySales - a.monthlySales)
    .map(branch => ({
      name: branch.name,
      sales: branch.monthlySales,
      target: branch.target,
      achievement: parseFloat(((branch.monthlySales / branch.target) * 100).toFixed(1))
    }))
}

// Get target progress data for all branches
export function getTargetProgressData() {
  return branchPerformanceData.map(branch => ({
    name: branch.name,
    progress: branch.targetProgress,
    sales: branch.monthlySales,
    target: branch.target,
    gap: branch.target - branch.monthlySales,
    status: branch.targetProgress >= 100 ? 'achieved' : branch.targetProgress >= 80 ? 'on-track' : 'needs-attention'
  }))
}

// Get summary statistics
export function getBranchSummary() {
  const totalSales = branchPerformanceData.reduce((sum, b) => sum + b.monthlySales, 0)
  const totalTarget = branchPerformanceData.reduce((sum, b) => sum + b.target, 0)
  const averageProgress = (totalSales / totalTarget) * 100
  const topBranch = branchPerformanceData.reduce((max, b) => b.monthlySales > max.monthlySales ? b : max)
  const lowPerformer = branchPerformanceData.reduce((min, b) => b.monthlySales < min.monthlySales ? b : min)

  return {
    totalBranches: branchPerformanceData.length,
    totalSales,
    totalTarget,
    averageProgress: parseFloat(averageProgress.toFixed(1)),
    topBranch,
    lowPerformer,
    achievingTarget: branchPerformanceData.filter(b => b.targetProgress >= 100).length
  }
}
