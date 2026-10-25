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

async function submit() {
  error.value = await auth.signIn(number.value)
  if (error.value === '') router.replace(target())
}
</script>

<template>
  <h1>[%Anmelden|Sign in%]</h1>
  <form class="fields" novalidate @submit.prevent="submit">
    <label for="member">[%Mitgliedernummer|Member number%]</label>
    <input id="member" v-model="number" autocomplete="username">
    <p v-if="error" class="error" role="alert">{{ error }}</p>
    <button>[%Anmelden|Sign in%]</button>
  </form>
</template>
