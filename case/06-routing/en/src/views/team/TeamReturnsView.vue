<script setup>
import { computed, inject, ref } from 'vue'

import { catalogKey } from '@/keys.js'

const { items, markReturned } = inject(catalogKey)
const message = ref('')

const loans = computed(() => items.value.filter((item) => item.availableFrom !== null))

function record(item) {
  markReturned(item.id)
  message.value = `Return of ${item.name} recorded.`
}
</script>

<template>
  <h2>Returns</h2>
  <ul v-if="loans.length > 0" class="returns">
    <li v-for="item in loans" :key="item.id">
      {{ item.name }}
      <button type="button" @click="record(item)">Returned</button>
    </li>
  </ul>
  <p v-else>Nothing is on loan right now.</p>
  <p class="message" role="status">{{ message }}</p>
</template>
