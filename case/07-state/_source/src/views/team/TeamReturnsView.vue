<script setup>
import { computed, ref } from 'vue'

import { useCatalogStore } from '@/stores/catalog.js'

const catalog = useCatalogStore()
const message = ref('')

const loans = computed(() => catalog.items.filter((item) => item.availableFrom !== null))

// The course API records the return and checks that the team does it
async function record(item) {
  const error = await catalog.markReturned(item.id)
  message.value = error || `[%Rückgabe von ${item.name} erfasst.|Return of ${item.name} recorded.%]`
}
</script>

<template>
  <h2>[%Rückgaben|Returns%]</h2>
  <ul v-if="loans.length > 0" class="returns">
    <li v-for="item in loans" :key="item.id">
      {{ item.name }}
      <button type="button" @click="record(item)">[%Zurückgebracht|Returned%]</button>
    </li>
  </ul>
  <p v-else>[%Zurzeit ist nichts ausgeliehen.|Nothing is on loan right now.%]</p>
  <p class="message" role="status">{{ message }}</p>
</template>
