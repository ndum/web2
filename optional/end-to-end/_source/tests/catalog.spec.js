import { expect, test } from '@playwright/test'

// Every test gets a fresh browser context, so favorites and the login of one test never reach another

// The card of a thing, found through its heading. Its link and button carry the name of the thing
// as hidden text, the visible label is enough inside the card.
function cardOf(page, name) {
  return page.getByRole('article').filter({ has: page.getByRole('heading', { level: 2, name, exact: true }) })
}

test('[%sucht im Katalog, öffnet ein Ding und kehrt zur Karte zurück|searches the catalog, opens a thing and returns to its card%]', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { level: 1, name: '[%Katalog|Catalog%]' })).toBeVisible()
  await expect(page.getByText('60 [%Dinge gefunden|things found%]')).toBeVisible()

  await page.getByLabel('[%Suchen|Search%]').fill('[%säge|saw%]')
  await expect(page.getByText('2 [%Dinge gefunden|things found%]')).toBeVisible()

  const reserve = cardOf(page, '[%Stichsäge|Jigsaw%]').getByRole('link', { name: /[%Reservieren|Reserve%]/ })
  await reserve.click()
  await expect(page.getByRole('heading', { level: 1, name: '[%Stichsäge|Jigsaw%]' })).toBeVisible()

  await page.goBack()
  await expect(reserve).toBeFocused()
})

test('[%behält einen Favoriten nach dem Neuladen|keeps a favorite after a reload%]', async ({ page }) => {
  await page.goto('/')
  const favorite = cardOf(page, '[%Bohrmaschine|Drill%]').getByRole('button', { name: /[%Favorit|Favorite%]/ })
  await favorite.click()
  await expect(favorite).toHaveAttribute('aria-pressed', 'true')

  await page.reload()
  await expect(favorite).toHaveAttribute('aria-pressed', 'true')
})
