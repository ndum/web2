import { createRouter, createWebHistory } from 'vue-router'

import CatalogView from '@/views/CatalogView.vue'
import ItemView from '@/views/ItemView.vue'

// The router takes the base path from Vite, so the app works in a folder as well
export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'catalog', component: CatalogView },
    { path: '/items/:id(\\d+)', name: 'item', component: ItemView, props: (route) => ({ id: Number(route.params.id) }) },
  ],
})
