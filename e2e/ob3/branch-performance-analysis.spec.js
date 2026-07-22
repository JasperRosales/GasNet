import { test, expect } from '@playwright/test'
import { login } from './helpers'

const BRANCH_PERFORMANCE_API = '/api/branch-performance-analysis'

test.describe('Ob3W3D2 — Branch Performance Analysis Service (End-to-End)', () => {
  test.beforeEach(async ({ page }) => {
    await login(page)
    await page.locator('aside nav button').filter({ hasText: 'Analytics' }).click()
    await page.locator('main button').filter({ hasText: 'Branch Performance' }).click()
    await expect(page.getByRole('heading', { name: 'Branch Performance Analysis Service' })).toBeVisible({ timeout: 10000 })
  })

  test('should be analyzing branch sales data correctly', async ({ page, request }) => {
    const apiResponse = await request.get(BRANCH_PERFORMANCE_API)
    expect(apiResponse.ok()).toBeTruthy()
    const apiData = await apiResponse.json()

    const section = page.locator('[aria-label="Branch Sales Analysis Report"]')
    await expect(section).toBeVisible()

    for (const branch of apiData.branchSalesAnalysis) {
      const fullText = `${branch.name} - Sales: ${branch.monthlySales} | Target: ${branch.target} | Progress: ${branch.targetProgress}%`
      await expect(section.getByText(fullText)).toBeVisible()
    }
  })

  test('should be generating branch comparison results accurately', async ({ page, request }) => {
    const apiResponse = await request.get(BRANCH_PERFORMANCE_API)
    expect(apiResponse.ok()).toBeTruthy()
    const apiData = await apiResponse.json()

    const section = page.locator('[aria-label="Branch Comparison Report"]')
    await expect(section).toBeVisible()

    const items = section.locator('ol li')
    await expect(items).toHaveCount(apiData.branchComparisonReport.length)

    for (let i = 0; i < apiData.branchComparisonReport.length; i++) {
      const branch = apiData.branchComparisonReport[i]
      await expect(items.nth(i).getByText(`#${branch.rank}`)).toBeVisible()
      await expect(items.nth(i).getByText(branch.name)).toBeVisible()
    }
  })

  test('should be calculating target progress correctly', async ({ page, request }) => {
    const apiResponse = await request.get(BRANCH_PERFORMANCE_API)
    expect(apiResponse.ok()).toBeTruthy()
    const apiData = await apiResponse.json()

    const section = page.locator('[aria-label="Target Progress Analysis Report"]')
    await expect(section).toBeVisible()

    for (const branch of apiData.targetProgressAnalysisReport) {
      const fullText = `${branch.name} - Progress: ${branch.progress}% | Gap: ${branch.gap} | Status: ${branch.status}`
      await expect(section.getByText(fullText)).toBeVisible()
    }
  })

  test('UI branch comparison should be sorted by monthly sales descending', async ({ page, request }) => {
    const apiResponse = await request.get(BRANCH_PERFORMANCE_API)
    const apiData = await apiResponse.json()

    const section = page.locator('[aria-label="Branch Comparison Report"]')
    const items = section.locator('ol li')
    const count = await items.count()

    for (let i = 0; i < count; i++) {
      await expect(items.nth(i).getByText(`#${i + 1}`)).toBeVisible()
    }

    const sortedNames = apiData.branchComparisonReport.map((b) => b.name)
    for (let i = 0; i < count; i++) {
      await expect(items.nth(i).getByText(sortedNames[i])).toBeVisible()
    }
  })

  test('API response should contain all required fields', async ({ request }) => {
    const response = await request.get(BRANCH_PERFORMANCE_API)
    expect(response.ok()).toBeTruthy()

    const data = await response.json()
    expect(data).toHaveProperty('branchSalesAnalysis')
    expect(data).toHaveProperty('branchComparisonReport')
    expect(data).toHaveProperty('targetProgressAnalysisReport')
    expect(data.branchSalesAnalysis.length).toBeGreaterThan(0)
  })
})
