<script setup>
import { computed, inject, ref } from 'vue'

import { catalogKey } from '@/keys.js'

const { items, markReturned } = inject(catalogKey)
const message = ref('')

const loans = computed(() => items.value.filter((item) => item.availableFrom !== null))

function record(item) {
  markReturned(item.id)
  message.value = `Rückgabe von ${item.name} erfasst.`
}
</script>

<template>
  <h2>Rückgaben</h2>
  <ul v-if="loans.length > 0" class="returns">
    <li v-for="item in loans" :key="item.id">
      {{ item.name }}
      <button type="button" @click="record(item)">Zurückgebracht</button>
    </li>
  </ul>
  <p v-else>Zurzeit ist nichts ausgeliehen.</p>
  <p class="message" role="status">{{ message }}</p>
</template>
