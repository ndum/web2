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
    <RouterLink to="/">[%Katalog|Catalog%]</RouterLink>
    <RouterLink to="/team">[%Team|Team%]</RouterLink>
    <RouterLink to="/login">[%Anmelden|Sign in%]</RouterLink>
    <button v-if="member" type="button" @click="signOut">[%Abmelden|Sign out%]</button>
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
