# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ob3\analytics-workflow.spec.js >> Ob3W6D1 — Complete Analytics Workflow Validation >> branch performance data should be consistent across UI and API
- Location: e2e\ob3\analytics-workflow.spec.js:65:3

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('main button').filter({ hasText: 'Branch Performance' })
    - locator resolved to <button class="px-4 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer text-slate-500 hover:text-slate-700">Branch Performance</button>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <button class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer text-slate-300 hover:bg-slate-800 hover:text-white">…</button> from <aside class="fixed top-0 left-0 z-40 h-screen w-64 bg-slate-900 text-white flex flex-col transition-transform duration-200 ease-in-out lg:translate-x-0 -translate-x-full">…</aside> subtree intercepts pointer events
    - retrying click action
    - waiting 20ms
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <button class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer text-slate-300 hover:bg-slate-800 hover:text-white">…</button> from <aside class="fixed top-0 left-0 z-40 h-screen w-64 bg-slate-900 text-white flex flex-col transition-transform duration-200 ease-in-out lg:translate-x-0 -translate-x-full">…</aside> subtree intercepts pointer events
    - retrying click action
      - waiting 100ms
    54 × waiting for element to be visible, enabled and stable
       - element is visible, enabled and stable
       - scrolling into view if needed
       - done scrolling
       - <button class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer text-slate-300 hover:bg-slate-800 hover:text-white">…</button> from <aside class="fixed top-0 left-0 z-40 h-screen w-64 bg-slate-900 text-white flex flex-col transition-transform duration-200 ease-in-out lg:translate-x-0 -translate-x-full">…</aside> subtree intercepts pointer events
     - retrying click action
       - waiting 500ms

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
      - button "Analytics" [active] [ref=e16] [cursor=pointer]:
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
          - button "AI Insights" [ref=e50] [cursor=pointer]
        - generic [ref=e52]:
          - generic [ref=e53]:
            - heading "Weekly Report" [level=3] [ref=e56]
            - paragraph [ref=e57]: 2026-07-06 to 2026-07-06
            - generic [ref=e58]:
              - generic [ref=e59]:
                - generic [ref=e60]: Total Sales
                - generic [ref=e61]: ₱17,600
              - generic [ref=e62]:
                - generic [ref=e63]: Transactions
                - generic [ref=e64]: "1"
              - generic [ref=e65]:
                - generic [ref=e66]: Average Sale
                - generic [ref=e67]: ₱17,600
          - generic [ref=e68]:
            - heading "Monthly Report" [level=3] [ref=e71]
            - paragraph [ref=e72]: July 2026
            - generic [ref=e73]:
              - generic [ref=e74]:
                - generic [ref=e75]: Total Sales
                - generic [ref=e76]: ₱50,700
              - generic [ref=e77]:
                - generic [ref=e78]: Transactions
                - generic [ref=e79]: "4"
              - generic [ref=e80]:
                - generic [ref=e81]: Average Sale
                - generic [ref=e82]: ₱12,675
          - generic [ref=e83]:
            - heading "Annual Report" [level=3] [ref=e86]
            - paragraph [ref=e87]: "2026"
            - generic [ref=e88]:
              - generic [ref=e89]:
                - generic [ref=e90]: Total Sales
                - generic [ref=e91]: ₱87,200
              - generic [ref=e92]:
                - generic [ref=e93]: Transactions
                - generic [ref=e94]: "7"
              - generic [ref=e95]:
                - generic [ref=e96]: Average Sale
                - generic [ref=e97]: ₱12,457.14
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
> 71  |     await page.locator('main button').filter({ hasText: 'Branch Performance' }).click()
      |                                                                                 ^ Error: locator.click: Test timeout of 30000ms exceeded.
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
  90  |     await expect(aiSection.getByText('Up 12% vs last week')).toBeVisible()
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