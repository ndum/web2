import { createMemoryHistory, createRouter } from 'vue-router'

import AssociationView from './AssociationView.vue'
import CatalogView from './CatalogView.vue'
import FavoritesView from './FavoritesView.vue'

// The links use the names, so a path can change without touching a single link
export default createRouter({
  history: createMemoryHistory(),
  routes: [
    { path: '/', name: 'catalog', component: CatalogView },
    { path: '/favorites', name: 'favorites', component: FavoritesView },
    { path: '/association', name: 'association', component: AssociationView },
  ],
})
