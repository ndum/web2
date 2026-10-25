<script setup>
import { RouterLink, RouterView, useRoute } from 'vue-router'

import { useAuthStore } from './auth.js'

const auth = useAuthStore()
const route = useRoute()
</script>

<template>
  <nav>
    <RouterLink to="/">Catalog</RouterLink>
    <RouterLink to="/team">Team</RouterLink>
    <button v-if="auth.member" type="button" @click="auth.signOut()">Sign out</button>
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
