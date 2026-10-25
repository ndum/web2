import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

// A stand-in for the members of the association until chapter 7.3 signs in against the course API
const MEMBERS = [
  { number: 'M-117', name: 'Martina Hostettler', team: true },
  { number: 'M-204', name: 'Mitglied M-204', team: false },
]

export const useAuthStore = defineStore('auth', () => {
  const member = ref(null)
  const isTeam = computed(() => member.value?.team === true)

  function signIn(number) {
    member.value = MEMBERS.find((entry) => entry.number === number) ?? null
    return member.value !== null
  }

  function signOut() {
    member.value = null
  }

  return { member, isTeam, signIn, signOut }
})
