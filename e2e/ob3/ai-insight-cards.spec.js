import { test, expect } from '@playwright/test'
import { login } from './helpers'

test.describe('Ob3W2D2 — AI Insight Cards Interface', () => {
  test.beforeEach(async ({ page }) => {
    await login(page)
    await page.locator('aside nav button').filter({ hasText: 'Analytics' }).click()
    await page.locator('main button').filter({ hasText: 'AI Insights' }).click()
    await expect(page.getByRole('heading', { name: 'AI Insight Cards' })).toBeVisible({ timeout: 10000 })
  })

  test('should be displaying AI insight cards correctly', async ({ page }) => {
    const section = page.locator('[aria-label="AI Insight Cards"]')
    await expect(section).toBeVisible()

    const cards = section.locator('article')
    await expect(cards).toHaveCount(2)

    await expect(cards.first().getByText('Sales peak at 17:00 in Branch A')).toBeVisible()
  })

  test('should be displaying recommendations properly', async ({ page }) => {
    const section = page.locator('[aria-label="AI Insight Cards"]')
    const cards = section.locator('article')

    await expect(cards.first().getByText('Increase evening stock and schedule an extra delivery on weekdays.')).toBeVisible()
    await expect(cards.nth(1).getByText('Promote 3kg bundles in urban outlets to capture demand.')).toBeVisible()
  })

  test('should be displaying sales trend insights accurately', async ({ page }) => {
    const section = page.locator('[aria-label="AI Insight Cards"]')
    const cards = section.locator('article')

    await expect(cards.first().getByText('Up 12% vs last week')).toBeVisible()
    await expect(cards.nth(1).getByText('Up 8% vs last month')).toBeVisible()
  })

  test('should render the AI insight cards section heading', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'AI Insight Cards' })).toBeVisible()
  })

  test('should display both insight cards with correct structure', async ({ page }) => {
    const section = page.locator('[aria-label="AI Insight Cards"]')
    const cards = section.locator('article')
    await expect(cards).toHaveCount(2)

    for (const card of await cards.all()) {
      await expect(card.getByText('Insight').first()).toBeVisible()
      await expect(card.getByText('Recommendation').first()).toBeVisible()
    }
  })
})
