<script setup>
import { reactive } from 'vue'

// reactive makes the object itself reactive, its fields need no .value
const filters = reactive({ query: '', onlyAvailable: false })

// Destructuring copies the current value, query no longer follows the object
const { query } = filters

function reset() {
  // Change the fields, never replace the whole object
  filters.query = ''
  filters.onlyAvailable = false
}
</script>

<template>
  <button type="button" @click="filters.query = 'säge'">Nach «säge» suchen</button>
  <button type="button" @click="filters.onlyAvailable = !filters.onlyAvailable">Nur verfügbare</button>
  <button type="button" @click="reset">Zurücksetzen</button>
  <p>{{ filters }}</p>
  <p>Aus der Destrukturierung: {{ JSON.stringify(query) }}</p>
</template>
