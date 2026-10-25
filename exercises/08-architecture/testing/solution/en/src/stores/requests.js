import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useRequestsStore = defineStore('requests', () => {
  const list = ref([])
  const error = ref('')

  // Sends a request to the course API and returns whether it was accepted
  async function send(request) {
    const response = await fetch('/api/en/reservations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
    })
    const body = await response.json()
    if (!response.ok) {
      error.value = body.error
      return false
    }
    error.value = ''
    list.value.push(body)
    return true
  }

  return { list, error, send }
})
