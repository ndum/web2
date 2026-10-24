// A small stand-in for the association's server. It serves the app from the folder app/ at
// http://localhost:3000/ and the catalog at http://localhost:3000/items.
// ?delay=2000 makes the catalog wait two seconds, ?status=503 makes it answer with that status.
import { readFile } from 'node:fs/promises'
import { createServer } from 'node:http'
import { extname, join, normalize } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('./app/', import.meta.url))
const items = await readFile(new URL('./data/items.json', import.meta.url))
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml' }

async function sendFile(pathname, response) {
  const path = normalize(join(root, pathname === '/' ? 'index.html' : pathname))
  // Never serve a file outside app/, whatever the address says
  if (!path.startsWith(root)) {
    response.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' }).end('Forbidden')
    return
  }
  try {
    const content = await readFile(path)
    response.writeHead(200, { 'Content-Type': `${types[extname(path)] ?? 'application/octet-stream'}; charset=utf-8` }).end(content)
  } catch {
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }).end('Not Found')
  }
}

const server = createServer(async (request, response) => {
  const url = new URL(request.url, 'http://localhost')
  if (url.pathname === '/items') {
    const delay = Number(url.searchParams.get('delay') ?? 0)
    const status = Number(url.searchParams.get('status') ?? 200)
    await new Promise((resolve) => setTimeout(resolve, delay))
    if (status !== 200) {
      response.writeHead(status, { 'Content-Type': 'text/plain; charset=utf-8' }).end(`Status ${status}`)
    } else {
      response.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' }).end(items)
    }
  } else {
    await sendFile(decodeURIComponent(url.pathname), response)
  }
  console.log(`${request.method} ${request.url} ${response.statusCode}`)
})

// PORT=0 lets the system pick a free port
server.listen(Number(process.env.PORT ?? 3000), () => {
  console.log(`[%Die App des Vereins läuft auf|The association's app runs at%] http://localhost:${server.address().port}/`)
})
