<script setup>
import { computed } from 'vue'

const props = defineProps({
  name: { type: String, required: true },
  category: { type: String, required: true },
  deposit: { type: Number, required: true },
  availableFrom: { type: String, default: null },
})

// A date string such as 2026-11-12 counts as midnight UTC, so it is formatted in UTC as well
const state = computed(() => {
  if (props.availableFrom === null) return '[%Verfügbar|Available%]'
  const date = new Date(props.availableFrom).toLocaleDateString('[%de-CH|en-US%]', { timeZone: 'UTC' })
  return `[%Wieder verfügbar ab|Available again from%] ${date}`
})
</script>

<template>
  <article class="card">
    <h2>{{ name }}</h2>
    <p class="category">{{ category }}</p>
    <p>[%Pfand|Deposit%]: CHF {{ deposit.toFixed(2) }}</p>
    <p class="state" :class="{ lent: availableFrom !== null }">{{ state }}</p>
  </article>
</template>

<style scoped>
.card {
  padding: 0.75rem 1rem;
  border: 1px solid #c8c8c8;
  border-radius: 8px;
}
h2 {
  margin: 0 0 0.25rem;
  font-size: 1.1rem;
}
p {
  margin: 0.25rem 0 0;
}
.category {
  color: #5f5f5f;
}
.state {
  font-weight: 600;
  color: #1f6b4f;
}
.state.lent {
  color: #a3341f;
}
</style>