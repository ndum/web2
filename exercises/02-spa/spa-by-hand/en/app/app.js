import { loadItems } from './load.js'
import { renderDetail, renderList, renderMessage } from './render.js'
import { parseRoute } from './router.js'

// Starts the app in the element root and resolves once the catalog is loaded
export async function start(root) {
  // Everything the app shows comes from this one object
  const state = { status: 'loading', items: [], error: null, route: parseRoute(location.hash) }

  function render() {
    if (state.status === 'loading') {
      root.innerHTML = renderMessage('Loading the catalog …')
    } else if (state.status === 'error') {
      root.innerHTML = renderMessage(state.error)
    } else if (state.route.name === 'catalog') {
      root.innerHTML = renderList(state.items)
    } else if (state.route.name === 'item') {
      const item = state.items.find((entry) => entry.id === state.route.id)
      root.innerHTML = item ? renderDetail(item) : renderMessage('This thing does not exist.')
    } else {
      root.innerHTML = renderMessage('This page does not exist.')
    }
  }

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
