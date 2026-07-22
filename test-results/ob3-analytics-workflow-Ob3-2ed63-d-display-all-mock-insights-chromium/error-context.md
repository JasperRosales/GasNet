# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ob3\analytics-workflow.spec.js >> Ob3W6D1 — Complete Analytics Workflow Validation >> AI insight cards should display all mock insights
- Location: e2e\ob3\analytics-workflow.spec.js:79:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('[aria-label="AI Insight Cards"]').getByText('Up 12% vs last week')
Expected: visible
Error: strict mode violation: locator('[aria-label="AI Insight Cards"]').getByText('Up 12% vs last week') resolved to 2 elements:
    1) <span class="text-xs text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full font-medium">Up 12% vs last week</span> aka getByRole('article', { name: 'Insight: insight-1' }).locator('span')
    2) <p class="text-sm text-slate-700">Up 12% vs last week</p> aka getByRole('paragraph').filter({ hasText: 'Up 12% vs last week' })

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('[aria-label="AI Insight Cards"]').getByText('Up 12% vs last week')

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
  1   | import { test, expect } from '@playwright/test'
  2   | import { login } from './helpers'
  3   | 
  4   | const SALES_ANALYTICS_API = '/api/sales-analytics'
  5   | const BRANCH_PERFORMANCE_API = '/api/branch-performance-analysis'
  6   | 
  7   | async function navigateToAnalytics(page) {
  8   |   await login(page)
  9   |   await page.locator('aside nav button').filter({ hasText: 'Analytics' }).click()
  10  |   await page.waitForTimeout(200)
  11  | }
  12  | 
  13  | test.describe('Ob3W6D1 — Complete Analytics Workflow Validation', () => {
  14  |   test('should be completing the analytics and AI workflow successfully', async ({ page }) => {
  15  |     await navigateToAnalytics(page)
  16  |     await expect(page.getByRole('heading', { name: 'Sales Analytics Processing Service' })).toBeVisible({ timeout: 10000 })
  17  | 
  18  |     await page.locator('main button').filter({ hasText: 'Branch Performance' }).click()
  19  |     await expect(page.getByRole('heading', { name: 'Branch Performance Analysis Service' })).toBeVisible({ timeout: 10000 })
  20  | 
  21  |     await page.locator('main button').filter({ hasText: 'AI Insights' }).click()
  22  |     await expect(page.getByRole('heading', { name: 'AI Insight Cards' })).toBeVisible({ timeout: 10000 })
  23  |   })
  24  | 
  25  |   test('should be satisfying all Objective 3 requirements', async ({ page, request }) => {
  26  |     await navigateToAnalytics(page)
  27  | 
  28  |     const salesResponse = await request.get(SALES_ANALYTICS_API)
  29  |     expect(salesResponse.ok()).toBeTruthy()
  30  |     const salesData = await salesResponse.json()
  31  | 
  32  |     await expect(page.getByRole('heading', { name: 'Sales Analytics Processing Service' })).toBeVisible({ timeout: 10000 })
  33  |     await expect(page.locator('[aria-label="Weekly Analytics Report"]')).toBeVisible()
  34  |     await expect(page.locator('[aria-label="Monthly Analytics Report"]')).toBeVisible()
  35  |     await expect(page.locator('[aria-label="Annual Analytics Report"]')).toBeVisible()
  36  | 
  37  |     expect(salesData.weekly.totalSales).toBeGreaterThanOrEqual(0)
  38  |     expect(salesData.monthly.totalSales).toBeGreaterThanOrEqual(0)
  39  |     expect(salesData.annual.totalSales).toBeGreaterThanOrEqual(0)
  40  |   })
  41  | 
  42  |   test('should render all Ob3 dashboard sections with headings', async ({ page }) => {
  43  |     await navigateToAnalytics(page)
  44  |     await expect(page.getByRole('heading', { name: 'Sales Analytics Processing Service' })).toBeVisible({ timeout: 10000 })
  45  | 
  46  |     await page.locator('main button').filter({ hasText: 'Branch Performance' }).click()
  47  |     await expect(page.getByRole('heading', { name: 'Branch Performance Analysis Service' })).toBeVisible({ timeout: 10000 })
  48  | 
  49  |     await page.locator('main button').filter({ hasText: 'AI Insights' }).click()
  50  |     await expect(page.getByRole('heading', { name: 'AI Insight Cards' })).toBeVisible({ timeout: 10000 })
  51  |   })
  52  | 
  53  |   test('sales analytics data should be consistent across UI and API', async ({ page, request }) => {
  54  |     await navigateToAnalytics(page)
  55  |     await expect(page.getByRole('heading', { name: 'Sales Analytics Processing Service' })).toBeVisible({ timeout: 10000 })
  56  | 
  57  |     const salesResponse = await request.get(SALES_ANALYTICS_API)
  58  |     const salesData = await salesResponse.json()
  59  | 
  60  |     await expect(page.locator('[aria-label="Weekly Analytics Report"]').getByText(`Total Sales: ${salesData.weekly.totalSales}`)).toBeVisible()
  61  |     await expect(page.locator('[aria-label="Monthly Analytics Report"]').getByText(`Total Sales: ${salesData.monthly.totalSales}`)).toBeVisible()
  62  |     await expect(page.locator('[aria-label="Annual Analytics Report"]').getByText(`Total Sales: ${salesData.annual.totalSales}`)).toBeVisible()
  63  |   })
  64  | 
  65  |   test('branch performance data should be consistent across UI and API', async ({ page, request }) => {
  66  |     await navigateToAnalytics(page)
  67  | 
  68  |     const branchResponse = await request.get(BRANCH_PERFORMANCE_API)
  69  |     const branchData = await branchResponse.json()
  70  | 
  71  |     await page.locator('main button').filter({ hasText: 'Branch Performance' }).click()
  72  |     await expect(page.getByRole('heading', { name: 'Branch Performance Analysis Service' })).toBeVisible({ timeout: 10000 })
  73  | 
  74  |     for (const branch of branchData.branchSalesAnalysis) {
  75  |       await expect(page.locator('[aria-label="Branch Sales Analysis Report"]').getByText(branch.name)).toBeVisible()
  76  |     }
  77  |   })
  78  | 
  79  |   test('AI insight cards should display all mock insights', async ({ page }) => {
  80  |     await navigateToAnalytics(page)
  81  |     await page.locator('main button').filter({ hasText: 'AI Insights' }).click()
  82  |     await expect(page.getByRole('heading', { name: 'AI Insight Cards' })).toBeVisible({ timeout: 10000 })
  83  | 
  84  |     const aiSection = page.locator('[aria-label="AI Insight Cards"]')
  85  |     const cards = aiSection.locator('article')
  86  |     await expect(cards).toHaveCount(2)
  87  | 
  88  |     await expect(aiSection.getByText('Sales peak at 17:00 in Branch A')).toBeVisible()
  89  |     await expect(aiSection.getByText('Smaller cylinder SKUs are selling faster in urban branches')).toBeVisible()
> 90  |     await expect(aiSection.getByText('Up 12% vs last week')).toBeVisible()
      |                                                              ^ Error: expect(locator).toBeVisible() failed
  91  |     await expect(aiSection.getByText('Up 8% vs last month')).toBeVisible()
  92  |   })
  93  | 
  94  |   test('all API endpoints should return 200 status', async ({ request }) => {
  95  |     const salesRes = await request.get(SALES_ANALYTICS_API)
  96  |     expect(salesRes.status()).toBe(200)
  97  | 
  98  |     const branchRes = await request.get(BRANCH_PERFORMANCE_API)
  99  |     expect(branchRes.status()).toBe(200)
  100 |   })
  101 | })
  102 | 
```