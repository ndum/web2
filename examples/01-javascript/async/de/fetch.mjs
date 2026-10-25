const items = [
  { id: 1, name: 'Bohrmaschine' },
  { id: 6, name: 'Beamer' },
]

// Stand-in for the association's server, it answers like fetch after 200 milliseconds
async function fetchFromServer(url) {
  await new Promise((resolve) => setTimeout(resolve, 200))
  if (url.endsWith('/items')) {
    return new Response(JSON.stringify(items), { status: 200, headers: { 'Content-Type': 'application/json' } })
  }
  return new Response('Not Found', { status: 404 })
}

const response = await fetchFromServer('https://lorraine-commons.example/items')
console.log(response.ok, response.status)
const data = await response.json()
console.log(data.length, data[1].name)

const missing = await fetchFromServer('https://lorraine-commons.example/reservations')
console.log(missing.ok, missing.status)
