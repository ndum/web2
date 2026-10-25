// Starts the API with npm start on http://localhost:3001, PORT chooses another port
import { createServer } from 'node:http'

import { createHandler } from './app.js'
import items from './data/items.json' with { type: 'json' }

const server = createServer(createHandler(items))
server.listen(Number(process.env.PORT ?? 3001), () => {
  console.log(`The API runs on http://localhost:${server.address().port}/api/items`)
})
