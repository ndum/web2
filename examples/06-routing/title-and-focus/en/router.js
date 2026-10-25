import { nextTick } from 'vue'
import { createMemoryHistory, createRouter, START_LOCATION } from 'vue-router'

import AssociationView from './AssociationView.vue'
import CatalogView from './CatalogView.vue'

const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    { path: '/', component: CatalogView, meta: { title: 'Catalog' } },
    { path: '/association', component: AssociationView, meta: { title: 'Association' } },
  ],
})

// Runs after every navigation, it can no longer stop it
router.afterEach(async (to, from) => {
  document.title = `${to.meta.title} · Lorraine Commons`
  console.log('Title', document.title)
  // On the first page the browser starts at the top anyway
  if (from === START_LOCATION) return
  // The new page is only in the DOM after Vue has rendered it
  await nextTick()
  document.querySelector('main h1')?.focus()
})

export default router
