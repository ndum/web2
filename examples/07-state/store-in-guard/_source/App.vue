<script setup>
import { RouterLink, RouterView, useRoute } from 'vue-router'

import { useAuthStore } from './auth.js'

const auth = useAuthStore()
const route = useRoute()
</script>

<template>
  <nav>
    <RouterLink to="/">[%Katalog|Catalog%]</RouterLink>
    <RouterLink to="/team">[%Team|Team%]</RouterLink>
    <button v-if="auth.member" type="button" @click="auth.signOut()">[%Abmelden|Sign out%]</button>
  </nav>
  <p>[%Adresse|Address%]: {{ route.fullPath }}</p>
  <RouterView />
</template>

<style scoped>
nav {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}
</style>
