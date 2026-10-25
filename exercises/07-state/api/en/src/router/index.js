import { createRouter, createWebHistory } from 'vue-router'

import CatalogView from '@/views/CatalogView.vue'
import ItemView from '@/views/ItemView.vue'
import LoginView from '@/views/LoginView.vue'
import RequestsView from '@/views/RequestsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'catalog', component: CatalogView },
    { path: '/items/:id(\\d+)', name: 'item', component: ItemView, props: (route) => ({ id: Number(route.params.id) }) },
    { path: '/reservations', name: 'reservations', component: RequestsView },
    { path: '/login', name: 'login', component: LoginView },
  ],
})

export default router
