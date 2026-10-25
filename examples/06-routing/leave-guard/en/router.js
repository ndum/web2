import { createMemoryHistory, createRouter } from 'vue-router'

import CatalogView from './CatalogView.vue'
import ItemView from './ItemView.vue'

export default createRouter({
  history: createMemoryHistory(),
  routes: [
    { path: '/', component: CatalogView },
    { path: '/items/:id', component: ItemView },
  ],
})
