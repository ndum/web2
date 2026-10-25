<script setup>
import { computed, inject, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { signIn } from '@/auth.js'
import { memberKey } from '@/keys.js'

const member = inject(memberKey, null)
const route = useRoute()
const router = useRouter()
const number = ref('')
const error = ref('')

// A member without a team account who tried to open the team area learns why the login appears
const notice = computed(() =>
  member.value && route.query.redirect
    ? `Du bist als ${member.value.name} angemeldet. Für den Bereich des Teams brauchst du ein Konto des Teams.`
    : '',
)

// The target comes from the address, so it is input from outside. Only paths inside the app count.
function target() {
  const redirect = route.query.redirect
  return typeof redirect === 'string' && redirect.startsWith('/') && !redirect.startsWith('//') ? redirect : '/'
}

function submit() {
  if (!signIn(number.value)) {
    error.value = 'Diese Mitgliedernummer kennen wir nicht.'
    return
  }
  router.replace(target())
}
</script>

<template>
  <section>
    <h1 tabindex="-1">Anmelden</h1>
    <p v-if="notice" class="notice">{{ notice }}</p>
    <form class="fields" novalidate @submit.prevent="submit">
      <label for="member-number">Mitgliedernummer</label>
      <input
        id="member-number"
        v-model="number"
        autocomplete="username"
        :aria-invalid="error !== ''"
        :aria-describedby="error ? 'login-error' : undefined"
      >
      <p v-if="error" id="login-error" class="error">{{ error }}</p>
      <button type="submit">Anmelden</button>
    </form>
    <p>Bis Teil 7 genügt die Mitgliedernummer. Dann prüft der Server des Vereins die Anmeldung.</p>
  </section>
</template>
