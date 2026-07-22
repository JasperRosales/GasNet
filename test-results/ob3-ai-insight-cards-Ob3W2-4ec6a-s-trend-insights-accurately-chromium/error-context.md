# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ob3\ai-insight-cards.spec.js >> Ob3W2D2 — AI Insight Cards Interface >> should be displaying sales trend insights accurately
- Location: e2e\ob3\ai-insight-cards.spec.js:30:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('[aria-label="AI Insight Cards"]').locator('article').first().getByText('Up 12% vs last week')
Expected: visible
Error: strict mode violation: locator('[aria-label="AI Insight Cards"]').locator('article').first().getByText('Up 12% vs last week') resolved to 2 elements:
    1) <span class="text-xs text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full font-medium">Up 12% vs last week</span> aka getByRole('article', { name: 'Insight: insight-1' }).locator('span')
    2) <p class="text-sm text-slate-700">Up 12% vs last week</p> aka getByRole('paragraph').filter({ hasText: 'Up 12% vs last week' })

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('[aria-label="AI Insight Cards"]').locator('article').first().getByText('Up 12% vs last week')

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - complementary [ref=e4]:
    - generic [ref=e5]:
      - img [ref=e7]
      - generic [ref=e9]:
        - generic [ref=e10]: GasNet
        - generic [ref=e11]: LPG Trading System
    - navigation [ref=e12]:
      - button "Dashboard" [ref=e13] [cursor=pointer]:
        - img [ref=e14]
        - text: Dashboard
      - button "Analytics" [ref=e16] [cursor=pointer]:
        - img [ref=e17]
        - text: Analytics
      - button "Inventory" [ref=e19] [cursor=pointer]:
        - img [ref=e20]
        - text: Inventory
      - button "Sync Status" [ref=e22] [cursor=pointer]:
        - img [ref=e23]
        - text: Sync Status
      - button "Settings" [ref=e25] [cursor=pointer]:
        - img [ref=e26]
        - text: Settings
    - generic [ref=e30]: System Online
  - generic [ref=e32]:
    - banner [ref=e33]:
      - generic [ref=e34]: CJG LPG Trading
      - generic [ref=e35]:
        - generic [ref=e36]:
          - generic [ref=e37]: a
          - generic [ref=e38]: admin
        - button "Sign out" [ref=e39] [cursor=pointer]:
          - img [ref=e40]
    - main [ref=e42]:
      - generic [ref=e43]:
        - generic [ref=e44]:
          - heading "Analytics" [level=1] [ref=e45]
          - paragraph [ref=e46]: Sales data, branch performance, and AI-driven insights
        - generic [ref=e47]:
          - button "Sales Analytics" [ref=e48] [cursor=pointer]
          - button "Branch Performance" [ref=e49] [cursor=pointer]
          - button "AI Insights" [active] [ref=e50] [cursor=pointer]
        - region "AI Insight Cards" [ref=e51]:
          - heading "AI Insight Cards" [level=2] [ref=e52]
          - 'article "Insight: insight-1" [ref=e53]':
            - generic [ref=e54]:
              - img [ref=e56]
              - generic [ref=e58]:
                - generic [ref=e59]:
                  - heading "Insight" [level=3] [ref=e60]
                  - generic [ref=e61]: Up 12% vs last week
                - paragraph [ref=e62]: Sales peak at 17:00 in Branch A; weekday evening demand is increasing.
                - generic [ref=e63]:
                  - heading "Recommendation" [level=4] [ref=e64]
                  - paragraph [ref=e65]: Increase evening stock and schedule an extra delivery on weekdays.
                - generic [ref=e66]:
                  - heading "Sales Trend" [level=4] [ref=e67]
                  - paragraph [ref=e68]: Up 12% vs last week
          - 'article "Insight: insight-2" [ref=e69]':
            - generic [ref=e70]:
              - img [ref=e72]
              - generic [ref=e74]:
                - generic [ref=e75]:
                  - heading "Insight" [level=3] [ref=e76]
                  - generic [ref=e77]: Up 8% vs last month
                - paragraph [ref=e78]: Smaller cylinder SKUs are selling faster in urban branches.
                - generic [ref=e79]:
                  - heading "Recommendation" [level=4] [ref=e80]
                  - paragraph [ref=e81]: Promote 3kg bundles in urban outlets to capture demand.
                - generic [ref=e82]:
                  - heading "Sales Trend" [level=4] [ref=e83]
                  - paragraph [ref=e84]: Up 8% vs last month
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test'
  2  | import { login } from './helpers'
  3  | 
  4  | test.describe('Ob3W2D2 — AI Insight Cards Interface', () => {
  5  |   test.beforeEach(async ({ page }) => {
  6  |     await login(page)
  7  |     await page.locator('aside nav button').filter({ hasText: 'Analytics' }).click()
  8  |     await page.locator('main button').filter({ hasText: 'AI Insights' }).click()
  9  |     await expect(page.getByRole('heading', { name: 'AI Insight Cards' })).toBeVisible({ timeout: 10000 })
  10 |   })
  11 | 
  12 |   test('should be displaying AI insight cards correctly', async ({ page }) => {
  13 |     const section = page.locator('[aria-label="AI Insight Cards"]')
  14 |     await expect(section).toBeVisible()
  15 | 
  16 |     const cards = section.locator('article')
  17 |     await expect(cards).toHaveCount(2)
  18 | 
  19 |     await expect(cards.first().getByText('Sales peak at 17:00 in Branch A')).toBeVisible()
  20 |   })
  21 | 
  22 |   test('should be displaying recommendations properly', async ({ page }) => {
  23 |     const section = page.locator('[aria-label="AI Insight Cards"]')
  24 |     const cards = section.locator('article')
  25 | 
  26 |     await expect(cards.first().getByText('Increase evening stock and schedule an extra delivery on weekdays.')).toBeVisible()
  27 |     await expect(cards.nth(1).getByText('Promote 3kg bundles in urban outlets to capture demand.')).toBeVisible()
  28 |   })
  29 | 
  30 |   test('should be displaying sales trend insights accurately', async ({ page }) => {
  31 |     const section = page.locator('[aria-label="AI Insight Cards"]')
  32 |     const cards = section.locator('article')
  33 | 
> 34 |     await expect(cards.first().getByText('Up 12% vs last week')).toBeVisible()
     |                                                                  ^ Error: expect(locator).toBeVisible() failed
  35 |     await expect(cards.nth(1).getByText('Up 8% vs last month')).toBeVisible()
  36 |   })
  37 | 
  38 |   test('should render the AI insight cards section heading', async ({ page }) => {
  39 |     await expect(page.getByRole('heading', { name: 'AI Insight Cards' })).toBeVisible()
  40 |   })
  41 | 
  42 |   test('should display both insight cards with correct structure', async ({ page }) => {
  43 |     const section = page.locator('[aria-label="AI Insight Cards"]')
  44 |     const cards = section.locator('article')
  45 |     await expect(cards).toHaveCount(2)
  46 | 
  47 |     for (const card of await cards.all()) {
  48 |       await expect(card.getByText('Insight').first()).toBeVisible()
  49 |       await expect(card.getByText('Recommendation').first()).toBeVisible()
  50 |     }
  51 |   })
  52 | })
  53 | 
```