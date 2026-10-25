<script setup>
import { computed, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

import { things } from './things.js'

const route = useRoute()
console.log('ItemView is created')

// From /items/1 to /items/2 Vue keeps the component, only the param changes
watch(
  () => route.params.id,
  (id) => console.log('new id', id),
)

const index = computed(() => things.findIndex((entry) => entry.id === Number(route.params.id)))
const next = computed(() => things[(index.value + 1) % things.length])
</script>

<template>
  <h1 v-if="index > -1">{{ things[index].name }}</h1>
  <p v-else>This thing does not exist.</p>
  <RouterLink :to="{ name: 'item', params: { id: next.id } }">Next thing</RouterLink>
</template>
