import { createPinia } from 'pinia'
import { createApp } from 'vue'

import App from './App.vue'
import router from './router.js'

// Pinia comes first, the router starts navigating as soon as the app uses it
createApp(App).use(createPinia()).use(router).mount('#app')
