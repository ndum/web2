import { createMemoryHistory, createRouter } from 'vue-router'

import AssociationView from './AssociationView.vue'
import CatalogView from './CatalogView.vue'

export default createRouter({
  history: createMemoryHistory(),
  routes: [
    { path: '/', component: CatalogView },
    { path: '/association', component: AssociationView },
  ],
})
