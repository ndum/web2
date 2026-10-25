import { defineStore } from 'pinia'
import { ref } from 'vue'

import { fetchItems } from '@/api/items.js'

export const useCatalogStore = defineStore('catalog', () => {
  const items = ref([])
  // idle before the first load, then loading, ready or error
  const status = ref('idle')

  // Both pages call load, the catalog comes from the API only once
  async function load() {
    if (status.value === 'loading' || status.value === 'ready') return
    status.value = 'loading'
    try {
      items.value = await fetchItems()
      status.value = 'ready'
    } catch {
      status.value = 'error'
    }
  }

  return { items, status, load }
})
