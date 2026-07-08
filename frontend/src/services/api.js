export async function fetchSyncStatus() {
  const res = await fetch('/api/sync-status')
  if (!res.ok) throw new Error('Network error')
  return res.json()
}

export async function fetchSalesAnalyticsReports() {
  const res = await fetch('/api/sales-analytics')
  if (!res.ok) throw new Error('Network error')
  return res.json()
}

export async function fetchBranchPerformanceAnalysis() {
  const res = await fetch('/api/branch-performance-analysis')
  if (!res.ok) throw new Error('Network error')
  return res.json()
}

