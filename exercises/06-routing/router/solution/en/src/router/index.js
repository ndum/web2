import { createRouter, createWebHistory } from 'vue-router'

import AssociationView from '@/views/AssociationView.vue'
import CatalogView from '@/views/CatalogView.vue'
import FavoritesView from '@/views/FavoritesView.vue'

const router = createRouter({
  // Vite knows the base path, / during development and the folder of the app on a server
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'catalog', component: CatalogView },
    { path: '/favorites', name: 'favorites', component: FavoritesView },
    { path: '/association', name: 'association', component: AssociationView },
  ],
})

export default router
