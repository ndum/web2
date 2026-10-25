<script setup>
import { computed, inject } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'

import { signOut } from '@/auth.js'
import { memberKey } from '@/keys.js'

const props = defineProps({ favoriteCount: { type: Number, default: 0 } })

// Without a provider, inject returns the default value null
const member = inject(memberKey, null)
const route = useRoute()
const router = useRouter()

const favorites = computed(() =>
  props.favoriteCount === 1 ? '[%1 Favorit|1 favorite%]' : `${props.favoriteCount} [%Favoriten|favorites%]`,
)

// Whoever signs out in the team area goes back to the catalog
function leave() {
  signOut()
  if (route.meta.requiresTeam) router.push({ name: 'catalog' })
}
</script>

<template>
  <div class="bar">
    <span class="brand">Lorraine Commons</span>
    <nav aria-label="[%Hauptnavigation|Main navigation%]">
      <RouterLink :to="{ name: 'catalog' }">[%Katalog|Catalog%]</RouterLink>
      <RouterLink :to="{ name: 'favorites' }">[%Favoriten|Favorites%]</RouterLink>
      <RouterLink :to="{ name: 'association' }">[%Verein|Association%]</RouterLink>
      <RouterLink v-if="member?.team" :to="{ name: 'team-loans' }">[%Team|Team%]</RouterLink>
    </nav>
    <span class="favorites">{{ favorites }}</span>
    <span v-if="member" class="member">
      [%Angemeldet als|Signed in as%] {{ member.name }}
      <button type="button" class="sign-out" @click="leave">[%Abmelden|Sign out%]</button>
    </span>
    <RouterLink v-else :to="{ name: 'login' }" class="sign-in">[%Anmelden|Sign in%]</RouterLink>
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
