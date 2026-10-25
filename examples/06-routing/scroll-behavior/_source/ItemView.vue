<script setup>
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

import { things } from './things.js'

const route = useRoute()

const thing = computed(() => things.find((entry) => entry.id === Number(route.params.id)))
const others = computed(() => things.filter((entry) => entry !== thing.value))
</script>

<template>
  <h1>{{ thing?.name }}</h1>
  <RouterLink :to="{ name: 'catalog' }">[%Zurück zur Liste|Back to the list%]</RouterLink>
  <h2>[%Weitere Dinge|More things%]</h2>
  <ul>
    <li v-for="entry in others" :key="entry.id">
      <RouterLink :to="{ name: 'item', params: { id: entry.id } }">{{ entry.name }}</RouterLink>
    </li>
  </ul>
</template>
