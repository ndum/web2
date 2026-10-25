<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import { things } from './things.js'

const route = useRoute()

// Params always arrive as text, the ids of the things are numbers
const thing = computed(() => things.find((entry) => entry.id === Number(route.params.id)))
</script>

<template>
  <p>route.params.id: {{ JSON.stringify(route.params.id) }}</p>
  <h1 v-if="thing">{{ thing.name }}</h1>
  <p v-else>This thing does not exist.</p>
</template>
