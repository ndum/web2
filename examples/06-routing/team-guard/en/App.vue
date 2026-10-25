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
    <RouterLink to="/">Catalog</RouterLink>
    <RouterLink to="/team">Team</RouterLink>
    <RouterLink to="/login">Sign in</RouterLink>
    <button v-if="member" type="button" @click="signOut">Sign out</button>
  </nav>
  <p>Address: {{ route.fullPath }}</p>
  <RouterView />
</template>

<style scoped>
nav {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}
</style>
