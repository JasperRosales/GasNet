import { test, expect } from '@playwright/test'
import { login } from './helpers'

const SALES_ANALYTICS_API = '/api/sales-analytics'

test.describe('Ob3W1D1 — Sales Analytics Dashboard Interface', () => {
  test.beforeEach(async ({ page }) => {
    await login(page)
    await page.locator('aside nav button').filter({ hasText: 'Analytics' }).click()
    await expect(page.getByRole('heading', { name: 'Analytics' })).toBeVisible({ timeout: 10000 })
  })

  test('should be displaying weekly sales summaries correctly', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Weekly Report' })).toBeVisible()
    await expect(page.getByText('Total Sales')).toBeVisible()
    await expect(page.getByText('Transactions')).toBeVisible()
    await expect(page.getByText('Average Sale')).toBeVisible()
  })

  test('should be displaying monthly sales summaries correctly', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Monthly Report' })).toBeVisible()
    await expect(page.getByText('Total Sales')).toBeVisible()
    await expect(page.getByText('Transactions')).toBeVisible()
    await expect(page.getByText('Average Sale')).toBeVisible()
  })

  test('should be displaying annual sales summaries correctly', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Annual Report' })).toBeVisible()
    await expect(page.getByText('Total Sales')).toBeVisible()
    await expect(page.getByText('Transactions')).toBeVisible()
    await expect(page.getByText('Average Sale')).toBeVisible()
  })

  test('should render the analytics page heading', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Analytics' })).toBeVisible()
  })

  test('should have all three report cards rendered', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Weekly Report' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Monthly Report' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Annual Report' })).toBeVisible()
  })

  test('API should return valid weekly, monthly, and annual data', async ({ request }) => {
    const response = await request.get(SALES_ANALYTICS_API)
    expect(response.ok()).toBeTruthy()

    const data = await response.json()
    expect(data).toHaveProperty('weekly')
    expect(data).toHaveProperty('monthly')
    expect(data).toHaveProperty('annual')

    for (const scope of ['weekly', 'monthly', 'annual']) {
      expect(data[scope]).toHaveProperty('scope')
      expect(data[scope]).toHaveProperty('label')
      expect(data[scope]).toHaveProperty('totalSales')
      expect(data[scope]).toHaveProperty('transactionCount')
      expect(data[scope]).toHaveProperty('averageSale')
      expect(typeof data[scope].totalSales).toBe('number')
      expect(typeof data[scope].transactionCount).toBe('number')
      expect(typeof data[scope].averageSale).toBe('number')
    }
  })
})
