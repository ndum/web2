import CatalogView from './CatalogView.vue'
import ItemView from './ItemView.vue'

export const catalogRoutes = [
  { path: '/', name: 'catalog', component: CatalogView, meta: { title: 'Catalog' } },
  {
    // Only digits count as an id, /items/abc ends on the page for unknown addresses
    path: '/items/:id(\\d+)',
    name: 'item',
    component: ItemView,
    props: (route) => ({ id: Number(route.params.id) }),
  },
]
