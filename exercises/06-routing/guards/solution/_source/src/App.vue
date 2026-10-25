<script setup>
import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router'

import { currentMember, signOut } from '@/auth.js'

const route = useRoute()
const router = useRouter()

// Whoever signs out in the team area goes back to the catalog
function leave() {
  signOut()
  if (route.meta.requiresTeam) router.push({ name: 'catalog' })
}
</script>

<template>
  <header class="site">
    <span class="brand">Lorraine Commons</span>
    <nav aria-label="[%Hauptnavigation|Main navigation%]">
      <RouterLink :to="{ name: 'catalog' }">[%Katalog|Catalog%]</RouterLink>
      <RouterLink :to="{ name: 'team' }">[%Team|Team%]</RouterLink>
    </nav>
    <span v-if="currentMember" class="member">
      [%Angemeldet als|Signed in as%] {{ currentMember.name }}
      <button type="button" @click="leave">[%Abmelden|Sign out%]</button>
    </span>
    <RouterLink v-else :to="{ name: 'login' }">[%Anmelden|Sign in%]</RouterLink>
  </header>
  <main>
    <RouterView />
  </main>
</template>

<style scoped>
.site {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem 1.5rem;
  align-items: baseline;
  margin: -1rem -1.5rem 1rem;
  padding: 0.75rem 1.5rem;
  background: #1f6b4f;
  color: #ffffff;
}
.brand {
  font-weight: 700;
}
nav {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}
.site a {
  color: #ffffff;
}
/* RouterLink marks the link to the current page with aria-current="page" */
.site a[aria-current='page'] {
  font-weight: 700;
  text-decoration: underline 2px;
}
</style>
