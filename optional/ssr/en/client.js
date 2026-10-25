// In the browser the same app takes over the HTML of the server instead of drawing it again
import { createApp } from './app.js'

const things = JSON.parse(document.getElementById('things').textContent)
createApp(things).mount('#app')
