# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ob3\analytics-workflow.spec.js >> Ob3W6D1 — Complete Analytics Workflow Validation >> sales analytics data should be consistent across UI and API
- Location: e2e\ob3\analytics-workflow.spec.js:53:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('heading', { name: 'Sales Analytics Processing Service' })
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByRole('heading', { name: 'Sales Analytics Processing Service' })

```

```yaml
- complementary:
  - img
  - text: GasNet LPG Trading System
  - navigation:
    - button "Dashboard":
      - img
      - text: Dashboard
    - button "Analytics":
      - img
      - text: Analytics
    - button "Inventory":
      - img
      - text: Inventory
    - button "Sync Status":
      - img
      - text: Sync Status
    - button "Settings":
      - img
      - text: Settings
  - text: System Online
- banner:
  - text: CJG LPG Trading a admin
  - button "Sign out":
    - img
- main:
  - heading "Analytics" [level=1]
  - paragraph: Sales data, branch performance, and AI-driven insights
  - button "Sales Analytics"
  - button "Branch Performance"
  - button "AI Insights"
  - heading "Weekly Report" [level=3]
  - paragraph: 2026-07-06 to 2026-07-06
  - text: Total Sales ₱17,600 Transactions 1 Average Sale ₱17,600
  - heading "Monthly Report" [level=3]
  - paragraph: July 2026
  - text: Total Sales ₱50,700 Transactions 4 Average Sale ₱12,675
  - heading "Annual Report" [level=3]
  - paragraph: "2026"
  - text: Total Sales ₱87,200 Transactions 7 Average Sale ₱12,457.14
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
> 55  |     await expect(page.getByRole('heading', { name: 'Sales Analytics Processing Service' })).toBeVisible({ timeout: 10000 })
      |                                                                                             ^ Error: expect(locator).toBeVisible() failed
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