import { expect } from '@playwright/test'

export async function login(page) {
  await page.goto('/')
  await expect(page.getByRole('heading', { name: 'GasNet' })).toBeVisible()
  await page.fill('#email', 'admin@gasnet.local')
  await page.fill('#password', 'password123')
  await page.click('button[type="submit"]')
  await expect(page.locator('aside')).toBeVisible()
}

export async function loginAndNavigate(page, navItem) {
  await login(page)
  if (navItem) {
    const navButton = page.locator('aside button', { hasText: navItem })
    await navButton.click()
    await page.waitForLoadState('networkidle')
  }
}
