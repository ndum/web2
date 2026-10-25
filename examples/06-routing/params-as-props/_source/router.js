import { createMemoryHistory, createRouter } from 'vue-router'

import CatalogView from './CatalogView.vue'
import ItemView from './ItemView.vue'

export default createRouter({
  history: createMemoryHistory(),
  routes: [
    { path: '/', name: 'catalog', component: CatalogView },
    {
      path: '/items/:id',
      name: 'item',
      component: ItemView,
      // The route turns the param into a number and passes it as a prop
      props: (route) => ({ id: Number(route.params.id) }),
    },
  ],
})
