import { createRouter, createWebHistory } from 'vue-router'

import CatalogView from '@/views/CatalogView.vue'
import ItemView from '@/views/ItemView.vue'
import LoginView from '@/views/LoginView.vue'
import TeamView from '@/views/TeamView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'catalog', component: CatalogView },
    { path: '/items/:id', name: 'item', component: ItemView, props: (route) => ({ id: Number(route.params.id) }) },
    { path: '/login', name: 'login', component: LoginView },
    { path: '/team', name: 'team', component: TeamView, meta: { requiresTeam: true } },
  ],
})

export default router
