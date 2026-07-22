# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ob3\branch-performance-analysis.spec.js >> Ob3W3D2 — Branch Performance Analysis Service (End-to-End) >> should be calculating target progress correctly
- Location: e2e\ob3\branch-performance-analysis.spec.js:46:3

# Error details

```
Test timeout of 30000ms exceeded while running "beforeEach" hook.
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
    - waiting for element to be visible, enabled and stable

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
  1  | import { test, expect } from '@playwright/test'
  2  | import { login } from './helpers'
  3  | 
  4  | const BRANCH_PERFORMANCE_API = '/api/branch-performance-analysis'
  5  | 
  6  | test.describe('Ob3W3D2 — Branch Performance Analysis Service (End-to-End)', () => {
  7  |   test.beforeEach(async ({ page }) => {
  8  |     await login(page)
  9  |     await page.locator('aside nav button').filter({ hasText: 'Analytics' }).click()
> 10 |     await page.locator('main button').filter({ hasText: 'Branch Performance' }).click()
     |                                                                                 ^ Error: locator.click: Test timeout of 30000ms exceeded.
  11 |     await expect(page.getByRole('heading', { name: 'Branch Performance Analysis Service' })).toBeVisible({ timeout: 10000 })
  12 |   })
  13 | 
  14 |   test('should be analyzing branch sales data correctly', async ({ page, request }) => {
  15 |     const apiResponse = await request.get(BRANCH_PERFORMANCE_API)
  16 |     expect(apiResponse.ok()).toBeTruthy()
  17 |     const apiData = await apiResponse.json()
  18 | 
  19 |     const section = page.locator('[aria-label="Branch Sales Analysis Report"]')
  20 |     await expect(section).toBeVisible()
  21 | 
  22 |     for (const branch of apiData.branchSalesAnalysis) {
  23 |       const fullText = `${branch.name} - Sales: ${branch.monthlySales} | Target: ${branch.target} | Progress: ${branch.targetProgress}%`
  24 |       await expect(section.getByText(fullText)).toBeVisible()
  25 |     }
  26 |   })
  27 | 
  28 |   test('should be generating branch comparison results accurately', async ({ page, request }) => {
  29 |     const apiResponse = await request.get(BRANCH_PERFORMANCE_API)
  30 |     expect(apiResponse.ok()).toBeTruthy()
  31 |     const apiData = await apiResponse.json()
  32 | 
  33 |     const section = page.locator('[aria-label="Branch Comparison Report"]')
  34 |     await expect(section).toBeVisible()
  35 | 
  36 |     const items = section.locator('ol li')
  37 |     await expect(items).toHaveCount(apiData.branchComparisonReport.length)
  38 | 
  39 |     for (let i = 0; i < apiData.branchComparisonReport.length; i++) {
  40 |       const branch = apiData.branchComparisonReport[i]
  41 |       await expect(items.nth(i).getByText(`#${branch.rank}`)).toBeVisible()
  42 |       await expect(items.nth(i).getByText(branch.name)).toBeVisible()
  43 |     }
  44 |   })
  45 | 
  46 |   test('should be calculating target progress correctly', async ({ page, request }) => {
  47 |     const apiResponse = await request.get(BRANCH_PERFORMANCE_API)
  48 |     expect(apiResponse.ok()).toBeTruthy()
  49 |     const apiData = await apiResponse.json()
  50 | 
  51 |     const section = page.locator('[aria-label="Target Progress Analysis Report"]')
  52 |     await expect(section).toBeVisible()
  53 | 
  54 |     for (const branch of apiData.targetProgressAnalysisReport) {
  55 |       const fullText = `${branch.name} - Progress: ${branch.progress}% | Gap: ${branch.gap} | Status: ${branch.status}`
  56 |       await expect(section.getByText(fullText)).toBeVisible()
  57 |     }
  58 |   })
  59 | 
  60 |   test('UI branch comparison should be sorted by monthly sales descending', async ({ page, request }) => {
  61 |     const apiResponse = await request.get(BRANCH_PERFORMANCE_API)
  62 |     const apiData = await apiResponse.json()
  63 | 
  64 |     const section = page.locator('[aria-label="Branch Comparison Report"]')
  65 |     const items = section.locator('ol li')
  66 |     const count = await items.count()
  67 | 
  68 |     for (let i = 0; i < count; i++) {
  69 |       await expect(items.nth(i).getByText(`#${i + 1}`)).toBeVisible()
  70 |     }
  71 | 
  72 |     const sortedNames = apiData.branchComparisonReport.map((b) => b.name)
  73 |     for (let i = 0; i < count; i++) {
  74 |       await expect(items.nth(i).getByText(sortedNames[i])).toBeVisible()
  75 |     }
  76 |   })
  77 | 
  78 |   test('API response should contain all required fields', async ({ request }) => {
  79 |     const response = await request.get(BRANCH_PERFORMANCE_API)
  80 |     expect(response.ok()).toBeTruthy()
  81 | 
  82 |     const data = await response.json()
  83 |     expect(data).toHaveProperty('branchSalesAnalysis')
  84 |     expect(data).toHaveProperty('branchComparisonReport')
  85 |     expect(data).toHaveProperty('targetProgressAnalysisReport')
  86 |     expect(data.branchSalesAnalysis.length).toBeGreaterThan(0)
  87 |   })
  88 | })
  89 | 
```