import RequestsView from './RequestsView.vue'

export const reservationsRoutes = [
  { path: '/reservations', name: 'reservations', component: RequestsView, meta: { title: '[%Meine Anfragen|My requests%]' } },
]
