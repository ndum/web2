import { createRouter, createWebHistory } from 'vue-router'

import CatalogView from '@/views/CatalogView.vue'
import TeamHints from '@/views/TeamHints.vue'
import TeamLayout from '@/views/TeamLayout.vue'
import TeamLoansView from '@/views/TeamLoansView.vue'
import TeamReturnsView from '@/views/TeamReturnsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'catalog', component: CatalogView },
    {
      path: '/team',
      // The layout fills the RouterView of App, the hints the RouterView named aside
      components: { default: TeamLayout, aside: TeamHints },
      // The children appear in the RouterView of TeamLayout
      children: [
        { path: '', name: 'team-loans', component: TeamLoansView },
        { path: 'returns', name: 'team-returns', component: TeamReturnsView },
      ],
    },
  ],
})

export default router
