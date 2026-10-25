<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { signIn } from '@/auth.js'

const route = useRoute()
const router = useRouter()
const number = ref('')
const error = ref('')

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
  <h1>Anmelden</h1>
  <form class="fields" novalidate @submit.prevent="submit">
    <label for="member">Mitgliedernummer</label>
    <input id="member" v-model="number" autocomplete="username">
    <p v-if="error" class="error">{{ error }}</p>
    <button type="submit">Anmelden</button>
  </form>
  <p v-if="route.query.redirect">Danach geht es weiter zu {{ route.query.redirect }}</p>
</template>
