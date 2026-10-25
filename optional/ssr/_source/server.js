// Renders the catalog on the server, npm start serves it on http://localhost:3002
import { readFile } from 'node:fs/promises'
import { createServer } from 'node:http'
import { fileURLToPath } from 'node:url'

import items from './data/items.json' with { type: 'json' }
import { renderPage } from './render.js'

// The browser loads the app, the script that takes over and the browser build of Vue
const FILES = {
  '/app.js': new URL('./app.js', import.meta.url),
  '/client.js': new URL('./client.js', import.meta.url),
  '/vue.js': fileURLToPath(import.meta.resolve('vue/dist/vue.esm-browser.prod.js')),
}

export function createSsrServer() {
  return createServer(async (request, response) => {
    if (request.url === '/') {
      const page = await renderPage(items.slice(0, 5))
      response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' }).end(page)
    } else if (request.url in FILES) {
      const code = await readFile(FILES[request.url])
      response.writeHead(200, { 'Content-Type': 'text/javascript; charset=utf-8' }).end(code)
    } else {
      response.writeHead(404).end()
    }
  })
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const server = createSsrServer().listen(Number(process.env.PORT ?? 3002), () => {
    console.log(`[%Der Katalog läuft auf|The catalog runs on%] http://localhost:${server.address().port}`)
  })
}
