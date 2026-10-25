import { createRouter, createWebHistory } from 'vue-router'

import CatalogView from '@/views/CatalogView.vue'
import ItemView from '@/views/ItemView.vue'
import TeamView from '@/views/TeamView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'catalog', component: CatalogView, meta: { title: 'Catalog' } },
    {
      // Only digits count as an id, /items/abc matches no route
      path: '/items/:id(\\d+)',
      name: 'item',
      component: ItemView,
      props: (route) => ({ id: Number(route.params.id) }),
    },
    { path: '/team', name: 'team', component: TeamView, meta: { title: 'Team at the counter' } },
  ],
})

export default router
