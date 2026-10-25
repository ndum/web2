<script setup>
import { onWatcherCleanup, ref, watch } from 'vue'

import { things } from './things.js'

const index = ref(0)
const thing = ref(null)

watch(
  index,
  async (now) => {
    const id = things[now].id
    const controller = new AbortController()
    // Runs before the next change of index, the old request is cancelled
    onWatcherCleanup(() => controller.abort())
    try {
      const response = await fetch(`/api/items/${id}`, { signal: controller.signal })
      thing.value = await response.json()
      console.log('Answer for', id)
    } catch (problem) {
      if (problem.name !== 'AbortError') throw problem
      console.log('Cancelled', id)
    }
  },
  { immediate: true },
)

function next() {
  index.value = (index.value + 1) % things.length
}
</script>

<template>
  <button type="button" @click="next">Next thing</button>
  <p>Chosen: {{ things[index].name }}</p>
  <h1>{{ thing?.name ?? '…' }}</h1>
</template>
