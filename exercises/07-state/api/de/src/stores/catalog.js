import { defineStore } from 'pinia'
import { ref } from 'vue'

import items from '../../data/items.json'

export const useCatalogStore = defineStore('catalog', () => {
  // For now the catalog comes from a file of the project
  const list = ref(items)
  const status = ref('ready')
  const error = ref('')

  function load() {}

  function byId(id) {
    return list.value.find((item) => item.id === id)
  }

  return { list, status, error, load, byId }
})
