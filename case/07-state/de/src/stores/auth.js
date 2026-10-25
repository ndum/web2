import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

import { callApi } from '@/api.js'

export const useAuthStore = defineStore('auth', () => {
  const member = ref(null)
  const isTeam = computed(() => member.value?.team === true)
  // The question to the API after a reload, asked once
  let restoring = null

  // The session cookie of the last login outlives a reload, the store does not.
  // So the app asks the course API once who is signed in. Every caller gets the same answer.
  function restore() {
    restoring ??= callApi('/session').then(({ ok, data }) => {
      if (ok) member.value = data
    })
    return restoring
  }

  // The course API checks the member number and sets the session cookie.
  // Returns the message of the API for a failed login and an empty text when it worked.
  async function signIn(number) {
    const { ok, data } = await callApi('/session', { method: 'POST', body: { number } })
    if (!ok) return data.error
    member.value = data
    return ''
  }

  async function signOut() {
    await callApi('/session', { method: 'DELETE' })
    member.value = null
  }

  return { member, isTeam, restore, signIn, signOut }
})
