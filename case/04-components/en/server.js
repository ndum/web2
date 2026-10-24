// A small stand-in for the association's server. It serves the catalog at http://localhost:3000/items.
// ?delay=2000 makes it wait two seconds before it answers, ?status=503 makes it answer with that status.
import { readFileSync } from 'node:fs'
import { createServer } from 'node:http'

const items = readFileSync(new URL('./data/items.json', import.meta.url))

const server = createServer(async (request, response) => {
  const url = new URL(request.url, 'http://localhost')
  const delay = Number(url.searchParams.get('delay') ?? 0)
  const status = Number(url.searchParams.get('status') ?? 200)
  await new Promise((resolve) => setTimeout(resolve, delay))
  if (url.pathname !== '/items') {
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }).end('Not Found')
  } else if (status !== 200) {
    response.writeHead(status, { 'Content-Type': 'text/plain; charset=utf-8' }).end(`Status ${status}`)
  } else {
    response.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' }).end(items)
  }
  console.log(`${request.method} ${request.url} ${response.statusCode}`)
})

// PORT=0 lets the system pick a free port
server.listen(Number(process.env.PORT ?? 3000), () => {
  console.log(`The association's server runs at http://localhost:${server.address().port}/items`)
})
