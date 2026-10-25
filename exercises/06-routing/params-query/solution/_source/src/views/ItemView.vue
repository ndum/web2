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
    <p>{{ item.category }}, [%Pfand|deposit%] {{ formatDeposit(item.deposit) }}</p>
    <p class="state">{{ item.availableFrom === null ? '[%Verfügbar|Available%]' : '[%Ausgeliehen|On loan%]' }}</p>
  </article>
  <p v-else>[%Dieses Ding gibt es nicht.|This thing does not exist.%]</p>
  <RouterLink :to="{ name: 'catalog' }">[%Zum Katalog|Back to the catalog%]</RouterLink>
</template>
