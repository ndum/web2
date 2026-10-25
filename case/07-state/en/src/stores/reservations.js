import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

import { callApi } from '@/api.js'

export const useReservationsStore = defineStore('reservations', () => {
  // The requests of the signed-in member, the same on every page
  const list = ref([])
  // idle before a login, then loading, success or error
  const status = ref('idle')
  const error = ref('')
  const count = computed(() => list.value.length)

  async function load() {
    status.value = 'loading'
    const { ok, data } = await callApi('/reservations')
    if (ok) {
      list.value = data
      status.value = 'success'
    } else {
      error.value = data.error
      status.value = 'error'
    }
  }

  // Returns the new request, or the message of the API with one message per field
  async function send(request) {
    const { ok, data } = await callApi('/reservations', { method: 'POST', body: request })
    if (!ok) return { error: data.error, fields: data.fields ?? {} }
    list.value.push(data)
    return { reservation: data }
  }

  // Returns the message of the API for a refusal and an empty text when it worked
  async function withdraw(id) {
    const { ok, data } = await callApi(`/reservations/${id}`, { method: 'DELETE' })
    if (!ok) return data.error
    list.value = list.value.filter((reservation) => reservation.id !== id)
    return ''
  }

  function forItem(itemId) {
    return list.value.filter((reservation) => reservation.itemId === itemId)
  }

  // A setup store has no $reset of its own. After signing out nothing of the requests stays.
  function $reset() {
    list.value = []
    status.value = 'idle'
    error.value = ''
  }

  return { list, status, error, count, load, send, withdraw, forItem, $reset }
})
