// The stand-in for the course API comes first, before any component calls fetch
import './mock-api.js'

import { createPinia } from 'pinia'
import { createApp } from 'vue'

import App from './App.vue'

createApp(App).use(createPinia()).mount('#app')
