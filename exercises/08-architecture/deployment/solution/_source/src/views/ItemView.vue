<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

import items from '../../data/items.json'

const props = defineProps({ id: { type: Number, required: true } })
const item = computed(() => items.find((entry) => entry.id === props.id))
</script>

<template>
  <template v-if="item">
    <h1>{{ item.name }}</h1>
    <p>{{ item.category }}</p>
  </template>
  <h1 v-else>[%Ding nicht gefunden|Thing not found%]</h1>
  <RouterLink to="/">[%Zum Katalog|Back to the catalog%]</RouterLink>
</template>
