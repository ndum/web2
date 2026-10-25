<script setup>
import { onWatcherCleanup, ref, watch } from 'vue'

const query = ref('')
const settled = ref('')

watch(query, (text) => {
  const timer = setTimeout(() => {
    settled.value = text
  }, 300)
  // Runs before the next call of the watcher, so only the last input counts
  onWatcherCleanup(() => clearTimeout(timer))
})
</script>

<template>
  <label for="search">[%Suchen|Search%]</label>
  <input id="search" v-model="query" type="search">
  <p>[%Sofort|At once%]: {{ JSON.stringify(query) }}</p>
  <p>[%Nach einer Pause von 300 ms|After a pause of 300 ms%]: {{ JSON.stringify(settled) }}</p>
</template>
