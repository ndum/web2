import { defineStore } from 'pinia'
import { ref } from 'vue'

import { API } from '@/api.js'

export const useCatalogStore = defineStore('catalog', () => {
  const list = ref([])
  // loading, error or ready, the pages show something for each of them
  const status = ref('loading')
  const error = ref('')

  async function load() {
    status.value = 'loading'
    try {
      const response = await fetch(`${API}/items`)
      // fetch only fails without an answer, a status such as 503 has to be checked
      if (!response.ok) throw new Error(`Die Kurs-API antwortet mit dem Status ${response.status}.`)
      list.value = await response.json()
      status.value = 'ready'
    } catch (problem) {
      error.value = problem instanceof TypeError ? 'Die Kurs-API ist nicht erreichbar.' : problem.message
      status.value = 'error'
    }
  }

  function byId(id) {
    return list.value.find((item) => item.id === id)
  }

  return { list, status, error, load, byId }
})
