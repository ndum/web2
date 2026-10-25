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
  <h1>Sign in</h1>
  <p v-if="auth.member && !auth.isTeam">This area needs an account of the team.</p>
  <button type="button" @click="signIn('M-117')">Sign in as M-117</button>
  <button type="button" @click="signIn('M-204')">Sign in as M-204</button>
</template>
