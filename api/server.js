// Starts the course API with npm start on http://localhost:3000, German data below /de and English
// data below /en. PORT chooses another port, CORS_ORIGINS adds origins separated by commas that may
// call the API directly. npm run reset deletes the stored returns and requests.
import { rmSync } from 'node:fs'
import { createServer } from 'node:http'

import { createApi, DEFAULT_ORIGINS } from './src/app.js'

const storageDir = new URL('./storage/', import.meta.url)

if (process.argv.includes('--reset')) {
  rmSync(storageDir, { recursive: true, force: true })
  console.log('The course API starts from its data again.')
} else {
  const extraOrigins = (process.env.CORS_ORIGINS ?? '').split(',').filter((origin) => origin !== '')
  const api = createApi({ storageDir, origins: [...DEFAULT_ORIGINS, ...extraOrigins] })
  const server = createServer((request, response) => {
    response.on('finish', () => console.log(`${request.method} ${request.url} ${response.statusCode}`))
    api(request, response)
  })
  server.listen(Number(process.env.PORT ?? 3000), () => {
    const { port } = server.address()
    console.log(`The course API runs on http://localhost:${port}/de/items and http://localhost:${port}/en/items`)
  })
}
