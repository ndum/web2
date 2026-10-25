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
    <nav aria-label="Hauptnavigation">
      <RouterLink :to="{ name: 'catalog' }">Katalog</RouterLink>
      <RouterLink :to="{ name: 'team' }">Team</RouterLink>
    </nav>
    <span>Anfragen: 0</span>
    <span v-if="currentMember" class="member">
      Angemeldet als {{ currentMember.name }}
      <button type="button" @click="leave">Abmelden</button>
    </span>
    <RouterLink v-else :to="{ name: 'login' }">Anmelden</RouterLink>
  </header>
  <main>
    <RouterView />
  </main>
</template>
