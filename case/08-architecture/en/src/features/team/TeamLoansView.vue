<script setup>
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

import { useCatalogStore } from '@/features/catalog'
import { formatDate } from '@/utils/format.js'

const { items } = storeToRefs(useCatalogStore())

// The things on loan, the next one to come back first
const loans = computed(() =>
  items.value.filter((item) => item.availableFrom !== null).toSorted((a, b) => a.availableFrom.localeCompare(b.availableFrom)),
)
</script>

<template>
  <h2>Loans</h2>
  <ul v-if="loans.length > 0" class="loans">
    <li v-for="item in loans" :key="item.id">{{ item.name }}, back from {{ formatDate(item.availableFrom) }}</li>
  </ul>
  <p v-else>Nothing is on loan right now.</p>
</template>
