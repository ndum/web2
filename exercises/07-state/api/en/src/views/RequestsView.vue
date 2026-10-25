<script setup>
import { useCatalogStore } from '@/stores/catalog.js'
import { useRequestsStore } from '@/stores/requests.js'

const catalog = useCatalogStore()
const requests = useRequestsStore()
</script>

<template>
  <h1>My requests</h1>
  <p v-if="requests.list.length === 0">No requests yet.</p>
  <ul v-else class="catalog">
    <li v-for="request in requests.list" :key="request.id">
      {{ catalog.byId(request.itemId)?.name }}, {{ request.from }} to {{ request.to }}
    </li>
  </ul>
</template>
