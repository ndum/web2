import { createMemoryHistory, createRouter } from 'vue-router'

import CatalogView from './CatalogView.vue'
import ItemView from './ItemView.vue'

export default createRouter({
  history: createMemoryHistory(),
  routes: [
    { path: '/', name: 'catalog', component: CatalogView },
    // :id is a param, /items/6 shows the page with the id 6
    { path: '/items/:id', name: 'item', component: ItemView },
  ],
})
