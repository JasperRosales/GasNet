import { test, expect } from '@playwright/test'
import { login } from './helpers'

const SALES_ANALYTICS_API = '/api/sales-analytics'
const BRANCH_PERFORMANCE_API = '/api/branch-performance-analysis'

async function navigateToAnalytics(page) {
  await login(page)
  await page.locator('aside nav button').filter({ hasText: 'Analytics' }).click()
  await page.waitForTimeout(200)
}

test.describe('Ob3W6D1 — Complete Analytics Workflow Validation', () => {
  test('should be completing the analytics and AI workflow successfully', async ({ page }) => {
    await navigateToAnalytics(page)
    await expect(page.getByRole('heading', { name: 'Sales Analytics Processing Service' })).toBeVisible({ timeout: 10000 })

    await page.locator('main button').filter({ hasText: 'Branch Performance' }).click()
    await expect(page.getByRole('heading', { name: 'Branch Performance Analysis Service' })).toBeVisible({ timeout: 10000 })

    await page.locator('main button').filter({ hasText: 'AI Insights' }).click()
    await expect(page.getByRole('heading', { name: 'AI Insight Cards' })).toBeVisible({ timeout: 10000 })
  })

  test('should be satisfying all Objective 3 requirements', async ({ page, request }) => {
    await navigateToAnalytics(page)

    const salesResponse = await request.get(SALES_ANALYTICS_API)
    expect(salesResponse.ok()).toBeTruthy()
    const salesData = await salesResponse.json()

    await expect(page.getByRole('heading', { name: 'Sales Analytics Processing Service' })).toBeVisible({ timeout: 10000 })
    await expect(page.locator('[aria-label="Weekly Analytics Report"]')).toBeVisible()
    await expect(page.locator('[aria-label="Monthly Analytics Report"]')).toBeVisible()
    await expect(page.locator('[aria-label="Annual Analytics Report"]')).toBeVisible()

    expect(salesData.weekly.totalSales).toBeGreaterThanOrEqual(0)
    expect(salesData.monthly.totalSales).toBeGreaterThanOrEqual(0)
    expect(salesData.annual.totalSales).toBeGreaterThanOrEqual(0)
  })

  test('should render all Ob3 dashboard sections with headings', async ({ page }) => {
    await navigateToAnalytics(page)
    await expect(page.getByRole('heading', { name: 'Sales Analytics Processing Service' })).toBeVisible({ timeout: 10000 })

    await page.locator('main button').filter({ hasText: 'Branch Performance' }).click()
    await expect(page.getByRole('heading', { name: 'Branch Performance Analysis Service' })).toBeVisible({ timeout: 10000 })

    await page.locator('main button').filter({ hasText: 'AI Insights' }).click()
    await expect(page.getByRole('heading', { name: 'AI Insight Cards' })).toBeVisible({ timeout: 10000 })
  })

  test('sales analytics data should be consistent across UI and API', async ({ page, request }) => {
    await navigateToAnalytics(page)
    await expect(page.getByRole('heading', { name: 'Sales Analytics Processing Service' })).toBeVisible({ timeout: 10000 })

    const salesResponse = await request.get(SALES_ANALYTICS_API)
    const salesData = await salesResponse.json()

    await expect(page.locator('[aria-label="Weekly Analytics Report"]').getByText(`Total Sales: ${salesData.weekly.totalSales}`)).toBeVisible()
    await expect(page.locator('[aria-label="Monthly Analytics Report"]').getByText(`Total Sales: ${salesData.monthly.totalSales}`)).toBeVisible()
    await expect(page.locator('[aria-label="Annual Analytics Report"]').getByText(`Total Sales: ${salesData.annual.totalSales}`)).toBeVisible()
  })

  test('branch performance data should be consistent across UI and API', async ({ page, request }) => {
    await navigateToAnalytics(page)

    const branchResponse = await request.get(BRANCH_PERFORMANCE_API)
    const branchData = await branchResponse.json()

    await page.locator('main button').filter({ hasText: 'Branch Performance' }).click()
    await expect(page.getByRole('heading', { name: 'Branch Performance Analysis Service' })).toBeVisible({ timeout: 10000 })

    for (const branch of branchData.branchSalesAnalysis) {
      await expect(page.locator('[aria-label="Branch Sales Analysis Report"]').getByText(branch.name)).toBeVisible()
    }
  })

  test('AI insight cards should display all mock insights', async ({ page }) => {
    await navigateToAnalytics(page)
    await page.locator('main button').filter({ hasText: 'AI Insights' }).click()
    await expect(page.getByRole('heading', { name: 'AI Insight Cards' })).toBeVisible({ timeout: 10000 })

    const aiSection = page.locator('[aria-label="AI Insight Cards"]')
    const cards = aiSection.locator('article')
    await expect(cards).toHaveCount(2)

    await expect(aiSection.getByText('Sales peak at 17:00 in Branch A')).toBeVisible()
    await expect(aiSection.getByText('Smaller cylinder SKUs are selling faster in urban branches')).toBeVisible()
    await expect(aiSection.getByText('Up 12% vs last week')).toBeVisible()
    await expect(aiSection.getByText('Up 8% vs last month')).toBeVisible()
  })

  test('all API endpoints should return 200 status', async ({ request }) => {
    const salesRes = await request.get(SALES_ANALYTICS_API)
    expect(salesRes.status()).toBe(200)

    const branchRes = await request.get(BRANCH_PERFORMANCE_API)
    expect(branchRes.status()).toBe(200)
  })
})
