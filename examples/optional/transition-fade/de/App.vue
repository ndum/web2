<script setup>
import { ref } from 'vue'

const sent = ref(false)
</script>

<template>
  <button type="button" @click="sent = !sent">
    {{ sent ? 'Meldung schliessen' : 'Anfrage senden' }}
  </button>
  <!-- Transition adds classes while the paragraph enters and leaves -->
  <Transition name="fade">
    <p v-if="sent" class="notice">Deine Anfrage ist bei Lorraine Commons angekommen.</p>
  </Transition>
</template>

<style>
.notice {
  padding: 0.5rem 0.75rem;
  border-left: 4px solid #2e7d32;
  background: #e8f5e9;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Whoever asks the system for less motion sees the change without the fade */
@media (prefers-reduced-motion: reduce) {
  .fade-enter-active,
  .fade-leave-active {
    transition: none;
  }
}
</style>
