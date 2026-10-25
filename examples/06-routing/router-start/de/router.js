import { createMemoryHistory, createRouter } from 'vue-router'

import AssociationView from './AssociationView.vue'
import CatalogView from './CatalogView.vue'

// The playground has no address bar, so the router keeps its history in memory
export default createRouter({
  history: createMemoryHistory(),
  routes: [
    { path: '/', component: CatalogView },
    { path: '/association', component: AssociationView },
  ],
})
