import { expect, test } from '@playwright/test'

test('[%führt nach der Anmeldung zum Ding zurück|returns to the thing after signing in%]', async ({ page }) => {
  await page.goto('/#/items/1')
  // The header has a link to sign in as well, the one in main belongs to the thing
  await page.getByRole('main').getByRole('link', { name: '[%Melde dich an|Sign in%]' }).click()
  await expect(page.getByRole('heading', { level: 1, name: '[%Anmelden|Sign in%]' })).toBeVisible()

  await page.getByLabel('[%Mitgliedernummer|Member number%]').fill('M-117')
  await page.getByRole('button', { name: '[%Anmelden|Sign in%]' }).click()

  await expect(page.getByRole('heading', { level: 1, name: '[%Bohrmaschine|Drill%]' })).toBeVisible()
  await expect(page.getByRole('heading', { level: 2, name: '[%Reservation anfragen|Request a reservation%]' })).toBeVisible()
})
