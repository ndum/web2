import { createMemoryHistory, createRouter } from 'vue-router'

import { useAuthStore } from './auth.js'
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

router.beforeEach((to) => {
  // Inside the guard, when Pinia is already installed, not at the top of the module
  const auth = useAuthStore()
  if (to.meta.requiresTeam && !auth.isTeam) {
    return { name: 'login', query: { redirect: to.fullPath } }
  }
})

export default router
