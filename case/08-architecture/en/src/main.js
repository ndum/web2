import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import { apiKey, createApi } from './api'
import router from './router'

const app = createApp(App)

// The stores get the API from here. Development and build talk to the course API, the demo gets
// a stand-in in the browser. The API comes first, a guard of the first navigation already needs it.
app.provide(apiKey, createApi())
app.use(createPinia())
app.use(router)

app.mount('#app')
