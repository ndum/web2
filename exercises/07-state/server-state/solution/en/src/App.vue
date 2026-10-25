<script setup>
import { useQueryCache } from '@pinia/colada'
import { ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'

import { postJson } from '@/api.js'

const member = ref(null)
const queryCache = useQueryCache()

// The course API needs a login for the requests, the exercise signs in as M-117
async function signIn() {
  member.value = await postJson('/session', { number: 'M-117' })
  queryCache.invalidateQueries({ key: ['reservations'] })
}
</script>

<template>
  <header class="site">
    <span class="brand">Lorraine Commons</span>
    <nav aria-label="Main navigation">
      <RouterLink :to="{ name: 'catalog' }">Catalog</RouterLink>
    </nav>
    <span v-if="member">Signed in as {{ member.name }}</span>
    <button v-else type="button" @click="signIn">Sign in as M-117</button>
  </header>
  <main>
    <RouterView />
  </main>
</template>
