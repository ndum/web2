<script setup>
import { formatDeposit } from '@/format.js'

// A presentational component, it gets everything through props and reports clicks as events
defineProps({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  deposit: { type: Number, required: true },
  favorite: { type: Boolean, default: false },
})

const emit = defineEmits(['toggle-favorite'])
</script>

<template>
  <li class="card">
    <strong>{{ name }}</strong>
    <span class="category">{{ category }}</span>
    <span class="deposit">{{ formatDeposit(deposit) }}</span>
    <button type="button" :aria-pressed="favorite" @click="emit('toggle-favorite', id)">Favorite</button>
  </li>
</template>
