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
      root.innerHTML = renderMessage('Loading the catalog …')
    } else if (state.status === 'error') {
      root.innerHTML = renderMessage(state.error)
    } else if (state.route.name === 'catalog') {
      root.innerHTML = `
        <input id="search" type="search" aria-label="Search the catalog" placeholder="Search">
        <div id="results"></div>`
      root.querySelector('#search').value = state.query
      renderResults()
    } else if (state.route.name === 'item') {
      const item = state.items.find((entry) => entry.id === state.route.id)
      root.innerHTML = item ? renderDetail(item) : renderMessage('This thing does not exist.')
    } else {
      root.innerHTML = renderMessage('This page does not exist.')
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
