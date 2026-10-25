<script setup>
import { computed, ref } from 'vue'
import { onBeforeRouteLeave } from 'vue-router'

const note = ref('')
const dirty = computed(() => note.value.trim() !== '')

// Asks before someone leaves the page with a half-filled form, false keeps the page
onBeforeRouteLeave(() => {
  if (dirty.value && !window.confirm('Deine Eingaben gehen verloren. Seite trotzdem verlassen?')) {
    return false
  }
})
</script>

<template>
  <h1>Beamer</h1>
  <label for="note">Notiz zur Reservation</label>
  <textarea id="note" v-model="note"></textarea>
</template>
