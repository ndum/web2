<script setup>
import { provide, readonly, ref } from 'vue'
import { RouterView } from 'vue-router'

import { currentMember } from '@/auth.js'
import AppFooter from '@/components/AppFooter.vue'
import AppHeader from '@/components/AppHeader.vue'
import PageLayout from '@/components/PageLayout.vue'
import { useFavorites } from '@/composables/useFavorites.js'
import { catalogKey, favoritesKey, memberKey } from '@/keys.js'
import { loadItems } from '@/load.js'

// The catalog from the association's server
const status = ref('loading')
const items = ref([])
const loadError = ref('')

// Vite puts the value of the variable into the code, /api/items is the default
loadItems(import.meta.env.VITE_CATALOG_URL ?? '/api/items')
  .then((data) => {
    items.value = data
    status.value = 'success'
  })
  .catch((error) => {
    loadError.value = error.message
    status.value = 'error'
  })

// A returned thing is available again. Until part 7 the change lives only in this browser.
function markReturned(id) {
  items.value = items.value.map((item) => (item.id === id ? { ...item, availableFrom: null } : item))
}

// The router renders the pages, so App provides what several pages need instead of passing props
provide(catalogKey, { items: readonly(items), markReturned })

// App calls useFavorites once, so every page and the header share the same favourites
const favorites = useFavorites()
const favoriteCount = favorites.count
provide(favoritesKey, favorites)

// The signed-in member of the stand-in for the login, null while nobody is signed in
provide(memberKey, currentMember)
</script>

<template>
  <PageLayout>
    <template #header>
      <AppHeader :favorite-count="favoriteCount" />
    </template>

    <p v-if="status === 'loading'" class="message">[%Der Katalog wird geladen …|Loading the catalog …%]</p>
    <p v-else-if="status === 'error'" class="message">{{ loadError }}</p>
    <RouterView v-else />

    <template #footer>
      <AppFooter />
    </template>
  </PageLayout>
</template>
