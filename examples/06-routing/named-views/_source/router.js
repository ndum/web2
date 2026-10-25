import { createMemoryHistory, createRouter } from 'vue-router'

import CatalogView from './CatalogView.vue'
import TeamHints from './TeamHints.vue'
import TeamLoansView from './TeamLoansView.vue'

export default createRouter({
  history: createMemoryHistory(),
  routes: [
    { path: '/', component: CatalogView },
    // components instead of component, one component for every named view
    { path: '/team', components: { default: TeamLoansView, aside: TeamHints } },
  ],
})
