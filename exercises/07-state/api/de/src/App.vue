<script setup>
import { storeToRefs } from 'pinia'
import { RouterLink, RouterView } from 'vue-router'

import { useAuthStore } from '@/stores/auth.js'
import { useCatalogStore } from '@/stores/catalog.js'

const auth = useAuthStore()
const { member } = storeToRefs(auth)

// The catalog loads once when the app starts
useCatalogStore().load()
</script>

<template>
  <header class="site">
    <span class="brand">Lorraine Commons</span>
    <nav aria-label="Hauptnavigation">
      <RouterLink :to="{ name: 'catalog' }">Katalog</RouterLink>
      <RouterLink :to="{ name: 'reservations' }">Meine Anfragen</RouterLink>
    </nav>
    <span v-if="member" class="member">
      Angemeldet als {{ member.name }}
      <button type="button" @click="auth.signOut()">Abmelden</button>
    </span>
    <RouterLink v-else :to="{ name: 'login' }">Anmelden</RouterLink>
  </header>
  <main>
    <RouterView />
  </main>
</template>
