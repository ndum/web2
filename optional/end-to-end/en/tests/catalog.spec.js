import { expect, test } from '@playwright/test'

// Every test gets a fresh browser context, so favorites and the login of one test never reach another

// The card of a thing, found through its heading. Its link and button carry the name of the thing
// as hidden text, the visible label is enough inside the card.
function cardOf(page, name) {
  return page.getByRole('article').filter({ has: page.getByRole('heading', { level: 2, name, exact: true }) })
}

test('searches the catalog, opens a thing and returns to its card', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { level: 1, name: 'Catalog' })).toBeVisible()
  await expect(page.getByText('60 things found')).toBeVisible()

  await page.getByLabel('Search').fill('saw')
  await expect(page.getByText('2 things found')).toBeVisible()

  const reserve = cardOf(page, 'Jigsaw').getByRole('link', { name: /Reserve/ })
  await reserve.click()
  await expect(page.getByRole('heading', { level: 1, name: 'Jigsaw' })).toBeVisible()

  await page.goBack()
  await expect(reserve).toBeFocused()
})

test('keeps a favorite after a reload', async ({ page }) => {
  await page.goto('/')
  const favorite = cardOf(page, 'Drill').getByRole('button', { name: /Favorite/ })
  await favorite.click()
  await expect(favorite).toHaveAttribute('aria-pressed', 'true')

  await page.reload()
  await expect(favorite).toHaveAttribute('aria-pressed', 'true')
})
