function getLatestRecordDate(records) {
  if (!records.length) return new Date(0)
  return new Date(
    Math.max(...records.map((record) => new Date(record.createdAt).getTime()))
  )
}

function getWeekRange(referenceDate) {
  const end = new Date(referenceDate)
  const start = new Date(referenceDate)
  const day = start.getUTCDay()
  const diffToMonday = day === 0 ? 6 : day - 1
  start.setUTCDate(start.getUTCDate() - diffToMonday)
  start.setUTCHours(0, 0, 0, 0)
  end.setUTCHours(23, 59, 59, 999)
  return { start, end }
}

function normalizeRecords(records) {
  return Array.isArray(records) ? records : []
}

function createEmptyAnalytics(scope) {
  return {
    scope,
    label: 'N/A',
    totalSales: 0,
    transactionCount: 0,
    averageSale: 0
  }
}

function calculatePeriodAnalytics(records, startDate, endDate, scope, label) {
  const periodRecords = records.filter((record) => {
    const timestamp = new Date(record.createdAt).getTime()
    return timestamp >= startDate.getTime() && timestamp <= endDate.getTime()
  })

  const totalSales = periodRecords.reduce((sum, record) => sum + record.amount, 0)
  const transactionCount = periodRecords.length
  const averageSale = transactionCount ? Number((totalSales / transactionCount).toFixed(2)) : 0

  return {
    scope,
    label,
    totalSales,
    transactionCount,
    averageSale
  }
}

export function generateWeeklySalesAnalytics(records) {
  const safeRecords = normalizeRecords(records)
  if (!safeRecords.length) return createEmptyAnalytics('weekly')
  const referenceDate = getLatestRecordDate(safeRecords)
  const { start, end } = getWeekRange(referenceDate)
  const label = `${start.toISOString().slice(0, 10)} to ${end.toISOString().slice(0, 10)}`
  return calculatePeriodAnalytics(safeRecords, start, end, 'weekly', label)
}

export function generateMonthlySalesAnalytics(records) {
  const safeRecords = normalizeRecords(records)
  if (!safeRecords.length) return createEmptyAnalytics('monthly')
  const referenceDate = getLatestRecordDate(safeRecords)
  const start = new Date(Date.UTC(referenceDate.getUTCFullYear(), referenceDate.getUTCMonth(), 1))
  const end = new Date(Date.UTC(referenceDate.getUTCFullYear(), referenceDate.getUTCMonth() + 1, 0, 23, 59, 59, 999))
  const monthName = start.toLocaleString('en-US', { month: 'long', timeZone: 'UTC' })
  const label = `${monthName} ${referenceDate.getUTCFullYear()}`
  return calculatePeriodAnalytics(safeRecords, start, end, 'monthly', label)
}

export function generateAnnualSalesAnalytics(records) {
  const safeRecords = normalizeRecords(records)
  if (!safeRecords.length) return createEmptyAnalytics('annual')
  const referenceDate = getLatestRecordDate(safeRecords)
  const year = referenceDate.getUTCFullYear()
  const start = new Date(Date.UTC(year, 0, 1))
  const end = new Date(Date.UTC(year, 11, 31, 23, 59, 59, 999))
  const label = `${year}`
  return calculatePeriodAnalytics(safeRecords, start, end, 'annual', label)
}
