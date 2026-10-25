import { expect, test } from '@playwright/test'

// Every test gets a fresh browser context, so favorites and the login of one test never reach another

// The card of a thing, found through its heading. Its link and button carry the name of the thing
// as hidden text, the visible label is enough inside the card.
function cardOf(page, name) {
  return page.getByRole('article').filter({ has: page.getByRole('heading', { level: 2, name, exact: true }) })
}

test('sucht im Katalog, öffnet ein Ding und kehrt zur Karte zurück', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { level: 1, name: 'Katalog' })).toBeVisible()
  await expect(page.getByText('60 Dinge gefunden')).toBeVisible()

  await page.getByLabel('Suchen').fill('säge')
  await expect(page.getByText('2 Dinge gefunden')).toBeVisible()

  const reserve = cardOf(page, 'Stichsäge').getByRole('link', { name: /Reservieren/ })
  await reserve.click()
  await expect(page.getByRole('heading', { level: 1, name: 'Stichsäge' })).toBeVisible()

  await page.goBack()
  await expect(reserve).toBeFocused()
})

test('behält einen Favoriten nach dem Neuladen', async ({ page }) => {
  await page.goto('/')
  const favorite = cardOf(page, 'Bohrmaschine').getByRole('button', { name: /Favorit/ })
  await favorite.click()
  await expect(favorite).toHaveAttribute('aria-pressed', 'true')

  await page.reload()
  await expect(favorite).toHaveAttribute('aria-pressed', 'true')
})
