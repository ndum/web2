import { createMemoryHistory, createRouter } from 'vue-router'

import CatalogView from './CatalogView.vue'

export default createRouter({
  history: createMemoryHistory(),
  routes: [{ path: '/', name: 'catalog', component: CatalogView }],
})
