import { createMemoryHistory, createRouter } from 'vue-router'

import AssociationView from './AssociationView.vue'
import CatalogView from './CatalogView.vue'
import FavoritesView from './FavoritesView.vue'

export default createRouter({
  history: createMemoryHistory(),
  routes: [
    { path: '/', component: CatalogView },
    { path: '/favorites', component: FavoritesView },
    { path: '/association', component: AssociationView },
  ],
})
