import { nextTick } from 'vue'
import { createRouter, createWebHistory, START_LOCATION } from 'vue-router'

import { currentMember } from '@/auth.js'
import AssociationView from '@/views/AssociationView.vue'
import CatalogView from '@/views/CatalogView.vue'
import FavoritesView from '@/views/FavoritesView.vue'
import ItemView from '@/views/ItemView.vue'
import LoginView from '@/views/LoginView.vue'
import NotFoundView from '@/views/NotFoundView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'catalog', component: CatalogView, meta: { title: '[%Katalog|Catalog%]' } },
    {
      // Only digits count as an id, /items/abc ends on the page for unknown addresses
      path: '/items/:id(\\d+)',
      name: 'item',
      component: ItemView,
      props: (route) => ({ id: Number(route.params.id) }),
    },
    { path: '/favorites', name: 'favorites', component: FavoritesView, meta: { title: '[%Favoriten|Favorites%]' } },
    { path: '/association', name: 'association', component: AssociationView, meta: { title: '[%Verein|Association%]' } },
    { path: '/login', name: 'login', component: LoginView, meta: { title: '[%Anmelden|Sign in%]' } },
    {
      path: '/team',
      // The code of the team area loads only when someone opens it
      component: () => import('@/views/team/TeamLayout.vue'),
      // The children get the meta fields of the parent as well
      meta: { requiresTeam: true, title: '[%Team am Tresen|Team at the counter%]' },
      children: [
        { path: '', name: 'team-loans', component: () => import('@/views/team/TeamLoansView.vue') },
        { path: 'returns', name: 'team-returns', component: () => import('@/views/team/TeamReturnsView.vue') },
      ],
    },
    // Every path that no other route matches, also over several segments
    { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFoundView, meta: { title: '[%Seite nicht gefunden|Page not found%]' } },
  ],
  // Back and forward return to the old position, every other page starts at the top
  scrollBehavior(to, from, savedPosition) {
    return savedPosition ?? { top: 0 }
  },
})

// The team area needs a team account. Everybody else signs in first and comes back afterwards.
router.beforeEach((to) => {
  if (to.meta.requiresTeam && !currentMember.value?.team) {
    return { name: 'login', query: { redirect: to.fullPath } }
  }
})

router.afterEach(async (to, from, failure) => {
  // A cancelled navigation, or one to the current page, changes nothing
  if (failure) return
  // The page of a thing sets its own title with the name of the thing
  if (to.meta.title) document.title = `${to.meta.title} · Lorraine Commons`
  // On the first load the browser starts at the top of the page anyway
  if (from === START_LOCATION) return
  await nextTick()
  // A page that put the focus into main itself keeps it, the catalog does with its search field
  const main = document.querySelector('main')
  if (main?.contains(document.activeElement)) return
  main?.querySelector('h1')?.focus()
})

export default router
