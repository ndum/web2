import { createMemoryHistory, createRouter } from 'vue-router'

import AssociationView from './AssociationView.vue'
import CatalogView from './CatalogView.vue'
import NotFoundView from './NotFoundView.vue'

export default createRouter({
  history: createMemoryHistory(),
  routes: [
    { path: '/', component: CatalogView },
    { path: '/association', component: AssociationView },
    // (.*)* matches every path that no other route matches, also over several segments
    { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFoundView },
  ],
})
