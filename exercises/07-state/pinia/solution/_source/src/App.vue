<script setup>
import { storeToRefs } from 'pinia'
import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router'

import { useAuthStore } from '@/stores/auth.js'
import { useRequestsStore } from '@/stores/requests.js'

const auth = useAuthStore()
// storeToRefs keeps the connection to the store, plain destructuring would copy the values
const { member } = storeToRefs(auth)
const { mine } = storeToRefs(useRequestsStore())
const route = useRoute()
const router = useRouter()

// Whoever signs out in the team area goes back to the catalog
function leave() {
  auth.signOut()
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
    <span>[%Anfragen|Requests%]: {{ mine.length }}</span>
    <span v-if="member" class="member">
      [%Angemeldet als|Signed in as%] {{ member.name }}
      <button type="button" @click="leave">[%Abmelden|Sign out%]</button>
    </span>
    <RouterLink v-else :to="{ name: 'login' }">[%Anmelden|Sign in%]</RouterLink>
  </header>
  <main>
    <RouterView />
  </main>
</template>
