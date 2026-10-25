<script setup>
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'

import { useAuthStore } from '@/features/auth'
import { useFavoritesStore } from '@/features/favorites'
import { useReservationsStore } from '@/features/reservations'

const auth = useAuthStore()
// storeToRefs keeps the connection to the stores, plain destructuring would copy the values
const { member } = storeToRefs(auth)
const { count: favoriteCount } = storeToRefs(useFavoritesStore())
const { count: requestCount } = storeToRefs(useReservationsStore())
const route = useRoute()
const router = useRouter()

const favorites = computed(() =>
  favoriteCount.value === 1 ? '1 Favorit' : `${favoriteCount.value} Favoriten`,
)

// Whoever signs out in the team area goes back to the catalog
async function leave() {
  await auth.signOut()
  if (route.meta.requiresTeam) router.push({ name: 'catalog' })
}
</script>

<template>
  <div class="bar">
    <span class="brand">Lorraine Commons</span>
    <nav aria-label="Hauptnavigation">
      <RouterLink :to="{ name: 'catalog' }">Katalog</RouterLink>
      <RouterLink :to="{ name: 'favorites' }">Favoriten</RouterLink>
      <RouterLink :to="{ name: 'association' }">Verein</RouterLink>
      <RouterLink v-if="member" :to="{ name: 'reservations' }">Meine Anfragen ({{ requestCount }})</RouterLink>
      <RouterLink v-if="member?.team" :to="{ name: 'team-loans' }">Team</RouterLink>
    </nav>
    <span class="favorites">{{ favorites }}</span>
    <span v-if="member" class="member">
      Angemeldet als {{ member.name }}
      <button type="button" class="sign-out" @click="leave">Abmelden</button>
    </span>
    <RouterLink v-else :to="{ name: 'login' }" class="sign-in">Anmelden</RouterLink>
  </div>
</template>

<style scoped>
.bar {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem 1.5rem;
  align-items: baseline;
}
.brand {
  font-weight: 700;
}
nav {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}
a {
  color: #ffffff;
}
/* Active on every page of its section, the team link also below /team */
nav a.router-link-active {
  font-weight: 700;
  text-decoration: underline 2px;
}
</style>
