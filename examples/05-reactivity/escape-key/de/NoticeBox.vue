<script setup>
import { onMounted, onUnmounted } from 'vue'

const emit = defineEmits(['close'])

function onKeydown(event) {
  if (event.key === 'Escape') emit('close')
}

// The listener lives as long as the component, not longer
onMounted(() => window.addEventListener('keydown', onKeydown))
onUnmounted(() => window.removeEventListener('keydown', onKeydown))
</script>

<template>
  <div class="notice" role="dialog" aria-modal="true" aria-label="Hinweis">
    <p>Eine Ausleihe dauert höchstens sieben Tage. Escape schliesst den Hinweis.</p>
    <button type="button" @click="emit('close')">Schliessen</button>
  </div>
</template>

<style scoped>
.notice {
  margin-top: 0.5rem;
  padding: 0.5rem 1rem;
  border: 2px solid #1f6b4f;
  border-radius: 8px;
}
</style>
