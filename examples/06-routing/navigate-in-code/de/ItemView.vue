<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

import { things } from './things.js'

const props = defineProps({ id: { type: Number, required: true } })
const router = useRouter()

const thing = computed(() => things.find((entry) => entry.id === props.id))
</script>

<template>
  <h1 v-if="thing">{{ thing.name }}</h1>
  <p v-else>Dieses Ding gibt es nicht.</p>
  <!-- back goes one step back in the history, like the button of the browser -->
  <button type="button" @click="router.back()">Zurück</button>
</template>
