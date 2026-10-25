<script setup>
import { useRouter } from 'vue-router'

import { member } from './auth.js'

const router = useRouter()

function signIn() {
  member.value = { name: 'Martina Hostettler', team: true }
  router.push('/team')
}
</script>

<template>
  <h1>Sign in</h1>
  <button type="button" @click="signIn">Sign in as Martina Hostettler</button>
</template>
