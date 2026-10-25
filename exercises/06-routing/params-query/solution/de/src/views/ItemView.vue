<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

import { formatDeposit } from '@/format.js'
import items from '../../data/items.json'

const props = defineProps({ id: { type: Number, required: true } })

const item = computed(() => items.find((entry) => entry.id === props.id))
</script>

<template>
  <article v-if="item">
    <h1>{{ item.name }}</h1>
    <p>{{ item.category }}, Pfand {{ formatDeposit(item.deposit) }}</p>
    <p class="state">{{ item.availableFrom === null ? 'Verfügbar' : 'Ausgeliehen' }}</p>
  </article>
  <p v-else>Dieses Ding gibt es nicht.</p>
  <RouterLink :to="{ name: 'catalog' }">Zum Katalog</RouterLink>
</template>
