import assert from 'node:assert/strict'
import { after, before, describe, it } from 'node:test'

import items from './data/items.json' with { type: 'json' }
import { renderPage } from './render.js'
import { createSsrServer } from './server.js'

describe('[%das Rendern auf dem Server|rendering on the server%]', () => {
  it('[%schreibt die Liste schon ins HTML|puts the list into the HTML already%]', async () => {
    const page = await renderPage(items.slice(0, 2))
    assert.match(page, /<li>[%Bohrmaschine|Drill%] <button type="button">[%Merken|Save%]<\/button><\/li>/)
    assert.match(page, /[%Gemerkte Dinge|Saved things%] 0/)
  })

  it('[%markiert Fragmente für die Hydration|marks fragments for hydration%]', async () => {
    const page = await renderPage(items.slice(0, 2))
    assert.ok(page.includes('<!--[-->'))
  })

  it('[%gibt dem Browser die Daten mit|hands the data to the browser%]', async () => {
    const page = await renderPage([{ id: 99, name: '</script>' }])
    assert.ok(page.includes('"name":"\\u003c/script>"'))
    assert.ok(!page.includes('"name":"</script>"'))
  })
})

describe('[%der Server|the server%]', () => {
  let server
  let base

  before(async () => {
    server = createSsrServer()
    await new Promise((resolve) => server.listen(0, resolve))
    base = `http://localhost:${server.address().port}`
  })

  after(() => server.close())

  it('[%liefert die fertige Seite|delivers the finished page%]', async () => {
    const response = await fetch(base)
    assert.equal(response.status, 200)
    assert.match(await response.text(), /<li>[%Bohrmaschine|Drill%]/)
  })

  it('[%liefert die Skripte für den Browser|delivers the scripts for the browser%]', async () => {
    for (const path of ['/client.js', '/app.js', '/vue.js']) {
      const response = await fetch(base + path)
      assert.equal(response.status, 200, path)
      assert.match(response.headers.get('content-type'), /javascript/)
    }
    assert.equal((await fetch(`${base}/missing`)).status, 404)
  })
})
