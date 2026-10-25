<script setup>
import { computed, provide, readonly, ref } from 'vue'

import AppFooter from '@/components/AppFooter.vue'
import AppHeader from '@/components/AppHeader.vue'
import PageLayout from '@/components/PageLayout.vue'
import { memberKey } from '@/keys.js'
import { loadItems } from '@/load.js'
import { parseRoute } from '@/router.js'
import CatalogView from '@/views/CatalogView.vue'
import ItemView from '@/views/ItemView.vue'

// The catalog from the association's server
const status = ref('loading')
const items = ref([])
const loadError = ref('')

// Vite puts the value of the variable into the code, /items is the default
loadItems(import.meta.env.VITE_CATALOG_URL ?? '/items')
  .then((data) => {
    items.value = data
    status.value = 'success'
  })
  .catch((error) => {
    loadError.value = error.message
    status.value = 'error'
  })

// The hash routes of part 2. The app lives as long as the page, so the listener stays.
const hash = ref(location.hash)
addEventListener('hashchange', () => {
  hash.value = location.hash
})
const route = computed(() => parseRoute(hash.value))
const currentItem = computed(() => items.value.find((item) => item.id === route.value.id))

// App owns search text and category, so they survive a visit to the page of a thing
const query = ref('')
const category = ref('')

// The ids of the favourite things, in memory until part 5 remembers them
const favorites = ref([])

function toggleFavorite(id) {
  favorites.value = favorites.value.includes(id)
    ? favorites.value.filter((entry) => entry !== id)
    : [...favorites.value, id]
}

function openItem(id) {
  location.hash = `#/items/${id}`
}

// The test member until the login of part 6, readonly keeps the changes in App
const member = ref({ number: 'M-117', name: 'Martina Hostettler' })
provide(memberKey, readonly(member))
</script>

<template>
  <PageLayout>
    <template #header>
      <AppHeader :favorite-count="favorites.length" />
    </template>

    <p v-if="status === 'loading'" class="message">Der Katalog wird geladen …</p>
    <p v-else-if="status === 'error'" class="message">{{ loadError }}</p>
    <CatalogView
      v-else-if="route.name === 'catalog'"
      v-model:query="query"
      v-model:category="category"
      :items="items"
      :favorites="favorites"
      @reserve="openItem"
      @toggle-favorite="toggleFavorite"
    />
    <!-- The key gives every thing a page of its own with a fresh form -->
    <ItemView v-else-if="route.name === 'item' && currentItem" :key="currentItem.id" :item="currentItem" />
    <p v-else-if="route.name === 'item'" class="message">Dieses Ding gibt es nicht.</p>
    <p v-else class="message">Diese Seite gibt es nicht.</p>

    <template #footer>
      <AppFooter />
    </template>
  </PageLayout>
</template>
