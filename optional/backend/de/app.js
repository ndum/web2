// A small JSON API for the catalog with node:http and without packages. GET /api/items lists the
// things, ?q= searches their names, GET /api/items/:id returns one thing and POST /api/wishes
// takes the wish of a member for a new thing.
const MAX_BODY = 10_000

function send(response, status, body) {
  response.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' }).end(JSON.stringify(body))
}

// The body arrives in pieces of bytes, and a character such as ü can be split between two of them.
// The API joins the pieces, gives up above MAX_BODY bytes and reads the whole as UTF-8 once.
async function readJson(request) {
  const chunks = []
  let size = 0
  for await (const chunk of request) {
    size += chunk.length
    if (size > MAX_BODY) return undefined
    chunks.push(chunk)
  }
  try {
    return JSON.parse(Buffer.concat(chunks).toString('utf8'))
  } catch {
    return undefined
  }
}

export function createHandler(items) {
  const wishes = []

  return async (request, response) => {
    const url = new URL(request.url, 'http://localhost')

    if (request.method === 'GET' && url.pathname === '/api/items') {
      const query = (url.searchParams.get('q') ?? '').toLowerCase()
      return send(response, 200, items.filter((item) => item.name.toLowerCase().includes(query)))
    }

    const match = /^\/api\/items\/(\d+)$/.exec(url.pathname)
    if (request.method === 'GET' && match !== null) {
      const item = items.find((candidate) => candidate.id === Number(match[1]))
      if (item === undefined) return send(response, 404, { error: 'Dieses Ding gibt es nicht.' })
      return send(response, 200, item)
    }

    if (request.method === 'POST' && url.pathname === '/api/wishes') {
      const body = await readJson(request)
      const name = typeof body?.name === 'string' ? body.name.trim() : ''
      if (name === '' || name.length > 60) {
        return send(response, 422, { error: 'Der Wunsch braucht einen Namen mit höchstens 60 Zeichen.' })
      }
      const wish = { id: wishes.length + 1, name }
      wishes.push(wish)
      return send(response, 201, wish)
    }

    send(response, 404, { error: 'Diese Adresse kennt die API nicht.' })
  }
}
