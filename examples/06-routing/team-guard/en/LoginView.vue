<script setup>
import { useRoute, useRouter } from 'vue-router'

import { member } from './auth.js'

const route = useRoute()
const router = useRouter()

// The target comes from the address, so it is input from outside. Only paths inside the app count.
function target() {
  const redirect = route.query.redirect
  return typeof redirect === 'string' && redirect.startsWith('/') && !redirect.startsWith('//') ? redirect : '/'
}

function signIn() {
  member.value = { name: 'Martina Hostettler', team: true }
  router.replace(target())
}
</script>

<template>
  <h1>Sign in</h1>
  <p v-if="route.query.redirect">Afterwards you go on to {{ route.query.redirect }}</p>
  <button type="button" @click="signIn">Sign in as Martina Hostettler</button>
</template>
