// Stand-in for fetch, without a connection fetch rejects with a TypeError
async function fetchFromServer(url, online) {
  await new Promise((resolve) => setTimeout(resolve, 200))
  if (!online) throw new TypeError('Failed to fetch')
  return new Response(JSON.stringify([{ id: 1 }, { id: 2 }]), { status: 200 })
}

async function loadCatalog(online) {
  const state = { status: 'loading', items: [], error: null }
  console.log(state.status)
  try {
    const response = await fetchFromServer('https://lorraine-commons.example/items', online)
    state.items = await response.json()
    state.status = 'success'
  } catch {
    state.error = 'Der Katalog konnte nicht geladen werden.'
    state.status = 'error'
  }
  console.log(state.status, state.items.length, state.error)
  return state
}

await loadCatalog(true)
await loadCatalog(false)
