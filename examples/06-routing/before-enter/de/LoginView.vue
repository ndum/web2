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
  <h1>Anmelden</h1>
  <button type="button" @click="signIn">Als Martina Hostettler anmelden</button>
</template>
