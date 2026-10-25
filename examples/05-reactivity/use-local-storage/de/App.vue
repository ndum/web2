<script setup>
import { useLocalStorage } from './useLocalStorage.js'

// The note survives a reload of the preview
const note = useLocalStorage('example-note', '')
</script>

<template>
  <label for="note">Notiz</label>
  <textarea id="note" v-model="note"></textarea>
  <p>Gespeichert: {{ JSON.stringify(note) }}</p>
</template>
