// The same app for the server and for the browser. Every call creates a new app, so the state of
// one request never reaches another.
import { createSSRApp, ref } from 'vue'

export function createApp(things) {
  return createSSRApp({
    setup() {
      const saved = ref(0)
      return { things, saved }
    },
    template: `
      <h1>Katalog</h1>
      <p>Gemerkte Dinge {{ saved }}</p>
      <ul>
        <li v-for="thing in things" :key="thing.id">
          {{ thing.name }}
          <button type="button" @click="saved++">Merken</button>
        </li>
      </ul>
    `,
  })
}
