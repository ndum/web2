import { createMemoryHistory, createRouter } from 'vue-router'

import { member } from './auth.js'
import CatalogView from './CatalogView.vue'
import LoginView from './LoginView.vue'
import TeamView from './TeamView.vue'

const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    { path: '/', component: CatalogView },
    { path: '/login', name: 'login', component: LoginView },
    { path: '/team', component: TeamView, meta: { requiresTeam: true } },
  ],
})

// Runs before every navigation. Nothing lets it pass, a route location redirects.
router.beforeEach((to) => {
  if (to.meta.requiresTeam && !member.value?.team) {
    return { name: 'login', query: { redirect: to.fullPath } }
  }
})

export default router
