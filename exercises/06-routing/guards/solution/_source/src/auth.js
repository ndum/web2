import { readonly, ref } from 'vue'

// The members that the stand-in knows. From part 7 on, the association's server checks sign-ins.
const MEMBERS = [
  { number: 'M-117', name: 'Martina Hostettler', team: true },
  { number: 'M-204', name: '[%Mitglied M-204|member M-204%]', team: false },
]

const member = ref(null)

// The signed-in member or null, readonly so that only signIn and signOut change it
export const currentMember = readonly(member)

// Signs in with the member number alone, the stand-in knows no passwords
export function signIn(number) {
  member.value = MEMBERS.find((entry) => entry.number === number.trim().toUpperCase()) ?? null
  return member.value
}

export function signOut() {
  member.value = null
}
