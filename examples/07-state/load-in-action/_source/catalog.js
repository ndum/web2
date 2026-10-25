import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCatalogStore = defineStore('catalog', () => {
  const items = ref([])
  // idle, loading, error or ready, the page shows something for each of them
  const status = ref('idle')
  const error = ref('')

  async function load(address = '/api/items') {
    status.value = 'loading'
    try {
      const response = await fetch(address)
      // fetch only fails when there is no answer, a status like 503 has to be checked
      if (!response.ok) throw new Error(`[%Die Kurs-API antwortet mit dem Status|The course API answers with the status%] ${response.status}.`)
      items.value = await response.json()
      status.value = 'ready'
    } catch (problem) {
      error.value = problem.message
      status.value = 'error'
    }
  }

  return { items, status, error, load }
})
