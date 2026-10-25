import './assets/main.css'

import { PiniaColada } from '@pinia/colada'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
// Pinia Colada keeps its cache in Pinia, so it comes after it
app.use(PiniaColada)
app.use(router)

app.mount('#app')
