import { createRouter, createWebHistory } from 'vue-router'

import { catalogRoutes } from '@/features/catalog/routes.js'
import { favoritesRoutes } from '@/features/favorites/routes.js'

// Every feature brings its routes, the router only puts them together
export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...catalogRoutes, ...favoritesRoutes],
})
