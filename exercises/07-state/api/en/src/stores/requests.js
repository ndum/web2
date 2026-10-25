import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useRequestsStore = defineStore('requests', () => {
  const list = ref([])
  const status = ref('ready')
  const error = ref('')

  // For now the requests only live in this browser
  async function send(request) {
    const reservation = { id: `R-${list.value.length + 1}`, ...request }
    list.value.push(reservation)
    return { reservation, fields: {} }
  }

  function load() {}

  return { list, status, error, send, load }
})
