import { createApp } from 'vue'

import App from './App.vue'
import { registerServiceWorker } from './registerServiceWorker.js'

createApp(App).mount('#app')
registerServiceWorker()
