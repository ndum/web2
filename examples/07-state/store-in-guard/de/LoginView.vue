<script setup>
import { useRoute, useRouter } from 'vue-router'

import { useAuthStore } from './auth.js'

const auth = useAuthStore()
const route = useRoute()
const router = useRouter()

function signIn(number) {
  auth.signIn(number)
  const redirect = route.query.redirect
  router.replace(typeof redirect === 'string' && redirect.startsWith('/') && !redirect.startsWith('//') ? redirect : '/')
}
</script>

<template>
  <h1>Anmelden</h1>
  <p v-if="auth.member && !auth.isTeam">Für diesen Bereich braucht es ein Konto des Teams.</p>
  <button type="button" @click="signIn('M-117')">Als M-117 anmelden</button>
  <button type="button" @click="signIn('M-204')">Als M-204 anmelden</button>
</template>
