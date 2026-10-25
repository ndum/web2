<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { useAuthStore } from '@/stores/auth.js'

const auth = useAuthStore()

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
  if (!auth.signIn(number.value)) {
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
    <p v-if="error" class="error" role="alert">{{ error }}</p>
    <button>Anmelden</button>
  </form>
</template>
