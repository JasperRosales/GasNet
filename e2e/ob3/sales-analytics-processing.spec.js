import { test, expect } from '@playwright/test'
import { login } from './helpers'

const SALES_ANALYTICS_API = '/api/sales-analytics'

test.describe('Ob3W3D1 — Sales Analytics Processing Service (End-to-End)', () => {
  test.beforeEach(async ({ page }) => {
    await login(page)
    await page.locator('aside nav button').filter({ hasText: 'Analytics' }).click()
    await page.locator('main button').filter({ hasText: 'Sales Analytics' }).click()
    await expect(page.locator('[aria-label="sales-analytics-processing-service"]')).toBeVisible({ timeout: 10000 })
  })

  test('should be generating weekly sales analytics successfully', async ({ page, request }) => {
    const apiResponse = await request.get(SALES_ANALYTICS_API)
    expect(apiResponse.ok()).toBeTruthy()
    const apiData = await apiResponse.json()

    const weeklyReport = page.locator('[aria-label="Weekly Analytics Report"]')
    await expect(weeklyReport).toBeVisible()
    await expect(weeklyReport.getByText(`Scope: ${apiData.weekly.scope}`)).toBeVisible()
    await expect(weeklyReport.getByText(`Total Sales: ${apiData.weekly.totalSales}`)).toBeVisible()
    await expect(weeklyReport.getByText(`Transactions: ${apiData.weekly.transactionCount}`)).toBeVisible()
    await expect(weeklyReport.getByText(`Average Sale: ${apiData.weekly.averageSale}`)).toBeVisible()
  })

  test('should be generating monthly sales analytics successfully', async ({ page, request }) => {
    const apiResponse = await request.get(SALES_ANALYTICS_API)
    expect(apiResponse.ok()).toBeTruthy()
    const apiData = await apiResponse.json()

    const monthlyReport = page.locator('[aria-label="Monthly Analytics Report"]')
    await expect(monthlyReport).toBeVisible()
    await expect(monthlyReport.getByText(`Scope: ${apiData.monthly.scope}`)).toBeVisible()
    await expect(monthlyReport.getByText(`Total Sales: ${apiData.monthly.totalSales}`)).toBeVisible()
    await expect(monthlyReport.getByText(`Transactions: ${apiData.monthly.transactionCount}`)).toBeVisible()
    await expect(monthlyReport.getByText(`Average Sale: ${apiData.monthly.averageSale}`)).toBeVisible()
  })

  test('should be generating annual sales analytics successfully', async ({ page, request }) => {
    const apiResponse = await request.get(SALES_ANALYTICS_API)
    expect(apiResponse.ok()).toBeTruthy()
    const apiData = await apiResponse.json()

    const annualReport = page.locator('[aria-label="Annual Analytics Report"]')
    await expect(annualReport).toBeVisible()
    await expect(annualReport.getByText(`Scope: ${apiData.annual.scope}`)).toBeVisible()
    await expect(annualReport.getByText(`Total Sales: ${apiData.annual.totalSales}`)).toBeVisible()
    await expect(annualReport.getByText(`Transactions: ${apiData.annual.transactionCount}`)).toBeVisible()
    await expect(annualReport.getByText(`Average Sale: ${apiData.annual.averageSale}`)).toBeVisible()
  })

  test('UI data should match API response for all scopes', async ({ page, request }) => {
    const apiResponse = await request.get(SALES_ANALYTICS_API)
    const apiData = await apiResponse.json()

    for (const scope of ['weekly', 'monthly', 'annual']) {
      const report = page.locator(`[aria-label="${scope.charAt(0).toUpperCase() + scope.slice(1)} Analytics Report"]`)
      await expect(report.getByText(`Total Sales: ${apiData[scope].totalSales}`)).toBeVisible()
      await expect(report.getByText(`Transactions: ${apiData[scope].transactionCount}`)).toBeVisible()
    }
  })

  test('API response should contain non-negative sales values', async ({ request }) => {
    const response = await request.get(SALES_ANALYTICS_API)
    const data = await response.json()

    for (const scope of ['weekly', 'monthly', 'annual']) {
      expect(data[scope].totalSales).toBeGreaterThanOrEqual(0)
      expect(data[scope].transactionCount).toBeGreaterThanOrEqual(0)
      expect(data[scope].averageSale).toBeGreaterThanOrEqual(0)
    }
  })
})
