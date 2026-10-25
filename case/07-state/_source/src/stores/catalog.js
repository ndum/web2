import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

import { API, callApi } from '@/api.js'
import { loadItems } from '@/load.js'

export const useCatalogStore = defineStore('catalog', () => {
  const items = ref([])
  // loading, success or error, App shows something for each of them
  const status = ref('loading')
  const error = ref('')
  const availableCount = computed(() => items.value.filter((item) => item.availableFrom === null).length)

  async function load() {
    status.value = 'loading'
    try {
      items.value = await loadItems(`${API}/items`)
      status.value = 'success'
    } catch (problem) {
      error.value = problem.message
      status.value = 'error'
    }
  }

  function byId(id) {
    return items.value.find((item) => item.id === id)
  }

  // Records at the course API that a thing is back, which only the team may do.
  // Returns the message of the API for a refusal and an empty text when it worked.
  async function markReturned(id) {
    const { ok, data } = await callApi(`/items/${id}/return`, { method: 'POST' })
    if (!ok) return data.error
    items.value = items.value.map((item) => (item.id === id ? data : item))
    return ''
  }

  return { items, status, error, availableCount, load, byId, markReturned }
})
