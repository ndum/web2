import { defineStore } from 'pinia'
import { ref } from 'vue'

import { API } from '@/api.js'

export const useRequestsStore = defineStore('requests', () => {
  const list = ref([])
  const status = ref('loading')
  const error = ref('')

  // Sends a request as JSON and returns what the course API said about it
  async function send(request) {
    const response = await fetch(`${API}/reservations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
    })
    const body = await response.json()
    if (!response.ok) return { error: body.error, fields: body.fields ?? {} }
    list.value.push(body)
    return { reservation: body, fields: {} }
  }

  // Loads the own requests. With the signal, the page cancels the request when it closes.
  async function load(signal) {
    status.value = 'loading'
    try {
      const response = await fetch(`${API}/reservations`, { signal })
      const body = await response.json()
      if (!response.ok) throw new Error(body.error)
      list.value = body
      status.value = 'ready'
    } catch (problem) {
      if (problem.name === 'AbortError') return
      error.value = problem.message
      status.value = 'error'
    }
  }

  return { list, status, error, send, load }
})
