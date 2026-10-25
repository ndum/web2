import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

import { useApi } from '@/api'

export const useAuthStore = defineStore('auth', () => {
  const api = useApi()
  const member = ref(null)
  const isTeam = computed(() => member.value?.team === true)
  // The question to the API after a reload, asked once
  let restoring = null

  // The session of the last login outlives a reload, the store does not.
  // So the app asks the API once who is signed in. Every caller gets the same answer.
  function restore() {
    restoring ??= api.restoreSession().then(({ ok, data }) => {
      if (ok) member.value = data
    })
    return restoring
  }

  // The API checks the member number and starts the session.
  // Returns the message of the API for a failed login and an empty text when it worked.
  async function signIn(number) {
    const { ok, data } = await api.signIn(number)
    if (!ok) return data.error
    member.value = data
    return ''
  }

  async function signOut() {
    await api.signOut()
    member.value = null
  }

  return { member, isTeam, restore, signIn, signOut }
})
