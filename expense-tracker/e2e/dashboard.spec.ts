import { test, expect, type Page } from '@playwright/test'

/** Get the transaction count value from the Transactions stat card */
async function getTransactionCount(page: Page): Promise<number> {
  // Wait for stats to load (loading state disappears)
  await expect(page.getByText('Loading stats...')).not.toBeVisible()
  // The Transactions card: CardHeader has "Transactions", sibling CardContent has the count
  // Use xpath to go from "Transactions" text up to the card container, then find the bold value
  const count = await page
    .locator('[data-slot="card"]')
    .filter({ hasText: 'Transactions' })
    .locator('.text-2xl')
    .textContent()
  return Number(count)
}

test.describe('Dashboard', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('displays the dashboard heading and stats', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible()
    await expect(page.getByText('Total Spent')).toBeVisible()
    await expect(page.getByText('Transactions')).toBeVisible()
    await expect(page.getByText('Top Category')).toBeVisible()
  })

  test('has an Add Expense button', async ({ page }) => {
    await expect(page.getByRole('button', { name: /add expense/i })).toBeVisible()
  })

  test('opens expense form from dashboard', async ({ page }) => {
    await page.getByRole('button', { name: /add expense/i }).click()
    await expect(page.getByRole('dialog')).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Add Expense' })).toBeVisible()
  })

  test('can add an expense from dashboard and stats update', async ({ page }) => {
    const initialCount = await getTransactionCount(page)

    // Open the form
    await page.getByRole('button', { name: /add expense/i }).click()
    await expect(page.getByRole('dialog')).toBeVisible()

    // Fill the form
    await page.getByLabel(/amount/i).fill('42.50')
    await page.getByLabel(/description/i).fill('E2E test expense')
    await page.getByRole('combobox', { name: 'Category' }).click()
    await page.getByRole('option').first().click()

    // Submit
    await page.getByRole('button', { name: /^add$/i }).click()

    // Dialog should close
    await expect(page.getByRole('dialog')).not.toBeVisible()

    // Wait for stats to refresh and verify count increased
    await expect(async () => {
      const updatedCount = await getTransactionCount(page)
      expect(updatedCount).toBe(initialCount + 1)
    }).toPass({ timeout: 5000 })
  })

  test('can cancel the expense form without side effects', async ({ page }) => {
    await page.getByRole('button', { name: /add expense/i }).click()
    await expect(page.getByRole('dialog')).toBeVisible()

    await page.getByRole('button', { name: /cancel/i }).click()
    await expect(page.getByRole('dialog')).not.toBeVisible()
  })

  test('month selector navigates between months', async ({ page }) => {
    const monthDisplay = page.locator('span.min-w-\\[160px\\]')
    const initialMonth = await monthDisplay.textContent()

    await page.getByRole('button', { name: /previous month/i }).click()
    const prevMonth = await monthDisplay.textContent()
    expect(prevMonth).not.toBe(initialMonth)

    await page.getByRole('button', { name: /next month/i }).click()
    const restoredMonth = await monthDisplay.textContent()
    expect(restoredMonth).toBe(initialMonth)
  })
})

test.describe('Dashboard auto-refresh after expense changes', () => {
  test('dashboard shows fresh data after adding expense on Expenses page', async ({ page }) => {
    // Go to dashboard, note transaction count
    await page.goto('/')
    const beforeCount = await getTransactionCount(page)

    // Navigate to Expenses page and add an expense
    await page.getByRole('link', { name: /expenses/i }).click()
    await expect(page.getByRole('heading', { name: 'Expenses' })).toBeVisible()

    await page.getByRole('button', { name: /add expense/i }).click()
    await expect(page.getByRole('dialog')).toBeVisible()

    await page.getByLabel(/amount/i).fill('10.00')
    await page.getByLabel(/description/i).fill('Cross-page refresh test')
    await page.getByRole('combobox', { name: 'Category' }).click()
    await page.getByRole('option').first().click()
    await page.getByRole('button', { name: /^add$/i }).click()
    await expect(page.getByRole('dialog')).not.toBeVisible()

    // Navigate back to dashboard
    await page.getByRole('link', { name: /dashboard/i }).click()
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible()

    // Stats should reflect the new expense (count increased by at least 1)
    await expect(async () => {
      const afterCount = await getTransactionCount(page)
      expect(afterCount).toBeGreaterThan(beforeCount)
    }).toPass({ timeout: 5000 })
  })
})
