import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useRequestsStore = defineStore('requests', () => {
  const list = ref([])

  async function load() {
    const response = await fetch('/api/reservations')
    if (response.ok) list.value = await response.json()
  }

  // Sends a request as JSON and returns what the API said about it
  async function send(request) {
    const response = await fetch('/api/reservations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
    })
    const body = await response.json()
    if (!response.ok) return { error: body.error, fields: body.fields ?? {} }
    list.value.push(body)
    return { reservation: body, fields: {} }
  }

  return { list, load, send }
})
