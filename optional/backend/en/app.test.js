import assert from 'node:assert/strict'
import { createServer, request as sendRequest } from 'node:http'
import { after, before, describe, it } from 'node:test'

import { createHandler } from './app.js'
import items from './data/items.json' with { type: 'json' }

let server
let base

// Every test run starts the API on a free port and stops it at the end
before(async () => {
  server = createServer(createHandler(items))
  await new Promise((resolve) => server.listen(0, resolve))
  base = `http://localhost:${server.address().port}`
})

after(() => server.close())

// Sends a JSON body in two pieces, split in the middle of the first character that needs two bytes
function sendInTwoPieces(path, body) {
  const bytes = Buffer.from(JSON.stringify(body))
  const middle = bytes.findIndex((byte) => byte >= 0xc0) + 1
  return new Promise((resolve, reject) => {
    const headers = { 'Content-Type': 'application/json', 'Content-Length': bytes.length }
    const outgoing = sendRequest(`${base}${path}`, { method: 'POST', headers }, async (response) => {
      let text = ''
      for await (const chunk of response) text += chunk
      resolve({ status: response.statusCode, body: JSON.parse(text) })
    })
    outgoing.on('error', reject)
    outgoing.write(bytes.subarray(0, middle))
    setTimeout(() => outgoing.end(bytes.subarray(middle)), 50)
  })
}

describe('the API of the catalog', () => {
  it('returns all things as JSON', async () => {
    const response = await fetch(`${base}/api/items`)
    assert.equal(response.status, 200)
    assert.match(response.headers.get('content-type'), /application\/json/)
    assert.equal((await response.json()).length, 60)
  })

  it('searches the names with q', async () => {
    const things = await (await fetch(`${base}/api/items?q=saw`)).json()
    assert.deepEqual(
      things.map((thing) => thing.name),
      ['Jigsaw', 'Circular saw'],
    )
  })

  it('answers 404 for an unknown thing', async () => {
    const response = await fetch(`${base}/api/items/999`)
    assert.equal(response.status, 404)
    assert.ok((await response.json()).error)
  })

  it('takes a wish and rejects an empty one', async () => {
    const send = (body) => fetch(`${base}/api/wishes`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
    const created = await send({ name: 'Ladder' })
    assert.equal(created.status, 201)
    assert.deepEqual(await created.json(), { id: 1, name: 'Ladder' })
    assert.equal((await send({ name: '  ' })).status, 422)
  })

  it('reads a character that arrives split over two pieces', async () => {
    const sent = await sendInTwoPieces('/api/wishes', { name: 'Café table' })
    assert.equal(sent.status, 201)
    assert.equal(sent.body.name, 'Café table')
  })
})
