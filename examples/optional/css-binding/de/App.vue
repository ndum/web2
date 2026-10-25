<script setup>
import { computed, ref } from 'vue'

const available = ref(true)
const color = computed(() => (available.value ? '#2e7d32' : '#b71c1c'))
</script>

<template>
  <p class="badge">{{ available ? 'Da' : 'Ausgeliehen' }}</p>
  <button type="button" @click="available = !available">Status wechseln</button>
</template>

<style scoped>
.badge {
  display: inline-block;
  padding: 0.125rem 0.5rem;
  border-radius: 1rem;
  color: #fff;
  /* v-bind() ties the colour to the reactive value and updates it */
  background: v-bind(color);
}
</style>
