import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

import { useRequestsStore } from './requests.js'

// A stand-in for the members of the association, until chapter 7.3 signs in against the course API
const MEMBERS = [
  { number: 'M-117', name: 'Martina Hostettler', team: true },
  { number: 'M-204', name: 'Mitglied M-204', team: false },
]

export const useAuthStore = defineStore('auth', () => {
  const member = ref(null)
  const isTeam = computed(() => member.value?.team === true)

  function signIn(number) {
    member.value = MEMBERS.find((entry) => entry.number === number.trim().toUpperCase()) ?? null
    return member.value !== null
  }

  function signOut() {
    member.value = null
    // Several members use the same device at the counter, nothing of the last one stays behind
    useRequestsStore().$reset()
  }

  return { member, isTeam, signIn, signOut }
})
