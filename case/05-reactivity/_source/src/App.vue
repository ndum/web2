<script setup>
import { computed, onMounted, onUnmounted, provide, readonly, ref } from 'vue'

import AppFooter from '@/components/AppFooter.vue'
import AppHeader from '@/components/AppHeader.vue'
import PageLayout from '@/components/PageLayout.vue'
import { useFavorites } from '@/composables/useFavorites.js'
import { useLocalStorage } from '@/composables/useLocalStorage.js'
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

// The hash routes of part 2. The listener lives as long as App, from onMounted to onUnmounted.
const hash = ref(location.hash)

function onHashChange() {
  hash.value = location.hash
}

onMounted(() => addEventListener('hashchange', onHashChange))
onUnmounted(() => removeEventListener('hashchange', onHashChange))

const route = computed(() => parseRoute(hash.value))
const currentItem = computed(() => items.value.find((item) => item.id === route.value.id))

// App owns search text and category, the browser remembers them across reloads
const query = useLocalStorage('lorraine-commons-search', '')
const category = useLocalStorage('lorraine-commons-category', '')

// App calls useFavorites once and passes the favourites on to the pages
const { favorites, toggle: toggleFavorite, count: favoriteCount } = useFavorites()

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
      <AppHeader :favorite-count="favoriteCount" />
    </template>

    <p v-if="status === 'loading'" class="message">[%Der Katalog wird geladen …|Loading the catalog …%]</p>
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
    <p v-else-if="route.name === 'item'" class="message">[%Dieses Ding gibt es nicht.|This thing does not exist.%]</p>
    <p v-else class="message">[%Diese Seite gibt es nicht.|This page does not exist.%]</p>

    <template #footer>
      <AppFooter />
    </template>
  </PageLayout>
</template>
