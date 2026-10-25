import { expect, test } from '@playwright/test'

test('returns to the thing after signing in', async ({ page }) => {
  await page.goto('/#/items/1')
  // The header has a link to sign in as well, the one in main belongs to the thing
  await page.getByRole('main').getByRole('link', { name: 'Sign in' }).click()
  await expect(page.getByRole('heading', { level: 1, name: 'Sign in' })).toBeVisible()

  await page.getByLabel('Member number').fill('M-117')
  await page.getByRole('button', { name: 'Sign in' }).click()

  await expect(page.getByRole('heading', { level: 1, name: 'Drill' })).toBeVisible()
  await expect(page.getByRole('heading', { level: 2, name: 'Request a reservation' })).toBeVisible()
})
