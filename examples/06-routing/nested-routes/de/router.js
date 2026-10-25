import { createMemoryHistory, createRouter } from 'vue-router'

import CatalogView from './CatalogView.vue'
import TeamLayout from './TeamLayout.vue'
import TeamLoansView from './TeamLoansView.vue'
import TeamReturnsView from './TeamReturnsView.vue'

export default createRouter({
  history: createMemoryHistory(),
  routes: [
    { path: '/', component: CatalogView },
    {
      path: '/team',
      component: TeamLayout,
      // The children appear in the RouterView of TeamLayout
      children: [
        // The empty path shows the loans at /team itself
        { path: '', component: TeamLoansView },
        { path: 'returns', component: TeamReturnsView },
      ],
    },
  ],
})
