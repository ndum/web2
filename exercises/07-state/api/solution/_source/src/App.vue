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
    <nav aria-label="[%Hauptnavigation|Main navigation%]">
      <RouterLink :to="{ name: 'catalog' }">[%Katalog|Catalog%]</RouterLink>
      <RouterLink :to="{ name: 'reservations' }">[%Meine Anfragen|My requests%]</RouterLink>
    </nav>
    <span v-if="member" class="member">
      [%Angemeldet als|Signed in as%] {{ member.name }}
      <button type="button" @click="auth.signOut()">[%Abmelden|Sign out%]</button>
    </span>
    <RouterLink v-else :to="{ name: 'login' }">[%Anmelden|Sign in%]</RouterLink>
  </header>
  <main>
    <RouterView />
  </main>
</template>
