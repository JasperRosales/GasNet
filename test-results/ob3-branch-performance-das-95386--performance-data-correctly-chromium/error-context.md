# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ob3\branch-performance-dashboard.spec.js >> Ob3W2D1 — Branch Performance Dashboard Interface >> should be displaying branch performance data correctly
- Location: e2e\ob3\branch-performance-dashboard.spec.js:14:3

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
    55 × waiting for element to be visible, enabled and stable
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
  1  | import { test, expect } from '@playwright/test'
  2  | import { login } from './helpers'
  3  | 
  4  | const BRANCH_PERFORMANCE_API = '/api/branch-performance-analysis'
  5  | 
  6  | test.describe('Ob3W2D1 — Branch Performance Dashboard Interface', () => {
  7  |   test.beforeEach(async ({ page }) => {
  8  |     await login(page)
  9  |     await page.locator('aside nav button').filter({ hasText: 'Analytics' }).click()
> 10 |     await page.locator('main button').filter({ hasText: 'Branch Performance' }).click()
     |                                                                                 ^ Error: locator.click: Test timeout of 30000ms exceeded.
  11 |     await expect(page.getByRole('heading', { name: 'Branch Performance Analysis Service' })).toBeVisible({ timeout: 10000 })
  12 |   })
  13 | 
  14 |   test('should be displaying branch performance data correctly', async ({ page }) => {
  15 |     const section = page.locator('[aria-label="Branch Sales Analysis Report"]')
  16 |     await expect(section).toBeVisible()
  17 |     await expect(section.locator('h3')).toHaveText('Branch Sales Analysis Report')
  18 | 
  19 |     const items = section.locator('ul li')
  20 |     await expect(items).toHaveCount(6)
  21 | 
  22 |     await expect(section.getByText('Bayan Branch')).toBeVisible()
  23 |     await expect(section.getByText('Caloocan Branch')).toBeVisible()
  24 |     await expect(section.getByText('Sta. Teresita Branch')).toBeVisible()
  25 |     await expect(section.getByText('Antipolo Branch')).toBeVisible()
  26 |     await expect(section.getByText('Marikina Branch')).toBeVisible()
  27 |     await expect(section.getByText('Pasig Branch')).toBeVisible()
  28 |   })
  29 | 
  30 |   test('should be displaying branch comparison results accurately', async ({ page }) => {
  31 |     const section = page.locator('[aria-label="Branch Comparison Report"]')
  32 |     await expect(section).toBeVisible()
  33 |     await expect(section.locator('h3')).toHaveText('Branch Comparison Report')
  34 | 
  35 |     const items = section.locator('ol li')
  36 |     await expect(items).toHaveCount(6)
  37 | 
  38 |     const firstItem = items.first()
  39 |     await expect(firstItem.getByText('#1')).toBeVisible()
  40 |     await expect(firstItem.getByText('Sta. Teresita Branch')).toBeVisible()
  41 |   })
  42 | 
  43 |   test('should be displaying target progress indicators properly', async ({ page }) => {
  44 |     const section = page.locator('[aria-label="Target Progress Analysis Report"]')
  45 |     await expect(section).toBeVisible()
  46 |     await expect(section.locator('h3')).toHaveText('Target Progress Analysis Report')
  47 | 
  48 |     const items = section.locator('ul li')
  49 |     await expect(items).toHaveCount(6)
  50 | 
  51 |     for (const item of await items.all()) {
  52 |       await expect(item.getByText('Progress:')).toBeVisible()
  53 |       await expect(item.getByText('Gap:')).toBeVisible()
  54 |       await expect(item.getByText('Status:')).toBeVisible()
  55 |     }
  56 |   })
  57 | 
  58 |   test('should render the branch performance analysis service section heading', async ({ page }) => {
  59 |     await expect(page.getByRole('heading', { name: 'Branch Performance Analysis Service' })).toBeVisible()
  60 |   })
  61 | 
  62 |   test('API should return valid branch sales analysis, comparison, and target progress', async ({ request }) => {
  63 |     const response = await request.get(BRANCH_PERFORMANCE_API)
  64 |     expect(response.ok()).toBeTruthy()
  65 | 
  66 |     const data = await response.json()
  67 |     expect(Array.isArray(data.branchSalesAnalysis)).toBeTruthy()
  68 |     expect(Array.isArray(data.branchComparisonReport)).toBeTruthy()
  69 |     expect(Array.isArray(data.targetProgressAnalysisReport)).toBeTruthy()
  70 |     expect(data.branchSalesAnalysis).toHaveLength(6)
  71 |     expect(data.branchComparisonReport).toHaveLength(6)
  72 |     expect(data.targetProgressAnalysisReport).toHaveLength(6)
  73 |   })
  74 | })
  75 | 
```