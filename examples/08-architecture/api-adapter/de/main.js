import { createApp } from 'vue'

import App from './App.vue'
import { apiKey, createMemoryApi } from './api.js'

// main.js decides which API the app gets, App.vue stays the same
createApp(App).provide(apiKey, createMemoryApi()).mount('#app')
