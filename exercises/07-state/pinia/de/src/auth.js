import { readonly, ref } from 'vue'

// A stand-in for the members of the association, until chapter 7.3 signs in against the course API
const MEMBERS = [
  { number: 'M-117', name: 'Martina Hostettler', team: true },
  { number: 'M-204', name: 'Mitglied M-204', team: false },
]

const member = ref(null)

// Who is signed in, readable everywhere, changed only through signIn and signOut
export const currentMember = readonly(member)

export function signIn(number) {
  member.value = MEMBERS.find((entry) => entry.number === number.trim().toUpperCase()) ?? null
  return member.value !== null
}

export function signOut() {
  member.value = null
}
