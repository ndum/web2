<script setup>
import { RouterLink, RouterView, useRoute } from 'vue-router'

import { member } from './auth.js'

const route = useRoute()

function signOut() {
  member.value = null
}
</script>

<template>
  <nav>
    <RouterLink to="/">Katalog</RouterLink>
    <RouterLink to="/team">Team</RouterLink>
    <RouterLink to="/login">Anmelden</RouterLink>
    <button v-if="member" type="button" @click="signOut">Abmelden</button>
  </nav>
  <p>Adresse: {{ route.fullPath }}</p>
  <RouterView />
</template>

<style scoped>
nav {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}
</style>
