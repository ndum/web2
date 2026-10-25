import { nextTick } from 'vue'
import { createRouter, createWebHistory, START_LOCATION } from 'vue-router'

import CatalogView from '@/views/CatalogView.vue'
import ItemView from '@/views/ItemView.vue'
import NotFoundView from '@/views/NotFoundView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'catalog', component: CatalogView, meta: { title: '[%Katalog|Catalog%]' } },
    {
      // Only digits count as an id, /items/abc matches no route
      path: '/items/:id(\\d+)',
      name: 'item',
      component: ItemView,
      props: (route) => ({ id: Number(route.params.id) }),
    },
    {
      path: '/team',
      name: 'team',
      // The code of the team area loads only when someone opens it
      component: () => import('@/views/TeamView.vue'),
      meta: { title: '[%Team am Tresen|Team at the counter%]' },
    },
    // Every path that no other route matches, also over several segments
    { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFoundView, meta: { title: '[%Seite nicht gefunden|Page not found%]' } },
  ],
})

// Runs after every navigation and can no longer stop it
router.afterEach(async (to, from, failure) => {
  // A cancelled navigation, or one to the current page, changes nothing
  if (failure) return
  if (to.meta.title) document.title = `${to.meta.title} · Lorraine Commons`
  // On the first load the browser starts at the top of the page anyway
  if (from === START_LOCATION) return
  // The new page is only in the DOM after Vue has rendered it
  await nextTick()
  document.querySelector('main h1')?.focus()
})

export default router
