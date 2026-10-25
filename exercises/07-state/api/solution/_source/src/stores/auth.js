import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

import { API } from '@/api.js'

export const useAuthStore = defineStore('auth', () => {
  const member = ref(null)
  const isTeam = computed(() => member.value?.team === true)

  // Signs in at the course API, which keeps the session in a cookie. Returns a message for a
  // failed login and an empty text when it worked.
  async function signIn(number) {
    const response = await fetch(`${API}/session`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ number }),
    })
    const body = await response.json()
    if (!response.ok) return body.error
    member.value = body
    return ''
  }

  async function signOut() {
    await fetch(`${API}/session`, { method: 'DELETE' })
    member.value = null
  }

  return { member, isTeam, signIn, signOut }
})
