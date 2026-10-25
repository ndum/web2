import { loadItems } from './load.js'
import { renderDetail, renderList, renderMessage } from './render.js'
import { parseRoute } from './router.js'

// Starts the app in the element root and resolves once the catalog is loaded
export async function start(root) {
  // Everything the app shows comes from this one object
  const state = { status: 'loading', items: [], error: null, query: '', route: parseRoute(location.hash) }

  // Only the list changes while someone types, so the search field keeps its focus
  function renderResults() {
    const query = state.query.trim().toLowerCase()
    const found = state.items.filter((item) => item.name.toLowerCase().includes(query))
    root.querySelector('#results').innerHTML = renderList(found)
  }

  function render() {
    if (state.status === 'loading') {
      root.innerHTML = renderMessage('Der Katalog wird geladen …')
    } else if (state.status === 'error') {
      root.innerHTML = renderMessage(state.error)
    } else if (state.route.name === 'catalog') {
      root.innerHTML = `
        <input id="search" type="search" aria-label="Im Katalog suchen" placeholder="Suchen">
        <div id="results"></div>`
      root.querySelector('#search').value = state.query
      renderResults()
    } else if (state.route.name === 'item') {
      const item = state.items.find((entry) => entry.id === state.route.id)
      root.innerHTML = item ? renderDetail(item) : renderMessage('Dieses Ding gibt es nicht.')
    } else {
      root.innerHTML = renderMessage('Diese Seite gibt es nicht.')
    }
  }

  root.addEventListener('input', (event) => {
    if (event.target.id !== 'search') return
    state.query = event.target.value
    renderResults()
  })

  addEventListener('hashchange', () => {
    state.route = parseRoute(location.hash)
    render()
  })

  render()
  try {
    state.items = await loadItems('/items')
    state.status = 'success'
  } catch (error) {
    state.status = 'error'
    state.error = error.message
  }
  render()
}
