<script setup>
import { useLocalStorage } from './useLocalStorage.js'

// The note survives a reload of the preview
const note = useLocalStorage('example-note', '')
</script>

<template>
  <label for="note">Note</label>
  <textarea id="note" v-model="note"></textarea>
  <p>Stored: {{ JSON.stringify(note) }}</p>
</template>
