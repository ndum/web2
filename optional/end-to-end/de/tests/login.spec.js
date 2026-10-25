import { expect, test } from '@playwright/test'

test('führt nach der Anmeldung zum Ding zurück', async ({ page }) => {
  await page.goto('/#/items/1')
  // The header has a link to sign in as well, the one in main belongs to the thing
  await page.getByRole('main').getByRole('link', { name: 'Melde dich an' }).click()
  await expect(page.getByRole('heading', { level: 1, name: 'Anmelden' })).toBeVisible()

  await page.getByLabel('Mitgliedernummer').fill('M-117')
  await page.getByRole('button', { name: 'Anmelden' }).click()

  await expect(page.getByRole('heading', { level: 1, name: 'Bohrmaschine' })).toBeVisible()
  await expect(page.getByRole('heading', { level: 2, name: 'Reservation anfragen' })).toBeVisible()
})
