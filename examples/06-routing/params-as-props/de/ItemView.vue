<script setup>
import { computed } from 'vue'

import { things } from './things.js'

// The component knows nothing of the router, it only gets a prop
const props = defineProps({ id: { type: Number, required: true } })

const thing = computed(() => things.find((entry) => entry.id === props.id))
</script>

<template>
  <p>Prop id: {{ JSON.stringify(id) }}</p>
  <h1 v-if="thing">{{ thing.name }}</h1>
  <p v-else>Dieses Ding gibt es nicht.</p>
</template>
