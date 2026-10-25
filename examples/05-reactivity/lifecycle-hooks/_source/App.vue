<script setup>
import { ref } from 'vue'

import CounterCard from './CounterCard.vue'

const shown = ref(true)
</script>

<template>
  <button type="button" @click="shown = !shown">{{ shown ? '[%Karte entfernen|Remove the card%]' : '[%Karte zeigen|Show the card%]' }}</button>
  <CounterCard v-if="shown" />
</template>
