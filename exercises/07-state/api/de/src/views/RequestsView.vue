<script setup>
import { useCatalogStore } from '@/stores/catalog.js'
import { useRequestsStore } from '@/stores/requests.js'

const catalog = useCatalogStore()
const requests = useRequestsStore()
</script>

<template>
  <h1>Meine Anfragen</h1>
  <p v-if="requests.list.length === 0">Noch keine Anfragen.</p>
  <ul v-else class="catalog">
    <li v-for="request in requests.list" :key="request.id">
      {{ catalog.byId(request.itemId)?.name }}, {{ request.from }} bis {{ request.to }}
    </li>
  </ul>
</template>
