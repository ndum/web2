import { createMemoryHistory, createRouter } from 'vue-router'

import { member } from './auth.js'
import CatalogView from './CatalogView.vue'
import LoginView from './LoginView.vue'
import TeamView from './TeamView.vue'

export default createRouter({
  history: createMemoryHistory(),
  routes: [
    { path: '/', component: CatalogView },
    {
      path: '/login',
      component: LoginView,
      // Runs only when someone enters this route, whoever is signed in goes straight on
      beforeEnter: () => (member.value ? '/team' : true),
    },
    { path: '/team', component: TeamView },
  ],
})
