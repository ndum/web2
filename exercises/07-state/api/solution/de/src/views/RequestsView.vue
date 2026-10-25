<script setup>
import { onMounted, onUnmounted } from 'vue'

import { useCatalogStore } from '@/stores/catalog.js'
import { useRequestsStore } from '@/stores/requests.js'

const catalog = useCatalogStore()
const requests = useRequestsStore()

// Whoever leaves the page before the answer arrives cancels the request
const controller = new AbortController()
onMounted(() => requests.load(controller.signal))
onUnmounted(() => controller.abort())
</script>

<template>
  <h1>Meine Anfragen</h1>
  <p v-if="requests.status === 'loading'" role="status">Die Anfragen werden geladen …</p>
  <p v-else-if="requests.status === 'error'" class="error" role="alert">{{ requests.error }}</p>
  <p v-else-if="requests.list.length === 0">Noch keine Anfragen.</p>
  <ul v-else class="catalog">
    <li v-for="request in requests.list" :key="request.id">
      {{ catalog.byId(request.itemId)?.name }}, {{ request.from }} bis {{ request.to }}
    </li>
  </ul>
</template>
