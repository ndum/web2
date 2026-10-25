import { nextTick } from 'vue'
import { createRouter, createWebHashHistory, createWebHistory, START_LOCATION } from 'vue-router'

import { useAuthStore } from '@/features/auth'
import { associationRoutes } from '@/features/association/routes.js'
import { authRoutes } from '@/features/auth/routes.js'
import { catalogRoutes } from '@/features/catalog/routes.js'
import { favoritesRoutes } from '@/features/favorites/routes.js'
import { reservationsRoutes } from '@/features/reservations/routes.js'
import { teamRoutes } from '@/features/team/routes.js'
import NotFoundView from '@/views/NotFoundView.vue'

// The demo lives in a folder of the course site, whose 404 page belongs to the course. With the
// address after #, the server only ever sees the folder, see .env.demo.
const history =
  import.meta.env.VITE_HISTORY === 'hash'
    ? createWebHashHistory(import.meta.env.BASE_URL)
    : createWebHistory(import.meta.env.BASE_URL)

const router = createRouter({
  history,
  routes: [
    ...catalogRoutes,
    ...favoritesRoutes,
    ...associationRoutes,
    ...reservationsRoutes,
    ...authRoutes,
    ...teamRoutes,
    // Every path that no other route matches, also over several segments
    { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFoundView, meta: { title: '[%Seite nicht gefunden|Page not found%]' } },
  ],
  // Back and forward return to the old position, every other page starts at the top
  scrollBehavior(to, from, savedPosition) {
    return savedPosition ?? { top: 0 }
  },
})

// The team area needs a team account. Everybody else signs in first and comes back afterwards.
router.beforeEach(async (to) => {
  if (!to.meta.requiresTeam) return
  // The store is called inside the guard, when Pinia is installed. After a reload the guard
  // waits until the API has said who is signed in.
  const auth = useAuthStore()
  await auth.restore()
  if (!auth.isTeam) return { name: 'login', query: { redirect: to.fullPath } }
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
  // or with the card someone came back from
  const main = document.querySelector('main')
  if (main?.contains(document.activeElement)) return
  main?.querySelector('h1')?.focus()
})

export default router
