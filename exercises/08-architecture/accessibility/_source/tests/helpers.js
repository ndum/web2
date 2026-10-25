import { mount } from '@vue/test-utils'

import App from '@/App.vue'
import { favoriteIds } from '@/favorites.js'

// Shows the app with these favorites, attached to the page so focus works
export function showApp(favorites = []) {
  favoriteIds.value = favorites
  return mount(App, { attachTo: document.body })
}

// The name a screen reader reads for an element, simplified: aria-label or the text without
// what aria-hidden hides
export function accessibleName(element) {
  const label = element.getAttribute('aria-label')
  if (label) return label.trim()
  const copy = element.cloneNode(true)
  copy.querySelectorAll('[aria-hidden="true"]').forEach((hidden) => hidden.remove())
  return copy.textContent.replace(/\s+/g, ' ').trim()
}

// The entry of a list that names this thing
export const entryOf = (wrapper, selector, name) => wrapper.findAll(selector).find((entry) => entry.text().includes(name))
