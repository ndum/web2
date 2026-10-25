import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

import { useApi } from '@/api'

export const useCatalogStore = defineStore('catalog', () => {
  // The store hides where the things come from, the pages only know items, status and actions
  const api = useApi()
  const items = ref([])
  // loading, success or error, App shows something for each of them
  const status = ref('loading')
  const error = ref('')
  const availableCount = computed(() => items.value.filter((item) => item.availableFrom === null).length)

  async function load() {
    status.value = 'loading'
    const { ok, data } = await api.loadItems()
    if (ok) {
      items.value = data
      status.value = 'success'
    } else {
      error.value = data.error
      status.value = 'error'
    }
  }

  function byId(id) {
    return items.value.find((item) => item.id === id)
  }

  // Records that a thing is back, which only the team may do.
  // Returns the message of the API for a refusal and an empty text when it worked.
  async function markReturned(id) {
    const { ok, data } = await api.recordReturn(id)
    if (!ok) return data.error
    items.value = items.value.map((item) => (item.id === id ? data : item))
    return ''
  }

  return { items, status, error, availableCount, load, byId, markReturned }
})
