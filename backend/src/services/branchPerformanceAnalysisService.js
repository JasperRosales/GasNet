function normalizeBranchSalesData(branchSalesData) {
  if (!Array.isArray(branchSalesData)) return []

  return branchSalesData.filter((item) => {
    return (
      item &&
      typeof item.id === 'string' &&
      typeof item.name === 'string' &&
      typeof item.monthlySales === 'number' &&
      typeof item.target === 'number' &&
      item.target > 0
    )
  })
}

function toPercentage(numerator, denominator) {
  if (!denominator) return 0
  return Number(((numerator / denominator) * 100).toFixed(1))
}

export function analyzeBranchSalesData(branchSalesData) {
  const safeData = normalizeBranchSalesData(branchSalesData)

  return safeData.map((branch) => ({
    id: branch.id,
    name: branch.name,
    monthlySales: branch.monthlySales,
    target: branch.target,
    targetProgress: toPercentage(branch.monthlySales, branch.target)
  }))
}

export function generateBranchComparisonResults(branchSalesData) {
  const analyzed = analyzeBranchSalesData(branchSalesData)

  return analyzed
    .slice()
    .sort((a, b) => b.monthlySales - a.monthlySales)
    .map((branch, index) => ({
      rank: index + 1,
      name: branch.name,
      monthlySales: branch.monthlySales,
      target: branch.target,
      achievement: branch.targetProgress
    }))
}

function getProgressStatus(progress) {
  if (progress >= 100) return 'achieved'
  if (progress >= 80) return 'on-track'
  return 'needs-attention'
}

export function calculateTargetProgressResults(branchSalesData) {
  const analyzed = analyzeBranchSalesData(branchSalesData)

  return analyzed.map((branch) => ({
    name: branch.name,
    monthlySales: branch.monthlySales,
    target: branch.target,
    progress: branch.targetProgress,
    gap: branch.target - branch.monthlySales,
    status: getProgressStatus(branch.targetProgress)
  }))
}
